// import React, { useEffect, useState } from "react";

// const useScaleMultiplier = (minScale = 0.6, maxScale = 1.2) => {
//     const [scale, setScale] = useState(1);

//     const updateScale = () => {
//         const width = window.innerWidth;
//         // Consider full width range from 320px to 1440px for scaling
//         const newScale = Math.max(minScale, Math.min(width / 1325, maxScale));
//         setScale(newScale);
//     };

//     useEffect(() => {
//         updateScale();
//         window.addEventListener("resize", updateScale);
//         return () => window.removeEventListener("resize", updateScale);
//     }, [minScale, maxScale]);

//     return scale;
// };

// // Check and Cross icon components
// const Check = ({ color = "#00B3E3", bg = "white" }) => (
//     <span
//         style={{
//             backgroundColor: bg,
//             color: color,
//             borderRadius: "50%",
//             width: 24,
//             height: 24,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 14,
//             margin: "0 auto",
//         }}
//     >
//         ✓
//     </span>
// );

// const Cross = ({ color = "#00B3E3", bg = "white" }) => (
//     <span
//         style={{
//             backgroundColor: bg,
//             color: color,
//             borderRadius: "50%",
//             width: 24,
//             height: 24,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 14,
//             margin: "0 auto",
//         }}
//     >
//         ✕
//     </span>
// );

// // Main Component
// const ComparisonTable = () => {
//     const scale = useScaleMultiplier();

//     const comparisonData = [
//         {
//             feature: "Direct application to Saudi police",
//             hrstride: true,
//             diy: false,
//             agent: true,
//         },
//         {
//             feature: "Fingerprint & photo from Police",
//             hrstride: true,
//             diy: false,
//             agent: true,
//         },
//         {
//             feature: "MOFA attestation included",
//             hrstride: true,
//             diy: false,
//             agent: true,
//         },
//         {
//             feature: "Transparent status updates",
//             hrstride: true,
//             diy: false,
//             agent: false,
//         },
//         {
//             feature: "End-to-end online process",
//             hrstride: true,
//             diy: false,
//             agent: false,
//         },
//         {
//             feature: "WhatsApp Support 7 Days a Week",
//             hrstride: true,
//             diy: false,
//             agent: true,
//         },
//     ];

//     return (
//         <div
//             style={{
//                 width: "100%",
//                 padding: "40px 20px",
//                 boxSizing: "border-box",
//                 maxWidth: 1200,
//                 margin: "0 auto",
//             }}
//         >
//             {/* Headings with scale */}
//             <div style={{ textAlign: "center", marginBottom: 8 }}>
//                 <p
//                     style={{
//                         color: "#00B3E3",
//                         textTransform: "uppercase",
//                         fontSize: 14 * scale,
//                         fontWeight: 500,
//                         marginBottom: 6,
//                     }}
//                 >
//                     Choose us for Saudi PCC Service?
//                 </p>
//                 <h2
//                     style={{
//                         fontSize: 28 * scale,
//                         fontWeight: "bold",
//                         margin: 0,
//                         lineHeight: 1.3,
//                     }}
//                 >
//                     Why Choose HRstride.COM for Saudi PCC?
//                 </h2>
//             </div>

//             {/* Table section */}
//             <div
//                 style={{
//                     borderRadius: 18 * scale,
//                     padding: `${8 * scale}px`, //borderthickness
//                     background: "linear-gradient(135deg, #00EFFF, #7B1FA2, #00EFFF)",
//                     marginTop: 30,
//                 }}
//             >
//                 <div
//                     style={{
//                         background: "#fff", // table background
//                         borderRadius: 18 * scale,
//                         overflowX: "auto",
//                     }}
//                 >
//                     <table
//                         style={{
//                             width: "100%",
//                             borderCollapse: "collapse",
//                             tableLayout: "fixed",
//                             borderRadius: 18 * scale,
//                             overflow: "hidden",
//                         }}
//                     >
//                         <colgroup>
//                             <col style={{ width: "40%" }} />
//                             <col style={{ width: "20%" }} />
//                             <col style={{ width: "20%" }} />
//                             <col style={{ width: "20%" }} />
//                         </colgroup>

