


import React, { useEffect, useState, useRef } from "react";

const FeatureCard = ({ icon, title, description, fontScale, showDescription }) => {
  const cardWidth = 240 * fontScale;
  const cardHeight = 200 * fontScale;
  const iconSize = 2.5 * fontScale;
  const titleSize = 1.2 * fontScale;
  const descSize = 1.0 * fontScale;

  return (
    <div
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        background: "#fff",
        borderRadius: `${12 * fontScale}px`,
        padding: `${20 * fontScale}px`,
        textAlign: "center",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: `${iconSize}rem`, marginBottom: `${10 * fontScale}px` }}>{icon}</div>
        <h3
          style={{
            fontSize: `${titleSize}rem`,
            fontWeight: "600",
            marginBottom: `${showDescription ? 6 * fontScale : 0}px`,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h3>
      </div>
      {showDescription && (
        <p
          style={{
            fontSize: `${descSize}rem`,
            color: "#555",
            margin: 0,
            marginTop: `${10 * fontScale}px`,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

const CleanKeralaLanding = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // ✅ ADD HERE
  const containerRef = useRef(null);
  const [fontScale, setFontScale] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [cardGap, setCardGap] = useState(24);

  const updateLayout = () => {
    const width = containerRef.current?.offsetWidth || window.innerWidth;
    const baseWidth = (240 + cardGap) * 3; // total width for 3 cards
    const scale = Math.max(0.3, Math.min(1, width / baseWidth)); // allow scale down to 0.3

    setFontScale(scale);
    setWindowWidth(width);  // ✅ update windowWidth
    setShowDescription(width > 400);
    setCardGap(width < 500 ? 6 : width < 768 ? 12 : 24);
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return (
    <div ref={containerRef} style={{ fontFamily: "Arial, sans-serif", background: "#fefefe",height:"calc(100vh-10px)" }}>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          height: `${500 * fontScale}px`, // keep image height controlled
          overflow: "hidden", // clip the shade here
          zIndex: 1, // ensure background stays back
        }}
      >
        {/* Background Image Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://img.freepik.com/premium-photo/blue-water-forest-lake-with-pine-trees_104337-4178.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />

        {/* Dark Overlay Layer only inside this container */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 2,
          }}
        />

        {/* Hero Content */}
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
            padding: "20px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: `${48 * fontScale}px`,
              fontWeight: "bold",
              marginBottom: `${20 * fontScale}px`,
              whiteSpace: "nowrap",
            }}
          >
            Towards a Clean Kerala
          </h1>

          <p
            style={{
              fontSize: `${1.2 * fontScale}rem`,
              marginBottom: `${20 * fontScale}px`,
            }}
          >
            Uniting efforts for a greener, cleaner, and healthier Kerala
          </p>

          <button
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: `${10 * fontScale}px ${20 * fontScale}px`,
              fontSize: `${1 * fontScale}rem`,
              borderRadius: `${6 * fontScale}px`,
              cursor: "pointer",
            }}
          >
            Explore Programs
          </button>
        </div>
      </div>

      {/* Feature Cards */}


      <div
        style={{
          width: "100%",
          zIndex: 4, // above overlay
          marginTop: `-${100 * fontScale}px`,
          display: "flex",
          justifyContent: "center",

          position: "relative",

        }}
      >
        {/* This container scales uniformly */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: `${cardGap}px`,
            padding: "0 16px",
            width: "100%",
            maxWidth: `${(240 + cardGap) * 3}px`,
            transform: `scale(${fontScale})`,
            transformOrigin: "top center",

          }}
        >
          <FeatureCard
            icon="🧹"
            title="Management"
            description="Improve collection, segregation, and disposal practices."
            fontScale={1}
            showDescription={showDescription}
          />
          <FeatureCard
            icon="♻️"
            title="Sustainability"
            description="Promote waste reduction and resource reuse."
            fontScale={1}
            showDescription={showDescription}
          />
          <FeatureCard
            icon="🌿"
            title="Volunteers"
            description="Engage citizens in ground-level initiatives."
            fontScale={1}
            showDescription={showDescription}
          />
        </div>
      </div>


    </div>
  );
};

export default CleanKeralaLanding;
// import React, { useEffect, useState } from "react";

