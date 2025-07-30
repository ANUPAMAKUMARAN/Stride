

import React from "react";
import img2 from "../assets/landingImg.png";

const FeatureCard = ({ icon, title, description, hideText }) => {
  const screenWidth = window.innerWidth;

  let device = "mobile";
  if (screenWidth >= 1024) device = "desktop";
  else if (screenWidth >= 600) device = "tablet";

  const sizeConfig = {
    mobile: {
      width: "clamp(70px, 25vw, 130px)",
      height: "clamp(80px, 28vw, 135px)",
      iconSize: "clamp(20px, 6vw, 28px)",
      titleSize: "clamp(12px, 3vw, 16px)",
      descSize: "clamp(10px, 2.5vw, 14px)",
    },
    tablet: {
      width: "clamp(120px, 24vw, 200px)",
      height: "clamp(100px, 25vw, 180px)",
      iconSize: "clamp(26px, 5vw, 32px)",
      titleSize: "clamp(13px, 2.5vw, 18px)",
      descSize: "clamp(11px, 2vw, 15px)",
    },
    desktop: {
      width: "clamp(160px, 28vw, 260px)",
      height: "clamp(135px, 20vw, 210px)",
      iconSize: "clamp(28px, 4vw, 36px)",
      titleSize: "clamp(14px, 1.8vw, 20px)",
      descSize: "clamp(13px, 1.4vw, 18px)",
    },
  };

  const { width, height, iconSize, titleSize, descSize } = sizeConfig[device];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "clamp(0.6rem, 1.2vw, 1.2rem)",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: iconSize,
          marginBottom: "8px",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: titleSize,
          fontWeight: 600,
          marginBottom: hideText ? 0 : "4px",
        }}
      >
        {title}
      </h3>
      {!hideText && (
        <p
          style={{
            fontSize: descSize,
            color: "#333",
            lineHeight: 1.4,
            maxWidth: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};


const CleanKeralaLanding = () => {
  // Responsive check using state (to support re-renders on resize)
  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.innerWidth < 768
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          height: "70vh",
          minHeight: "400px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "16px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Towards a Clean Kerala
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 20px)",
              marginBottom: "24px",
              maxWidth: "90%",
            }}
          >
            Uniting efforts for a greener, cleaner, and healthier Kerala
          </p>
          <button
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "clamp(6px, 1vw, 12px) clamp(12px, 2vw, 24px)",
              fontSize: "clamp(12px, 1.5vw, 18px)",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            Explore Programs
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          marginTop: "-70px",
          position: "relative",
          zIndex: 5,
          padding: "0 16px",
          
        }}
      >
        <div className="py-2"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            maxWidth: "100%",
            margin: "0 auto",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <FeatureCard
            icon="🧹"
            title=" Management"
            description="Improve collection, segregation,and disposal practices."
            hideText={isSmallScreen}
          />
          <FeatureCard
            icon="♻️"
            title="Sustainability"
            description="Promote waste reduction and resource reuse."
            hideText={isSmallScreen}
          />
          <FeatureCard
            icon="🌿"
            title="Volunteers"
            description="Engage citizens in ground-level initiatives."
            hideText={isSmallScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default CleanKeralaLanding;

// import React, { useEffect, useState } from "react";
// import img2 from "../assets/landingImg.png";

// // FeatureCard with scale
// const FeatureCard = ({ icon, title, description, hideText, scale }) => {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: 16 * scale,
//         padding: 16 * scale,
//         textAlign: "center",
//         boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
//         width: 260 * scale,
//         height: 210 * scale,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         flexShrink: 0,
//       }}
//     >
//       <div
//         style={{
//           fontSize: 36 * scale,
//           marginBottom: 8 * scale,
//         }}
//       >
//         {icon}
//       </div>
//       <h3
//         style={{
//           fontSize: 18 * scale,
//           fontWeight: 600,
//           marginBottom: hideText ? 0 : 4 * scale,
//         }}
//       >
//         {title}
//       </h3>
//       {!hideText && (
//         <p
//           style={{
//             fontSize: 14 * scale,
//             color: "#333",
//             lineHeight: 1.4,
//             maxWidth: "90%",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           {description}
//         </p>
//       )}
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setIsSmallScreen(width < 768);
//       let newScale = width / 1325;
//       if (newScale > 1) newScale = 1;
//       setScale(newScale);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//       {/* Hero Section */}
//       <div
//         style={{
//           position: "relative",
//           height: "70vh",
//           minHeight: 400,
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundImage: `url(${img2})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             zIndex: 1,
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 2,
//           }}
//         />
//         <div
//           style={{
//             position: "relative",
//             zIndex: 3,
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             padding: 16,
//             color: "white",
//           }}
//         >
//           <h1
//             style={{
//               fontSize: 42 * scale,
//               fontWeight: "bold",
//               marginBottom: 16 * scale,
//             }}
//           >
//             Towards a Clean Kerala
//           </h1>
//           <p
//             style={{
//               fontSize: 20 * scale,
//               marginBottom: 24 * scale,
//               maxWidth: "90%",
//             }}
//           >
//             Uniting efforts for a greener, cleaner, and healthier Kerala
//           </p>
//           <button
//             style={{
//               backgroundColor: "#28a745",
//               color: "#fff",
//               border: "none",
//               padding: `${12 * scale}px ${24 * scale}px`,
//               fontSize: 18 * scale,
//               borderRadius: 6 * scale,
//               cursor: "pointer",
//               transition: "background 0.3s",
//             }}
//           >
//             Explore Programs
//           </button>
//         </div>
//       </div>

//       {/* Feature Cards */}
//       <div
//         style={{
//           marginTop: -70 * scale,
//           position: "relative",
//           zIndex: 5,
//           padding: "0 16px",
//         }}
//       >
//         <div
//           className="py-2"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 12 * scale,
//             maxWidth: "100%",
//             margin: "0 auto",
//             flexWrap: "nowrap",
//             overflow: "hidden",
//           }}
//         >
//           <FeatureCard
//             icon="🧹"
//             title="Management"
//             description="Improve collection, segregation,and disposal practices."
//             hideText={isSmallScreen}
//             scale={scale}
//           />
//           <FeatureCard
//             icon="♻️"
//             title="Sustainability"
//             description="Promote waste reduction and resource reuse."
//             hideText={isSmallScreen}
//             scale={scale}
//           />
//           <FeatureCard
//             icon="🌿"
//             title="Volunteers"
//             description="Engage citizens in ground-level initiatives."
//             hideText={isSmallScreen}
//             scale={scale}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CleanKeralaLanding;
