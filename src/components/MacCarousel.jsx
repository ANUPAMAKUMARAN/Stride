import React, { useState, useEffect, useRef } from "react";

const MacCarousel = ({ attributes }) => {
  const { title, titleColor, slides } = attributes;
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const containerRef = useRef(null);

  // Responsive helpers
  const getScaleMultiplier = () => {
    const width = window.innerWidth;
    return width >= 768 ? 1 : Math.max(0.5, width / 768);
  };

  // Calculate scale on resize
  useEffect(() => {
    const handleResize = () => {
      setScaleMultiplier(getScaleMultiplier());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use native scroll for arrows
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

  const isDesktop = window.innerWidth >= 768;

  // SVG icons (omitted for brevity)
  const plusIconSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${38 * scaleMultiplier}`}
      height={`${38 * scaleMultiplier}`}
      fill="currentColor"
      viewBox="0 0 16 16"
      style={{ filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))" }}
    >
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        stroke="#fff"
        strokeWidth={`${1.3 * scaleMultiplier}`}
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
          overflowX: "auto", // Enable native horizontal scroll
          scrollbarWidth: "none", // Hide scrollbar (Firefox)
          msOverflowStyle: "none", // Hide scrollbar (IE/Edge)
          WebkitOverflowScrolling: "touch", // Smooth scroll for iOS
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide" // Add a class for easy selection
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
                fontSize: "28px",
                cursor: "pointer",
                color: "#333",
              }}
            >
              ×
            </button>

            {/* All Pages (stacked vertically) */}
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





// import React, { useState, useEffect, useRef } from "react";

// const MacCarousel = ({ attributes }) => {
//   const { title, titleColor, slides } = attributes;
//   const [slideWidth, setSlideWidth] = useState(0);
//   const [scaleMultiplier, setScaleMultiplier] = useState(1);
//   const [visibleSlides, setVisibleSlides] = useState(1);
//   const [scrollOffset, setScrollOffset] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSlide, setSelectedSlide] = useState(null);
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);

//   const containerRef = useRef(null);

//   // Responsive helpers
//   const getScaleMultiplier = () => {
//     const width = window.innerWidth;
//     return width >= 768 ? 1 : Math.max(0.5, width / 768);
//   };

//   // Calculate slideWidth, scale and visibleSlides count
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
//       setScrollOffset(0);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [slideWidth, scaleMultiplier]);

//   // Calculate max scrollable pixel offset
//   const maxScroll = Math.max(
//     0,
//     slides.length * (slideWidth + 20 * scaleMultiplier) -
//     visibleSlides * (slideWidth + 20 * scaleMultiplier)
//   );

//   // Mousepad/trackpad smooth scroll
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const handleWheel = (e) => {
//       if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
//         setScrollOffset((prev) => {
//           let next = prev + e.deltaX;
//           next = Math.max(0, Math.min(maxScroll, next));
//           return next;
//         });
//         e.preventDefault();
//       }
//     };

//     el.addEventListener("wheel", handleWheel, { passive: false });
//     return () => el.removeEventListener("wheel", handleWheel);
//   }, [maxScroll]);

//   // Arrow and keyboard navigation
//   const jumpSlide = (dir) => {
//     const perSlide = slideWidth + 20 * scaleMultiplier;
//     setScrollOffset((prev) => {
//       let next = dir === "next" ? prev + perSlide : prev - perSlide;
//       next = Math.max(0, Math.min(maxScroll, next));
//       return next;
//     });
//   };

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowRight") jumpSlide("next");
//       if (e.key === "ArrowLeft") jumpSlide("prev");
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [maxScroll, slideWidth, scaleMultiplier]);

//   const isDesktop = window.innerWidth >= 768;

//   // SVG icons
//   const plusIconSvg = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={`${38 * scaleMultiplier}`}
//       height={`${38 * scaleMultiplier}`}
//       fill="currentColor"
//       viewBox="0 0 16 16"
//       style={{ filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))" }}
//     >
//       <path
//         d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
//         stroke="#fff"
//         strokeWidth={`${1.3 * scaleMultiplier}`}
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

//   return (
//     <div
//       style={{
//         width: "100%",
//         overflow: "hidden",
//         padding: `${40 * scaleMultiplier}px 0`,
//         paddingLeft:
//           window.innerWidth < 768 ? "0px" : `${100 * scaleMultiplier}px`,
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "left",
//           color: titleColor || "#000",
//           fontSize: `${44 * scaleMultiplier}px`,
//           fontWeight: `${600 * scaleMultiplier}px`,
//           marginBottom: `${20 * scaleMultiplier}px`,
//           paddingLeft: `${20 * scaleMultiplier}px`,
//         }}
//       >
//         {title}
//       </h2>

//       {/* Slide Wrapper */}
//       <div
//         ref={containerRef}
//           style={{
//     display: "flex",
//     transition: isDesktop
//       ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
//       : "none",
//     transform: isDesktop ? `translateX(-${scrollOffset}px)` : "none",
//     paddingLeft: `${20 * scaleMultiplier}px`,
//     overflowX: isDesktop ? "hidden" : "auto",   // 👈 enable native scroll on mobile
//     WebkitOverflowScrolling: "touch",          // 👈 smooth scroll for iOS
//     scrollbarWidth: "none",                    // 👈 hide scrollbar (Firefox)
//     msOverflowStyle: "none",                   // 👈 hide scrollbar (IE/Edge)
//   }}
//         // style={{
//         //   display: "flex",
//         //   transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
//         //   transform: `translateX(-${scrollOffset}px)`,
//         //   paddingLeft: `${20 * scaleMultiplier}px`,
//         // }}
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
//                   userSelect: "none",
//                   pointerEvents: "none",
//                 }}
//                 draggable={false}
//               />
//             )}

//             {/* Text Overlay */}
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
//                   fontSize: `${30 * scaleMultiplier}px`,
//                   fontWeight: "bold",
//                   lineHeight: "1.3",
//                 }}
//               >
//                 {slide.title}
//               </h3>
//             </div>

//             {/* Plus Button */}
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
//               onClick={() => {
//                 setSelectedSlide(slide);
//                 setCurrentPageIndex(0);
//                 setShowModal(true);
//               }}
//             >
//               {plusIconSvg}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Arrows */}
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
//           onClick={() => jumpSlide("prev")}
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
//           onClick={() => jumpSlide("next")}
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

//       {/* Modal */}

//       {showModal && selectedSlide && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.85)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//             padding: "20px",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               borderRadius: "20px",
//               maxWidth: "800px",
//               width: "100%",
//               maxHeight: "90vh",   // 👈 keeps modal from exceeding viewport
//               overflowY: "auto",   // 👈 vertical scroll enabled
//               padding: "30px",
//               textAlign: "left",
//               position: "relative",
//             }}
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setShowModal(false)}
//               style={{
//                 position: "absolute",
//                 top: "15px",
//                 right: "15px",
//                 background: "transparent",
//                 border: "none",
//                 fontSize: "28px",
//                 cursor: "pointer",
//                 color: "#333",
//               }}
//             >
//               ×
//             </button>

//             {/* All Pages (stacked vertically) */}
//             {selectedSlide.pages && selectedSlide.pages.length > 0 && (
//               <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
//                 {selectedSlide.pages.map((page, idx) => (
//                   <div
//                     key={idx}
//                     style={{
//                       paddingBottom: "20px",
//                       borderBottom:
//                         idx !== selectedSlide.pages.length - 1
//                           ? "1px solid #eee"
//                           : "none",
//                     }}
//                   >
//                     {page.img && (
//                       <img
//                         src={page.img}
//                         alt={`page-${idx}`}
//                         style={{
//                           maxWidth: "100%",
//                           borderRadius: "12px",
//                           marginBottom: "15px",
//                         }}
//                       />
//                     )}
//                     <p
//                       style={{
//                         fontSize: "18px",
//                         color: page.descriptionColor || "#444",
//                         lineHeight: "1.6",
//                       }}
//                     >
//                       {page.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default MacCarousel;