import React, { useState, useEffect } from "react";

const RecoveryHero = ({ attributes }) => {
  const {
    caption,
    captionColor,
    title,
    titleColor,
    description,
    descriptionColor,
    buttonText,
    buttonTextColor,
    buttonColor,
    imageOne,
    imageTwo,
    imageThree,
    backgroundColor,
    containerRadius,
  } = attributes;

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  // ✅ state for cycling background on mobile
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const computeScale = (w) => {
    const minW = 420;
    const maxW = 1280;
    const minScale = 0.72;
    const maxScale = 1.0;

    if (w <= minW) return minScale;
    if (w >= maxW) return maxScale;

    const t = (w - minW) / (maxW - minW);
    const eased = Math.pow(t, 0.85);
    return minScale + (maxScale - minScale) * eased;
  };

  const scale = computeScale(windowWidth);
  const isMobile = windowWidth < 760;

  // ✅ cycle between imageOne and imageThree every 3s on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setBgImageIndex((prev) => (prev === 0 ? 1 : 0));
      }, 3000); // 3 seconds interval
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const backgroundImages = [imageOne, imageThree];
  const currentBg = backgroundImages[bgImageIndex];

  const leftCol = "40%";
  const centerCol = "44%";
  const rightCol = "16%";

  return (
    <section
      style={{
        backgroundColor: backgroundColor || "#e8fdf7",
        padding: `${60 * scale}px ${48 * scale}px`,
        borderRadius: containerRadius ? `${containerRadius * scale}px` : `${18 * scale}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          gap: 32 * scale,
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: "space-between",
          flexWrap: isMobile ? "wrap" : "nowrap",
          flexDirection: isMobile ? "column" : "row",
        }}
      >

        {/* LEFT - big image */}
        {!isMobile && (
          <div
            style={{
              flex: `0 0 ${leftCol}`,
              maxWidth: 360 * scale,
              width: undefined,
            }}
          >
            <img
              src={imageOne}
              alt="Main"
              style={{
                width: "100%",
                height: 580 * scale,
                objectFit: "cover",
                borderRadius: 18 * scale,
                display: "block",
              }}
            />
          </div>
        )}


        {/* CENTER - text section */}
        <div
          style={{
            flex: isMobile ? "0 0 100%" : `0 0 ${centerCol}`,
            maxWidth: isMobile ? "100%" : 450 * scale,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "relative",
            padding: isMobile ? `${24 * scale}px` : 0,
            borderRadius: isMobile ? 16 * scale : 0,

            // ✅ cycle background between imageOne and imageThree
            backgroundImage: isMobile ? `url(${currentBg})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <p
              style={{
                color: captionColor || "#00a67e",
                fontWeight: 600,
                marginBottom: 12 * scale,
                fontSize: 15 * scale,
                letterSpacing: 0.6 * scale,
              }}
            >
              {caption}
            </p>

            <h2
              style={{
                fontSize: 58 * scale,
                lineHeight: 1.12,
                margin: `0 0 ${18 * scale}px 0`,
                color: titleColor || "#0b2a26",
                wordBreak: "break-word",
              }}
            >
              {title}
            </h2>
            {/* <h2
  style={{
    fontSize: `clamp0px, ${58 * scale}px, 58px)`, // shrinks but never smaller than 20px
    lineHeight: 1.2,
    margin: `0 0 ${18 * scale}px 0`,
    color: titleColor || "#0b2a26",
    wordBreak: "break-word",
    textAlign: "left",
  }}
>
  {title}
</h2> */}

            {/* <h2
  style={{
    fontSize: 58 * scale,
    lineHeight: 1.12,
    margin: `0 0 ${18 * scale}px 0`,
    color: titleColor || "#0b2a26",
    wordBreak: "break-word",

    display: "-webkit-box",
    WebkitLineClamp: 3,        // ✅ Always 3 lines
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",  // ✅ If text is longer, add "..."
  }}
>
  {title}
</h2> */}


            <p
              style={{
                color: descriptionColor || "#4d5959",
                fontSize: 18 * scale,
                lineHeight: 1.6,
                marginBottom: 22 * scale,
                maxWidth: isMobile ? "100%" : 560 * scale,
                textAlign: "justify",
              }}
            >
              {description}
            </p>

            <button
              style={{
                backgroundColor: buttonColor || "#0a63ff",
                color: buttonTextColor || "#fff",
                border: "none",
                padding: `${12 * scale}px ${28 * scale}px`,
                borderRadius: 28 * scale,
                fontSize: 16 * scale,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 8 * scale,
                alignSelf: "flex-start",
              }}
            >
              {buttonText}
            </button>

            {/* imageTwo positioning */}
            {imageTwo &&
              (isMobile ? (
                <img
                  src={imageTwo}
                  alt="Decorative"
                  style={{
                    marginTop: 16 * scale,
                    width: 96 * scale,
                    height: 96 * scale,
                    borderRadius: 12 * scale,
                    objectFit: "cover",
                    alignSelf: "flex-end",
                  }}
                />
              ) : (
                <img
                  src={imageTwo}
                  alt="Decorative"
                  style={{
                    width: 96 * scale,
                    height: 96 * scale,
                    borderRadius: 12 * scale,
                    objectFit: "cover",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                  }}
                />
              ))}
          </div>

          {/* ✅ Light overlay for readability */}
          {isMobile && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.7)",
                borderRadius: 16 * scale,
                zIndex: 1,
              }}
            ></div>
          )}
        </div>

        {/* RIGHT - tall image (desktop only) */}
        {!isMobile && (
          <div
            style={{
              flex: `0 0 ${rightCol}`,
              minWidth: 350 * scale,
              display: "flex",
              justifyContent: "center",
              marginTop: 150 * scale,
            }}
          >
            <img
              src={imageThree}
              alt="Side"
              style={{
                width: 320 * scale,
                height: 420 * scale,
                objectFit: "cover",
                borderRadius: 16 * scale,
                display: "block",
                marginTop: 70 * scale,
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default RecoveryHero;


// import React, { useState, useEffect } from "react";

// const RecoveryHero = ({ attributes }) => {
//   const {
//     caption,
//     captionColor,
//     title,
//     titleColor,
//     description,
//     descriptionColor,
//     buttonText,
//     buttonTextColor,
//     buttonColor,
//     imageOne,
//     imageTwo,
//     imageThree,
//     backgroundColor,
//     containerRadius,
//   } = attributes;

//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1280
//   );

//   // ✅ state for cycling background on mobile
//   const [bgImageIndex, setBgImageIndex] = useState(0);

//   useEffect(() => {
//     const onResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const computeScale = (w) => {
//     const minW = 420;
//     const maxW = 1280;
//     const minScale = 0.72;
//     const maxScale = 1.0;

//     if (w <= minW) return minScale;
//     if (w >= maxW) return maxScale;

//     const t = (w - minW) / (maxW - minW);
//     const eased = Math.pow(t, 0.85);
//     return minScale + (maxScale - minScale) * eased;
//   };

//   const scale = computeScale(windowWidth);
//   const isMobile = windowWidth < 760;

//   // ✅ cycle between imageOne and imageThree every 3s on mobile
//   useEffect(() => {
//     if (isMobile) {
//       const interval = setInterval(() => {
//         setBgImageIndex((prev) => (prev === 0 ? 1 : 0));
//       }, 3000); // 3 seconds interval
//       return () => clearInterval(interval);
//     }
//   }, [isMobile]);

//   const backgroundImages = [imageOne, imageThree];
//   const currentBg = backgroundImages[bgImageIndex];

//   const leftCol = "40%";
//   const centerCol = "44%";
//   const rightCol = "16%";

//   return (

//     <section
//       style={{
//         backgroundColor: backgroundColor || "#e8fdf7",
//         // padding: `${60 * scale}px ${48 * scale}px`,
//         padding: isMobile ? 0 : `${60 * scale}px ${48 * scale}px`, // ✅ remove padding in mobile
//         borderRadius: containerRadius ? `${containerRadius * scale}px` : `${18 * scale}px`,
//         overflow: "hidden",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 1280,
//           margin: "0 auto",
//           display: "flex",
//           gap: 32 * scale,
//           alignItems: isMobile ? "center" : "flex-start",
//           justifyContent: "space-between",
//           flexWrap: isMobile ? "wrap" : "nowrap",
//           flexDirection: isMobile ? "column" : "row",
//         }}
//       >

//         {/* LEFT - big image */}
//         {!isMobile && (
//           <div
//             style={{
//               flex: `0 0 ${leftCol}`,
//               maxWidth: 360 * scale,
//               width: undefined,
//             }}
//           >
//             <img
//               src={imageOne}
//               alt="Main"
//               style={{
//                 width: "100%",
//                 height: 580 * scale,
//                 objectFit: "cover",
//                 borderRadius: 18 * scale,
//                 display: "block",
//               }}
//             />
//           </div>
//         )}


//         {/* CENTER - text section */}
//         <div
//           style={{
//             flex: isMobile ? "0 0 100%" : `0 0 ${centerCol}`,
//             maxWidth: isMobile ? "100%" : 450 * scale,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             position: "relative",
//             padding: isMobile ? `${24 * scale}px` : 0,
//             borderRadius: isMobile ? 16 * scale : 0,

//             // ✅ cycle background between imageOne and imageThree
//             backgroundImage: isMobile ? `url(${currentBg})` : "none",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             transition: "background-image 1s ease-in-out",
//           }}
//         >
//           <div style={{ position: "relative", zIndex: 2 }}>
//             <p
//               style={{
//                 color: captionColor || "#00a67e",
//                 fontWeight: 600,
//                 marginBottom: 12 * scale,
//                 fontSize: 15 * scale,
//                 letterSpacing: 0.6 * scale,
//               }}
//             >
//               {caption}
//             </p>

//             <h2
//               style={{
//                 fontSize: 58 * scale,
//                 lineHeight: 1.12,
//                 margin: `0 0 ${18 * scale}px 0`,
//                 color: titleColor || "#0b2a26",
//                 wordBreak: "break-word",
//               }}
//             >
//               {title}
//             </h2>

//             <p
//               style={{
//                 color: descriptionColor || "#4d5959",
//                 fontSize: 18 * scale,
//                 lineHeight: 1.6,
//                 marginBottom: 22 * scale,
//                 maxWidth: isMobile ? "100%" : 560 * scale,
//                 textAlign: "justify",
//               }}
//             >
//               {description}
//             </p>

//             <button
//               style={{
//                 backgroundColor: buttonColor || "#0a63ff",
//                 color: buttonTextColor || "#fff",
//                 border: "none",
//                 padding: `${12 * scale}px ${28 * scale}px`,
//                 borderRadius: 28 * scale,
//                 fontSize: 16 * scale,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 marginBottom: 8 * scale,
//                 alignSelf: "flex-start",
//               }}
//             >
//               {buttonText}
//             </button>

//             {/* imageTwo positioning */}
//             {imageTwo &&
//               (isMobile ? (
//                 <img
//                   src={imageTwo}
//                   alt="Decorative"
//                   style={{
//                     marginTop: 16 * scale,
//                     width: 96 * scale,
//                     height: 96 * scale,
//                     borderRadius: 12 * scale,
//                     objectFit: "cover",
//                     alignSelf: "flex-end",
//                   }}
//                 />
//               ) : (
//                 <img
//                   src={imageTwo}
//                   alt="Decorative"
//                   style={{
//                     width: 96 * scale,
//                     height: 96 * scale,
//                     borderRadius: 12 * scale,
//                     objectFit: "cover",
//                     position: "absolute",
//                     right: 0,
//                     bottom: 0,
//                   }}
//                 />
//               ))}
//           </div>

//           {/* ✅ Light overlay for readability */}
//           {isMobile && (
//             <div
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 background: "rgba(255,255,255,0.7)",
//                 borderRadius: 16 * scale,
//                 zIndex: 1,
//               }}
//             ></div>
//           )}
//         </div>

//         {/* RIGHT - tall image (desktop only) */}
//         {!isMobile && (
//           <div
//             style={{
//               flex: `0 0 ${rightCol}`,
//               minWidth: 350 * scale,
//               display: "flex",
//               justifyContent: "center",
//               marginTop: 150 * scale,
//             }}
//           >
//             <img
//               src={imageThree}
//               alt="Side"
//               style={{
//                 width: 320 * scale,
//                 height: 420 * scale,
//                 objectFit: "cover",
//                 borderRadius: 16 * scale,
//                 display: "block",
//                 marginTop: 70 * scale,
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default RecoveryHero;
