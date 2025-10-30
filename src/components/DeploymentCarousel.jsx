


import React, { useRef, useState, useEffect, useCallback } from "react";

const DeploymentCarousel = ({ attributes }) => {
  const {
    titleOne,
    titleOneColor,
    titleTwo,
    titleTwoColor,
    caption,
    captionColor,
    slides = [],
  } = attributes;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;
  const scale = Math.min(1, Math.max(0.6, windowWidth / 1400)); // scale between 0.6–1

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  const cardWidth = 440 * scale;
  const gap = 40 * scale;
  const carouselPadding = 60 * scale;
  const transitionDuration = 500;

  const [isTeleporting, setIsTeleporting] = useState(false);
  const totalSlides = slides.length;
  const duplicatedSlides = 3;
  const initialActiveIndex = totalSlides;
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const scrollRef = useRef(null);
  const scrollDebounceTimeout = useRef(null);

  const slidesToRender = [
    ...slides.slice(totalSlides - duplicatedSlides),
    ...slides,
    ...slides.slice(0, duplicatedSlides),
  ];
  const totalRenderedSlides = slidesToRender.length;

  
  const scrollTo = (index, behavior = "smooth") => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    const scrollAmount =
      index * (cardWidth + gap) -
      (containerWidth - cardWidth) / 2 +
      carouselPadding;

    scrollRef.current.scrollTo({
      left: scrollAmount,
      behavior,
    });
  };

  const handleTeleportation = useCallback(
    (index) => {
      const isWrapStart = index < duplicatedSlides;
      const isWrapEnd = index >= totalSlides + duplicatedSlides;

      if (isWrapStart || isWrapEnd) {
        setIsTeleporting(true);
        setTimeout(() => {
          let newIndex = index;
          if (isWrapEnd) newIndex = index - totalSlides;
          else if (isWrapStart) newIndex = index + totalSlides;

          scrollTo(newIndex, "auto");
          setActiveIndex(newIndex);

          setTimeout(() => setIsTeleporting(false), 50);
        }, transitionDuration);
      }
    },
    [totalSlides, duplicatedSlides, transitionDuration, scrollTo]
  );

  const scrollToActive = useCallback(
    (index) => {
      if (isTeleporting) return;
      scrollTo(index, "smooth");
      handleTeleportation(index);
    },
    [isTeleporting, scrollTo, handleTeleportation]
  );

  const handleScroll = useCallback(() => {
    if (scrollDebounceTimeout.current) clearTimeout(scrollDebounceTimeout.current);
    scrollDebounceTimeout.current = setTimeout(() => {
      if (!scrollRef.current || isTeleporting) return;

      const scrollX = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.offsetWidth;
      const centerScrollPosition = scrollX - carouselPadding + containerWidth / 2;
      const centerIndex = Math.round(centerScrollPosition / (cardWidth + gap));
      const newIndex = Math.max(0, Math.min(centerIndex, totalRenderedSlides - 1));

      setActiveIndex(newIndex);
      if (
        Math.abs(
          scrollX -
            (newIndex * (cardWidth + gap) - (containerWidth - cardWidth) / 2 + carouselPadding)
        ) < 10
      ) {
        handleTeleportation(newIndex);
      }
    }, 100);
  }, [cardWidth, gap, carouselPadding, totalRenderedSlides, isTeleporting, handleTeleportation]);

  const handlePrev = () => scrollToActive(activeIndex - 1);
  const handleNext = () => scrollToActive(activeIndex + 1);

  const handleDragEnd = () => {
    if (isTeleporting) return;
    const scrollX = scrollRef.current.scrollLeft;
    const containerWidth = scrollRef.current.offsetWidth;
    const index = Math.round(
      (scrollX - carouselPadding + (containerWidth - cardWidth) / 2) / (cardWidth + gap)
    );
    const finalIndex = Math.max(0, Math.min(index, totalRenderedSlides - 1));
    scrollTo(finalIndex, "smooth");
    setActiveIndex(finalIndex);
    handleTeleportation(finalIndex);
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTeleporting) handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isTeleporting, handleNext]);

  useEffect(() => {
    scrollTo(initialActiveIndex, "auto");
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex, scale]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollElement) scrollElement.removeEventListener("scroll", handleScroll);
      if (scrollDebounceTimeout.current) clearTimeout(scrollDebounceTimeout.current);
    };
  }, [handleScroll]);

  // --- Styles ---
  const scrollId = "deployment-carousel-scroll-track";
  const webkitScrollbarStyles = `
    #${scrollId}::-webkit-scrollbar { display: none; width: 0 !important; height: 0 !important; }
  `;

  const arrowButtonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    borderRadius: "50%",
    width: `${48 * scale}px`,
    height: `${48 * scale}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    transition: "background-color 0.3s ease",
    border: "none",
    zIndex: 10,
    fontSize: `${24 * scale}px`,
    fontWeight: "bold",
  };

  const arrowHoverStyle = "rgba(255, 255, 255, 0.2)";
const horizontalPadding = Math.max(0, 350 * (scale - 0.6) / (1 - 0.6));

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: `${40 * scale}px`,
        paddingBottom: `${96 * scale}px`,
        background: "radial-gradient(circle at top, #181831, #0d0d20)",
        color: "#fff",
      }}
    >
      <style>{webkitScrollbarStyles}</style>

      {/* Headings */}
      <div
        style={{
          textAlign: "center",
          marginBottom: `${20 * scale}px`,
          paddingLeft: `${24 * scale}px`,
          paddingRight: `${24 * scale}px`,
        }}
      >
        <h2
          style={{           
            fontSize: `${(isMobile ? 40 : 48) * scale}px`,
            fontWeight: "600",
            lineHeight: "1.25",
            color: titleOneColor,
          }}
        >
          {titleOne}
        </h2>
        <h2
          style={{
            fontSize: `${48 * scale}px`,
            fontWeight: "600",
            lineHeight: "1.25",
            color: titleTwoColor,
          }}
        >
          {titleTwo}
        </h2>
        <p
          style={{
            fontSize: `${20 * scale}px`,
            marginTop: `${16 * scale}px`,
            color: captionColor,
            maxWidth: `${700 * scale}px`,
            margin: `${16 * scale}px auto 0 auto`,
          }}
        >
          {caption}
        </p>
      </div>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
        padding: `${10 * scale}px ${horizontalPadding}px`

        }}
      >
        <div
          id={scrollId}
          ref={scrollRef}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          style={{
            display: "flex",
            minHeight: `${400 * scale}px`,
            overflowX: "scroll",
            overflowY: "visible",
            alignItems: "center",
            scrollBehavior: isTeleporting ? "auto" : "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: `${gap}px`,
            paddingLeft: `${carouselPadding}px`,
            paddingRight: `${carouselPadding}px`,
            scrollSnapType: isTeleporting ? "none" : "x mandatory",
          }}
        >
          {slidesToRender.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: `${24 * scale}px`,
                  padding: `${20 * scale}px`,
                  transition: "all 0.5s ease",
                  width: `${cardWidth}px`,
                  // height: `${250 * scale}px`,
                  height:`${(isMobile ? 340 : 250) * scale}px`,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${item.borderColor || "rgba(255,255,255,0.1)"}`,
                  boxShadow: isActive
                    ? "0px 0px 50px rgba(139,92,246,0.8)"
                    : "0px 0px 20px rgba(0,0,0,0.2)",
                  transform: isActive ? "scale(1.1)" : "scale(0.9)",
                  transformOrigin: "center center",
                  opacity: isActive ? 1 : 0.6,
                  backdropFilter: "blur(10px)",
                  zIndex: isActive ? 2 : 1,
                }}
              >
                <h3
                  style={{
                    fontSize: `${25 * scale}px`,
                    fontWeight: "600",
                    marginBottom: `${15 * scale}px`,
                    
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    // fontSize: `${15 * scale}px`,
                    fontSize: `${(isMobile ? 20 : 15) * scale}px`,
                    color: "rgb(209, 213, 219)",
                    marginBottom: `${24 * scale}px`,
                    maxWidth: `${256 * scale}px`,
                  }}
                >
                  {item.description}
                </p>
                <button
                  style={{
                    color: "white",
                    fontWeight: "500",
                    padding: `${8 * scale}px ${24 * scale}px`,
                    borderRadius: "9999px",
                    transition: "all 0.3s ease",
                    boxShadow:
                      "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                    background: item.buttonColor,
                    border: "none",
                    cursor: "pointer",
                    fontSize: `${(isMobile ? 22 : 18) * scale}px`,
                    
                    marginBottom:`${20 * scale}px`,
                  }}
                >
                  {item.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots + Arrows */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: `${10 * scale}px`,
          gap: `${24 * scale}px`,
        }}
      >
        <button
          onClick={handlePrev}
          disabled={isTeleporting}
          style={{
            ...arrowButtonStyle,
            cursor: isTeleporting ? "not-allowed" : "pointer",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = isTeleporting
              ? "rgba(255,255,255,0.1)"
              : arrowHoverStyle)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")
          }
        >
          &lt;
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: `${12 * scale}px`,
          }}
        >
          {slides.map((_, index) => {
            const mappedIndex =
              (activeIndex - duplicatedSlides + totalSlides * 2) % totalSlides;
            return (
              <div
                key={index}
                onClick={() => scrollToActive(index + duplicatedSlides)}
                style={{
                  width: `${12 * scale}px`,
                  height: `${12 * scale}px`,
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  backgroundColor:
                    mappedIndex === index
                      ? "rgb(139, 92, 246)"
                      : "rgba(107,114,128,0.5)",
                  transform:
                    mappedIndex === index
                      ? `scale(${1.25 * scale})`
                      : `scale(${1 * scale})`,
                }}
              ></div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={isTeleporting}
          style={{
            ...arrowButtonStyle,
            cursor: isTeleporting ? "not-allowed" : "pointer",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = isTeleporting
              ? "rgba(255,255,255,0.1)"
              : arrowHoverStyle)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default DeploymentCarousel;







// import React, { useRef, useState, useEffect, useCallback } from "react";

// const DeploymentCarousel = ({ attributes }) => {
//     const {
//         titleOne,
//         titleOneColor,
//         titleTwo,
//         titleTwoColor,
//         caption,
//         captionColor,
//         slides = [],
//     } = attributes;

//     // --- Constants and State ---
//     const [isTeleporting, setIsTeleporting] = useState(false);
//     const totalSlides = slides.length;
//     const duplicatedSlides = 3;
//     const initialActiveIndex = totalSlides;
//     const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
//     const scrollRef = useRef(null);
//     const cardWidth = 400;
//     const gap = 40;
//     const carouselPadding = 60;
//     const transitionDuration = 500;

//     // Array with duplicates
//     const slidesToRender = [
//         ...slides.slice(totalSlides - duplicatedSlides),
//         ...slides,
//         ...slides.slice(0, duplicatedSlides),
//     ];
//     const totalRenderedSlides = slidesToRender.length;
//     const scrollDebounceTimeout = useRef(null); 

   

//     const scrollTo = (index, behavior = "smooth") => {
//         if (!scrollRef.current) return;
//         const containerWidth = scrollRef.current.offsetWidth;

//         const scrollAmount =
//             index * (cardWidth + gap) -
//             (containerWidth - cardWidth) / 2 +
//             carouselPadding;

//         scrollRef.current.scrollTo({
//             left: scrollAmount,
//             behavior: behavior,
//         });
//     };

//     const handleTeleportation = useCallback((index) => {
//         const isWrapStart = index < duplicatedSlides;
//         const isWrapEnd = index >= totalSlides + duplicatedSlides;

//         if (isWrapStart || isWrapEnd) {
//             setIsTeleporting(true);

//             setTimeout(() => {
//                 let newIndex = index;
//                 if (isWrapEnd) {
//                     newIndex = index - totalSlides;
//                 } else if (isWrapStart) {
//                     newIndex = index + totalSlides;
//                 }

//                 scrollTo(newIndex, "auto");
//                 setActiveIndex(newIndex);

//                 setTimeout(() => {
//                     setIsTeleporting(false);
//                 }, 50);

//             }, transitionDuration);
//         }
//     }, [totalSlides, duplicatedSlides, transitionDuration, scrollTo, setActiveIndex]);

//     const scrollToActive = useCallback(
//         (index) => {
//             if (isTeleporting) return;

//             scrollTo(index, "smooth");
//             handleTeleportation(index);
//         },
//         [isTeleporting, scrollTo, handleTeleportation]
//     );

//     // Dynamic scroll handler
//     const handleScroll = useCallback(() => {
//         if (scrollDebounceTimeout.current) {
//             clearTimeout(scrollDebounceTimeout.current);
//         }

//         // Debounce the continuous scroll event to prevent performance issues
//         scrollDebounceTimeout.current = setTimeout(() => {
//             if (!scrollRef.current || isTeleporting) return;

//             const scrollX = scrollRef.current.scrollLeft;
//             const containerWidth = scrollRef.current.offsetWidth;

//             const centerScrollPosition = scrollX - carouselPadding + (containerWidth / 2);
//             const centerIndex = Math.round(centerScrollPosition / (cardWidth + gap));

//             const newIndex = Math.max(0, Math.min(centerIndex, totalRenderedSlides - 1));
//             setActiveIndex(newIndex);

//             if (Math.abs(scrollX - (newIndex * (cardWidth + gap) - (containerWidth - cardWidth) / 2 + carouselPadding)) < 10) {
//                 handleTeleportation(newIndex);
//             }
//         }, 100); // Debounce time (100ms)

//     }, [cardWidth, gap, carouselPadding, totalRenderedSlides, isTeleporting, handleTeleportation]);

//     // --- Navigation Handlers (Unchanged) ---

//     const handlePrev = () => {
//         scrollToActive(activeIndex - 1);
//     };

//     const handleNext = () => {
//         scrollToActive(activeIndex + 1);
//     };

//     // Auto-snap on drag end
//     const handleDragEnd = () => {
//         if (isTeleporting) return;

//         const scrollX = scrollRef.current.scrollLeft;
//         const containerWidth = scrollRef.current.offsetWidth;
//         const index = Math.round(
//             (scrollX - carouselPadding + (containerWidth - cardWidth) / 2) /
//             (cardWidth + gap)
//         );

//         const finalIndex = Math.max(0, Math.min(index, totalRenderedSlides - 1));
//         scrollTo(finalIndex, "smooth");
//         setActiveIndex(finalIndex);

//         handleTeleportation(finalIndex);
//     };

//     // Auto-scroll, Initial center align, and Event Listeners (Unchanged)
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (!isTeleporting) {
//                 handleNext();
//             }
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [activeIndex, totalRenderedSlides, isTeleporting, handleNext]);

//     useEffect(() => {
//         scrollTo(initialActiveIndex, "auto");
//         setActiveIndex(initialActiveIndex);
//     }, [initialActiveIndex]);

//     useEffect(() => {
//         const scrollElement = scrollRef.current;
//         if (scrollElement) {
//             scrollElement.addEventListener('scroll', handleScroll);
//         }

//         return () => {
//             if (scrollElement) {
//                 scrollElement.removeEventListener('scroll', handleScroll);
//             }
//             if (scrollDebounceTimeout.current) {
//                 clearTimeout(scrollDebounceTimeout.current);
//             }
//         };
//     }, [handleScroll]);

//     // Unique ID and Arrow Styles (Unchanged)
//     const scrollId = "deployment-carousel-scroll-track";

//     const webkitScrollbarStyles = `
//     #${scrollId}::-webkit-scrollbar {
//       display: none;
//       width: 0 !important;
//       height: 0 !important;
//     }
//   `;

//     const arrowButtonStyle = {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         color: "white",
//         borderRadius: "50%",
//         width: "48px",
//         height: "48px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backdropFilter: "blur(4px)",
//         transition: "background-color 0.3s ease",
//         border: "none",
//         zIndex: 10,
//         fontSize: "24px",
//         fontWeight: "bold"
//     };

//     const arrowHoverStyle = "rgba(255, 255, 255, 0.2)";

//     return (
//         <div
//             style={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 paddingTop: "40px",
//                 paddingBottom: "96px",
//                 background: "radial-gradient(circle at top, #181831, #0d0d20)",
//                 color: "#fff",
//             }}
//         >
//             <style>{webkitScrollbarStyles}</style>

//             {/* Headings (Unchanged) */}
//             <div
//                 style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     paddingLeft: "24px",
//                     paddingRight: "24px",
//                 }}
//             >
//                 <h2
//                     style={{
//                         fontSize: "48px",
//                         fontWeight: "600",
//                         lineHeight: "1.25",
//                         color: titleOneColor,
//                     }}
//                 >
//                     {titleOne}
//                 </h2>
//                 <h2
//                     style={{
//                         fontSize: "48px",
//                         fontWeight: "600",
//                         lineHeight: "1.25",
//                         color: titleTwoColor,
//                     }}
//                 >
//                     {titleTwo}
//                 </h2>
//                 <p
//                     style={{
//                         fontSize: "18px",
//                         marginTop: "16px",
//                         color: captionColor,
//                         maxWidth: "700px",
//                         margin: "16px auto 0 auto",
//                     }}
//                 >
//                     {caption}
//                 </p>
//             </div>

//             {/* Carousel Track Container */}
//             <div
//                 style={{
//                     position: "relative",
//                     width: "100%",

//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "visible",
//                     padding: "10px 350px",


//                 }}
//             >
//                 {/* Scrollable Track */}
//                 <div
//                     id={scrollId}
//                     ref={scrollRef}
//                     onMouseUp={handleDragEnd}
//                     onTouchEnd={handleDragEnd}
//                     style={{
//                         display: "flex",
//                         minHeight: "400px",
//                         overflowX: "scroll",
//                         overflowY: "visible",

//                         alignItems: "center",
//                         scrollBehavior: isTeleporting ? "auto" : "smooth",
//                         scrollbarWidth: "none",
//                         msOverflowStyle: "none",
//                         gap: `${gap}px`,
//                         paddingLeft: `${carouselPadding}px`,
//                         paddingRight: `${carouselPadding}px`,
//                         scrollSnapType: isTeleporting ? "none" : "x mandatory",
//                     }}
//                 >
//                     {slidesToRender.map((item, index) => {
//                         const isActive = activeIndex === index;

//                         return (
//                             <div
//                                 key={index}
//                                 style={{
//                                     flexShrink: 0,
//                                     scrollSnapAlign: "center",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     textAlign: "center",
//                                     borderRadius: "24px",
//                                     padding: "40px",
//                                     transition: "all 0.5s ease",
//                                     width: `${cardWidth}px`,

//                                     height: "250px",
//                                     background: "rgba(255,255,255,0.05)",
//                                     border: `1px ${item.borderColor || "rgba(255,255,255,0.1)"
//                                         } solid`,

//                                     boxShadow: isActive
//                                         ? "0px 0px 50px rgba(139,92,246,0.8)"
//                                         : "0px 0px 20px rgba(0,0,0,0.2)",
//                                     transform: isActive ? "scale(1.1)" : "scale(0.9)",
//                                     transformOrigin: "center center",
//                                     opacity: isActive ? 1 : 0.6,
//                                     backdropFilter: "blur(10px)",
//                                     zIndex: isActive ? 2 : 1,
//                                 }}
//                             >
//                                 <h3
//                                     style={{
//                                         fontSize: "24px",
//                                         fontWeight: "600",
//                                         marginBottom: "12px",
//                                     }}
//                                 >
//                                     {item.title}
//                                 </h3>
//                                 <p
//                                     style={{
//                                         fontSize: "14px",
//                                         color: "rgb(209, 213, 219)",
//                                         marginBottom: "24px",
//                                         maxWidth: "256px",
//                                     }}
//                                 >
//                                     {item.description}
//                                 </p>
//                                 <button
//                                     style={{
//                                         color: "white",
//                                         fontWeight: "500",
//                                         paddingTop: "8px",
//                                         paddingBottom: "8px",
//                                         paddingLeft: "24px",
//                                         paddingRight: "24px",
//                                         borderRadius: "9999px",
//                                         transition: "all 0.3s ease",
//                                         boxShadow:
//                                             "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//                                         background: item.buttonColor,
//                                         border: "none",
//                                         cursor: "pointer",
//                                     }}
//                                 >
//                                     {item.buttonText}
//                                 </button>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* NEW NAVIGATION CONTAINER (Dots + Arrows) (Unchanged) */}
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: "10px",
//                     gap: "24px",
//                 }}
//             >
//                 {/* Left Arrow Button */}
//                 <button
//                     onClick={handlePrev}
//                     disabled={isTeleporting}
//                     style={{
//                         ...arrowButtonStyle,
//                         cursor: isTeleporting ? "not-allowed" : "pointer",
//                     }}
//                     onMouseOver={(e) =>
//                         (e.currentTarget.style.backgroundColor = isTeleporting ? "rgba(255, 255, 255, 0.1)" : arrowHoverStyle)
//                     }
//                     onMouseOut={(e) =>
//                         (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
//                     }
//                 >
//                     &lt;
//                 </button>

//                 {/* Dots */}
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "12px",
//                     }}
//                 >
//                     {slides.map((_, index) => {
//                         const mappedIndex = (activeIndex - duplicatedSlides + totalSlides * 2) % totalSlides;

//                         return (
//                             <div
//                                 key={index}
//                                 onClick={() => scrollToActive(index + duplicatedSlides)}
//                                 style={{
//                                     width: "12px",
//                                     height: "12px",
//                                     borderRadius: "50%",
//                                     transition: "all 0.3s ease",
//                                     cursor: "pointer",
//                                     backgroundColor:
//                                         mappedIndex === index
//                                             ? "rgb(139, 92, 246)"
//                                             : "rgba(107, 114, 128, 0.5)",
//                                     transform: mappedIndex === index ? "scale(1.25)" : "scale(1)",
//                                 }}
//                             ></div>
//                         );
//                     })}
//                 </div>

//                 {/* Right Arrow Button */}
//                 <button
//                     onClick={handleNext}
//                     disabled={isTeleporting}
//                     style={{
//                         ...arrowButtonStyle,
//                         cursor: isTeleporting ? "not-allowed" : "pointer",
//                     }}
//                     onMouseOver={(e) =>
//                         (e.currentTarget.style.backgroundColor = isTeleporting ? "rgba(255, 255, 255, 0.1)" : arrowHoverStyle)
//                     }
//                     onMouseOut={(e) =>
//                         (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
//                     }
//                 >
//                     &gt;
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DeploymentCarousel;


// import React, { useRef, useState, useEffect, useCallback } from "react";

// const DeploymentCarousel = ({ attributes }) => {
//     const {
//         titleOne,
//         titleOneColor,
//         titleTwo,
//         titleTwoColor,
//         caption,
//         captionColor,
//         slides = [],
//     } = attributes;

//     // --- Responsive Scale ---
//     const [scale, setScale] = useState(1);

//     useEffect(() => {
//         const updateScale = () => {
//             const baseWidth = 1440; // design width
//             const newScale = Math.max(0.6, Math.min(window.innerWidth / baseWidth, 1)); 
//             setScale(newScale);
//         };
//         updateScale();
//         window.addEventListener("resize", updateScale);
//         return () => window.removeEventListener("resize", updateScale);
//     }, []);

//     // --- Constants and State ---
//     const [isTeleporting, setIsTeleporting] = useState(false);
//     const totalSlides = slides.length;
//     const duplicatedSlides = 3;
//     const initialActiveIndex = totalSlides;
//     const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
//     const scrollRef = useRef(null);
//     const cardWidth = 400 * scale;
//     const gap = 40 * scale;
//     const carouselPadding = 60 * scale;
//     const transitionDuration = 500;

//     // Duplicated slides for infinite loop
//     const slidesToRender = [
//         ...slides.slice(totalSlides - duplicatedSlides),
//         ...slides,
//         ...slides.slice(0, duplicatedSlides),
//     ];
//     const totalRenderedSlides = slidesToRender.length;
//     const scrollDebounceTimeout = useRef(null);

//     // --- Scroll Functions ---
//     const scrollTo = (index, behavior = "smooth") => {
//         if (!scrollRef.current) return;
//         const containerWidth = scrollRef.current.offsetWidth;
//         const scrollAmount =
//             index * (cardWidth + gap) -
//             (containerWidth - cardWidth) / 2 +
//             carouselPadding;

//         scrollRef.current.scrollTo({
//             left: scrollAmount,
//             behavior,
//         });
//     };

//     const handleTeleportation = useCallback(
//         (index) => {
//             const isWrapStart = index < duplicatedSlides;
//             const isWrapEnd = index >= totalSlides + duplicatedSlides;
//             if (isWrapStart || isWrapEnd) {
//                 setIsTeleporting(true);
//                 setTimeout(() => {
//                     let newIndex = index;
//                     if (isWrapEnd) newIndex = index - totalSlides;
//                     else if (isWrapStart) newIndex = index + totalSlides;

//                     scrollTo(newIndex, "auto");
//                     setActiveIndex(newIndex);
//                     setTimeout(() => setIsTeleporting(false), 50);
//                 }, transitionDuration);
//             }
//         },
//         [totalSlides, duplicatedSlides, transitionDuration]
//     );

//     const scrollToActive = useCallback(
//         (index) => {
//             if (isTeleporting) return;
//             scrollTo(index, "smooth");
//             handleTeleportation(index);
//         },
//         [isTeleporting, scrollTo, handleTeleportation]
//     );

//     const handleScroll = useCallback(() => {
//         if (scrollDebounceTimeout.current)
//             clearTimeout(scrollDebounceTimeout.current);

//         scrollDebounceTimeout.current = setTimeout(() => {
//             if (!scrollRef.current || isTeleporting) return;
//             const scrollX = scrollRef.current.scrollLeft;
//             const containerWidth = scrollRef.current.offsetWidth;
//             const centerScrollPosition =
//                 scrollX - carouselPadding + containerWidth / 2;
//             const centerIndex = Math.round(
//                 centerScrollPosition / (cardWidth + gap)
//             );

//             const newIndex = Math.max(
//                 0,
//                 Math.min(centerIndex, totalRenderedSlides - 1)
//             );
//             setActiveIndex(newIndex);
//             if (
//                 Math.abs(
//                     scrollX -
//                         (newIndex * (cardWidth + gap) -
//                             (containerWidth - cardWidth) / 2 +
//                             carouselPadding)
//                 ) < 10
//             ) {
//                 handleTeleportation(newIndex);
//             }
//         }, 100);
//     }, [cardWidth, gap, carouselPadding, totalRenderedSlides, isTeleporting, handleTeleportation]);

//     // --- Navigation ---
//     const handlePrev = () => scrollToActive(activeIndex - 1);
//     const handleNext = () => scrollToActive(activeIndex + 1);

//     const handleDragEnd = () => {
//         if (isTeleporting) return;
//         const scrollX = scrollRef.current.scrollLeft;
//         const containerWidth = scrollRef.current.offsetWidth;
//         const index = Math.round(
//             (scrollX - carouselPadding + (containerWidth - cardWidth) / 2) /
//                 (cardWidth + gap)
//         );
//         const finalIndex = Math.max(0, Math.min(index, totalRenderedSlides - 1));
//         scrollTo(finalIndex, "smooth");
//         setActiveIndex(finalIndex);
//         handleTeleportation(finalIndex);
//     };

//     // --- Effects ---
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (!isTeleporting) handleNext();
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [activeIndex, totalRenderedSlides, isTeleporting]);

//     useEffect(() => {
//         scrollTo(initialActiveIndex, "auto");
//         setActiveIndex(initialActiveIndex);
//     }, [initialActiveIndex, scale]);

//     useEffect(() => {
//         const scrollElement = scrollRef.current;
//         if (scrollElement)
//             scrollElement.addEventListener("scroll", handleScroll);
//         return () => {
//             if (scrollElement)
//                 scrollElement.removeEventListener("scroll", handleScroll);
//             if (scrollDebounceTimeout.current)
//                 clearTimeout(scrollDebounceTimeout.current);
//         };
//     }, [handleScroll]);

//     // --- Styles ---
//     const scrollId = "deployment-carousel-scroll-track";
//     const arrowButtonStyle = {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         color: "white",
//         borderRadius: "50%",
//         width: 48 * scale,
//         height: 48 * scale,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backdropFilter: "blur(4px)",
//         transition: "background-color 0.3s ease",
//         border: "none",
//         zIndex: 10,
//         fontSize: 24 * scale,
//         fontWeight: "bold",
//     };

//     return (
//         <div
//             style={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 paddingTop: 40 * scale,
//                 paddingBottom: 96 * scale,
//                 background: "radial-gradient(circle at top, #181831, #0d0d20)",
//                 color: "#fff",
//                 transform: `scale(${scale})`,
//                 transformOrigin: "top center",
//             }}
//         >
//             {/* Headings */}
//             <div
//                 style={{
//                     textAlign: "center",
//                     marginBottom: 20 * scale,
//                     paddingLeft: 24 * scale,
//                     paddingRight: 24 * scale,
//                 }}
//             >
//                 <h2
//                     style={{
//                         fontSize: 48 * scale,
//                         fontWeight: "600",
//                         lineHeight: "1.25",
//                         color: titleOneColor,
//                     }}
//                 >
//                     {titleOne}
//                 </h2>
//                 <h2
//                     style={{
//                         fontSize: 48 * scale,
//                         fontWeight: "600",
//                         lineHeight: "1.25",
//                         color: titleTwoColor,
//                     }}
//                 >
//                     {titleTwo}
//                 </h2>
//                 <p
//                     style={{
//                         fontSize: 18 * scale,
//                         marginTop: 16 * scale,
//                         color: captionColor,
//                         maxWidth: 700 * scale,
//                         margin: `${16 * scale}px auto 0 auto`,
//                     }}
//                 >
//                     {caption}
//                 </p>
//             </div>

//             {/* Carousel Track */}
//             <div
//                 style={{
//                     position: "relative",
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "visible",
//                     padding: `${10 * scale}px ${350 * scale}px`,
//                 }}
//             >
//                 <div
//                     id={scrollId}
//                     ref={scrollRef}
//                     onMouseUp={handleDragEnd}
//                     onTouchEnd={handleDragEnd}
//                     style={{
//                         display: "flex",
//                         minHeight: 400 * scale,
//                         overflowX: "scroll",
//                         overflowY: "visible",
//                         alignItems: "center",
//                         scrollBehavior: isTeleporting ? "auto" : "smooth",
//                         gap: `${gap}px`,
//                         paddingLeft: `${carouselPadding}px`,
//                         paddingRight: `${carouselPadding}px`,
//                           msOverflowStyle: "none", // IE and Edge
//     scrollbarWidth: "none", // Firefox
//                     }}
//                 >
//                     {slidesToRender.map((item, index) => {
//                         const isActive = activeIndex === index;
//                         return (
//                             <div
//                                 key={index}
//                                 style={{
//                                     flexShrink: 0,
//                                     scrollSnapAlign: "center",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     textAlign: "center",
//                                     borderRadius: 24 * scale,
//                                     padding: 40 * scale,
//                                     transition: "all 0.5s ease",
//                                     width: cardWidth,
//                                     height: 250 * scale,
//                                     background: "rgba(255,255,255,0.05)",
//                                     border: `1px solid ${item.borderColor || "rgba(255,255,255,0.1)"}`,
//                                     boxShadow: isActive
//                                         ? "0px 0px 50px rgba(139,92,246,0.8)"
//                                         : "0px 0px 20px rgba(0,0,0,0.2)",
//                                     transform: isActive ? "scale(1.1)" : "scale(0.9)",
//                                     opacity: isActive ? 1 : 0.6,
//                                     backdropFilter: "blur(10px)",
//                                     zIndex: isActive ? 2 : 1,
//                                 }}
//                             >
//                                 <h3
//                                     style={{
//                                         fontSize: 24 * scale,
//                                         fontWeight: "600",
//                                         marginBottom: 12 * scale,
//                                     }}
//                                 >
//                                     {item.title}
//                                 </h3>
//                                 <p
//                                     style={{
//                                         fontSize: 14 * scale,
//                                         color: "rgb(209, 213, 219)",
//                                         marginBottom: 24 * scale,
//                                         maxWidth: 256 * scale,
//                                     }}
//                                 >
//                                     {item.description}
//                                 </p>
//                                 <button
//                                     style={{
//                                         color: "white",
//                                         fontWeight: "500",
//                                         padding: `${8 * scale}px ${24 * scale}px`,
//                                         borderRadius: 9999 * scale,
//                                         background: item.buttonColor,
//                                         border: "none",
//                                         cursor: "pointer",
//                                         boxShadow:
//                                             "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                                     }}
//                                 >
//                                     {item.buttonText}
//                                 </button>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Arrows + Dots */}
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: 10 * scale,
//                     gap: 24 * scale,
//                 }}
//             >
//                 <button onClick={handlePrev} style={arrowButtonStyle}>
//                     &lt;
//                 </button>

//                 <div style={{ display: "flex", gap: 12 * scale }}>
//                     {slides.map((_, index) => {
//                         const mappedIndex =
//                             (activeIndex - duplicatedSlides + totalSlides * 2) %
//                             totalSlides;
//                         return (
//                             <div
//                                 key={index}
//                                 onClick={() =>
//                                     scrollToActive(index + duplicatedSlides)
//                                 }
//                                 style={{
//                                     width: 12 * scale,
//                                     height: 12 * scale,
//                                     borderRadius: "50%",
//                                     transition: "all 0.3s ease",
//                                     cursor: "pointer",
//                                     backgroundColor:
//                                         mappedIndex === index
//                                             ? "rgb(139, 92, 246)"
//                                             : "rgba(107, 114, 128, 0.5)",
//                                     transform:
//                                         mappedIndex === index
//                                             ? `scale(${1.25 * scale})`
//                                             : `scale(${1 * scale})`,
//                                 }}
//                             ></div>
//                         );
//                     })}
//                 </div>

//                 <button onClick={handleNext} style={arrowButtonStyle}>
//                     &gt;
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DeploymentCarousel;