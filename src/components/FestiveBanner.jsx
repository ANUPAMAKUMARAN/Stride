

import React, { useState, useEffect } from "react";

const FestiveBanner = ({ attributes }) => {
  const {
    titleOne,
    titleTwo,
    titleColor,
    imageOne,
    imageTwo,
    imageThree,
    text,
    textColor,
    description,
    descriptionColor,
    buttonText,
    buttonColor,
    buttonHoverColor,
  } = attributes;

  const images = [imageOne, imageTwo, imageThree];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  //  Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 📱 Scaling & responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobile(true);
        setScaleMultiplier(0.9);
      } else if (width < 1024) {
        setIsMobile(false);
        setScaleMultiplier(0.95);
      } else {
        setIsMobile(false);
        setScaleMultiplier(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
   <div
    style={{
    position: "relative",
    width: "100vw",
    maxWidth: "100%",
    backgroundColor: "#fff", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
  >
      <div
        style={{
          width: "100vw",
          maxWidth: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
          overflow: "hidden",
          
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          
          transform: `scale(${scaleMultiplier})`,
          transformOrigin: "center top",
          transition: "transform 0.3s ease",
          margin: 0,
          padding: 0,
          clipPath: !isMobile
        ? "polygon(3% 0, 97% 0, 100% 5%, 100% 95%, 97% 100%, 3% 100%, 0 95%, 0 5%)"
        : "none", 
        borderRadius: "50px",
        marginTop:"20px"
        }}
      >
        
        {/* LEFT SIDE */}
        <div
          style={{
            flex: isMobile ? "unset" : "1.8",
            position: "relative",
            textAlign: "center",
            color: titleColor,
            minHeight: isMobile ? "280px" : "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: isMobile ? "0px" : "40px",
            boxSizing: "border-box",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {/* Slideshow */}
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === currentIndex ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                zIndex: 0,
                 borderRadius: "50px",
      clipPath: !isMobile
        ? "polygon(0 0, 24% 0, 25% 5%, 26% 0, 49% 0, 50% 5%, 51% 0, 74% 0, 75% 5%, 76% 0, 100% 0, 100% 100%, 76% 100%, 75% 95%, 74% 100%, 51% 100%, 50% 95%, 49% 100%, 26% 100%, 25% 95%, 24% 100%, 0 100%)"
        : "none", 
              }}
            />
          ))}
  
         
          {/* Two-line Title */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "40px",
                lineHeight: "1.3",
                fontWeight: "400",
                margin: 0,
                fontFamily: "serif",
                color: titleColor,
              }}
            >
              {titleOne} <br /> {titleTwo}
            </h2>
          </div>
  
          {/* Move right content below in mobile */}
          {isMobile && (
            <div
              style={{
                marginTop: "25px",
                zIndex: 3,
                position: "relative",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundColor: buttonColor,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  margin: "0 auto 15px auto",
                  color: "#fff",
                }}
              >
                D’
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  color: isMobile ? "#f5f5f5" : textColor,
                  marginBottom: "10px",
                }}
              >
                {text}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: isMobile ? "#f5f5f5" : descriptionColor,
                  marginBottom: "20px",
                }}
              >
                {description}
              </div>
              <button
                style={{
                  backgroundColor: buttonColor,
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginBottom: "25px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonColor)
                }
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
  
        {/* RIGHT SIDE */}
        {!isMobile && (
          <div
            style={{
              flex: "1",
              background: "#fff",
              textAlign: "center",
              padding: "40px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: buttonColor,
                color: "#fff",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              D’
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "500",
                color: textColor,
                marginBottom: "10px",
              }}
            >
              {text}
            </div>
            <div
              style={{
                fontSize: "18px",
                color: descriptionColor,
                marginBottom: "25px",
              }}
            >
              {description}
            </div>
            <button
              style={{
                backgroundColor: buttonColor,
                color: "#fff",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = buttonHoverColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = buttonColor)
              }
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
   </div>
  );
};

export default FestiveBanner;







// import React, { useState, useEffect } from "react";

// const FestiveBanner = ({ attributes }) => {
//   const {
//     titleOne,
//     titleTwo,
//     titleColor,
//     imageOne,
//     imageTwo,
//     imageThree,
//     text,
//     textColor,
//     description,
//     descriptionColor,
//     buttonText,
//     buttonColor,
//     buttonHoverColor,
//   } = attributes;

//   const images = [imageOne, imageTwo, imageThree];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [scaleMultiplier, setScaleMultiplier] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);

//   // 🔁 Slideshow logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   // 📱 Scaling & responsive layout
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (width < 768) {
//         setIsMobile(true);
//         setScaleMultiplier(0.9);
//       } else if (width < 1024) {
//         setIsMobile(false);
//         setScaleMultiplier(0.95);
//       } else {
//         setIsMobile(false);
//         setScaleMultiplier(1);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div
//       style={{
//         width: "100vw",
//         maxWidth: "100%",
//         display: "flex",
//         flexDirection: isMobile ? "column" : "row",
//         alignItems: "stretch",
//         overflow: "hidden",
//         borderRadius: "20px",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         background: "#fff",
//         transform: `scale(${scaleMultiplier})`,
//         transformOrigin: "center top",
//         transition: "transform 0.3s ease",
//         margin: 0,
//         padding: 0,
//       }}
//     >
//       {/* LEFT SIDE */}
//       <div
//         style={{
//           flex: isMobile ? "unset" : "1.8",
//           position: "relative",
//           textAlign: "center",
//           color: titleColor,
//           minHeight: isMobile ? "280px" : "500px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: isMobile ? "0px" : "40px",
//           boxSizing: "border-box",
//           overflow: "hidden",
//         }}
//       >
//         {/* Slideshow */}
//         {images.map((img, i) => (
//           <img
//             key={i}
//             src={img}
//             alt=""
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               opacity: i === currentIndex ? 1 : 0,
//               transition: "opacity 1s ease-in-out",
//               zIndex: 0,
//             }}
//           />
//         ))}

//         {/* Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background: "rgba(0,0,0,0.45)",
//             zIndex: 1,
//           }}
//         ></div>

//         {/* Two-line Title */}
//         <div style={{ position: "relative", zIndex: 2 }}>
//           <h2
//             style={{
//               fontSize: isMobile ? "28px" : "40px",
//               lineHeight: "1.3",
//               fontWeight: "400",
//               margin: 0,
//               fontFamily: "serif",
//               color: titleColor,
//             }}
//           >
//             {titleOne} <br /> {titleTwo}
//           </h2>
//         </div>

//         {/* Move right content below in mobile */}
//         {isMobile && (
//           <div
//             style={{
//               marginTop: "25px",
//               zIndex: 3,
//               position: "relative",
//               textAlign: "center",
//             }}
//           >
//             <div
//               style={{
//                 height: "50px",
//                 width: "50px",
//                 backgroundColor: buttonColor,
//                 borderRadius: "10px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: "bold",
//                 fontSize: "20px",
//                 margin: "0 auto 15px auto",
//                 color: "#fff",
//               }}
//             >
//               D’
//             </div>
//             <div
//               style={{
//                 fontSize: "24px",
//                 fontWeight: "500",
//                 color: isMobile ? "#f5f5f5" : textColor,
//                 marginBottom: "10px",
//               }}
//             >
//               {text}
//             </div>
//             <div
//               style={{
//                 fontSize: "16px",
//                 color: isMobile ? "#f5f5f5" : descriptionColor,
//                 marginBottom: "20px",
//               }}
//             >
//               {description}
//             </div>
//             <button
//               style={{
//                 backgroundColor: buttonColor,
//                 color: "#fff",
//                 border: "none",
//                 padding: "10px 20px",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 cursor: "pointer",
//                 marginBottom: "25px",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseOver={(e) =>
//                 (e.currentTarget.style.backgroundColor = buttonHoverColor)
//               }
//               onMouseOut={(e) =>
//                 (e.currentTarget.style.backgroundColor = buttonColor)
//               }
//             >
//               {buttonText}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* RIGHT SIDE */}
//       {!isMobile && (
//         <div
//           style={{
//             flex: "1",
//             background: "#fff",
//             textAlign: "center",
//             padding: "40px 20px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               height: "50px",
//               width: "50px",
//               backgroundColor: buttonColor,
//               color: "#fff",
//               borderRadius: "10px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "20px",
//               marginBottom: "20px",
//             }}
//           >
//             D’
//           </div>
//           <div
//             style={{
//               fontSize: "36px",
//               fontWeight: "500",
//               color: textColor,
//               marginBottom: "10px",
//             }}
//           >
//             {text}
//           </div>
//           <div
//             style={{
//               fontSize: "18px",
//               color: descriptionColor,
//               marginBottom: "25px",
//             }}
//           >
//             {description}
//           </div>
//           <button
//             style={{
//               backgroundColor: buttonColor,
//               color: "#fff",
//               border: "none",
//               padding: "12px 25px",
//               borderRadius: "8px",
//               fontSize: "16px",
//               cursor: "pointer",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.backgroundColor = buttonHoverColor)
//             }
//             onMouseOut={(e) =>
//               (e.currentTarget.style.backgroundColor = buttonColor)
//             }
//           >
//             {buttonText}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FestiveBanner;