//                         <thead>
//                             <tr
//                                 style={{
//                                     backgroundImage: "linear-gradient(to right, #00B3E3, #3B0B9F)",
//                                     color: "white",
//                                 }}
//                             >
//                                 <th style={tableHeaderStyle(scale)}>Feature</th>
//                                 <th style={tableHeaderStyle(scale)}>HRstride.COM</th>
//                                 <th style={tableHeaderStyle(scale)}>DIY</th>
//                                 <th style={tableHeaderStyle(scale)}>Local Agents</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {comparisonData.map((row, idx) => (
//                                 <tr
//                                     key={idx}
//                                     style={{
//                                         backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "white",
//                                     }}
//                                 >
//                                     <td
//                                         style={{
//                                             ...tableCellStyle(scale),
//                                             whiteSpace: "normal",
//                                             wordWrap: "break-word",
//                                         }}
//                                     >
//                                         {row.feature}
//                                     </td>
//                                     <td
//                                         style={{
//                                             ...iconCellStyle(scale),
//                                             backgroundColor: "#00B3E3",
//                                             color: "white",
//                                         }}
//                                     >
//                                         {row.hrstride ? (
//                                             <Check color="white" bg="#00B3E3" />
//                                         ) : (
//                                             <Cross color="white" bg="#00B3E3" />
//                                         )}
//                                     </td>
//                                     <td style={iconCellStyle(scale)}>
//                                         {row.diy ? <Check /> : <Cross />}
//                                     </td>
//                                     <td style={iconCellStyle(scale)}>
//                                         {row.agent ? <Check /> : <Cross />}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>


//             {/* Bottom text */}
//             <p
//                 style={{
//                     textAlign: "center",
//                     fontStyle: "italic",
//                     fontSize: 14 * scale,
//                     marginTop: 24,
//                 }}
//             >
//                 We handle everything – from application to translation, MOFA
//                 attestation, and courier delivery
//             </p>

//             {/* Buttons */}

//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 12 * scale, // reduced from 16
//                     flexWrap: "nowrap",
//                     marginTop: 20 * scale, // slightly reduced
//                     transform: `scale(${scale})`,
//                     transformOrigin: "center",
//                 }}
//             >
//                 <button
//                     style={{
//                         backgroundColor: "#00B3E3",
//                         color: "white",
//                         width: 150 * scale, 
//                         height: 34 * scale, 
//                         borderRadius: 4 * scale, 
//                         border: "none",
//                         fontWeight: 500,
//                         fontSize: 12 * scale, 
//                         lineHeight: `${34 * scale}px`, 
//                         cursor: "pointer",
//                     }}
//                 >
//                     CONTACT WITH US
//                 </button>
//                 <button
//                     style={{
//                         border: "1px solid #00B3E3",
//                         color: "#00B3E3",
//                         width: 230 * scale, 
//                         height: 34 * scale,
//                         borderRadius: 4 * scale, 
//                         fontWeight: 500,
//                         fontSize: 12 * scale, 
//                         lineHeight: `${34 * scale}px`,
//                         backgroundColor: "white",
//                         cursor: "pointer",
//                     }}
//                 >
//                     REQUEST YOUR SAUDI PCC NOW
//                 </button>
//             </div>


//         </div>
//     );
// };

// // Reusable styles with scale
// const tableHeaderStyle = (scale) => ({
//     padding: `${14 * scale}px ${16 * scale}px`,
//     textAlign: "center",
//     fontWeight: 600,
//     fontSize: 16 * scale,
// });


// const tableCellStyle = (scale) => ({
//     padding: `${12 * scale}px ${16 * scale}px`,
//     fontSize: 14 * scale,
//     verticalAlign: "middle",
// });

// const iconCellStyle = (scale) => ({
//     textAlign: "center",
//     padding: `${12 * scale}px ${16 * scale}px`,
// });

// export default ComparisonTable;


// import React, { useEffect, useState } from "react";

// const useScaleMultiplier = (minScale = 0.6, maxScale = 1.2) => {
//   const [scale, setScale] = useState(1);

