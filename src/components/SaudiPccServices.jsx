// import React, { useRef, useEffect, useState } from "react";

// const iconData = [
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon4.png",
//     title: "Faster, Simple more Secure",
//     description: "We deliver a highly secure and reliable service process.",
//     link: "https://example.com/secure-process",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon3.png",
//     title: "End-to-end service (MOFA, translation, apostille, courier)",
//     description:
//       "We handle everything including MOFA attestation, courier and certified translations.",
//     link: "https://example.com/end-to-end",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon1.png",
//     title: "Direct approach with Saudi police",
//     description:
//       "We work directly with Saudi authorities to speed up the process securely.",
//     link: "https://example.com/saudi-police",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon2.png",
//     title: "Trusted by professionals, nurses & job seekers worldwide",
//     description: "Trusted across 50+ countries.",
//     link: "https://example.com/trust",
//   },
// ];

// const IconCard = ({ icon, title, description, link, scale }) => {
//   const [hover, setHover] = useState(false);

//   const fontSize = Math.min(16 * scale, 18);
//   const descriptionFont = Math.min(13 * scale, 13);

//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//         gap: 10 * scale,
//         width: 200 * scale,
//         cursor: "pointer",
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <div
//         style={{
//           width: 70 * scale,
//           height: 70 * scale,
//           background: "#2F3192",
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src={icon}
//           alt={title}
//           style={{
//             width: "60%",
//             height: "60%",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       <p
//         style={{
//           fontSize: fontSize,
//           fontWeight: 500,
//           margin: 0,
//           lineHeight: 1.4,
//           color: "#000",
//           maxHeight: `${1.4 * fontSize * 3}px`,
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           display: "-webkit-box",
//           WebkitLineClamp: 3,
//           WebkitBoxOrient: "vertical",
//         }}
//       >
//         {title}
//       </p>

//       {hover && (
//         <a
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{
//             position: "absolute",
//             top: 75 * scale,
//             width: "100%",
//             background: "#f5f5f5",
//             color: "#1e40af",
//             fontSize: descriptionFont,
//             padding: `${6 * scale}px ${8 * scale}px`,
//             borderRadius: 4 * scale,
//             zIndex: 10,
//             boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//             textDecoration: "none",
//           }}
//         >
//           {description}
//         </a>
//       )}
//     </div>
//   );
// };

// const SaudiPCCSection = () => {
//   const containerRef = useRef(null);
//   const [scale, setScale] = useState(1);
//   const [outerMargin, setOuterMargin] = useState(80);


//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;

//       const margin = width <= 900 ? 0 : 80;

//       const containerWidth = containerRef.current?.offsetWidth || 950;
//       let newScale = containerWidth / 950;
//       if (newScale > 1) newScale = 1;

//       setOuterMargin(margin);
//       setScale(newScale);
//     };

//     handleResize();

//     const timeout = setTimeout(handleResize, 50);

//     window.addEventListener("resize", handleResize);
//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         width: "100vw", 
//         overflowX: "hidden", // prevent horizontal scroll
//         paddingLeft: outerMargin,
//         paddingRight: outerMargin,
//         paddingTop: 40 * scale,
//         paddingBottom: 0,
//         backgroundColor: "#F3F5FA",
//         backgroundImage:
//           "url(https://project251.hrstride.academy/wp-content/uploads/2025/07/Vector-7-1.png)",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         boxSizing: "border-box", 
//       }}
//     >
//       <div
//         ref={containerRef}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           width: "100%", // important
//           boxSizing: "border-box",

//         }}
//       >
//         <h3
//           style={{
//             color: "#2F3192",
//             fontSize: 13 * scale,
//             fontWeight: 600,
//             marginBottom: 8 * scale,
//           }}
//         >
//           CHOOSE US FOR SAUDI PCC SERVICE?
//         </h3>

//         <h1
//           style={{
//             fontSize: 45 * scale,
//             fontWeight: 700,
//             textAlign: "center",
//             lineHeight: 1.3,
//             marginBottom: 30 * scale,
//             color: "#2F3192",
//           }}
//         >
//           We are Experienced <br /> Saudi PCC Online Service Provider
//         </h1>

//         <div className="mt-5"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             gap: 30 * scale,

//           }}
//         >
//           <div className="mb-4" style={{ display: "flex", flexDirection: "column", gap: 80 * scale }}>
//             {iconData.slice(0, 2).map((item, i) => (
//               <IconCard key={i} {...item} scale={scale} />
//             ))}
//           </div>

//           <div style={{ width: 520 * scale, flexShrink: 0 }}>
//             <img
//               src="https://project251.hrstride.academy/wp-content/uploads/2025/07/all-peoples-2.png"
//               alt="Main"
//               style={{ width: "100%", height: "auto", objectFit: "contain" }}
//             />
//           </div>

//           <div className="mb-4" style={{ display: "flex", flexDirection: "column", gap: 80 * scale }}>
//             {iconData.slice(2).map((item, i) => (
//               <IconCard key={i} {...item} scale={scale} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaudiPCCSection;
import React, { useRef, useEffect, useState } from "react";

const iconData = [
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon4.png",
    title: "Faster, Simple more Secure",
    description: "We deliver a highly secure and reliable service process.",
    link: "https://example.com/secure-process",
  },
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon3.png",
    title: "End-to-end service (MOFA, translation, apostille, courier)",
    description:
      "We handle everything including MOFA attestation, courier and certified translations.",
    link: "https://example.com/end-to-end",
  },
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon1.png",
    title: "Direct approach with Saudi police",
    description:
      "We work directly with Saudi authorities to speed up the process securely.",
    link: "https://example.com/saudi-police",
  },
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon2.png",
    title: "Trusted by professionals, nurses & job seekers worldwide",
    description: "Trusted across 50+ countries.",
    link: "https://example.com/trust",
  },
];

