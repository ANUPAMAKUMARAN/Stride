import React, { useState, useEffect } from "react";

const RecoveryPage = ({ attributes }) => {
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
            {/* ✅ Desktop view (3 columns) */}
            {!isMobile && (
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        display: "flex",
                        gap: 32 * scale,
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}
                >
                    {/* LEFT IMAGE */}
                    <div style={{ flex: `0 0 ${leftCol}`, maxWidth: 360 * scale }}>
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

                    {/* CENTER TEXT */}
                    <div
                        style={{
                            flex: `0 0 ${centerCol}`,
                            maxWidth: 450 * scale,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
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
                        <p
                            style={{
                                color: descriptionColor || "#4d5959",
                                fontSize: 16 * scale,
                                lineHeight: 1.6,
                                marginBottom: 22 * scale,
                                textAlign: "justify",
                                textAlignLast: "justify",  
                            }}
                        >
                            {description}
                        </p>




                        <div style={{ display: "flex", gap: 16 * scale, alignItems: "center" }}>
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
                                }}
                            >
                                {buttonText}
                            </button>

                            {/* imageTwo visible only on desktop */}
                            {imageTwo && (
                                <img
                                    src={imageTwo}
                                    alt="Decorative"
                                    style={{
                                        width: 96 * scale,
                                        height: 96 * scale,
                                        objectFit: "cover",
                                        borderRadius: 12 * scale,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
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
                </div>
            )}

            {/* ✅ Mobile view (stacked sections) */}
            {isMobile && (
                <div style={{ display: "flex", flexDirection: "column", gap: 32 * scale }}>
                    {/* Section 1 - imageOne */}
                    <img
                        src={imageOne}
                        alt="Main"
                        style={{
                            width: "100%",
                            borderRadius: 16 * scale,
                            objectFit: "cover",
                        }}
                    />

                    {/* Section 2 - text */}
                    <div>
                        <p
                            style={{
                                color: captionColor || "#00a67e",
                                fontWeight: 600,
                                marginBottom: 12 * scale,
                                fontSize: 15 * scale,
                                letterSpacing: 0.6 * scale,
                                textAlign: "center",
                            }}
                        >
                            {caption}
                        </p>

                        <h2
                            style={{
                                fontSize: 36 * scale,
                                lineHeight: 1.2,
                                margin: `0 0 ${18 * scale}px 0`,
                                color: titleColor || "#0b2a26",
                                textAlign: "center",
                            }}
                        >
                            {title}
                        </h2>

                        <p
                            style={{
                                color: descriptionColor || "#4d5959",
                                fontSize: 16 * scale,
                                lineHeight: 1.6,
                                marginBottom: 22 * scale,
                                textAlign: "center",
                            }}
                        >
                            {description}
                        </p>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 * scale }}>
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
                                }}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>

                    {/* Section 3 - imageThree */}
                    <img
                        src={imageThree}
                        alt="Side"
                        style={{
                            width: "100%",
                            borderRadius: 16 * scale,
                            objectFit: "cover",
                        }}
                    />
                </div>
            )}
        </section>
    );
};

export default RecoveryPage;

// import React, { useState, useEffect } from "react";

// const RecoveryPage = ({ attributes }) => {
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

//   const leftCol = "40%";
//   const centerCol = "44%";
//   const rightCol = "16%";

//   return (
//     <section
//       style={{
//         backgroundColor: backgroundColor || "#e8fdf7",
//         padding: `${60 * scale}px ${48 * scale}px`,
//         borderRadius: containerRadius ? `${containerRadius * scale}px` : `${18 * scale}px`,
//         overflow: "hidden",
//       }}
//     >
//       {/* ✅ Desktop view (3 columns) */}
//       {!isMobile && (
//         <div
//           style={{
//             maxWidth: 1280,
//             margin: "0 auto",
//             display: "flex",
//             gap: 32 * scale,
//             alignItems: "flex-start",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* LEFT IMAGE */}
//           <div style={{ flex: `0 0 ${leftCol}`, maxWidth: 360 * scale }}>
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

//           {/* CENTER TEXT */}
//           <div
//             style={{
//               flex: `0 0 ${centerCol}`,
//               maxWidth: 450 * scale,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//             }}
//           >
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
//                 textAlign: "justify",
//               }}
//             >
//               {description}
//             </p>

//             <div style={{ display: "flex", gap: 16 * scale, alignItems: "center" }}>
//               <button
//                 style={{
//                   backgroundColor: buttonColor || "#0a63ff",
//                   color: buttonTextColor || "#fff",
//                   border: "none",
//                   padding: `${12 * scale}px ${28 * scale}px`,
//                   borderRadius: 28 * scale,
//                   fontSize: 16 * scale,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 {buttonText}
//               </button>

//               {imageTwo && (
//                 <img
//                   src={imageTwo}
//                   alt="Decorative"
//                   style={{
//                     width: 96 * scale,
//                     height: 96 * scale,
//                     objectFit: "cover",
//                     borderRadius: 12 * scale,
//                   }}
//                 />
//               )}
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
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
//         </div>
//       )}

//       {/* ✅ Mobile view (stacked sections) */}
//       {isMobile && (
//         <div style={{ display: "flex", flexDirection: "column", gap: 32 * scale }}>
//           {/* Section 1 - imageOne */}
//           <img
//             src={imageOne}
//             alt="Main"
//             style={{
//               width: "100%",
//               borderRadius: 16 * scale,
//               objectFit: "cover",
//             }}
//           />

//           {/* Section 2 - text */}
//           <div>
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
//                 fontSize: 36 * scale,
//                 lineHeight: 1.2,
//                 margin: `0 0 ${18 * scale}px 0`,
//                 color: titleColor || "#0b2a26",
//               }}
//             >
//               {title}
//             </h2>

//             <p
//               style={{
//                 color: descriptionColor || "#4d5959",
//                 fontSize: 16 * scale,
//                 lineHeight: 1.6,
//                 marginBottom: 22 * scale,
//                 textAlign: "justify",
//               }}
//             >
//               {description}
//             </p>

//             <div style={{ display: "flex", gap: 16 * scale, alignItems: "center", flexWrap: "wrap" }}>
//               <button
//                 style={{
//                   backgroundColor: buttonColor || "#0a63ff",
//                   color: buttonTextColor || "#fff",
//                   border: "none",
//                   padding: `${12 * scale}px ${28 * scale}px`,
//                   borderRadius: 28 * scale,
//                   fontSize: 16 * scale,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 {buttonText}
//               </button>

//               {imageTwo && (
//                 <img
//                   src={imageTwo}
//                   alt="Decorative"
//                   style={{
//                     width: 80 * scale,
//                     height: 80 * scale,
//                     objectFit: "cover",
//                     borderRadius: 12 * scale,
//                   }}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Section 3 - imageThree */}
//           <img
//             src={imageThree}
//             alt="Side"
//             style={{
//               width: "100%",
//               borderRadius: 16 * scale,
//               objectFit: "cover",
//             }}
//           />
//         </div>
//       )}
//     </section>
//   );
// };

// export default RecoveryPage;
