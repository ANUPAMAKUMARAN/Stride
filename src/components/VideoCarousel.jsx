// import React, { useCallback, useEffect, useRef, useState } from "react";
// import "../styles/VideoCarousel.scss";

// const VideoCarousel = ({ attributes }) => {
//   const {
//     slides = [],
//     slideGap,
//     backgroundColor,
//     title,
//     titleColor,
//     minSlidesToShow,
//     progressbarColor,
//     progressbar,
//   } = attributes;

//   const presetSlideHeight = 350;
//   const presetSlideWidth = 350;
//   const scrollRef = useRef(null);

//   const [progress, setProgress] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const [dimensions, setDimensions] = useState({
//     cardWidth: presetSlideWidth,
//     cardHeight: presetSlideHeight,
//     fontScale: 1,
//   });

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   // Video state
//   const videoRefs = useRef([]);
//   const [playingStates, setPlayingStates] = useState(
//     Array(slides.length).fill(false)
//   );

//   // Popup video state
//   const [popupVideo, setPopupVideo] = useState(null);

  

//   useEffect(() => {
//   const updateDimensions = () => {
//     const containerWidth = scrollRef.current?.offsetWidth || 0;

 
//     let slidesToShow = minSlidesToShow; 
//     if (window.innerWidth <= 768) {
//       slidesToShow = 2;
//     } else {
//       slidesToShow = 6.5; 
//     }

//     const fullSlideWidth = presetSlideWidth;
//     const baseRequiredWidth =
//       fullSlideWidth * slidesToShow + (slidesToShow - 1) * slideGap;

//     if (containerWidth < baseRequiredWidth) {
//       const roughAdjustedWidth = containerWidth / slidesToShow;
//       const fontScale = roughAdjustedWidth / presetSlideWidth;
//       const scaledGap = slideGap * fontScale;
//       const totalGap = (slidesToShow - 1) * scaledGap;
//       const adjustedWidth = (containerWidth - totalGap) / slidesToShow;

//       setDimensions({
//         cardWidth: adjustedWidth,
//         cardHeight: adjustedWidth,
//         fontScale,
//       });
//     } else {
//       setDimensions({
//         cardWidth: fullSlideWidth,
//         cardHeight: fullSlideWidth,
//         fontScale: 1,
//       });
//     }
//   };

//   requestAnimationFrame(updateDimensions);
//   window.addEventListener("resize", updateDimensions);
//   return () => window.removeEventListener("resize", updateDimensions);
// }, [presetSlideWidth, slideGap, minSlidesToShow]);

// useEffect(() => {
//   if (window.innerWidth <= 768 && scrollRef.current) {
//     const offset = dimensions.cardWidth / 2; // half card
//     scrollRef.current.scrollLeft = offset;
//   }
// }, [dimensions.cardWidth]);

//   const getScrollDistance = () =>
//     dimensions.cardWidth + dimensions.fontScale * slideGap;

//   const scrollLeft = useCallback(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: -getScrollDistance(),
//         behavior: "smooth",
//       });
//     }
//   }, [dimensions, slideGap]);

//   const scrollRight = useCallback(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: getScrollDistance(),
//         behavior: "smooth",
//       });
//     }
//   }, [dimensions, slideGap]);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - scrollRef.current.offsetLeft);
//     setScrollPosition(scrollRef.current.scrollLeft);
//   };
//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = (x - startX);
//     scrollRef.current.scrollLeft = scrollPosition - walk;
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//   };
//   const handleMouseUp = () => setIsDragging(false);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     const updateScrollability = () => {
//       setCanScrollLeft(scrollContainer.scrollLeft > 0);
//       setCanScrollRight(
//         scrollContainer.scrollLeft <
//         scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1
//       );
//     };

//     scrollContainer.addEventListener("scroll", updateScrollability);
//     updateScrollability();
//     return () =>
//       scrollContainer.removeEventListener("scroll", updateScrollability);
//   }, [dimensions, slides]);