//   const updateScale = () => {
//     const width = window.innerWidth;
//     const newScale = Math.max(minScale, Math.min(width / 1325, maxScale));
//     setScale(newScale);
//   };

//   useEffect(() => {
//     updateScale();
//     window.addEventListener("resize", updateScale);
//     return () => window.removeEventListener("resize", updateScale);
//   }, [minScale, maxScale]);

//   return scale;
// };

// // Check and Cross icons with fixed colors
// const Check = ({ color = "white", bg = "#00B3E3",scale = 1  }) => (
//   <span
//     style={{
//       backgroundColor: bg,
//       color: color,
//       borderRadius: "50%",
//       width: 24* scale,
//       height: 24* scale,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 14* scale,
//       margin: "0 auto",
//     }}
//   >
//     ✓
//   </span>
// );

// const Cross = ({ color = "white", bg = "#FF5A5A" ,scale = 1 }) => (
//   <span
//     style={{
//       backgroundColor: bg,
//       color: color,
//       borderRadius: "50%",
//       width: 24 * scale,
//       height: 24 * scale,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 14,
//       margin: "0 auto",
//     }}
//   >
//     ✕
//   </span>
// );

// const ComparisonTable = ({ attributes }) => {
//   const {
//     caption,
//     captionColor,
//     title,
//     titleColor,
//     tableBorder,
//     tableHeaderColor,
//     tableHeaderOne,
//     tableHeaderTwo,
//     tableHeaderThree,
//     tableHeaderFour,
//     tableHeaderTextColor,
//     columnOneBackground,
//     columnTwoBackground,
//     columnThreeBackground,
//     columnFourBackground,
//      tickColor,            
//   tickBackground,        
//   untickColor,           
//   untickBackground,
//     itemsTextColor,
//     items = [],
//     description,
//     descriptionColor,
//     primaryButtonText,
//     primaryButtonTextColor,
//     primaryButtonColor,
//     SecondaryButtonText,
//     SecondaryButtonTextColor,
//     SecondaryButtonColor,
//   } = attributes;

//   const scale = useScaleMultiplier();

//   return (
//     <div
//       style={{
//         width: "100%",
//         padding: "40px 20px",
//         boxSizing: "border-box",
//         maxWidth: 1200,
//         margin: "0 auto",
//       }}
//     >
//       {/* Headings */}
//       <div style={{ textAlign: "center", marginBottom: 8 }}>
//         <p
//           style={{
//             color: captionColor || "#00B3E3",
//             textTransform: "uppercase",
//             fontSize: 14 * scale,
//             fontWeight: 500,
//             marginBottom: 6,
//           }}
//         >
//           {caption}
//         </p>
//         <h2
//           style={{
//             color: titleColor || "#1E2A78",
//             fontSize: 28 * scale,
//             fontWeight: "bold",
//             margin: 0,
//             lineHeight: 1.3,
//           }}
//         >
//           {title}
//         </h2>
//       </div>

//       {/* Table with gradient border */}
//       <div
//         style={{
//           borderRadius: tableBorder * scale,
//           padding: `${7 * scale}px`,
//           background: tableHeaderColor || "linear-gradient(135deg, #00EFFF, #7B1FA2, #00EFFF)",
//           marginTop: 30,
//         }}
//       >
//         <div
//           style={{
//             background: "#ffffff",
//             borderRadius: 18 * scale,
//             overflowX: "auto",
//           }}
//         >
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               tableLayout: "fixed",
//               borderRadius: 18 * scale,
//               overflow: "hidden",
//             }}
//           >
//             <colgroup>
//               <col style={{ width: "40%" }} />
//               <col style={{ width: "20%" }} />
//               <col style={{ width: "20%" }} />
//               <col style={{ width: "20%" }} />
//             </colgroup>