const IconCard = ({ icon, title, description, link, scale }) => {
  const [hover, setHover] = useState(false);

  const fontSize = Math.min(14 * scale, 12);
  const descriptionFont = Math.min(12 * scale, 10);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 10 * scale,
        // width: 200 * scale,
        width: Math.max(150 * scale, 10),

        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          width: 70 * scale,
          height: 70 * scale,
          background: "#2F3192",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{
            width: "60%",
            height: "60%",
            objectFit: "contain",
          }}
        />
      </div>

      <p
        style={{
          fontSize: fontSize,
          fontWeight: 500,
          margin: 0,
          lineHeight: 1.4,
          color: "#000",
          maxHeight: `${1.4 * fontSize * 3}px`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {title}
      </p>

      {hover && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            top: 75 * scale,
            width: "100%",
            background: "#f5f5f5",
            color: "#1e40af",
            fontSize: descriptionFont,
            padding: `${6 * scale}px ${8 * scale}px`,
            borderRadius: 4 * scale,
            zIndex: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            textDecoration: "none",
          }}
        >
          {description}
        </a>
      )}
    </div>
  );
};

const SaudiPCCSection = () => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [outerMargin, setOuterMargin] = useState(80);


  useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;

    const margin = width <= 600 ? 10 : width <= 900 ? 30 : 80;
    const maxWidth = 950;
    const containerWidth = Math.min(window.innerWidth - margin * 2, maxWidth);
    let newScale = containerWidth / maxWidth;

    if (newScale > 1) newScale = 1;

    setOuterMargin(margin);
    setScale(newScale);
  };

  handleResize();

  const timeout = setTimeout(handleResize, 50);

  window.addEventListener("resize", handleResize);
  return () => {
    clearTimeout(timeout);
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return (
    <div
      style={{
        width: "100vw", 
        overflowX: "hidden", // prevent horizontal scroll
        paddingLeft: outerMargin,
        paddingRight: outerMargin,
        paddingTop: 40 * scale,
        paddingBottom: 0,
        backgroundColor: "#F3F5FA",
        backgroundImage:
          "url(https://project251.hrstride.academy/wp-content/uploads/2025/07/Vector-7-1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxSizing: "border-box", 
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%", // important
          boxSizing: "border-box",

        }}
      >
        <h3
          style={{
            color: "#2F3192",
            fontSize: 13 * scale,
            fontWeight: 600,
            marginBottom: 8 * scale,
          }}
        >
          CHOOSE US FOR SAUDI PCC SERVICE?
        </h3>

        <h1
          style={{
            fontSize: 45 * scale,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: 30 * scale,
            color: "#2F3192",
          }}
        >
          We are Experienced <br /> Saudi PCC Online Service Provider
        </h1>

        <div className="mt-5"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 30 * scale,

          }}
        >
          <div className="mb-4" style={{ display: "flex", flexDirection: "column", gap: 80 * scale }}>
            {iconData.slice(0, 2).map((item, i) => (
              <IconCard key={i} {...item} scale={scale} />
            ))}
          </div>

          <div style={{ width: 520 * scale, flexShrink: 0 }}>
            <img
              src="https://project251.hrstride.academy/wp-content/uploads/2025/07/all-peoples-2.png"
              alt="Main"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>

          <div className="mb-4" style={{ display: "flex", flexDirection: "column", gap: 80 * scale }}>
            {iconData.slice(2).map((item, i) => (
              <IconCard key={i} {...item} scale={scale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaudiPCCSection;