

import React, { useRef, useState, useEffect, useCallback } from "react";

const ImageCarousel = ({ attributes = {} }) => {
  const {
    slides = [],
    slideGap ,
    backgroundColor ,
    title ,
    titleColor ,
    minSlidesToShow ,
    autoScrolling ,
    progressbarColor ,
    progressbar,
  } = attributes;

  const presetSlideHeight = 550;
  const presetSlideWidth = 400;
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [dimensions, setDimensions] = useState({
    cardWidth: presetSlideWidth,
    cardHeight: presetSlideHeight,
    fontScale: 1,
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update slide dimensions dynamically (desktop uses minSlidesToShow, small screen uses 1.5)
  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = scrollRef.current?.offsetWidth || 0;
      const fullSlideWidth = presetSlideWidth;

      const slidesToShow = window.innerWidth <= 768 ? 1.5 : minSlidesToShow;

      const baseRequiredWidth =
        fullSlideWidth * slidesToShow + (slidesToShow - 1) * slideGap;

      if (containerWidth < baseRequiredWidth && containerWidth > 0) {
        const roughAdjustedWidth = containerWidth / slidesToShow;
        const fontScale = roughAdjustedWidth / presetSlideWidth;

        const scaledGap = slideGap * fontScale;
        const totalGap = (slidesToShow - 1) * scaledGap;
        const adjustedWidth = (containerWidth - totalGap) / slidesToShow;

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

    requestAnimationFrame(updateDimensions);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);

  // scale derived from dimensions (fix: define scale)
  const scale = dimensions.fontScale || 1;

  const getScrollDistance = () =>
    dimensions.cardWidth + scale * slideGap;

  // Scroll helpers
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

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const pageX = e.pageX ?? (e.touches && e.touches[0].pageX) ?? 0;
    setStartX(pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollPosition(scrollRef.current?.scrollLeft || 0);
  };

  useEffect(() => {
    let animationFrameId = null;

    const smoothScroll = (target) => {
      if (!scrollRef.current) return;
      const start = scrollRef.current.scrollLeft;
      const change = target - start;
      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const prog = Math.min((currentTime - startTime) / 200, 1);
        const ease = prog < 0.5 ? 2 * prog * prog : -1 + (4 - 2 * prog) * prog;
        scrollRef.current.scrollLeft = start + change * ease;
        if (prog < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setScrollPosition(target);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const pageX = e.pageX ?? (e.touches && e.touches[0].pageX) ?? 0;
      const x = pageX - (scrollRef.current.offsetLeft || 0);

      const baseCardWidth = presetSlideWidth;
      const localScale = dimensions.cardWidth / baseCardWidth;
      const scrollDistance = (x - startX) * localScale;
      const target = scrollPosition - scrollDistance;
      smoothScroll(target);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: false });
      window.addEventListener("touchmove", handleMouseMove, { passive: false });
    } else {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);

  const handleMouseUp = () => setIsDragging(false);

  // Improved wheel/trackpad handling (direct apply + optional inertia)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let velocity = 0;
    let rafId = null;

    const smoothLoop = () => {
      container.scrollLeft += velocity;
      velocity *= 0.9;
      if (Math.abs(velocity) > 0.5) {
        rafId = requestAnimationFrame(smoothLoop);
      } else {
        rafId = null;
      }
    };

    const handleWheel = (e) => {
      if (!isHovered) return;
      e.preventDefault();

      // choose dominant delta and preserve direction
      const dominant = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // on many devices deltaY is negative for upward, positive for downward,
      // we want to map vertical motion -> horizontal scroll (same sign)
      velocity += dominant;
      if (!rafId) smoothLoop();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHovered]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft") scrollLeft();
      if (e.key === "ArrowRight") scrollRight();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, scrollLeft, scrollRight]);

  // Scrollability flags
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const updateScrollability = () => {
      setCanScrollLeft(scrollContainer.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1
      );
    };

    scrollContainer.addEventListener("scroll", updateScrollability);
    updateScrollability();
    return () => scrollContainer.removeEventListener("scroll", updateScrollability);
  }, [dimensions, slides]);

  // Auto-scrolling (unchanged)
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
  }, [autoScrolling, isHovered, isDragging, dimensions.cardWidth, dimensions.fontScale, slideGap, slides.length]);

  // Progress bar
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;
    const handleScroll = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      setProgress(maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0);
    };
    slider.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  // helpers
  const hexToRGBA = (hex, alpha = 1) => {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    const h = hex.replace("#", "");
    const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
    const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
    const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // styles (use scale for gaps & sizes)
  const containerStyle = {
    background: backgroundColor || "#fff",
    paddingTop: `${100 * scale}px`,
    paddingBottom: `${80 * scale}px`,
    boxSizing: "border-box",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  };

  const titleWrapperStyle = {
    textAlign: "center",
    marginBottom: `${30 * scale}px`,
  };

  const titleStyle = {
    fontSize: `${60 * scale}px`,
    margin: 0,
    fontWeight: 700,
    letterSpacing: "0.5px",
    color: "#111",
  };

  const numberStyle = {
    color: titleColor || "#6e2f73",
    marginRight: 8,
    fontWeight: 700,
  };

  const sliderOuterStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const sliderViewportStyle = {
    width: "92%",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const sliderStyle = {
    display: "flex",
    gap: `${slideGap * scale}px`, // <-- gap scales now
    overflowX: "auto",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    paddingBottom: 8 * scale,
    WebkitOverflowScrolling: "touch",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    scrollSnapType: "x mandatory",
  };

  const cardStyle = {
    minWidth: `${dimensions.cardWidth}px`, // width already computed for 1.5 mobile or desktop
    height: `${dimensions.cardHeight}px`,
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    scrollSnapAlign: "start",
  };

  const avatarWrapStyle = {
    width: Math.min(dimensions.cardWidth * 0.6, 220),
    height: Math.min(dimensions.cardWidth * 0.6, 220),
    borderRadius: "50%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    position: "relative",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const avatarImgStyle = {
    width: "92%",
    height: "92%",
    objectFit: "cover",
    borderRadius: "50%",
    border: "8px solid #fff",
    boxSizing: "border-box",
    display: "block",
  };




const quoteBadgeStyle = {
  position: "absolute",
  right: "6%", 
  bottom: "14%",
  background: "#6e2f73",
  width: `${42 * scale}px`,
  height: `${42 * scale}px`,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight:700,
//   fontSize: `${22 * scale}px`,
  lineHeight: 1,
  boxShadow: "0 6px 18px rgba(110,47,115,0.18)",
  border: "4px solid #fff",
  zIndex: 2,
};

  const nameStyle = {
    marginTop: `${24 * scale}px`,
    fontSize: `${20 * scale}px`,
    color: "#6e2f73",
    fontWeight: 600,
  };

  const textStyle = {
    marginTop: `${8 * scale}px`,
    fontSize: `${14 * scale}px`,
    color: "#666",
    maxWidth: Math.min(dimensions.cardWidth * 0.9, 420),
    textAlign: "center",
    lineHeight: 1.4,
  };

  const progressWrapStyle = {
    position: "absolute",
    left: "4%",
    right: "4%",
    bottom: `${30 * scale}px`,
    height: `${6 * scale}px`,
    background: hexToRGBA("#e6e6e6", 1),
    borderRadius: 999,
    overflow: "hidden",
  };

  const progressBarStyle = {
    height: "100%",
    width: `${progress}%`,
    background: progressbarColor || "#6e2f73",
    transition: "width 200ms linear",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        handleMouseUp();
        setIsHovered(false);
      }}
    >
      <div style={titleWrapperStyle}>
        <h2 style={titleStyle}>
          <span style={numberStyle}>{title.split(" ")[0]}</span>
          <span style={{ color: "#111", fontWeight: 700 }}>
            {title.replace(title.split(" ")[0], "").trim()}
          </span>
        </h2>
      </div>

      <div style={sliderOuterStyle}>
        <div style={sliderViewportStyle}>
          <div
            ref={scrollRef}
            style={sliderStyle}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onMouseLeave={() => {
              if (isDragging) handleMouseUp();
            }}
          >
            {slides.map((s, idx) => (
              <div key={s.id ?? idx} style={cardStyle}>
                <div style={avatarWrapStyle}>
                  <img
                    src={s.img}
                    alt={s.name || `avatar-${idx}`}
                    style={avatarImgStyle}
                    draggable={false}
                  />
                  <div style={quoteBadgeStyle} aria-hidden>
                    <span style={{ fontSize: `${31 * scale}px`, lineHeight: 2 }}>
                      “
                    </span>
                  </div>
                </div>

                <div style={nameStyle}>{s.name}</div>
                <div style={textStyle}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {progressbar && (
        <div style={progressWrapStyle} aria-hidden>
          <div style={progressBarStyle} />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
// import React, { useRef, useState, useEffect, useCallback } from "react";


//  const ImageCarousel=({ attributes  }) =>{
//   const {
//     slides = [],
//     slideGap,
//     backgroundColor ,
//     title ,
    
//     titleColor , // will apply to number part
//     minSlidesToShow  ,
//     autoScrolling ,
   
//     progressbarColor ,
//     progressbar = false,
//   } = attributes;

//   const presetSlideHeight = 550;
//   const presetSlideWidth = 400;
//   const scrollRef = useRef(null);
//   const autoScrollInterval = useRef(null);

//   const [progress, setProgress] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const [dimensions, setDimensions] = useState({
//     cardWidth: presetSlideWidth,
//     cardHeight: presetSlideHeight,
//     fontScale: 1,
//   });

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   // Update slide dimensions dynamically
//   useEffect(() => {
//     const updateDimensions = () => {
//       const containerWidth = scrollRef.current?.offsetWidth || 0;
//       const fullSlideWidth = presetSlideWidth;

//       const baseRequiredWidth =
//         fullSlideWidth * minSlidesToShow + (minSlidesToShow - 1) * slideGap;

//       if (containerWidth < baseRequiredWidth && containerWidth > 0) {
//         const roughAdjustedWidth = containerWidth / minSlidesToShow;
//         const fontScale = roughAdjustedWidth / presetSlideWidth;

//         const scaledGap = slideGap * fontScale;
//         const totalGap = (minSlidesToShow - 1) * scaledGap;
//         const adjustedWidth = (containerWidth - totalGap) / minSlidesToShow;

//         setDimensions({
//           cardWidth: adjustedWidth,
//           cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
//           fontScale,
//         });
//       } else {
//         setDimensions({
//           cardWidth: fullSlideWidth,
//           cardHeight: presetSlideHeight,
//           fontScale: 1,
//         });
//       }
//     };

//     requestAnimationFrame(updateDimensions);
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
//   }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);

//   const getScrollDistance = () =>
//     dimensions.cardWidth + dimensions.fontScale * slideGap;

//   // Scroll helpers (no visible arrow buttons used)
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

//   // Mouse/touch dragging start
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     const pageX = e.pageX ?? (e.touches && e.touches[0].pageX) ?? 0;
//     setStartX(pageX - (scrollRef.current?.offsetLeft || 0));
//     setScrollPosition(scrollRef.current?.scrollLeft || 0);
//   };

//   // Dragging move with smoothing
//   useEffect(() => {
//     let animationFrameId = null;

//     const smoothScroll = (target) => {
//       if (!scrollRef.current) return;
//       const start = scrollRef.current.scrollLeft;
//       const change = target - start;
//       let startTime = null;

//       const animate = (currentTime) => {
//         if (!startTime) startTime = currentTime;
//         const prog = Math.min((currentTime - startTime) / 200, 1);
//         const ease = prog < 0.5 ? 2 * prog * prog : -1 + (4 - 2 * prog) * prog;
//         scrollRef.current.scrollLeft = start + change * ease;
//         if (prog < 1) {
//           animationFrameId = requestAnimationFrame(animate);
//         } else {
//           setScrollPosition(target);
//         }
//       };

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     const handleMouseMove = (e) => {
//       if (!isDragging || !scrollRef.current) return;
//       e.preventDefault();
//       const pageX = e.pageX ?? (e.touches && e.touches[0].pageX) ?? 0;
//       const x = pageX - (scrollRef.current.offsetLeft || 0);

//       // scale drag by slider size
//       const baseCardWidth = presetSlideWidth;
//       const scale = dimensions.cardWidth / baseCardWidth;
//       const scrollDistance = (x - startX) * scale;
//       const target = scrollPosition - scrollDistance;
//       smoothScroll(target);
//     };

//     if (isDragging) {
//       window.addEventListener("mousemove", handleMouseMove, { passive: false });
//       window.addEventListener("touchmove", handleMouseMove, { passive: false });
//     } else {
//       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("touchmove", handleMouseMove);
//       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//     };
//   }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);

//   // stop dragging
//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Wheel / trackpad behavior

// useEffect(() => {
//   const container = scrollRef.current;
//   if (!container) return;

//   let velocity = 0;
//   let rafId = null;

//   const smoothScroll = () => {
//     container.scrollLeft += velocity;
//     velocity *= 0.9;
//     if (Math.abs(velocity) > 0.5) rafId = requestAnimationFrame(smoothScroll);
//   };

//   const handleWheel = (e) => {
//     if (!isHovered) return;
//     e.preventDefault();
//     const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
//     velocity += delta;
//     if (!rafId) smoothScroll();
//   };

//   container.addEventListener("wheel", handleWheel, { passive: false });
//   return () => {
//     container.removeEventListener("wheel", handleWheel);
//     cancelAnimationFrame(rafId);
//   };
// }, [isHovered]);

//   // Keyboard support (hovered)
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isHovered) return;
//       if (e.key === "ArrowLeft") scrollLeft();
//       if (e.key === "ArrowRight") scrollRight();
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isHovered, scrollLeft, scrollRight]);

//   // Scrollability flags
//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     const updateScrollability = () => {
//       setCanScrollLeft(scrollContainer.scrollLeft > 0);
//       setCanScrollRight(
//         scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1
//       );
//     };

//     scrollContainer.addEventListener("scroll", updateScrollability);
//     updateScrollability();
//     return () => scrollContainer.removeEventListener("scroll", updateScrollability);
//   }, [dimensions, slides]);

//   // Auto-scrolling
//   useEffect(() => {
//     if (!autoScrolling || slides.length <= 3) return;

//     const startAutoScroll = () => {
//       if (autoScrollInterval.current) return;
//       autoScrollInterval.current = setInterval(() => {
//         if (!isHovered && !isDragging) {
//           if (scrollRef.current) {
//             scrollRef.current.scrollBy({
//               left: getScrollDistance(),
//               behavior: "smooth",
//             });
//           }
//         }
//       }, 3000);
//     };

//     const stopAutoScroll = () => {
//       if (autoScrollInterval.current) {
//         clearInterval(autoScrollInterval.current);
//         autoScrollInterval.current = null;
//       }
//     };

//     startAutoScroll();
//     return stopAutoScroll;
//   }, [autoScrolling, isHovered, isDragging, dimensions.cardWidth, dimensions.fontScale, slideGap, slides.length]);

//   // progress bar update
//   useEffect(() => {
//     const slider = scrollRef.current;
//     if (!slider) return;
//     const handleScroll = () => {
//       const maxScroll = slider.scrollWidth - slider.clientWidth;
//       setProgress(maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0);
//     };
//     slider.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => slider.removeEventListener("scroll", handleScroll);
//   }, []);

//   // small helpers for colors
//   const hexToRGBA = (hex, alpha = 1) => {
//     if (!hex) return `rgba(0,0,0,${alpha})`;
//     const h = hex.replace("#", "");
//     const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
//     const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
//     const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   };

//   // Styles (inline objects)
//   const containerStyle = {
//     background: backgroundColor || "#fff",
//     paddingTop: `${100 * dimensions.fontScale}px`,
//     paddingBottom: `${80 * dimensions.fontScale}px`,
//     boxSizing: "border-box",
//     width: "100%",
//     position: "relative",
//     overflow: "hidden",
//     fontFamily: '"Helvetica Neue", Arial, sans-serif',
//   };

//   const titleWrapperStyle = {
//     textAlign: "center",
//     marginBottom: `${30 * dimensions.fontScale}px`,
//   };

//   const titleStyle = {
//     fontSize: `${60 * dimensions.fontScale}px`,
//     margin: 0,
//     fontWeight: 700,
//     letterSpacing: "0.5px",
//     color: "#111",
//   };

//   const numberStyle = {
//     color: titleColor || "#6e2f73",
//     marginRight: 8,
//     fontWeight: 700,
//   };

//   const sliderOuterStyle = {
//     display: "flex",
//     justifyContent: "center",
//   };

//   const sliderViewportStyle = {
//     width: "92%",
//     overflow: "hidden",
//     boxSizing: "border-box",
//   };

//   const sliderStyle = {
//     display: "flex",
//     gap: `${dimensions.fontScale * slideGap}px`,
//     overflowX: "auto",
//     scrollBehavior: "smooth",
//     paddingBottom: 8,
//     WebkitOverflowScrolling: "touch",
//     cursor: isDragging ? "grabbing" : "grab",
//     userSelect: "none",
//   };

//   const cardStyle = {
//     minWidth: `${dimensions.cardWidth}px`,
//     height: `${dimensions.cardHeight}px`,
//     flex: "0 0 auto",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     boxSizing: "border-box",
//   };

//   const avatarWrapStyle = {
//     width: Math.min(dimensions.cardWidth * 0.6, 220),
//     height: Math.min(dimensions.cardWidth * 0.6, 220),
//     borderRadius: "50%",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     position: "relative",
//     background: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   const avatarImgStyle = {
//     width: "92%",
//     height: "92%",
//     objectFit: "cover",
//     borderRadius: "50%",
//     border: "8px solid #fff",
//     boxSizing: "border-box",
//     display: "block",
//   };

//  const quoteBadgeStyle = {
//   position: "absolute",
//   right: -8,
//   bottom: -8,
//   background: "#6e2f73",
//   width: `${36 * dimensions.fontScale}px`,
//   height: `${36 * dimensions.fontScale}px`,
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: "#fff",
//   fontWeight: 700,
//   boxShadow: "0 6px 18px rgba(110,47,115,0.18)",
//   fontSize: `${22 * dimensions.fontScale}px`, // <-- new: scales with card size
//   lineHeight: 1,
// };


//   const nameStyle = {
//     marginTop: `${24 * dimensions.fontScale}px`,
//     fontSize: `${20 * dimensions.fontScale}px`,
//     color: "#6e2f73",
//     fontWeight: 600,
//   };

//   const textStyle = {
//     marginTop: `${8 * dimensions.fontScale}px`,
//     fontSize: `${14 * dimensions.fontScale}px`,
//     color: "#666",
//     maxWidth: Math.min(dimensions.cardWidth * 0.9, 420),
//     textAlign: "center",
//     lineHeight: 1.4,
//   };

//   const progressWrapStyle = {
//     position: "absolute",
//     left: "4%",
//     right: "4%",
//     bottom: `${30 * dimensions.fontScale}px`,
//     height: `${6 * dimensions.fontScale}px`,
//     background: hexToRGBA("#e6e6e6", 1),
//     borderRadius: 999,
//     overflow: "hidden",
//   };

//   const progressBarStyle = {
//     height: "100%",
//     width: `${progress}%`,
//     background: progressbarColor || "#6e2f73",
//     transition: "width 200ms linear",
//   };

//   // Render
//   return (
//     <div
//       style={containerStyle}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         handleMouseUp();
//         setIsHovered(false);
//       }}
//     >
//       <div style={titleWrapperStyle}>
//         {/* Mixed color title: number + text */}
//         <h2 style={titleStyle}>
//           <span style={numberStyle}>{title.split(" ")[0]}</span>
//           <span style={{ color: "#111", fontWeight: 700 }}>
//             {title.replace(title.split(" ")[0], "").trim()}
//           </span>
//         </h2>
//       </div>

//       <div style={sliderOuterStyle}>
//         <div style={sliderViewportStyle}>
//           <div
//             ref={scrollRef}
//             style={sliderStyle}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onTouchEnd={handleMouseUp}
//             onMouseLeave={() => {
//               // if dragging and pointer leaves, end drag
//               if (isDragging) handleMouseUp();
//             }}
//           >
//             {slides.map((s, idx) => (
//               <div key={s.id ?? idx} style={cardStyle}>
//                 <div style={avatarWrapStyle}>
//                   <img
//                     src={s.img}
//                     alt={s.name || `avatar-${idx}`}
//                     style={avatarImgStyle}
//                     draggable={false}
//                   />
//                   <div style={quoteBadgeStyle} aria-hidden>
//                     {/* simple quote icon */}
//                     <span style={{ fontSize: `${22 * dimensions.fontScale}px`, lineHeight: 1 }}>“</span>

//                   </div>
//                 </div>

//                 <div style={nameStyle}>{s.name}</div>
//                 <div style={textStyle}>{s.text}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* optional progress bar */}
//       {progressbar && (
//         <div style={progressWrapStyle} aria-hidden>
//           <div style={progressBarStyle} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default  ImageCarousel;

// import React, { useRef, useState, useEffect, useCallback } from "react";


//  const ImageCarousel=({ attributes  }) =>{
//   const {
//     slides = [],
//     slideGap,
//     backgroundColor ,
//     title ,
    
//     titleColor , // will apply to number part
//     minSlidesToShow  ,
//     autoScrolling ,
   
//     progressbarColor ,
//     progressbar = false,
//   } = attributes;

//   const presetSlideHeight = 550;
//   const presetSlideWidth = 400;
//   const scrollRef = useRef(null);
//   const autoScrollInterval = useRef(null);

//   const [progress, setProgress] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const [dimensions, setDimensions] = useState({
//     cardWidth: presetSlideWidth,
//     cardHeight: presetSlideHeight,
//     fontScale: 1,
//   });

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   // Update slide dimensions dynamically
// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       const containerWidth = scrollRef.current?.offsetWidth || 0;
// //       const fullSlideWidth = presetSlideWidth;

// //       const baseRequiredWidth =
// //         fullSlideWidth * minSlidesToShow + (minSlidesToShow - 1) * slideGap;

// //       if (containerWidth < baseRequiredWidth && containerWidth > 0) {
// //         const roughAdjustedWidth = containerWidth / minSlidesToShow;
// //         const fontScale = roughAdjustedWidth / presetSlideWidth;

// //         const scaledGap = slideGap * fontScale;
// //         const totalGap = (minSlidesToShow - 1) * scaledGap;
// //         const adjustedWidth = (containerWidth - totalGap) / minSlidesToShow;

// //         setDimensions({
// //           cardWidth: adjustedWidth,
// //           cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
// //           fontScale,
// //         });
// //       } else {
// //         setDimensions({
// //           cardWidth: fullSlideWidth,
// //           cardHeight: presetSlideHeight,
// //           fontScale: 1,
// //         });
// //       }
// //     };

// //     requestAnimationFrame(updateDimensions);
// //     window.addEventListener("resize", updateDimensions);
// //     return () => window.removeEventListener("resize", updateDimensions);
// //   }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);

// useEffect(() => {
//   const updateDimensions = () => {
//     const containerWidth = scrollRef.current?.offsetWidth || 0;
//     const fullSlideWidth = presetSlideWidth;

//     // 🟣 Determine slidesToShow based on screen size
//     const slidesToShow = window.innerWidth <= 768 ? 1.5 : minSlidesToShow;

//     const baseRequiredWidth =
//       fullSlideWidth * slidesToShow + (slidesToShow - 1) * slideGap;

//     if (containerWidth < baseRequiredWidth && containerWidth > 0) {
//       const roughAdjustedWidth = containerWidth / slidesToShow;
//       const fontScale = roughAdjustedWidth / presetSlideWidth;

//       const scaledGap = slideGap * fontScale;
//       const totalGap = (slidesToShow - 1) * scaledGap;
//       const adjustedWidth = (containerWidth - totalGap) / slidesToShow;

//       setDimensions({
//         cardWidth: adjustedWidth,
//         cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
//         fontScale,
//       });
//     } else {
//       setDimensions({
//         cardWidth: fullSlideWidth,
//         cardHeight: presetSlideHeight,
//         fontScale: 1,
//       });
//     }
//   };

//   requestAnimationFrame(updateDimensions);
//   window.addEventListener("resize", updateDimensions);
//   return () => window.removeEventListener("resize", updateDimensions);
// }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);

//   const getScrollDistance = () =>
//     dimensions.cardWidth + dimensions.fontScale * slideGap;

//   // Scroll helpers (no visible arrow buttons used)
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

//   // Mouse/touch dragging start
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     const pageX = e.pageX ?? (e.touches && e.touches[0].pageX) ?? 0;
//     setStartX(pageX - (scrollRef.current?.offsetLeft || 0));
//     setScrollPosition(scrollRef.current?.scrollLeft || 0);
//   };

//   // Dragging move with smoothing
//   useEffect(() => {
//     let animationFrameId = null;

//     const smoothScroll = (target) => {
//       if (!scrollRef.current) return;
//       const start = scrollRef.current.scrollLeft;
//       const change = target - start;
//       let startTime = null;

//       const animate = (currentTime) => {
//         if (!startTime) startTime = currentTime;
//         const prog = Math.min((currentTime - startTime) / 200, 1);
//         const ease = prog < 0.5 ? 2 * prog * prog : -1 + (4 - 2 * prog) * prog;
//         scrollRef.current.scrollLeft = start + change * ease;
//         if (prog < 1) {
//           animationFrameId = requestAnimationFrame(animate);
//         } else {
//           setScrollPosition(target);
//         }
//       };

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     const handleMouseMove = (e) => {
//       if (!isDragging || !scrollRef.current) return;
//       e.preventDefault();
//       const pageX = e.pageX ?? (e.touches && e.touches[0].pageX) ?? 0;
//       const x = pageX - (scrollRef.current.offsetLeft || 0);

//       // scale drag by slider size
//       const baseCardWidth = presetSlideWidth;
//       const scale = dimensions.cardWidth / baseCardWidth;
//       const scrollDistance = (x - startX) * scale;
//       const target = scrollPosition - scrollDistance;
//       smoothScroll(target);
//     };

//     if (isDragging) {
//       window.addEventListener("mousemove", handleMouseMove, { passive: false });
//       window.addEventListener("touchmove", handleMouseMove, { passive: false });
//     } else {
//       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("touchmove", handleMouseMove);
//       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//     };
//   }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);

//   // stop dragging
//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Wheel / trackpad behavior

// useEffect(() => {
//   const container = scrollRef.current;
//   if (!container) return;

//   let velocity = 0;
//   let rafId = null;

//   const smoothScroll = () => {
//     container.scrollLeft += velocity;
//     velocity *= 0.9;
//     if (Math.abs(velocity) > 0.5) rafId = requestAnimationFrame(smoothScroll);
//   };

//   const handleWheel = (e) => {
//     if (!isHovered) return;
//     e.preventDefault();
//     const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
//     velocity += delta;
//     if (!rafId) smoothScroll();
//   };

//   container.addEventListener("wheel", handleWheel, { passive: false });
//   return () => {
//     container.removeEventListener("wheel", handleWheel);
//     cancelAnimationFrame(rafId);
//   };
// }, [isHovered]);

//   // Keyboard support (hovered)
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isHovered) return;
//       if (e.key === "ArrowLeft") scrollLeft();
//       if (e.key === "ArrowRight") scrollRight();
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isHovered, scrollLeft, scrollRight]);

//   // Scrollability flags
//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     const updateScrollability = () => {
//       setCanScrollLeft(scrollContainer.scrollLeft > 0);
//       setCanScrollRight(
//         scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1
//       );
//     };

//     scrollContainer.addEventListener("scroll", updateScrollability);
//     updateScrollability();
//     return () => scrollContainer.removeEventListener("scroll", updateScrollability);
//   }, [dimensions, slides]);

//   // Auto-scrolling
//   useEffect(() => {
//     if (!autoScrolling || slides.length <= 3) return;

//     const startAutoScroll = () => {
//       if (autoScrollInterval.current) return;
//       autoScrollInterval.current = setInterval(() => {
//         if (!isHovered && !isDragging) {
//           if (scrollRef.current) {
//             scrollRef.current.scrollBy({
//               left: getScrollDistance(),
//               behavior: "smooth",
//             });
//           }
//         }
//       }, 3000);
//     };

//     const stopAutoScroll = () => {
//       if (autoScrollInterval.current) {
//         clearInterval(autoScrollInterval.current);
//         autoScrollInterval.current = null;
//       }
//     };

//     startAutoScroll();
//     return stopAutoScroll;
//   }, [autoScrolling, isHovered, isDragging, dimensions.cardWidth, dimensions.fontScale, slideGap, slides.length]);

//   // progress bar update
//   useEffect(() => {
//     const slider = scrollRef.current;
//     if (!slider) return;
//     const handleScroll = () => {
//       const maxScroll = slider.scrollWidth - slider.clientWidth;
//       setProgress(maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0);
//     };
//     slider.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => slider.removeEventListener("scroll", handleScroll);
//   }, []);

//   // small helpers for colors
//   const hexToRGBA = (hex, alpha = 1) => {
//     if (!hex) return `rgba(0,0,0,${alpha})`;
//     const h = hex.replace("#", "");
//     const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
//     const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
//     const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   };

//   // Styles (inline objects)
//   const containerStyle = {
//     background: backgroundColor || "#fff",
//     paddingTop: `${100 * dimensions.fontScale}px`,
//     paddingBottom: `${80 * dimensions.fontScale}px`,
//     boxSizing: "border-box",
//     width: "100%",
//     position: "relative",
//     overflow: "hidden",
//     fontFamily: '"Helvetica Neue", Arial, sans-serif',
//   };

//   const titleWrapperStyle = {
//     textAlign: "center",
//     marginBottom: `${30 * dimensions.fontScale}px`,
//   };

//   const titleStyle = {
//     fontSize: `${60 * dimensions.fontScale}px`,
//     margin: 0,
//     fontWeight: 700,
//     letterSpacing: "0.5px",
//     color: "#111",
//   };

//   const numberStyle = {
//     color: titleColor || "#6e2f73",
//     marginRight: 8,
//     fontWeight: 700,
//   };

//   const sliderOuterStyle = {
//     display: "flex",
//     justifyContent: "center",
//   };

//   const sliderViewportStyle = {
//     width: "92%",
//     overflow: "hidden",
//     boxSizing: "border-box",
//   };

//   const sliderStyle = {
//     display: "flex",
//     // gap: `${dimensions.fontScale * slideGap}px`,
//     gap: `${30 * dimensions.fontScale}px`,
//     overflowX: "auto",
//     scrollBehavior: "smooth",
//     paddingBottom: 8,
//     WebkitOverflowScrolling: "touch",
//     cursor: isDragging ? "grabbing" : "grab",
//     userSelect: "none",
//   };

//   const cardStyle = {
//     minWidth: `${dimensions.cardWidth}px`,
//     height: `${dimensions.cardHeight}px`,
//     flex: "0 0 auto",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     boxSizing: "border-box",
//   };

//   const avatarWrapStyle = {
//     width: Math.min(dimensions.cardWidth * 0.6, 220),
//     height: Math.min(dimensions.cardWidth * 0.6, 220),
//     borderRadius: "50%",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     position: "relative",
//     background: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   const avatarImgStyle = {
//     width: "92%",
//     height: "92%",
//     objectFit: "cover",
//     borderRadius: "50%",
//     border: "8px solid #fff",
//     boxSizing: "border-box",
//     display: "block",
//   };

//  const quoteBadgeStyle = {
//   position: "absolute",
//   right: -8,
//   bottom: -8,
//   background: "#6e2f73",
//   width: `${36 * dimensions.fontScale}px`,
//   height: `${36 * dimensions.fontScale}px`,
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: "#fff",
//   fontWeight: 700,
//   boxShadow: "0 6px 18px rgba(110,47,115,0.18)",
//   fontSize: `${22 * dimensions.fontScale}px`, // <-- new: scales with card size
//   lineHeight: 1,
// };


//   const nameStyle = {
//     marginTop: `${24 * dimensions.fontScale}px`,
//     fontSize: `${20 * dimensions.fontScale}px`,
//     color: "#6e2f73",
//     fontWeight: 600,
//   };

//   const textStyle = {
//     marginTop: `${8 * dimensions.fontScale}px`,
//     fontSize: `${14 * dimensions.fontScale}px`,
//     color: "#666",
//     maxWidth: Math.min(dimensions.cardWidth * 0.9, 420),
//     textAlign: "center",
//     lineHeight: 1.4,
//   };

//   const progressWrapStyle = {
//     position: "absolute",
//     left: "4%",
//     right: "4%",
//     bottom: `${30 * dimensions.fontScale}px`,
//     height: `${6 * dimensions.fontScale}px`,
//     background: hexToRGBA("#e6e6e6", 1),
//     borderRadius: 999,
//     overflow: "hidden",
//   };

//   const progressBarStyle = {
//     height: "100%",
//     width: `${progress}%`,
//     background: progressbarColor || "#6e2f73",
//     transition: "width 200ms linear",
//   };

//   // Render
//   return (
//     <div
//       style={containerStyle}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         handleMouseUp();
//         setIsHovered(false);
//       }}
//     >
//       <div style={titleWrapperStyle}>
//         {/* Mixed color title: number + text */}
//         <h2 style={titleStyle}>
//           <span style={numberStyle}>{title.split(" ")[0]}</span>
//           <span style={{ color: "#111", fontWeight: 700 }}>
//             {title.replace(title.split(" ")[0], "").trim()}
//           </span>
//         </h2>
//       </div>

//       <div style={sliderOuterStyle}>
//         <div style={sliderViewportStyle}>
//           <div
//             ref={scrollRef}
//             style={sliderStyle}
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onTouchEnd={handleMouseUp}
//             onMouseLeave={() => {
//               // if dragging and pointer leaves, end drag
//               if (isDragging) handleMouseUp();
//             }}
//           >
//             {slides.map((s, idx) => (
//               <div key={s.id ?? idx} style={cardStyle}>
//                 <div style={avatarWrapStyle}>
//                   <img
//                     src={s.img}
//                     alt={s.name || `avatar-${idx}`}
//                     style={avatarImgStyle}
//                     draggable={false}
//                   />
//                   <div style={quoteBadgeStyle} aria-hidden>
//                     {/* simple quote icon */}
//                     <span style={{ fontSize: `${22 * dimensions.fontScale}px`, lineHeight: 1 }}>“</span>

//                   </div>
//                 </div>

//                 <div style={nameStyle}>{s.name}</div>
//                 <div style={textStyle}>{s.text}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* optional progress bar */}
//       {progressbar && (
//         <div style={progressWrapStyle} aria-hidden>
//           <div style={progressBarStyle} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default  ImageCarousel;
