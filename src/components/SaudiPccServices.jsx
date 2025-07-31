

// import React, { useRef, useEffect, useState } from "react";

// const iconData = [

//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-4.png",
//     title: "End-to-end service (MOFA, translation, apostille, courier)",
//     description:
//       "We handle everything including MOFA attestation, courier and certified translations.",
//     link: "https://example.com/end-to-end",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-3.png",
//     title: "Faster, Simple more Secure",
//     description: "We deliver a highly secure and reliable service process.",
//     link: "https://example.com/secure-process",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-2.png",
//     title: "Direct approach with Saudi police",
//     description:
//       "We work directly with Saudi authorities to speed up the process securely.",
//     link: "https://example.com/saudi-police",
//   },
//   {  
//      icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-1.png",
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
//         gap: 10 * scale,
//         width: `${300 * scale}px`,
//         height: `${200 * scale}px`,
//         cursor: "pointer",
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <div
//         style={{
//           width: `${98 * scale}px`,
//           height: `${98 * scale}px`,
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
//             width: "50%",
//             height: "50%",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       <p
//         style={{
//           fontSize: `${20 * scale}px`,
//           fontWeight: 500,
//           margin: 0,
//           lineHeight: `${30 * scale}px`,
//           color: "#000",
//           // overflow: "hidden",
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
//             top: 100 * scale,
//             width: "100%",
//             background: "#f5f5f5",
//             color: "#1e40af",
//             fontSize: `${15 * scale}px`,
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

//       const margin = width <= 600 ? width * 0.02 : width <= 1000 ? width * 0.05 : width * 0.10;
//       const maxWidth = 1325;
//       const containerWidth = Math.min(width);
//       let newScale = containerWidth / maxWidth;

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
//         width: "100%",
//         overflowX: "hidden",
//         paddingLeft: outerMargin,
//         paddingRight: outerMargin,
//         paddingTop: `${30 * scale}px`,
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
//           width: "100%",
//           boxSizing: "border-box",

//         }}
//       >
//         <h3
//           style={{
//             color: "#2F3192",
//             fontSize: `${13 * scale}px`,
//             fontWeight: 600,
//             marginBottom: `${10 * scale}px`,
//           }}
//         >
//           CHOOSE US FOR SAUDI PCC SERVICE?
//         </h3>

//         <h1
//           style={{
//             fontSize: `${56 * scale}px`,
//             fontWeight: 700,
//             textAlign: "center",
//             lineHeight: 1.3,
//             marginBottom: 40 * scale,
//             color: "#2F3192",
//           }}
//         >
//           We are Experienced <br /> Saudi PCC Online Service Provider
//         </h1>

//         <div 
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

//           <div 
//             style={{
//               width: 520 * scale,
//               flexShrink: 0,

//             }}>
//             <img
//               src="https://project251.hrstride.academy/wp-content/uploads/2025/07/all-peoples-2.png"
//               alt="Main"
//               style={{
//                 width: `${702 * scale}px`,
//                 height: `${430 * scale}px`,
//                 objectFit: "fill",
//                  display: "block",      

//               }}
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




// import React, { useRef, useEffect, useState } from "react";

// const iconData = [

//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-4.png",
//     title: "End-to-end service (MOFA, translation, apostille, courier)",
//     description:
//       "We handle everything including MOFA attestation, courier and certified translations.",
//     link: "https://example.com/end-to-end",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-3.png",
//     title: "Faster, Simple more Secure",
//     description: "We deliver a highly secure and reliable service process.",
//     link: "https://example.com/secure-process",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-2.png",
//     title: "Direct approach with Saudi police",
//     description:
//       "We work directly with Saudi authorities to speed up the process securely.",
//     link: "https://example.com/saudi-police",
//   },
//   {
//     icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-1.png",
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
//         gap: 5 * scale,
//         width: `${300 * scale}px`,
//         height: `${200 * scale}px`,
//         cursor: "pointer",
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <div
//         style={{
//           width: `${98 * scale}px`,
//           height: `${98 * scale}px`,
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
//             width: `${50 * scale}px`,
//             height: `${50 * scale}px`,
//             objectFit: "cover",
//           }}
//         />
//       </div>

//       <p
//         style={{
//           fontSize: `${20 * scale}px`,
//           fontWeight: 500,
//           margin: 0,
//           lineHeight: `${30 * scale}px`,
//           color: "#000",
//           // overflow: "hidden",
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
//             top: 100 * scale,
//             width: `${270 * scale}px`,
//             minHeight: `${60 * scale}px`,
//             background: "#f5f5f5",
//             color: "#1e40af",
//             fontSize: `${15 * scale}px`,
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

//       const margin = width <= 600 ? width * 0.02 : width <= 1000 ? width * 0.05 : width * 0.10;
//       const maxWidth = 1325;
//       const containerWidth = Math.min(width);
//       let newScale = containerWidth / maxWidth;

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