//             <thead>
//               <tr
//                 style={{
//                   background: "linear-gradient(to right, #00B3E3, #3B0B9F)",
//                   color: tableHeaderTextColor || "#1E2A78",
//                 }}
//               >
//                 <th style={tableHeaderStyle(scale)}>{tableHeaderOne}</th>
//                 <th style={tableHeaderStyle(scale)}>{tableHeaderTwo}</th>
//                 <th style={tableHeaderStyle(scale)}>{tableHeaderThree}</th>
//                 <th style={tableHeaderStyle(scale)}>{tableHeaderFour}</th>
//               </tr>
//             </thead>
//              <tbody>
//                             {items.map((row, idx) => (
//                                 <tr
//                                     key={idx}
//                                     style={{
//                                         backgroundColor: idx % 2 === 0 ? columnOneBackground || "#f9f9f9" : "white",
//                                         color: itemsTextColor || "#000",
//                                     }}
//                                 >
//                                     <td
//                                         style={{
//                                             ...tableCellStyle(scale),
//                                             whiteSpace: "normal",
//                                             wordWrap: "break-word",
//                                         }}
//                                     >
//                                         {row.text}
//                                     </td>
//                                     <td
//                                         style={{
//                                             ...iconCellStyle(scale),
//                                             backgroundColor: columnTwoBackground || "#00B3E3",
//                                             // color: "white",
//                                         }}
//                                     >
//                                         {row.columnOne ? (
//                                             <Check
//                                                 color={tickColor || "white"}
//                                                 bg={tickBackground || "#00B3E3"}
//                                             />
//                                         ) : (
//                                             <Cross
//                                                 color={untickColor || "white"}
//                                                 bg={untickBackground || "#FF0000"}
//                                             />
//                                         )}
//                                     </td>
//                                     <td style={{
//                                         ...iconCellStyle(scale),
//                                         backgroundColor: columnThreeBackground || "#f9f9f9",
//                                     }}>
//                                         {row.columnTwo ? (
//                                             <Check
//                                                 color={tickColor || "white"}
//                                                 bg={tickBackground || "#00B3E3"}
//                                             />
//                                         ) : (
//                                             <Cross
//                                                 color={untickColor || "white"}
//                                                 bg={untickBackground || "#FF0000"}
//                                             />
//                                         )}
//                                     </td>
//                                     <td
//                                         style={{
//                                             ...iconCellStyle(scale),
//                                             backgroundColor: columnFourBackground || "#f9f9f9",
//                                         }}
//                                     >
//                                         {row.columnThree ? (
//                                             <Check
//                                                 color={tickColor || "white"}
//                                                 bg={tickBackground || "#00B3E3"}
//                                             />
//                                         ) : (
//                                             <Cross
//                                                 color={untickColor || "white"}
//                                                 bg={untickBackground || "#FF0000"}
//                                             />
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>

//             {/* <tbody>
//               {items.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   style={{
//                     backgroundColor: idx % 2 === 0 ? "#F8FAFC" : "#ffffff",
//                     color: itemsTextColor || "#000000",
//                   }}
//                 >
//                   <td
//                     style={{
//                       ...tableCellStyle(scale),
//                       whiteSpace: "normal",
//                       wordWrap: "break-word",
//                     }}
//                   >
//                     {row.text}
//                   </td>
//                   <td style={iconCellStyle(scale)}>
//                     {row.columnOne ? <Check /> : <Cross />}
//                   </td>
//                   <td style={iconCellStyle(scale)}>
//                     {row.columnTwo ? <Check /> : <Cross />}
//                   </td>
//                   <td style={iconCellStyle(scale)}>
//                     {row.columnThree ? <Check /> : <Cross />}
//                   </td>
//                 </tr>
//               ))}
//             </tbody> */}
//           </table>
//         </div>
//       </div>

//       {/* Bottom text */}
//       <p
//         style={{
//           textAlign: "center",
//           fontStyle: "italic",
//           fontSize: 14 * scale,
//           marginTop: 24,
//           color: descriptionColor || "#1E2A78",
//         }}
//       >
//         {description}
//       </p>