// const FeatureCard = ({ icon, title, description, isMobile, scale }) => (
//   <div
//     style={{
//       flex: "1 1 auto",
//       minWidth: isMobile ? "90px" : "200px",
//       maxWidth: isMobile ? "120px" : "300px",
//       background: "#fff",
//       borderRadius: "12px",
//       padding: isMobile ? "10px" : "24px",
//       textAlign: "center",
//       boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//       zIndex: 3,
//       position: "relative",
//     }}
//   >
//     <div
//       style={{
//         fontSize: isMobile ? "1.8rem" : "2.5rem",
//         marginBottom: isMobile ? "8px" : "16px",
//       }}
//     >
//       {icon}
//     </div>
//     <h3
//       style={{
//         fontSize: isMobile ? "0.85rem" : "1.2rem",
//         fontWeight: "600",
//         marginBottom: isMobile ? "4px" : "10px",
//         whiteSpace: "nowrap",
//       }}
//     >
//       {title}
//     </h3>
//     {!isMobile && (
//       <p style={{ fontSize: "0.95rem", color: "#555" }}>{description}</p>
//     )}
//   </div>
// );

// const CleanKeralaLanding = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [scale, setScale] = useState(1);
//   const [cardGap, setCardGap] = useState(24);
//   const [heroFontSize, setHeroFontSize] = useState(48);

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;

//       if (width < 768) {
//         setIsMobile(true);
//         setScale(0.7);
//         setHeroFontSize(24);
//         setCardGap(12);
//       } else if (width < 1024) {
//         setIsMobile(false);
//         setScale(0.9);
//         setHeroFontSize(36);
//         setCardGap(20);
//       } else {
//         setIsMobile(false);
//         setScale(1);
//         setHeroFontSize(48);
//         setCardGap(24);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", position: "relative", background: "#fefefe" }}>
//       {/* Hero Section */}
//       <div
//         style={{
//           backgroundImage: `url('https://images.stockcake.com/public/0/7/3/073fc0c4-e7df-4830-a82b-de08181ad209_large/sunlit-forest-lake-stockcake.jpg')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: `${520 * scale}px`,
//           color: "white",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           padding: "20px",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <h1
//           style={{
//             fontSize: `${heroFontSize}px`,
//             fontWeight: "bold",
//             marginBottom: `${20 * scale}px`,
//             whiteSpace: "nowrap",
//           }}
//         >
//           Towards a Clean Kerala
//         </h1>

//         {isMobile ? (
//           <>
//             <p style={{ fontSize: "16px", marginBottom: "8px" }}>
//               Uniting efforts for a greener, cleaner, and
//             </p>
//             <p style={{ fontSize: "16px", marginBottom: "20px" }}>
//               healthier Kerala
//             </p>
//           </>
//         ) : (
//           <p style={{ fontSize: "18px", marginBottom: "30px" }}>
//             Uniting efforts for a greener, cleaner, and healthier Kerala
//           </p>
//         )}


//   <button
//     style={{
//       backgroundColor: "#28a745",
//       color: "#fff",
//       border: "none",
//       padding: "12px 24px",
//       fontSize: "16px",
//       borderRadius: "6px",
//       cursor: "pointer",
//     }}
//   >
//     Explore Programs
//   </button>




//       </div>

//       {/* Feature Cards */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "nowrap",
//           justifyContent: "center",
//           alignItems: "stretch",
//           gap: `${cardGap}px`,
//           width: "100%",
//           padding: `${40 * scale}px 20px`,
//           position: "relative",
//           top: `-${130 * scale}px`,
//           zIndex: 3,
//           boxSizing: "border-box",
//         }}
//       >
//         <FeatureCard
//           icon="🧹"
//           title={isMobile ? "Management" : "Waste Management"}
//           description="Improve collection, segregation, and disposal practices."
//           isMobile={isMobile}
//           scale={scale}
//         />
//         <FeatureCard
//           icon="♻️"
//           title="Sustainability"
//           description="Promote waste reduction and resource reuse."
//           isMobile={isMobile}
//           scale={scale}
//         />
//         <FeatureCard
//           icon="🌿"
//           title="Volunteers"
//           description="Engage citizens in ground-level initiatives."
//           isMobile={isMobile}
//           scale={scale}
//         />
//       </div>
//     </div>
//   );
// };

// export default CleanKeralaLanding;

