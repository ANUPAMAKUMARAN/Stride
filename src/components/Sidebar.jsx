

import React, { useState, useEffect, useRef } from "react";

const Sidebar = ({ attributes }) => {
  const {
    backgroundColor,
    backgroundOpacity, 
    buttonColor,
    iconSize,
    hoverTextColor,
    hoverTextBackground,
    isShowOnPC,
    iconSizeOnPC,
    icons = [],
  } = attributes;

  const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const timeoutRef = useRef(null);

  const handleExpand = () => {
    setExpanded(true);
    resetHideTimer();
  };

  const resetHideTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 5000);
  };

  useEffect(() => {
    const scrollBar = document.getElementById("scrollBarArea");
    if (!scrollBar) return;
    scrollBar.addEventListener("wheel", handleExpand);
    return () => scrollBar.removeEventListener("wheel", handleExpand);
  }, []);

  //  If isShowOnPC is false, don't render on desktop
  const isDesktop = window.innerWidth >= 1024;
  if (!isShowOnPC && isDesktop) return null;


const getValidColor = (color, opacity = 1) => {
  if (!color || typeof color !== "string") return `rgba(255,255,255,${opacity})`;

  const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
  const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color);

  if (isHex) {
    let hex = color.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map(c => c + c).join("");
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  }

  if (isRGB) {
    
    if (color.startsWith("rgba")) {
      return color.replace(/rgba?\(([^)]+)\)/, (_, vals) => {
        const parts = vals.split(",").map(v => v.trim());
        return `rgba(${parts[0]},${parts[1]},${parts[2]},${opacity})`;
      });
    } else {
      return color.replace(/rgb\(([^)]+)\)/, `rgba($1,${opacity})`);
    }
  }

  if (color === "transparent") return "transparent";
  
  
  return color;
};

  return (
    <div
      id="scrollBarArea"
      onClick={handleExpand}
      style={{
        position: "fixed",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 1000,
        height: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: expanded ? 50 : 8,
          height: expanded ? "100%" : 40,
          backgroundColor: expanded
            ? getValidColor(backgroundColor, backgroundOpacity)
            : getValidColor(buttonColor, backgroundOpacity),
          borderRadius: expanded ? "20px" : "4px",
          boxShadow: expanded ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
          padding: expanded ? "10px 0" : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          gap: expanded ? 15 : 0,
          transition: "all 0.3s ease-in-out",
          overflow: "visible",
          cursor: "pointer",
        }}
      >
        {expanded &&
          icons.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "relative",
                padding: "5px 0",
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = item.link)}
            >
              <img
                src={item.img}
                alt={item.label}
                style={{
                  width: isDesktop ? iconSizeOnPC : iconSize,
                  height: isDesktop ? iconSizeOnPC : iconSize,
                  objectFit: "contain",
                }}
              />
              {hoveredIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    right: "110%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: hoverTextBackground,
                    color: hoverTextColor,
                    padding: "4px 8px",
                    borderRadius: 4,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    zIndex: 2000,
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;


// import React, { useState, useEffect, useRef } from "react";

// const Sidebar = ({ attributes }) => {
//   const {
//     backgroundColor,
//     backgroundOpacity, 
//     buttonColor,
//     iconSize,
//     hoverTextColor,
//     hoverTextBackground,
//     isShowOnPC,
//     iconSizeOnPC,
//     icons = [],
//   } = attributes;

//   const [expanded, setExpanded] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const timeoutRef = useRef(null);

//   const handleExpand = () => {
//     setExpanded(true);
//     resetHideTimer();
//   };

//   const resetHideTimer = () => {
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setExpanded(false);
//     }, 5000);
//   };

//   useEffect(() => {
//     const scrollBar = document.getElementById("scrollBarArea");
//     if (!scrollBar) return;
//     scrollBar.addEventListener("wheel", handleExpand);
//     return () => scrollBar.removeEventListener("wheel", handleExpand);
//   }, []);

//   //  If isShowOnPC is false, don't render on desktop
//   const isDesktop = window.innerWidth >= 1024;
//   if (!isShowOnPC && isDesktop) return null;

//   // Convert HEX or RGB to RGBA
//   const toRGBA = (color, opacity) => {
//     if (color.startsWith("#")) {
//       const bigint = parseInt(color.slice(1), 16);
//       const r = (bigint >> 16) & 255;
//       const g = (bigint >> 8) & 255;
//       const b = bigint & 255;
//       return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//     } else if (color.startsWith("rgb")) {
//       return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
//     }
//     return color; 
//   };

//   return (
//     <div
//       id="scrollBarArea"
//       onClick={handleExpand}
//       style={{
//         position: "fixed",
//         top: "50%",
//         right: "10px",
//         transform: "translateY(-50%)",
//         zIndex: 1000,
//         height: "65vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           width: expanded ? 50 : 8,
//           height: expanded ? "100%" : 40,
//           backgroundColor: expanded
//             ? toRGBA(backgroundColor, backgroundOpacity)
//             : toRGBA(buttonColor, backgroundOpacity),
//           borderRadius: expanded ? "20px" : "4px",
//           boxShadow: expanded ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
//           padding: expanded ? "10px 0" : 0,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: expanded ? "flex-start" : "center",
//           gap: expanded ? 15 : 0,
//           transition: "all 0.3s ease-in-out",
//           overflow: "visible",
//           cursor: "pointer",
//         }}
//       >
//         {expanded &&
//           icons.map((item, index) => (
//             <div
//               key={index}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               style={{
//                 position: "relative",
//                 padding: "5px 0",
//                 cursor: "pointer",
//               }}
//               onClick={() => (window.location.href = item.link)}
//             >
//               <img
//                 src={item.img}
//                 alt={item.label}
//                 style={{
//                   width: isDesktop ? iconSizeOnPC : iconSize,
//                   height: isDesktop ? iconSizeOnPC : iconSize,
//                   objectFit: "contain",
//                 }}
//               />
//               {hoveredIndex === index && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     right: "110%",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     backgroundColor: hoverTextBackground,
//                     color: hoverTextColor,
//                     padding: "4px 8px",
//                     borderRadius: 4,
//                     fontSize: 12,
//                     whiteSpace: "nowrap",
//                     zIndex: 2000,
//                   }}
//                 >
//                   {item.label}
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
