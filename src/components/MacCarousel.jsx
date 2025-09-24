


import React, { useState, useEffect, useRef } from "react";

const MacCarousel = ({ attributes }) => {
    const { title, titleColor, slides } = attributes;
    const [slideWidth, setSlideWidth] = useState(0);
    const [scaleMultiplier, setScaleMultiplier] = useState(1);
    const [visibleSlides, setVisibleSlides] = useState(1);
    const [scrollOffset, setScrollOffset] = useState(0); // pixel-offset for smooth scroll
    const containerRef = useRef(null);

    // Responsive helpers
    const getScaleMultiplier = () => {
        const width = window.innerWidth;
        return width >= 768 ? 1 : Math.max(0.5, width / 768);
    };

    // Calculate slideWidth, scale and visibleSlides count
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlideWidth(window.innerWidth * 0.65);
            } else {
                setSlideWidth(window.innerWidth * 0.27);
            }
            setScaleMultiplier(getScaleMultiplier());

            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const slidesPerView = Math.floor(
                    containerWidth / (slideWidth + 20 * scaleMultiplier)
                );
                setVisibleSlides(slidesPerView || 1);
            }
            setScrollOffset(0); // reset scroll position on resize
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [slideWidth, scaleMultiplier]);

    // Calculate max scrollable pixel offset
    const maxScroll = Math.max(
        0,
        (slides.length * (slideWidth + 20 * scaleMultiplier)) -
        (visibleSlides * (slideWidth + 20 * scaleMultiplier))
    );

    // Mousepad/trackpad smooth scroll
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                setScrollOffset((prev) => {
                    let next = prev + e.deltaX;
                    next = Math.max(0, Math.min(maxScroll, next));
                    return next;
                });
                e.preventDefault();
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [maxScroll]);

    // Arrow and keyboard: jump by one slide at a time (for accessibility)
    const jumpSlide = (dir) => {
        const perSlide = slideWidth + 20 * scaleMultiplier;
        setScrollOffset((prev) => {
            let next = dir === "next" ? prev + perSlide : prev - perSlide;
            next = Math.max(0, Math.min(maxScroll, next));
            return next;
        });
    };

    // Keyboard arrow support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") jumpSlide("next");
            if (e.key === "ArrowLeft") jumpSlide("prev");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [maxScroll, slideWidth, scaleMultiplier]);

    // For arrow UI highlight
    const isDesktop = window.innerWidth >= 768;

    // SVGs unchanged, remain from your template
    const plusIconSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${25 * scaleMultiplier}`}
            height={`${25 * scaleMultiplier}`}
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))" }}
        >
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                stroke="#fff"
                strokeWidth={`${1.5 * scaleMultiplier}`}
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
                overflow: "hidden",
                padding: `${40 * scaleMultiplier}px 0`,
                // paddingLeft: `${100 * scaleMultiplier}px`,
                paddingLeft: window.innerWidth < 768 ? "20px" : `${100 * scaleMultiplier}px`,

            }}
        >
            <h2
                style={{
                    textAlign: "left",
                    color: titleColor || "#000",
                    fontSize: `${44 * scaleMultiplier}px`,
                    fontWeight: "600",
                    marginBottom: `${20 * scaleMultiplier}px`,
                    paddingLeft: `${10 * scaleMultiplier}px`,
                }}
            >
                {title}
            </h2>
            {/* Slide Wrapper */}
            <div
                ref={containerRef}
                style={{
                    display: "flex",
                    transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    transform: `translateX(-${scrollOffset}px)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        style={{
                            flex: `0 0 ${slideWidth}px`,
                            marginRight:
                                index === slides.length - 1 ? "0" : `${20 * scaleMultiplier}px`,
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
                        <button
                            style={{
                                position: "absolute",
                                bottom: `${20 * scaleMultiplier}px`,
                                right: `${20 * scaleMultiplier}px`,
                                width: `${40 * scaleMultiplier}px`,
                                height: `${40 * scaleMultiplier}px`,
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
        </div>
    );
};

export default MacCarousel;

// import React, { useState, useEffect, useRef } from "react";

// const MacCarousel = ({ attributes }) => {
//   const { title, titleColor, slides } = attributes;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [slideWidth, setSlideWidth] = useState(0);
//   const [scaleMultiplier, setScaleMultiplier] = useState(1);
//   const [visibleSlides, setVisibleSlides] = useState(1);

//   const containerRef = useRef(null);

//   const getScaleMultiplier = () => {
//     const width = window.innerWidth;
//     return width >= 768 ? 1 : Math.max(0.5, width / 768);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setSlideWidth(window.innerWidth * 0.65);
//       } else {
//         setSlideWidth(window.innerWidth * 0.27);
//       }
//       setScaleMultiplier(getScaleMultiplier());

//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const slidesPerView = Math.floor(
//           containerWidth / (slideWidth + 20 * scaleMultiplier)
//         );
//         setVisibleSlides(slidesPerView || 1);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [slideWidth, scaleMultiplier]);

//   const maxIndex = Math.max(0, slides.length - visibleSlides);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => Math.max(prev - 1, 0));
//   };

//   // ✅ Keyboard support
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowRight") nextSlide();
//       if (e.key === "ArrowLeft") prevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [maxIndex]);

//   // ✅ Mouse wheel horizontal scroll
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const handleWheel = (e) => {
//       if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
//         if (e.deltaX > 0) nextSlide();
//         else prevSlide();
//         e.preventDefault();
//       }
//     };

//     el.addEventListener("wheel", handleWheel, { passive: false });
//     return () => el.removeEventListener("wheel", handleWheel);
//   }, [maxIndex]);

//   const plusIconSvg = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={`${25 * scaleMultiplier}`}
//       height={`${25 * scaleMultiplier}`}
//       fill="currentColor"
//       viewBox="0 0 16 16"
//       style={{ filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))" }}
//     >
//       <path
//         d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
//         stroke="#fff"
//         strokeWidth={`${1.5 * scaleMultiplier}`}
//       />
//     </svg>
//   );

//   const leftArrowSvg = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={`${24 * scaleMultiplier}`}
//       height={`${24 * scaleMultiplier}`}
//       fill="#333"
//       viewBox="0 0 16 16"
//     >
//       <path
//         fillRule="evenodd"
//         d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
//       />
//     </svg>
//   );

//   const rightArrowSvg = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={`${24 * scaleMultiplier}`}
//       height={`${24 * scaleMultiplier}`}
//       fill="#333"
//       viewBox="0 0 16 16"
//     >
//       <path
//         fillRule="evenodd"
//         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
//       />
//     </svg>
//   );

//   const isDesktop = window.innerWidth >= 768;

//   return (
//     <div
//       style={{
//         width: "100%",
//         overflow: "hidden",
//         padding: `${40 * scaleMultiplier}px 0 `,
//         paddingLeft: `${100 * scaleMultiplier}px`,
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "left",
//           color: titleColor || "#000",
//           fontSize: `${40 * scaleMultiplier}px`,
//           fontWeight: "600",
//           marginBottom: `${20 * scaleMultiplier}px`,
//           paddingLeft: `${10 * scaleMultiplier}px`,
//         }}
//       >
//         {title}
//       </h2>

//       {/* SLIDE WRAPPER */}
//       <div
//         ref={containerRef}
//         style={{
//           display: "flex",
//           transition: "transform 0.5s ease",
//           transform: `translateX(-${
//             currentIndex * (slideWidth + 20 * scaleMultiplier)
//           }px)`,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             style={{
//               flex: `0 0 ${slideWidth}px`,
//               marginRight:
//                 index === slides.length - 1 ? "0" : `${20 * scaleMultiplier}px`,
//               borderRadius: `${16 * scaleMultiplier}px`,
//               overflow: "hidden",
//               position: "relative",
//               backgroundColor: slide.backgroundColor || "#f5f5f5",
//             }}
//           >
//             {slide.image && (
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: `${16 * scaleMultiplier}px`,
//                   userSelect: "none", // prevent drag ghost
//                   pointerEvents: "none",
//                 }}
//                 draggable={false}
//               />
//             )}
//             <div
//               style={{
//                 position: "absolute",
//                 top: `${20 * scaleMultiplier}px`,
//                 left: `${20 * scaleMultiplier}px`,
//                 right: `${20 * scaleMultiplier}px`,
//                 color: slide.titleColor || "#fff",
//               }}
//             >
//               <h4
//                 style={{
//                   color: slide.captionColor || "#fff",
//                   fontSize: `${19 * scaleMultiplier}px`,
//                   marginBottom: `${3 * scaleMultiplier}px`,
//                 }}
//               >
//                 {slide.caption}
//               </h4>
//               <h3
//                 style={{
//                   color: slide.titleColor || "#fff",
//                   fontSize: `${27 * scaleMultiplier}px`,
//                   fontWeight: "bold",
//                   lineHeight: "1.3",
//                 }}
//               >
//                 {slide.title}
//               </h3>
//             </div>

//             <button
//               style={{
//                 position: "absolute",
//                 bottom: `${20 * scaleMultiplier}px`,
//                 right: `${20 * scaleMultiplier}px`,
//                 width: `${40 * scaleMultiplier}px`,
//                 height: `${40 * scaleMultiplier}px`,
//                 borderRadius: "50%",
//                 backgroundColor: "rgba(0,0,0,1)",
//                 border: `1px solid rgba(255, 255, 255, 0.4)`,
//                 backdropFilter: "blur(10px)",
//                 color: "#fff",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 transition: "transform 0.2s ease-in-out",
//                 zIndex: 1,
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = `scale(${1.1})`;
//                 e.currentTarget.style.boxShadow =
//                   "0 0 10px rgba(255, 255, 255, 0.5)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = `scale(${1})`;
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               {plusIconSvg}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ARROWS */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: isDesktop ? "flex-end" : "center",
//           marginTop: `${15 * scaleMultiplier}px`,
//           gap: `${20 * scaleMultiplier}px`,
//           paddingRight: isDesktop ? "20px" : "0",
//         }}
//       >
//         <button
//           onClick={prevSlide}
//           style={{
//             width: `${40 * scaleMultiplier}px`,
//             height: `${40 * scaleMultiplier}px`,
//             borderRadius: "50%",
//             border: `1px solid #ccc`,
//             background: "#fff",
//             cursor: "pointer",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {leftArrowSvg}
//         </button>
//         <button
//           onClick={nextSlide}
//           style={{
//             width: `${40 * scaleMultiplier}px`,
//             height: `${40 * scaleMultiplier}px`,
//             borderRadius: "50%",
//             border: `1px solid #ccc`,
//             background: "#fff",
//             cursor: "pointer",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {rightArrowSvg}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MacCarousel;



// import React, { useState, useEffect } from "react";

// const MacCarousel = ({ attributes }) => {
//     const { title, titleColor, slides } = attributes;
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [slideWidth, setSlideWidth] = useState(1); // default mobile

//     const getScaleMultiplier = () => {
//         const width = window.innerWidth;
//         if (width >= 768) {
//             return 1;
//         }
//         // Scale down for smaller screens, but not below a certain point
//         return Math.max(0.5, width / 768);
//     };

//     const [scaleMultiplier, setScaleMultiplier] = useState(getScaleMultiplier());

//     // Detect screen size and update slide width and scaling
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 768) {
//                 setSlideWidth("65%"); // mobile → 1.5 slides
//             } else {
//                 setSlideWidth("27%"); // desktop → ~4 slides
//             }
//             setScaleMultiplier(getScaleMultiplier());
//         };

//         handleResize(); // run once on mount
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const nextSlide = () => {
//         if (currentIndex < slides.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     };

//     const prevSlide = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     };

//     const plusIconSvg = (
//         <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width={`${25 * scaleMultiplier}`}
//             height={`${25 * scaleMultiplier}`}
//             fill="currentColor"
//             viewBox="0 0 16 16"
//             style={{
//                 filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))',
//             }}
//         >
//             <path
//                 d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
//                 stroke="#fff"
//                 strokeWidth={`${1.5 * scaleMultiplier}`}
//             />
//         </svg>
//     );

//     // SVG for the left arrow
//     const leftArrowSvg = (
//         <svg xmlns="http://www.w3.org/2000/svg" width={`${24 * scaleMultiplier}`} height={`${24 * scaleMultiplier}`} fill="#333" viewBox="0 0 16 16">
//             <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
//         </svg>
//     );

//     // SVG for the right arrow
//     const rightArrowSvg = (
//         <svg xmlns="http://www.w3.org/2000/svg" width={`${24 * scaleMultiplier}`} height={`${24 * scaleMultiplier}`} fill="#333" viewBox="0 0 16 16">
//             <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
//         </svg>
//     );

//     const isDesktop = window.innerWidth >= 768;

//     return (
//         <div
//             style={{
//                 width: "100%",
//                 overflow: "hidden",
//                 padding: `${20 * scaleMultiplier}px 0`,
//             }}
//         >
//             {/* Title */}
//             <h2
//                 style={{
//                     textAlign: "left",
//                     color: titleColor || "#000",
//                     fontSize: `${38 * scaleMultiplier}px`,
//                     fontWeight: "600",
//                     marginBottom: `${20 * scaleMultiplier}px`,
//                     paddingLeft: `${10 * scaleMultiplier}px`,
//                 }}
//             >
//                 {title}
//             </h2>

//             {/* Carousel container */}
//             <div
//                 style={{
//                     display: "flex",
//                     transition: "transform 0.5s ease",
//                     transform: `translateX(-${currentIndex * (parseInt(slideWidth) + 5)}%)`,
//                 }}
//             >
//                 {slides.map((slide, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             flex: `0 0 ${slideWidth}`,
//                             marginRight: `${20 * scaleMultiplier}px`,
//                             borderRadius: `${16 * scaleMultiplier}px`,
//                             overflow: "hidden",
//                             position: "relative",
//                             backgroundColor: slide.backgroundColor || "#f5f5f5",
//                         }}
//                     >
//                         {/* Slide Image */}
//                         {slide.image && (
//                             <img
//                                 src={slide.image}
//                                 alt={slide.title}
//                                 style={{
//                                     width: "100%",
//                                     height: "100%",
//                                     objectFit: "cover",
//                                     borderRadius: `${16 * scaleMultiplier}px`,
//                                 }}
//                             />
//                         )}

//                         {/* Overlay Text */}
//                         <div
//                             style={{
//                                 position: "absolute",
//                                 top: `${20 * scaleMultiplier}px`,
//                                 left: `${20 * scaleMultiplier}px`,
//                                 right: `${20 * scaleMultiplier}px`,
//                                 color: slide.titleColor || "#fff",
//                             }}
//                         >
//                             <h4
//                                 style={{
//                                     color: slide.captionColor || "#fff",
//                                     fontSize: `${14 * scaleMultiplier}px`,
//                                     marginBottom: `${8 * scaleMultiplier}px`,
//                                 }}
//                             >
//                                 {slide.caption}
//                             </h4>
//                             <h3
//                                 style={{
//                                     color: slide.titleColor || "#fff",
//                                     fontSize: `${22 * scaleMultiplier}px`,
//                                     fontWeight: "bold",
//                                     lineHeight: "1.3",
//                                 }}
//                             >
//                                 {slide.title}
//                             </h3>
//                         </div>

//                         {/* Plus Icon Button with SVG and pop-out effect */}
//                         <button
//                             style={{
//                                 position: 'absolute',
//                                 bottom: `${20 * scaleMultiplier}px`,
//                                 right: `${20 * scaleMultiplier}px`,
//                                 width: `${40 * scaleMultiplier}px`,
//                                 height: `${40 * scaleMultiplier}px`,
//                                 borderRadius: '50%',
//                                 backgroundColor: 'rgba(0,0,0,1)',
//                                 border: `1px solid rgba(255, 255, 255, 0.4)`,
//                                 backdropFilter: 'blur(10px)',
//                                 color: '#fff',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 cursor: 'pointer',
//                                 transition: 'transform 0.2s ease-in-out',
//                                 zIndex: 1, // Ensure the button is above the image
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.transform = `scale(${1.1})`;
//                                 e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.transform = `scale(${1})`;
//                                 e.currentTarget.style.boxShadow = 'none';
//                             }}
//                         >
//                             {plusIconSvg}
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* Arrow Buttons */}
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: isDesktop ? "flex-end" : "center",
//                     marginTop: `${15 * scaleMultiplier}px`,
//                     gap: `${20 * scaleMultiplier}px`,
//                     paddingRight: isDesktop ? '20px' : '0', // Add padding on desktop to align right
//                 }}
//             >
//                 <button
//                     onClick={prevSlide}
//                     style={{
//                         width: `${40 * scaleMultiplier}px`,
//                         height: `${40 * scaleMultiplier}px`,
//                         borderRadius: "50%",
//                         border: `1px solid #ccc`,
//                         background: "#fff",
//                         cursor: "pointer",
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     {leftArrowSvg}
//                 </button>
//                 <button
//                     onClick={nextSlide}
//                     style={{
//                         width: `${40 * scaleMultiplier}px`,
//                         height: `${40 * scaleMultiplier}px`,
//                         borderRadius: "50%",
//                         border: `1px solid #ccc`,
//                         background: "#fff",
//                         cursor: "pointer",
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     {rightArrowSvg}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default MacCarousel;

