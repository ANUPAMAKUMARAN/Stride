
// import React, { useRef, useEffect, useState } from "react";

// const BASE_WIDTH = 950;

// const iconData = [
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon1.png",
//     title: "End-to-end service (MOFA, translation, apostille, courier)",
//     description:
//       "We handle everything including MOFA attestation, courier and certified translations.",
//     link: "https://example.com/end-to-end",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon2.png",
//     title: "Direct approach with Saudi police",
//     description:
//       "We work directly with Saudi authorities to speed up the process securely.",
//     link: "https://example.com/saudi-police",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon3.png",
//     title: "Faster, Simple more Secure",
//     description: "We deliver a highly secure and reliable service process.",
//     link: "https://example.com/secure-process",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon4.png",
//     title: "Trusted by professionals, nurses & job seekers worldwide",
//     description: "Trusted across 50+ countries.",
//     link: "https://example.com/trust",
//   },
// ];


// const IconCard = ({ icon, title, description, link, scale }) => {
//   const [hover, setHover] = useState(false);

//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//         gap: 8 * scale,
//         width: 180 * scale,
//         cursor: "pointer",
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       {/* Icon Circle with Image */}
//       <div
//         style={{
//           width: 50 * scale,
//           height: 50 * scale,
//           background: "#1e40af",
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

//       {/* Title */}
//       <p
//         style={{
//           fontSize: 14 * scale,
//           margin: 0,
//           color: hover ? "#1e40af" : "#333",
//           transition: "color 0.3s ease",
//         }}
//       >
//         {title}
//       </p>

//       {/* Hover Box Clickable */}
//       {hover && (
//         <a
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{
//             position: "absolute",
//             top: 60 * scale, // just below icon
//             width: "100%",
//             background: "#f5f5f5",
//             color: "#1e40af",
//             fontSize: 12 * scale,
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

//   useEffect(() => {
//     const handleResize = () => {
//       const containerWidth = containerRef.current?.offsetWidth || BASE_WIDTH;
//       const newScale = containerWidth / BASE_WIDTH;
//       setScale(newScale > 1 ? 1.2 : newScale);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         backgroundColor: "#F3F5FA",
//         backgroundImage:
//           "url(https://project251.hrstride.academy/wp-content/uploads/2025/07/Vector-7-1.png)",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         // padding: `${60 * scale}px 20px`,
//         paddingTop: 40 * scale,
//         paddingBottom: 0 * scale,
//         paddingLeft: 20,
//         paddingRight: 20,
//       }}
//     >
//       <h3
//         style={{
//           color: "#3c7ef5",
//           fontSize: 12 * scale,
//           fontWeight: 600,
//           marginBottom: 8 * scale,
//         }}
//       >
//         CHOOSE US FOR SAUDI PCC SERVICE?
//       </h3>
//       <h1
//         style={{
//           fontSize: 40 * scale,
//           fontWeight: 700,
//           textAlign: "center",
//           lineHeight: 1.2,
//           marginBottom: 40 * scale,
//         }}
//       >
//         We are Experienced <br /> Saudi PCC Online Service Provider
//       </h1>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100%",
//           gap: 30 * scale,
//         }}
//       >
//         {/* Left Icons */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 90 * scale }}>
//           {iconData.slice(0, 2).map((item, i) => (
//             <IconCard key={i} {...item} scale={scale} />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div style={{ width: 500 * scale, flexShrink: 0 }}>
//           <img
//             src="https://project251.hrstride.academy/wp-content/uploads/2025/07/all-peoples-2.png"
//             alt="Main"
//             style={{ width: "100%", height: "auto", objectFit: "contain" }}
//           />
//         </div>

//         {/* Right Icons */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 90 * scale }}>
//           {iconData.slice(2).map((item, i) => (
//             <IconCard key={i} {...item} scale={scale} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaudiPCCSection;


import React, { useRef, useEffect, useState } from "react";

const BASE_WIDTH = 950;

const iconData = [
  
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon4.png",
    title: "Faster, Simple more Secure",
    description: "We deliver a highly secure and reliable service process.",
    link: "https://example.com/secure-process",
  },
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon3.png" ,
    title: "End-to-end service (MOFA, translation, apostille, courier)",
    description:
      "We handle everything including MOFA attestation, courier and certified translations.",
    link: "https://example.com/end-to-end",
  },
  
  {
    icon:"https://project251.hrstride.academy/wp-content/uploads/2025/07/icon1.png",
    title: "Direct approach with Saudi police",
    description:
      "We work directly with Saudi authorities to speed up the process securely.",
    link: "https://example.com/saudi-police",
  },
  {
    icon:  "https://project251.hrstride.academy/wp-content/uploads/2025/07/icon2.png",
    title: "Trusted by professionals, nurses & job seekers worldwide",
    description: "Trusted across 50+ countries.",
    link: "https://example.com/trust",
  },
];

const IconCard = ({ icon, title, description, link, scale }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 10 * scale,
        width: 200 * scale,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Icon Circle with Image */}
      <div
        style={{
          width: 70 * scale,
          height: 70 * scale,
          background: "#2F3192", // updated to match Figma color
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

      {/* Title */}
      <p
        style={{
          fontSize: 18 * scale,
          fontWeight: 500,
          margin: 0,
          lineHeight: 1.4,
          color: "#000", // always black, no hover effect as per ref
        }}
      >
        {title}
      </p>

      {/* Hover Description (Optional) */}
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
            fontSize: 13 * scale,
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

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || BASE_WIDTH;
      const newScale = containerWidth / BASE_WIDTH;
      setScale(newScale > 1 ? 1 : newScale); // cap max scale for very large screens
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F3F5FA",
        backgroundImage:
          "url(https://project251.hrstride.academy/wp-content/uploads/2025/07/Vector-7-1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        paddingTop: 40 * scale,
        paddingBottom: 0, // ✅ remove bottom spacing
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {/* Blue Label */}
      <h3
        style={{
          color: "#2F3192", // ✅ update heading color
          fontSize: 13 * scale,
          fontWeight: 600,
          marginBottom: 8 * scale,
        }}
      >
        CHOOSE US FOR SAUDI PCC SERVICE?
      </h3>

      {/* Main Heading */}
      <h1
        style={{
          fontSize: 45 * scale, // ✅ increased font
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.3,
          marginBottom: 30 * scale,
          color: "#2F3192", // ✅ match heading color
        }}
      >
        We are Experienced <br /> Saudi PCC Online Service Provider
      </h1>

      {/* Icon Row + Center Image */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 30 * scale,
        }}
      >
        {/* Left Icons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 80 * scale }}>
          {iconData.slice(0, 2).map((item, i) => (
            <IconCard key={i} {...item} scale={scale} />
          ))}
        </div>

        {/* Center Image */}
        <div style={{ width: 520 * scale, flexShrink: 0 }}>
          <img
            src="https://project251.hrstride.academy/wp-content/uploads/2025/07/all-peoples-2.png"
            alt="Main"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Right Icons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 80 * scale }}>
          {iconData.slice(2).map((item, i) => (
            <IconCard key={i} {...item} scale={scale} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaudiPCCSection;