//   useEffect(() => {
//     const slider = scrollRef.current;
//     if (!slider) return;
//     const handleScroll = () => {
//       const maxScroll = slider.scrollWidth - slider.clientWidth;
//       setProgress(
//         maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0
//       );
//     };
//     slider.addEventListener("scroll", handleScroll);
//     return () => slider.removeEventListener("scroll", handleScroll);
//   }, []);

//   const togglePlay = (index) => {
//     const videoEl = videoRefs.current[index];
//     if (!videoEl) return;
//     videoEl.play();
//     setPlayingStates((prev) => {
//       const newStates = [...prev];
//       newStates[index] = true;
//       return newStates;
//     });
//   };

//   return (
//     <div
//       className="relative select-none carousel-section"
//       style={{
//         background: backgroundColor || "#000",
//         paddingTop: `${60 * dimensions.fontScale}px`,
//         paddingBottom: `${40 * dimensions.fontScale}px`,
//       }}
//     >
//       <h2
//         className="font-bold text-left px-6"
//         style={{
//           fontSize: `${50 * dimensions.fontScale}px`,
//           marginBottom: `${20 * dimensions.fontScale}px`,
//           color: titleColor || "#fff",
//         }}
//       >
//         {title}
//       </h2>

//       <div className="relative w-full" style={{ overflow: "visible" }}>
//         {canScrollLeft && (
//           <button
//             onClick={scrollLeft}
//             className="carousel-button carousel-button-left"
//           >
//             ‹
//           </button>
//         )}

//         <div
//           ref={scrollRef}
//           className={`flex overflow-x-auto no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"
//             }`}
//           style={{
//             gap: `${dimensions.fontScale * slideGap}px`,
//             padding: `0 ${20 * dimensions.fontScale}px`,
//           }}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}

//         >
//           {slides.map((item, index) => (
//             <div
//               key={index}
//               className="story-item"
//               style={{
//                 width: `${dimensions.cardWidth}px`,
//                 height: `${dimensions.cardHeight}px`,
//                 position: "relative",
//               }}
//               onMouseLeave={() => {
//                 const videoEl = videoRefs.current[index];
//                 if (videoEl) {
//                   videoEl.pause();
//                   setPlayingStates((prev) => {
//                     const newStates = [...prev];
//                     newStates[index] = false;
//                     return newStates;
//                   });
//                 }
//               }}
//             >
//               <video
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 src={item.video}
//                 muted
//                 loop
//                 playsInline
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                 }}
//                 onClick={() => setPopupVideo(item.video)}
//               ></video>

//               {!playingStates[index] && (
//                 <div
//                   className="overlay"
//                   onMouseEnter={() => togglePlay(index)}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setPopupVideo(item.video);
//                   }}
//                   style={{ cursor: "pointer" }}
//                 >
                 
//                   <div className="play-btn"
//                     style={{
//                       width: `${60 * dimensions.fontScale}px`,
//                       height: `${60 * dimensions.fontScale}px`,
//                     }}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="white"
//                       style={{
//                         width: `${28 * dimensions.fontScale}px`,
//                         height: `${28 * dimensions.fontScale}px`,
//                       }}
//                     >
//                       <path d="M8 5v14l11-7z" />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {canScrollRight && (
//           <button
//             onClick={scrollRight}
//             className="carousel-button carousel-button-right"
//           >
//             ›
//           </button>
//         )}
//       </div>

//       {progressbar && (
//         <div className="progress-bar-container">
//           <div
//             className="progress-bar"
//             style={{
//               width: `${progress}%`,
//               background: progressbarColor || "#ff00ff",
//             }}
//           />
//         </div>
//       )}

//       {/* Popup Modal */}
//       {popupVideo && (
//         <div
//           className="video-popup-overlay"
//           onClick={() => setPopupVideo(null)}
//         >
//           <div
//             className="video-popup-content"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <span
//               className="popup-close"
//               onClick={() => setPopupVideo(null)}
//             >
//               ✖
//             </span>
//             <video
//               src={popupVideo}
//               controls
//               autoPlay
//               style={{
//                 maxWidth: "90vw",
//                 maxHeight: "90vh",
//                 borderRadius: "8px",
//                 background: "#000",
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCarousel;







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
    autoScrolling
  } = attributes;

  
  const presetSlideHeight = 350;
  const presetSlideWidth = 350;
  const scrollRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoScrollInterval = useRef(null);

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

  

// Update slide dimensions dynamically
    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = scrollRef.current?.offsetWidth || 0;
            const fullSlideWidth = presetSlideWidth;

            const baseRequiredWidth =
                fullSlideWidth * minSlidesToShow + (minSlidesToShow - 1) * slideGap;

            if (containerWidth < baseRequiredWidth) {
                // Estimate unscaled card width
                const roughAdjustedWidth = containerWidth / minSlidesToShow;
                const fontScale = roughAdjustedWidth / presetSlideWidth;

                // Scale the gap now
                const scaledGap = slideGap * fontScale;
                const totalGap = (minSlidesToShow - 1) * scaledGap;
                const adjustedWidth = (containerWidth - totalGap) / minSlidesToShow;

                setDimensions({
                    cardWidth: adjustedWidth,
                    cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
                    fontScale,
                });
            } else {
                setDimensions({
                    cardWidth: fullSlideWidth,
                    cardHeight: presetSlideHeight,
                    fontScale: 1,
                });
            }
        };

        // 🛠 Run once layout is ready
        requestAnimationFrame(updateDimensions);

        // 🔁 Update on resize
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);
const getScrollDistance = () =>
        dimensions.cardWidth + dimensions.fontScale * slideGap;

    // Scroll Left
    const scrollLeft = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -getScrollDistance(),
                behavior: "smooth",
            });
        }
    }, [dimensions, slideGap]);

    // Scroll Right
    const scrollRight = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: getScrollDistance(),
                behavior: "smooth",
            });
        }
    }, [dimensions, slideGap]);

    // Start Dragging
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollPosition(scrollRef.current.scrollLeft);
    };

    // Drag Move with smooth animation
    useEffect(() => {
        let animationFrameId = null;

        const smoothScroll = (target) => {
            if (!scrollRef.current) return;
            const start = scrollRef.current.scrollLeft;
            const change = target - start;
            let startTime = null;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / 200, 1);
                scrollRef.current.scrollLeft = start + change * easeInOutQuad(progress);
                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setScrollPosition(target);
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        };

        const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        const handleMouseMove = (e) => {
            if (!isDragging || !scrollRef.current) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;

            // Dynamically scaled drag scroll
            const baseCardWidth = 400; // match your base slide width
            const scale = dimensions.cardWidth / baseCardWidth;
            const scrollDistance = (x - startX) * scale;
            const target = scrollPosition - scrollDistance;
            smoothScroll(target);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);

    // Stop Dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Enable Smooth Scrolling with Mouse Wheel & Trackpad
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;
    
        const isTrackpad = (e) => Math.abs(e.deltaY) < 50 && e.deltaMode === 0;
    
        const handleWheelScroll = (e) => {
            if (!isHovered) return;
    
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
            const atStart = scrollLeft <= 0;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
    
            if (isTrackpad(e)) {
                // Trackpad — only horizontal flow
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    if (e.deltaX < 0 && !atStart) {
                        scrollContainer.scrollLeft += e.deltaX;
                        e.preventDefault();
                    } else if (e.deltaX > 0 && !atEnd) {
                        scrollContainer.scrollLeft += e.deltaX;
                        e.preventDefault();
                    }
                }
                // else → vertical swipe → let page scroll
            } else {
                // Mouse wheel — treat vertical delta as horizontal carousel movement
                const scrollDistance = getScrollDistance();
                const scrollAmount = (e.deltaX || e.deltaY) * (scrollDistance / 100);
    
                if (e.deltaY < 0 && !atStart) {
                    scrollContainer.scrollBy({ left: -Math.abs(scrollAmount), behavior: "smooth" });
                    e.preventDefault();
                } else if (e.deltaY > 0 && !atEnd) {
                    scrollContainer.scrollBy({ left: Math.abs(scrollAmount), behavior: "smooth" });
                    e.preventDefault();
                }
                // else → let page scroll
            }
        };
    
        scrollContainer.addEventListener("wheel", handleWheelScroll, { passive: false });
        return () => {
            scrollContainer.removeEventListener("wheel", handleWheelScroll);
        };
    }, [isHovered, dimensions, slideGap]);

    // Enable Keyboard Arrow Scrolling
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isHovered) return;
            if (e.key === "ArrowLeft") {
                scrollLeft();
            } else if (e.key === "ArrowRight") {
                scrollRight();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isHovered, scrollLeft, scrollRight]);

    // Check Scrollability
    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const updateScrollability = () => {
            if (!scrollContainer) return;

            setCanScrollLeft(scrollContainer.scrollLeft > 0);

            setCanScrollRight(
                scrollContainer.scrollLeft <
                    scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1,
            );
        };

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", updateScrollability);
        }

        updateScrollability();

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", updateScrollability);
            }
        };
    }, [dimensions, slides]);

    // Auto-scrolling
    useEffect(() => {
        if (!autoScrolling || slides.length <= 3) return;

        const startAutoScroll = () => {
            if (autoScrollInterval.current) return;
            autoScrollInterval.current = setInterval(() => {
                if (!isHovered && !isDragging) {
                    if (scrollRef.current) {
                        scrollRef.current.scrollBy({
                            left: getScrollDistance(),
                            behavior: "smooth",
                        });
                    }
                }
            }, 3000);
        };

        const stopAutoScroll = () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current);
                autoScrollInterval.current = null;
            }
        };

        startAutoScroll();
        return stopAutoScroll;
    }, [
        autoScrolling,
        isHovered,
        isDragging,
        dimensions.cardWidth,
        dimensions.fontScale,
        slideGap,
        slides.length,
    ]);

    useEffect(() => {
            const slider = scrollRef.current;
            if (!slider) return;
            const handleScroll = () => {
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                setProgress(maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0);
            };
            slider.addEventListener("scroll", handleScroll);
            return () => slider.removeEventListener("scroll", handleScroll);
        }, []);
        
    // Validate backgroundColor to prevent invalid CSS
    const getValidColor = (color) => {
        if (!color || typeof color !== "string") return "#ffffff";

        const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color); // #fff or #ffffff
        const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color); // rgb() or rgba()
        const isGradient = /gradient\((.|\s)*\)/.test(color); // linear or radial
        const isNamed = /^[a-zA-Z]+$/.test(color); // red, blue, etc.

        if (color === "transparent" || isHex || isRGB || isGradient || isNamed) {
            return color;
        }

        return "#ffffff"; // Fallback
    };

    // Get single color for fade effect (solid or first gradient stop)
    const getValidColorForFade = (color) => {
        if (!color || typeof color !== "string") return "rgba(255, 255, 255, 0.8)";
        const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
        const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color);
        const isGradient = /gradient\((.|\s)*\)/.test(color);
        const isNamed = /^[a-zA-Z]+$/.test(color);
        if (color === "transparent") return "rgba(0, 0, 0, 0)";
        if (isNamed) return color;
        if (isRGB) {
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                const [, r, g, b] = match;
                return `rgba(${r}, ${g}, ${b}, 0.8)`;
            }
        }
        if (isHex) {
            const hex = color.replace("#", "");
            const r = parseInt(
                hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2),
                16,
            );
            const g = parseInt(
                hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4),
                16,
            );
            const b = parseInt(
                hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6),
                16,
            );
            return `rgba(${r}, ${g}, ${b}, 0.8)`;
        }
        return "rgba(255, 255, 255, 0.7)";
    };

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
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				handleMouseUp();
				setIsHovered(false);
			}}
    >
      <h2
        className="px-6 font-bold text-left"
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
          onMouseUp={handleMouseUp}

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