//         width: "100%",
//         overflowX: "hidden",
//         paddingLeft: outerMargin,
//         paddingRight: outerMargin,
//         paddingTop: `${20 * scale}px`,
//         // paddingBottom: 0,
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
//           width: "100%",
//           boxSizing: "border-box",

//         }}
//       >
//         <h3
//           style={{
//             color: "#2F3192",
//             fontSize: `${13 * scale}px`,
//             fontWeight: 600,
//             marginBottom: `${20 * scale}px`,
//           }}
//         >
//           CHOOSE US FOR SAUDI PCC SERVICE?
//         </h3>

//         <h1
//           style={{
//             fontSize: `${56 * scale}px`,
//             fontWeight: 700,
//             textAlign: "center",
//             lineHeight: 1.3,
//             marginBottom: 30 * scale,
//             color: "#2F3192",
//           }}
//         >
//           We are Experienced <br /> Saudi PCC Online Service Provider
//         </h1>

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             height: "100%",
//             // marginBottom: 0
//             // gap: 60 * scale,

//           }}
//         >
//           <div style={{
//             display: "flex",
//             flexDirection: "column",
//             // marginBottom: 60 * scale,
//              gap: 60 * scale
//           }}>
//             {iconData.slice(0, 2).map((item, i) => (
//               <IconCard key={i} {...item} scale={scale} />
//             ))}
//           </div>

//           <div
//             style={{
//               width: `${520 * scale}px`,
//               marginBottom: 0,
//               flexShrink: 0,

//             }}>
//             <img
//               src="https://project251.hrstride.academy/wp-content/uploads/2025/07/all-peoples-2.png"
//               alt="Main"
//               style={{
//                 width: `${702 * scale}px`,
//                 height: `${490 * scale}px`,
//                 objectFit: "contain",

//               }}
//             />
//           </div>

//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               // marginBottom: 60 * scale,
//                gap: 60 * scale 
//             }}>
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
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-4.png",
    title: "End-to-end service (MOFA, translation, apostille, courier)",
    description:
      "We handle everything including MOFA attestation, courier and certified translations.",
    link: "https://example.com/end-to-end",
  },
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-3.png",
    title: "Faster, Simple more Secure",
    description: "We deliver a highly secure and reliable service process.",
    link: "https://example.com/secure-process",
  },
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-2.png",
    title: "Direct approach with Saudi police",
    description:
      "We work directly with Saudi authorities to speed up the process securely.",
    link: "https://example.com/saudi-police",
  },
  {
    icon: "https://project251.hrstride.academy/wp-content/uploads/2025/07/Icon-1.png",
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
        gap: 5 * scale,
        width: `${300 * scale}px`,
        height: `${200 * scale}px`,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          width: `${98 * scale}px`,
          height: `${98 * scale}px`,
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
            width: `${50 * scale}px`,
            height: `${50 * scale}px`,
            objectFit: "cover",
          }}
        />
      </div>

      <p
        style={{
          fontSize: `${20 * scale}px`,
          fontWeight: 500,
          margin: 0,
          lineHeight: `${30 * scale}px`,
          color: "#000",
          // overflow: "hidden",
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
            top: 100 * scale,
            width: `${270 * scale}px`,
            minHeight: `${60 * scale}px`,
            background: "#f5f5f5",
            color: "#1e40af",
            fontSize: `${15 * scale}px`,
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

      const margin = width <= 600 ? width * 0.02 : width <= 1000 ? width * 0.05 : width * 0.10;
      const maxWidth = 1325;
      const containerWidth = Math.min(width);
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

        width: "100%",
        overflowX: "hidden",
        paddingLeft: outerMargin,
        paddingRight: outerMargin,
        paddingTop: `${20 * scale}px`,
        // paddingBottom: 0,
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
          width: "100%",
          boxSizing: "border-box",

        }}
      >
        <h3
          style={{
            color: "#2F3192",
            fontSize: `${13 * scale}px`,
            fontWeight: 600,
            marginBottom: `${20 * scale}px`,
          }}
        >
          CHOOSE US FOR SAUDI PCC SERVICE?
        </h3>

        <h1
          style={{
            fontSize: `${56 * scale}px`,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: 30 * scale,
            color: "#2F3192",
          }}
        >
          We are Experienced <br /> Saudi PCC Online Service Provider
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            // marginBottom: 0
            // gap: 60 * scale,

          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            // marginBottom: 60 * scale,
             gap: 60 * scale
          }}>
            {iconData.slice(0, 2).map((item, i) => (
              <IconCard key={i} {...item} scale={scale} />
            ))}
          </div>

          <div
            style={{
                width: `${702 * scale}px`,
                height: `${490 * scale}px`,
              marginBottom: 0,
              flexShrink: 0,

            }}>
            <img
              src="https://project251.hrstride.academy/wp-content/uploads/2025/07/all-peoples-2.png"
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // marginBottom: 60 * scale,
               gap: 60 * scale 
            }}>
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