//       {/* Buttons */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: 12 * scale,
//           flexWrap: "nowrap",
//           marginTop: 20 * scale,
//         }}
//       >
//         <button
//           style={{
//             backgroundColor: primaryButtonColor || "#00B3E3",
//             color: primaryButtonTextColor || "white",
//             width: 150 * scale,
//             height: 34 * scale,
//             borderRadius: 4 * scale,
//             border: "none",
//             fontWeight: 500,
//             fontSize: 12 * scale,
//             lineHeight: `${34 * scale}px`,
//             cursor: "pointer",
//           }}
//         >
//           {primaryButtonText}
//         </button>
//         <button
//           style={{
//             border: `1px solid ${SecondaryButtonTextColor || "#00B3E3"}`,
//             color: SecondaryButtonTextColor || "#00B3E3",
//             width: 230 * scale,
//             height: 34 * scale,
//             borderRadius: 4 * scale,
//             fontWeight: 500,
//             fontSize: 12 * scale,
//             lineHeight: `${34 * scale}px`,
//             backgroundColor: SecondaryButtonColor || "white",
//             cursor: "pointer",
//           }}
//         >
//           {SecondaryButtonText}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Reusable styles with scale
// const tableHeaderStyle = (scale) => ({
//   padding: `${14 * scale}px ${16 * scale}px`,
//   textAlign: "center",
//   fontWeight: 600,
//   fontSize: 16 * scale,
// });

// const tableCellStyle = (scale) => ({
//   padding: `${12 * scale}px ${16 * scale}px`,
//   fontSize: 14 * scale,
//   verticalAlign: "middle",
// });

// const iconCellStyle = (scale) => ({
//   textAlign: "center",
//   padding: `${12 * scale}px ${16 * scale}px`,
// });

// export default ComparisonTable;


import React, { useEffect, useState } from "react";

const useScaleMultiplier = (minScale = 0.6, maxScale = 1.2) => {
  const [scale, setScale] = useState(1);

  const updateScale = () => {
    const width = window.innerWidth;
    const newScale = Math.max(minScale, Math.min(width / 1325, maxScale));
    setScale(newScale);
  };

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [minScale, maxScale]);

  return scale;
};

// Check and Cross icons with scale support
const Check = ({ color = "white", bg = "#00B3E3", scale = 1 }) => (
  <span
    style={{
      backgroundColor: bg,
      color: color,
      borderRadius: "50%",
      width: 24 * scale,
      height: 24 * scale,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14 * scale,
      margin: "0 auto",
    }}
  >
    ✓
  </span>
);

const Cross = ({ color = "white", bg = "#FF5A5A", scale = 1 }) => (
  <span
    style={{
      backgroundColor: bg,
      color: color,
      borderRadius: "50%",
      width: 24 * scale,
      height: 24 * scale,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14 * scale,
      margin: "0 auto",
    }}
  >
    ✕
  </span>
);

