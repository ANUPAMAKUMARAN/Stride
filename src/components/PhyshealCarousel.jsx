// import React, { useState } from "react";


// const PhyshealCarousel = ({attributes}) => {
  
//   const {
//     caption,
//     captionColor,
//     titleOne,
//     titleOneColor,
//     titleTwo,
//     titleTwoColor,
//     backgroundColor,
//     exploreButtonText,
//     exploreButtonColor,
//     arrowButtonColor,
//     hoverColor,
//     slides=[],
//   } = attributes;

//   const [current, setCurrent] = useState(0);
//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         padding: "40px",
//         borderRadius: "20px",
//         backgroundColor: backgroundColor || "#0F1D3A",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* Header Section */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "30px",
//         }}
//       >
//         <div>
//           <p
//             style={{
//               color: captionColor || "#00E09E",
//               textTransform: "uppercase",
//               fontSize: "14px",
//               fontWeight: "600",
//               letterSpacing: "1px",
//               marginBottom: "8px",
//             }}
//           >
//             {caption}
//           </p>
//           <h2 style={{ fontSize: "34px", fontWeight: "700", lineHeight: "1.4" }}>
//             <span style={{ color: titleOneColor || "#fff" }}>{titleOne} </span>
//             <span style={{ color: titleTwoColor || "#fff" }}>{titleTwo}</span>
//           </h2>
//         </div>

//         <button
//           style={{
//             marginLeft: "20px",
//             padding: "12px 20px",
//             borderRadius: "25px",
//             fontSize: "14px",
//             fontWeight: "600",
//             border: "none",
//             cursor: "pointer",
//             backgroundColor: exploreButtonColor || "#007BFF",
//             color: "#fff",
//           }}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.backgroundColor = hoverColor || "#0056b3")
//           }
//           onMouseOut={(e) =>
//             (e.currentTarget.style.backgroundColor =
//               exploreButtonColor || "#007BFF")
//           }
//         >
//           {exploreButtonText}
//         </button>
//       </div>

//       {/* Carousel Section */}
//       <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
//         {/* Prev Button */}
//         <button
//           onClick={prevSlide}
//           style={{
//             position: "absolute",
//             left: "-20px",
//             zIndex: 10,
//             padding: "10px",
//             borderRadius: "50%",
//             border: "none",
//             cursor: "pointer",
//             backgroundColor: arrowButtonColor || "#00E09E",
//             color: "#fff",
//           }}
//         >
//           ◀
//         </button>

//         {/* Slides */}
//         <div
//           style={{
//             display: "flex",
//             overflow: "hidden",
//             gap: "15px",
//             width: "100%",
//           }}
//         >
//           {slides.slice(current, current + 3).map((slide, index) => (
//             <div
//               key={index}
//               style={{
//                 position: "relative",
//                 borderRadius: "16px",
//                 overflow: "hidden",
//                 flexShrink: 0,
//                 transition: "all 0.5s ease",
//                 width: index === 0 ? "70%" : "15%",
//               }}
//             >
//               <img
//                 src={slide.image}
//                 alt={slide.description}
//                 style={{
//                   width: "100%",
//                   height: "260px",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />
//               {/* Description only on main slide */}
//               {index === 0 && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     bottom: "0",
//                     left: "0",
//                     right: "0",
//                     padding: "12px",
//                     background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
//                   }}
//                 >
//                   <p style={{ color: slide.descriptionColor, fontSize: "14px" }}>
//                     {slide.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Next Button */}
//         <button
//           onClick={nextSlide}
//           style={{
//             position: "absolute",
//             right: "-20px",
//             zIndex: 10,
//             padding: "10px",
//             borderRadius: "50%",
//             border: "none",
//             cursor: "pointer",
//             backgroundColor: arrowButtonColor || "#00E09E",
//             color: "#fff",
//           }}
//         >
//           ▶
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PhyshealCarousel;

import React, { useState, useEffect } from "react";

const PhyshealCarousel = ({ attributes }) => {
    
  const {
    caption,
    captionColor,
    titleOne,
    titleOneColor,
    titleTwo,
    titleTwoColor,
    backgroundColor,
    exploreButtonText,
    exploreButtonColor,
    arrowButtonColor,
    hoverColor,
    slides = [],
  } = attributes;

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // mobile breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "40px",
        borderRadius: "20px",
        backgroundColor: backgroundColor || "#0F1D3A",
        boxSizing: "border-box",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <p
            style={{
              color: captionColor || "#00E09E",
              textTransform: "uppercase",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            {caption}
          </p>
          <h2 style={{ fontSize: "34px", fontWeight: "700", lineHeight: "1.4" }}>
            <span style={{ color: titleOneColor || "#fff" }}>{titleOne} </span>
            <span style={{ color: titleTwoColor || "#fff" }}>{titleTwo}</span>
          </h2>
        </div>

        <button
          style={{
            marginTop: isMobile ? "20px" : "0",
            marginLeft: isMobile ? "0" : "20px",
            padding: "12px 20px",
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            backgroundColor: exploreButtonColor || "#007BFF",
            color: "#fff",
            alignSelf: isMobile ? "stretch" : "auto",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = hoverColor || "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              exploreButtonColor || "#007BFF")
          }
        >
          {exploreButtonText}
        </button>
      </div>

      {/* Carousel Section */}
      {isMobile ? (
        // Mobile view → Vertical stack
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={slide.image}
                alt={slide.description}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  padding: "12px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              >
                <p style={{ color: slide.descriptionColor, fontSize: "14px" }}>
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // PC view → Horizontal carousel
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "-20px",
              zIndex: 10,
              padding: "10px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              backgroundColor: arrowButtonColor || "#00E09E",
              color: "#fff",
            }}
          >
            ◀
          </button>

          {/* Slides */}
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              gap: "15px",
              width: "100%",
            }}
          >
            {slides.slice(current, current + 3).map((slide, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flexShrink: 0,
                  transition: "all 0.5s ease",
                  width: index === 0 ? "70%" : "15%",
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.description}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {index === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      padding: "12px",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    }}
                  >
                    <p
                      style={{ color: slide.descriptionColor, fontSize: "14px" }}
                    >
                      {slide.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "-20px",
              zIndex: 10,
              padding: "10px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              backgroundColor: arrowButtonColor || "#00E09E",
              color: "#fff",
            }}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default PhyshealCarousel;
