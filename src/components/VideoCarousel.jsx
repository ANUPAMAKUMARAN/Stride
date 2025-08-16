import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/VideoCarousel.scss";

const VideoCarousel = ({ attributes }) => {
  const {
    slides = [],
    slideGap,
    backgroundColor,
    title,
    titleColor,
    minSlidesToShow,
    progressbarColor,
    progressbar,
  } = attributes;

  const presetSlideHeight = 350;
  const presetSlideWidth = 350;
  const scrollRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [dimensions, setDimensions] = useState({
    cardWidth: presetSlideWidth,
    cardHeight: presetSlideHeight,
    fontScale: 1,
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Video state
  const videoRefs = useRef([]);
  const [playingStates, setPlayingStates] = useState(
    Array(slides.length).fill(false)
  );

  // Popup video state
  const [popupVideo, setPopupVideo] = useState(null);

  

  useEffect(() => {
  const updateDimensions = () => {
    const containerWidth = scrollRef.current?.offsetWidth || 0;

 
    let slidesToShow = minSlidesToShow; 
    if (window.innerWidth <= 768) {
      slidesToShow = 2;
    } else {
      slidesToShow = 6.5; 
    }

    const fullSlideWidth = presetSlideWidth;
    const baseRequiredWidth =
      fullSlideWidth * slidesToShow + (slidesToShow - 1) * slideGap;

    if (containerWidth < baseRequiredWidth) {
      const roughAdjustedWidth = containerWidth / slidesToShow;
      const fontScale = roughAdjustedWidth / presetSlideWidth;
      const scaledGap = slideGap * fontScale;
      const totalGap = (slidesToShow - 1) * scaledGap;
      const adjustedWidth = (containerWidth - totalGap) / slidesToShow;

      setDimensions({
        cardWidth: adjustedWidth,
        cardHeight: adjustedWidth,
        fontScale,
      });
    } else {
      setDimensions({
        cardWidth: fullSlideWidth,
        cardHeight: fullSlideWidth,
        fontScale: 1,
      });
    }
  };

  requestAnimationFrame(updateDimensions);
  window.addEventListener("resize", updateDimensions);
  return () => window.removeEventListener("resize", updateDimensions);
}, [presetSlideWidth, slideGap, minSlidesToShow]);

useEffect(() => {
  if (window.innerWidth <= 768 && scrollRef.current) {
    const offset = dimensions.cardWidth / 2; // half card
    scrollRef.current.scrollLeft = offset;
  }
}, [dimensions.cardWidth]);

  const getScrollDistance = () =>
    dimensions.cardWidth + dimensions.fontScale * slideGap;

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -getScrollDistance(),
        behavior: "smooth",
      });
    }
  }, [dimensions, slideGap]);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: getScrollDistance(),
        behavior: "smooth",
      });
    }
  }, [dimensions, slideGap]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollPosition(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX);
    scrollRef.current.scrollLeft = scrollPosition - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const updateScrollability = () => {
      setCanScrollLeft(scrollContainer.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.scrollLeft <
        scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1
      );
    };

    scrollContainer.addEventListener("scroll", updateScrollability);
    updateScrollability();
    return () =>
      scrollContainer.removeEventListener("scroll", updateScrollability);
  }, [dimensions, slides]);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;
    const handleScroll = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      setProgress(
        maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0
      );
    };
    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = (index) => {
    const videoEl = videoRefs.current[index];
    if (!videoEl) return;
    videoEl.play();
    setPlayingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  return (
    <div
      className="relative select-none carousel-section"
      style={{
        background: backgroundColor || "#000",
        paddingTop: `${60 * dimensions.fontScale}px`,
        paddingBottom: `${40 * dimensions.fontScale}px`,
      }}
    >
      <h2
        className="font-bold text-left px-6"
        style={{
          fontSize: `${50 * dimensions.fontScale}px`,
          marginBottom: `${20 * dimensions.fontScale}px`,
          color: titleColor || "#fff",
        }}
      >
        {title}
      </h2>

      <div className="relative w-full" style={{ overflow: "visible" }}>
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="carousel-button carousel-button-left"
          >
            ‹
          </button>
        )}

        <div
          ref={scrollRef}
          className={`flex overflow-x-auto no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          style={{
            gap: `${dimensions.fontScale * slideGap}px`,
            padding: `0 ${20 * dimensions.fontScale}px`,
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}

        >
          {slides.map((item, index) => (
            <div
              key={index}
              className="story-item"
              style={{
                width: `${dimensions.cardWidth}px`,
                height: `${dimensions.cardHeight}px`,
                position: "relative",
              }}
              onMouseLeave={() => {
                const videoEl = videoRefs.current[index];
                if (videoEl) {
                  videoEl.pause();
                  setPlayingStates((prev) => {
                    const newStates = [...prev];
                    newStates[index] = false;
                    return newStates;
                  });
                }
              }}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item.video}
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                onClick={() => setPopupVideo(item.video)}
              ></video>

              {!playingStates[index] && (
                <div
                  className="overlay"
                  onMouseEnter={() => togglePlay(index)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopupVideo(item.video);
                  }}
                  style={{ cursor: "pointer" }}
                >
                 
                  <div className="play-btn"
                    style={{
                      width: `${60 * dimensions.fontScale}px`,
                      height: `${60 * dimensions.fontScale}px`,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      style={{
                        width: `${28 * dimensions.fontScale}px`,
                        height: `${28 * dimensions.fontScale}px`,
                      }}
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="carousel-button carousel-button-right"
          >
            ›
          </button>
        )}
      </div>

      {progressbar && (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              background: progressbarColor || "#ff00ff",
            }}
          />
        </div>
      )}

      {/* Popup Modal */}
      {popupVideo && (
        <div
          className="video-popup-overlay"
          onClick={() => setPopupVideo(null)}
        >
          <div
            className="video-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="popup-close"
              onClick={() => setPopupVideo(null)}
            >
              ✖
            </span>
            <video
              src={popupVideo}
              controls
              autoPlay
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "8px",
                background: "#000",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