const ComparisonTable = ({ attributes }) => {
  const {
    caption,
    captionColor,
    title,
    titleColor,
    tableBorder,
    tableHeaderColor,
    tableHeaderOne,
    tableHeaderTwo,
    tableHeaderThree,
    tableHeaderFour,
    tableHeaderTextColor,
    columnOneBackground,
    columnTwoBackground,
    columnThreeBackground,
    columnFourBackground,
    tickColor,
    tickBackground,
    untickColor,
    untickBackground,
    itemsTextColor,
    items = [],
    description,
    descriptionColor,
    primaryButtonText,
    primaryButtonTextColor,
    primaryButtonColor,
    SecondaryButtonText,
    SecondaryButtonTextColor,
    SecondaryButtonColor,
  } = attributes;

  const scale = useScaleMultiplier();

  return (
    <div
      style={{
        width: "100%",
        padding: "40px 20px",
        boxSizing: "border-box",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Headings */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <p
          style={{
            color: captionColor || "#00B3E3",
            textTransform: "uppercase",
            fontSize: 14 * scale,
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          {caption}
        </p>
        <h2
          style={{
            color: titleColor || "#1E2A78",
            fontSize: 28 * scale,
            fontWeight: "bold",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Table with gradient border */}
      <div
        style={{
          borderRadius: tableBorder * scale,
          padding: `${7 * scale}px`, // thicker border padding
          background:
            tableHeaderColor ||
            "linear-gradient(135deg, #00EFFF, #7B1FA2, #00EFFF)",
          marginTop: 30,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18 * scale,
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              borderRadius: 18 * scale,
              overflow: "hidden",
            }}
          >
            <colgroup>
              <col style={{ width: "40%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>

            <thead>
              <tr
                style={{
                  background: "linear-gradient(to right, #00B3E3, #3B0B9F)",
                  color: tableHeaderTextColor || "white",
                }}
              >
                <th style={tableHeaderStyle(scale)}>{tableHeaderOne}</th>
                <th style={tableHeaderStyle(scale)}>{tableHeaderTwo}</th>
                <th style={tableHeaderStyle(scale)}>{tableHeaderThree}</th>
                <th style={tableHeaderStyle(scale)}>{tableHeaderFour}</th>
              </tr>
            </thead>

            <tbody>
              {items.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                    color: itemsTextColor || "#000",
                  }}
                >
                  <td
                    style={{
                      ...tableCellStyle(scale),
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    {row.text}
                  </td>
                  <td style={iconCellStyle(scale)}>
                    {row.columnOne ? (
                      <Check
                        scale={scale}
                        color={tickColor || "white"}
                        bg={tickBackground || "#00B3E3"}
                      />
                    ) : (
                      <Cross
                        scale={scale}
                        color={untickColor || "white"}
                        bg={untickBackground || "#FF0000"}
                      />
                    )}
                  </td>
                  <td style={iconCellStyle(scale)}>
                    {row.columnTwo ? (
                      <Check
                        scale={scale}
                        color={tickColor || "white"}
                        bg={tickBackground || "#00B3E3"}
                      />
                    ) : (
                      <Cross
                        scale={scale}
                        color={untickColor || "white"}
                        bg={untickBackground || "#FF0000"}
                      />
                    )}
                  </td>
                  <td style={iconCellStyle(scale)}>
                    {row.columnThree ? (
                      <Check
                        scale={scale}
                        color={tickColor || "white"}
                        bg={tickBackground || "#00B3E3"}
                      />
                    ) : (
                      <Cross
                        scale={scale}
                        color={untickColor || "white"}
                        bg={untickBackground || "#FF0000"}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom text */}
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontSize: 14 * scale,
          marginTop: 24,
          color: descriptionColor || "#1E2A78",
        }}
      >
        {description}
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12 * scale,
          flexWrap: "nowrap",
          marginTop: 20 * scale,
        }}
      >
        <button
          style={{
            backgroundColor: primaryButtonColor || "#00B3E3",
            color: primaryButtonTextColor || "white",
            width: 150 * scale,
            height: 34 * scale,
            borderRadius: 4 * scale,
            border: "none",
            fontWeight: 500,
            fontSize: 12 * scale,
            lineHeight: `${34 * scale}px`,
            cursor: "pointer",
          }}
        >
          {primaryButtonText}
        </button>
        <button
          style={{
            border: `1px solid ${SecondaryButtonTextColor || "#00B3E3"}`,
            color: SecondaryButtonTextColor || "#00B3E3",
            width: 230 * scale,
            height: 34 * scale,
            borderRadius: 4 * scale,
            fontWeight: 500,
            fontSize: 12 * scale,
            lineHeight: `${34 * scale}px`,
            backgroundColor: SecondaryButtonColor || "white",
            cursor: "pointer",
          }}
        >
          {SecondaryButtonText}
        </button>
      </div>
    </div>
  );
};

// Reusable styles
const tableHeaderStyle = (scale) => ({
  padding: `${14 * scale}px ${16 * scale}px`,
  textAlign: "center",
  fontWeight: 600,
  fontSize: 16 * scale,
});

const tableCellStyle = (scale) => ({
  padding: `${12 * scale}px ${16 * scale}px`,
  fontSize: 14 * scale,
  verticalAlign: "middle",
});

const iconCellStyle = (scale) => ({
  textAlign: "center",
  padding: `${12 * scale}px ${16 * scale}px`,
});

export default ComparisonTable;
