import React, { useState, useEffect, useRef } from "react";

const MacCarousel = ({ attributes }) => {
  const { title, titleColor, slides } = attributes;
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  // const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const containerRef = useRef(null);


  const getScaleMultiplier = () => {
    const width = window.innerWidth;
    return width >= 768 ? 1 : Math.max(0.5, width / 768);
  };


  useEffect(() => {
    const handleResize = () => {
      setScaleMultiplier(getScaleMultiplier());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const jumpSlide = (dir) => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.querySelector(".carousel-slide")?.offsetWidth || 0;
      const perSlide = slideWidth + 20 * scaleMultiplier;
      containerRef.current.scrollBy({
        left: dir === "next" ? perSlide : -perSlide,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const isDesktop = window.innerWidth >= 768;


  // SVG icons 
  const plusIconSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={isDesktop ? `${38 * scaleMultiplier}` : `25px`}
      height={isDesktop ? `${38 * scaleMultiplier}` : `25px`} 
      fill="currentColor"
      viewBox="0 0 16 16"
      style={{ filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))" }}
    >
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        stroke="#fff"
        strokeWidth={isDesktop ? `${1.3 * scaleMultiplier}` : `1.5`}
      />
    </svg>
  );

  const leftArrowSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${24 * scaleMultiplier}`}
      height={`${24 * scaleMultiplier}`}
      fill="#333"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );

  const rightArrowSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${24 * scaleMultiplier}`}
      height={`${24 * scaleMultiplier}`}
      fill="#333"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );

  return (
    <div
      style={{
        width: "100%",
        padding: `${40 * scaleMultiplier}px 0`,
        paddingLeft: window.innerWidth < 768 ? "0px" : `${100 * scaleMultiplier}px`,
      }}
    >
      <h2
        style={{
          textAlign: "left",
          color: titleColor || "#000",
          fontSize: `${44 * scaleMultiplier}px`,
          fontWeight: `600`,
          marginBottom: `${20 * scaleMultiplier}px`,
          paddingLeft: `${20 * scaleMultiplier}px`,
        }}
      >
        {title}
      </h2>

      {/* Slide Wrapper with native scrolling */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: `${20 * scaleMultiplier}px`,
          paddingLeft: `${20 * scaleMultiplier}px`,
          overflowX: "auto", 
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
          WebkitOverflowScrolling: "touch", 
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              flex: `0 0 ${window.innerWidth < 768 ? window.innerWidth * 0.65 : window.innerWidth * 0.27}px`,
              borderRadius: `${16 * scaleMultiplier}px`,
              overflow: "hidden",
              position: "relative",
              backgroundColor: slide.backgroundColor || "#f5f5f5",
            }}
          >
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: `${16 * scaleMultiplier}px`,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
              />
            )}

            {/* Text Overlay */}
            <div
              style={{
                position: "absolute",
                top: `${20 * scaleMultiplier}px`,
                left: `${20 * scaleMultiplier}px`,
                right: `${20 * scaleMultiplier}px`,
                color: slide.titleColor || "#fff",
              }}
            >
              <h4
                style={{
                  color: slide.captionColor || "#fff",
                  fontSize: `${19 * scaleMultiplier}px`,
                  marginBottom: `${3 * scaleMultiplier}px`,
                }}
              >
                {slide.caption}
              </h4>
              <h3
                style={{
                  color: slide.titleColor || "#fff",
                  fontSize: `${30 * scaleMultiplier}px`,
                  fontWeight: "bold",
                  lineHeight: "1.3",
                }}
              >
                {slide.title}
              </h3>
            </div>

            {/* Plus Button */}
            <button
              style={{
                position: "absolute",
                bottom: `${20 * scaleMultiplier}px`,
                right: `${20 * scaleMultiplier}px`,
                width: isDesktop ? `${40 * scaleMultiplier}px` : `25px`,
                height: isDesktop ? `${40 * scaleMultiplier}px` : `25px`,
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,0,1)",
                border: `1px solid rgba(255, 255, 255, 0.4)`,
                backdropFilter: "blur(10px)",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(${1.1})`;
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(255, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `scale(${1})`;
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => {
                setSelectedSlide(slide);
                setCurrentPageIndex(0);
                setShowModal(true);
              }}
            >
              {plusIconSvg}
            </button>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div
        style={{
          display: "flex",
          justifyContent: isDesktop ? "flex-end" : "center",
          marginTop: `${15 * scaleMultiplier}px`,
          gap: `${20 * scaleMultiplier}px`,
          paddingRight: isDesktop ? "20px" : "0",
        }}
      >
        <button
          onClick={() => jumpSlide("prev")}
          style={{
            width: `${40 * scaleMultiplier}px`,
            height: `${40 * scaleMultiplier}px`,
            borderRadius: "50%",
            border: `1px solid #ccc`,
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {leftArrowSvg}
        </button>
        <button
          onClick={() => jumpSlide("next")}
          style={{
            width: `${40 * scaleMultiplier}px`,
            height: `${40 * scaleMultiplier}px`,
            borderRadius: "50%",
            border: `1px solid #ccc`,
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {rightArrowSvg}
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedSlide && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "30px",
              textAlign: "left",
              position: "relative",
              scrollbarWidth: "none",     
              msOverflowStyle: "none",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"   
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"     
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>


            {/* All Pages */}
            {selectedSlide.pages && selectedSlide.pages.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {selectedSlide.pages.map((page, idx) => (
                  <div
                    key={idx}
                    style={{
                      paddingBottom: "20px",
                      borderBottom:
                        idx !== selectedSlide.pages.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                  >
                    {page.img && (
                      <img
                        src={page.img}
                        alt={`page-${idx}`}
                        style={{
                          maxWidth: "100%",
                          borderRadius: "12px",
                          marginBottom: "15px",
                        }}
                      />
                    )}
                    <p
                      style={{
                        fontSize: "18px",
                        color: page.descriptionColor || "#444",
                        lineHeight: "1.6",
                      }}
                    >
                      {page.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MacCarousel;









