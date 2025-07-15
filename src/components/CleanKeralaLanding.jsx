
// import React, { useEffect, useState, useRef } from "react";

// const FeatureCard = ({ icon, title, description }) => {
//   return (
//     <div
//       style={{
//         width: 240,
//         height: 200,
//         background: "#fff",
//         borderRadius: 12,
//         padding: 20,
//         textAlign: "center",
//         boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//         flex: "0 0 auto",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>{icon}</div>
//       <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: 6 }}>
//         {title}
//       </h3>
//       <p style={{ fontSize: "1rem", color: "#555", margin: 0 }}>
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   const cardGap = 24;

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//       {/* Hero Section */}
//       <div
//         style={{
//           position: "relative",
//           height: "500px",
//           overflow: "hidden",
//         }}
//       >
//         {/* Background */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundImage:
//               "url('https://img.freepik.com/premium-photo/blue-water-forest-lake-with-pine-trees_104337-4178.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             zIndex: 1,
//           }}
//         />

//         {/* Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 2,
//           }}
//         />

//         {/* Content */}
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
//             padding: "20px",
//             color: "white",
//           }}
//         >
//           <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}>
//             Towards a Clean Kerala
//           </h1>
//           <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
//             Uniting efforts for a greener, cleaner, and healthier Kerala
//           </p>
//           <button
//             style={{
//               backgroundColor: "#28a745",
//               color: "#fff",
//               border: "none",
//               padding: "10px 20px",
//               fontSize: "1rem",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             Explore Programs
//           </button>
//         </div>
//       </div>

//       {/* Feature Cards — Lifting up into the Hero Section */}
//       <div
//         style={{
//           width: "100%",
//           zIndex: 4,
//           marginTop: "-100px", // Lifts it into the hero section
//           display: "flex",
//           justifyContent: "center",
//           position: "relative",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: `${cardGap}px`,
//             padding: "0 16px",
//             maxWidth: `${(240 + cardGap) * 3}px`,
//             width: "100%",
//           }}
//         >
//           <FeatureCard
//             icon="🧹"
//             title="Management"
//             description="Improve collection, segregation, and disposal practices."
//           />
//           <FeatureCard
//             icon="♻️"
//             title="Sustainability"
//             description="Promote waste reduction and resource reuse."
//           />
//           <FeatureCard
//             icon="🌿"
//             title="Volunteers"
//             description="Engage citizens in ground-level initiatives."
//           />
//         </div>
//       </div>


//     </div>
//   );
// };

// export default CleanKeralaLanding;

// import React from "react";

// const FeatureCard = ({ icon, title, description }) => {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "1rem",
//         padding: "clamp(1rem, 2vw, 1.5rem)",
//         textAlign: "center",
//         boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//         flex: "1 1 0",
//         minWidth: "0",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>{icon}</div>
//       <h3
//         style={{
//           fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
//           fontWeight: "600",
//           marginBottom: "0.5rem",
//         }}
//       >
//         <span className="waste-word">Waste </span>Management
//       </h3>
//       <p className="feature-description" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: "#555", margin: 0 }}>
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   return (
//     <>
//       <style>
//         {`
//           @media (max-width: 768px) {
//             .feature-description {
//               display: none;
//             }
//             .waste-word {
//               display: none;
//             }
//           }
//         `}
//       </style>

//       <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//         {/* Hero Section */}
//         <div
//           style={{
//             position: "relative",
//             height: "60vh",
//             minHeight: "400px",
//             overflow: "hidden",
//           }}
//         >
//           {/* Background Image */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage:
//                 "url('https://img.freepik.com/premium-photo/blue-water-forest-lake-with-pine-trees_104337-4178.jpg')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 1,
//             }}
//           />
//           {/* Overlay */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.6)",
//               zIndex: 2,
//             }}
//           />
//           {/* Text Content */}
//           <div
//             style={{
//               position: "relative",
//               zIndex: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "1rem",
//               color: "white",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "clamp(1.8rem, 5vw, 3rem)",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//               }}
//             >
//               Towards a Clean Kerala
//             </h1>
//             <p
//               style={{
//                 fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
//                 marginBottom: "1.5rem",
//                 maxWidth: "90%",
//               }}
//             >
//               Uniting efforts for a greener, cleaner, and healthier Kerala
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "clamp(0.5rem, 1.5vw, 0.9rem) clamp(1rem, 3vw, 2rem)",
//                 fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "background 0.3s",
//                 marginTop: "0.5rem",
//               }}
//             >
//               Explore Programs
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards — Always 3, Responsive */}
//         <div
//           style={{
//             marginTop: "-60px",
//             position: "relative",
//             zIndex: 5,
//             padding: "0 1rem",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "clamp(0.75rem, 2vw, 1.5rem)",
//               maxWidth: "1200px",
//               margin: "0 auto",
//               flexWrap: "nowrap",
//             }}
//           >
//             <FeatureCard
//               icon="🧹"
//               title="Management"
//               description="Improve collection, segregation, and disposal practices."
//             />
//             <FeatureCard
//               icon="♻️"
//               title="Sustainability"
//               description="Promote waste reduction and resource reuse."
//             />
//             <FeatureCard
//               icon="🌿"
//               title="Volunteers"
//               description="Engage citizens in ground-level initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CleanKeralaLanding;
// import React from "react";

// const FeatureCard = ({ icon, title, description }) => {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "1rem",
//         padding: "clamp(1rem, 2vw, 1.5rem)",
//         textAlign: "center",
//         boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//         flex: "1 1 0",
//         minWidth: "0",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>{icon}</div>
//       <h3
//         style={{
//           fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
//           fontWeight: "600",
//           marginBottom: "0.5rem",
//         }}
//       >
//         {title}
//       </h3>
//       <p className="feature-description" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: "#555", margin: 0 }}>
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   return (
//     <>
//       <style>
//         {`
//           @media (max-width: 768px) {
//             .feature-description {
//               display: none;
//             }
//           }
//         `}
//       </style>

//       <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//         {/* Hero Section */}
//         <div
//           style={{
//             position: "relative",
//             height: "60vh",
//             minHeight: "400px",
//             overflow: "hidden",
//           }}
//         >
//           {/* Background Image */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage:
//                 "url('https://img.freepik.com/premium-photo/blue-water-forest-lake-with-pine-trees_104337-4178.jpg')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 1,
//             }}
//           />
//           {/* Overlay */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.6)",
//               zIndex: 2,
//             }}
//           />
//           {/* Text Content */}
//           <div
//             style={{
//               position: "relative",
//               zIndex: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "1rem",
//               color: "white",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "clamp(1.8rem, 5vw, 3rem)",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//               }}
//             >
//               Towards a Clean Kerala
//             </h1>
//             <p
//               style={{
//                 fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
//                 marginBottom: "1.5rem",
//                 maxWidth: "90%",
//               }}
//             >
//               Uniting efforts for a greener, cleaner, and healthier Kerala
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "clamp(0.5rem, 1.5vw, 0.9rem) clamp(1rem, 3vw, 2rem)",
//                 fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "background 0.3s",
//                 marginTop: "0.5rem",
//               }}
//             >
//               Explore Programs
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards — Always 3 */}
//         <div
//           style={{
//             marginTop: "-60px",
//             position: "relative",
//             zIndex: 5,
//             padding: "0 1rem",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "clamp(0.75rem, 2vw, 1.5rem)",
//               maxWidth: "1200px",
//               margin: "0 auto",
//               flexWrap: "nowrap",
//             }}
//           >
//             <FeatureCard
//               icon="🧹"
//               title="Waste Management"
//               description="Improve collection, segregation, and disposal practices."
//             />
//             <FeatureCard
//               icon="♻️"
//               title="Sustainability"
//               description="Promote waste reduction and resource reuse."
//             />
//             <FeatureCard
//               icon="🌿"
//               title="Volunteers"
//               description="Engage citizens in ground-level initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CleanKeralaLanding;
// import React from "react";

// const FeatureCard = ({ icon, title, description, hideWasteOnMobile }) => {
//   // Check if title includes 'Waste' and needs conditional hiding
//   const [firstWord, ...rest] = title.split(" ");
//   const restOfTitle = rest.join(" ");

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "1rem",
//         padding: "clamp(1rem, 2vw, 1.5rem)",
//         textAlign: "center",
//         boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//         flex: "1 1 0",
//         minWidth: "0",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>{icon}</div>
//       <h3
//         style={{
//           fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
//           fontWeight: "600",
//           marginBottom: "0.5rem",
//         }}
//       >
//         {hideWasteOnMobile ? (
//           <>
//             <span className="hide-waste">{firstWord} </span>
//             {restOfTitle}
//           </>
//         ) : (
//           title
//         )}
//       </h3>
//       <p className="feature-description" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: "#555", margin: 0 }}>
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   return (
//     <>
//       <style>
//         {`
//           @media (max-width: 768px) {
//             .feature-description {
//               display: none;
//             }
//             .hide-waste {
//               display: none;
//             }
//           }
//         `}
//       </style>

//       <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//         {/* Hero Section */}
//         <div
//           style={{
//             position: "relative",
//             height: "60vh",
//             minHeight: "400px",
//             overflow: "hidden",
//           }}
//         >
//           {/* Background Image */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage:
//                 "url('https://img.freepik.com/premium-photo/blue-water-forest-lake-with-pine-trees_104337-4178.jpg')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 1,
//             }}
//           />
//           {/* Overlay */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.6)",
//               zIndex: 2,
//             }}
//           />
//           {/* Text Content */}
//           <div
//             style={{
//               position: "relative",
//               zIndex: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "1rem",
//               color: "white",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "clamp(1.8rem, 5vw, 3rem)",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//               }}
//             >
//               Towards a Clean Kerala
//             </h1>
//             <p
//               style={{
//                 fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
//                 marginBottom: "1.5rem",
//                 maxWidth: "90%",
//               }}
//             >
//               Uniting efforts for a greener, cleaner, and healthier Kerala
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "clamp(0.5rem, 1.5vw, 0.9rem) clamp(1rem, 3vw, 2rem)",
//                 fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "background 0.3s",
//                 marginTop: "0.5rem",
//               }}
//             >
//               Explore Programs
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div
//           style={{
//             marginTop: "-60px",
//             position: "relative",
//             zIndex: 5,
//             padding: "0 1rem",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "clamp(0.75rem, 2vw, 1.5rem)",
//               maxWidth: "1200px",
//               margin: "0 auto",
//               flexWrap: "nowrap",
//             }}
//           >
//             <FeatureCard
//               icon="🧹"
//               title="Waste Management"
//               description="Improve collection, segregation, and disposal practices."
//               hideWasteOnMobile={true}
//             />
//             <FeatureCard
//               icon="♻️"
//               title="Sustainability"
//               description="Promote waste reduction and resource reuse."
//             />
//             <FeatureCard
//               icon="🌿"
//               title="Volunteers"
//               description="Engage citizens in ground-level initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CleanKeralaLanding;




// import React from "react";

// const FeatureCard = ({ icon, title, description, hideWasteOnMobile }) => {
//   const [firstWord, ...rest] = title.split(" ");
//   const restOfTitle = rest.join(" ");

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "1rem",
//         padding: "clamp(1rem, 1.5vw, 1.3rem)",
//         textAlign: "center",
//         boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//         width: "calc(30% - 1rem)", // ✅ Force wrap by reducing width slightly
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           fontSize: "clamp(2rem, 3vw, 2.5rem)",
//           marginBottom: "0.7rem",
//         }}
//       >
//         {icon}
//       </div>
//       <h3
//         style={{
//           fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
//           fontWeight: "600",
//           marginBottom: "0.5rem",
//           lineHeight: 1.3,
//         }}
//       >
//         {hideWasteOnMobile ? (
//           <>
//             <span className="hide-waste">{firstWord} </span>
//             {restOfTitle}
//           </>
//         ) : (
//           title
//         )}
//       </h3>
//       <p
//         className="feature-description"
//         style={{
//           fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
//           color: "#333",
//           lineHeight: 1.5,
//           maxWidth: "90%", // ✅ Constrains text to wrap naturally
//           margin: 0,
//         }}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   return (
//     <>
//       <style>{`
//         @media (max-width: 768px) {
//           .feature-description {
//             display: none;
//           }
//           .hide-waste {
//             display: none;
//           }
//         }
//       `}</style>

//       <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//         {/* Hero Section */}
//         <div
//           style={{
//             position: "relative",
//             height: "60vh",
//             minHeight: "400px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage:
//                 "url('https://img.freepik.com/premium-photo/blue-water-forest-lake-with-pine-trees_104337-4178.jpg')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 1,
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.6)",
//               zIndex: 2,
//             }}
//           />
//           <div
//             style={{
//               position: "relative",
//               zIndex: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "1rem",
//               color: "white",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "clamp(2rem, 5vw, 3rem)",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//               }}
//             >
//               Towards a Clean Kerala
//             </h1>
//             <p
//               style={{
//                 fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
//                 marginBottom: "1.5rem",
//                 maxWidth: "90%",
//               }}
//             >
//               Uniting efforts for a greener, cleaner, and healthier Kerala
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "clamp(0.6rem, 1.5vw, 0.9rem) clamp(1.2rem, 3vw, 2rem)",
//                 fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "background 0.3s",
//               }}
//             >
//               Explore Programs
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div
//           style={{
//             marginTop: "-60px",
//             position: "relative",
//             zIndex: 5,
//             padding: "0 1rem",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               gap: "1.5rem",
//               maxWidth: "1200px",
//               margin: "0 auto",
//               flexWrap: "nowrap",
//             }}
//           >
//             <FeatureCard
//               icon="🧹"
//               title="Waste Management"
//               description="Improve collection, segregation, and disposal practices."
//               hideWasteOnMobile={true}
//             />
//             <FeatureCard
//               icon="♻️"
//               title="Sustainability"
//               description="Promote waste reduction and resource reuse."
//             />
//             <FeatureCard
//               icon="🌿"
//               title="Volunteers"
//               description="Engage citizens in ground-level initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CleanKeralaLanding;


// import React from "react";
// import img2 from '../assets/landingImg.png'

// const FeatureCard = ({ icon, title, description, hideWasteOnMobile }) => {
//   const [firstWord, ...rest] = title.split(" ");
//   const restOfTitle = rest.join(" ");

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "1rem",
//          padding: "12px 5px",
//         // padding: "clamp(0.6rem, 1vw, 0.9rem)", // ✅ Reduced vertical padding
//         textAlign: "center",
//         boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//         width: "calc(30% - 1rem)", // ✅ 3 cards side-by-side
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           fontSize: "clamp(2rem, 3vw, 2.5rem)",
//           marginBottom: "0.6rem",
//         }}
//       >
//         {icon}
//       </div>
//       <h3
//         style={{
//           fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
//           fontWeight: "600",
//           marginBottom: "0.4rem",
//           lineHeight: 1.3,
//         }}
//       >
//         {hideWasteOnMobile ? (
//           <>
//             <span className="hide-waste">{firstWord} </span>
//             {restOfTitle}
//           </>
//         ) : (
//           title
//         )}
//       </h3>
//       <p
//         className="feature-description"
//         style={{
//           fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
//           color: "#333",
//           lineHeight: 1.5,
//           maxWidth: "90%",
//           margin: 0,
//         }}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   return (
//     <>
//       <style>{`
//         @media (max-width: 768px) {
//           .feature-description {
//             display: none;
//           }
//           .hide-waste {
//             display: none;
//           }
//           .feature-row {
//             gap: 0.75rem !important; /* ✅ Smaller gap on small screens */
//           }
//         }
//       `}</style>

//       <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//         {/* Hero Section */}
//         <div
//           style={{
//             position: "relative",
//             height: "60vh",
//             minHeight: "400px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
              
//                             backgroundImage: `url(${img2})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 1,
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.6)",
//               zIndex: 2,
//             }}
//           />
//           <div
//             style={{
//               position: "relative",
//               zIndex: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "1rem",
//               color: "white",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "clamp(2rem, 5vw, 3rem)",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//               }}
//             >
//               Towards a Clean Kerala
//             </h1>
//             <p
//               style={{
//                 fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
//                 marginBottom: "1.5rem",
//                 maxWidth: "90%",
//               }}
//             >
//               Uniting efforts for a greener, cleaner, and healthier Kerala
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "clamp(0.6rem, 1.5vw, 0.9rem) clamp(1.2rem, 3vw, 2rem)",
//                 fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "background 0.3s",
//               }}
//             >
//               Explore Programs
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div
//           style={{
//             marginTop: "-60px",
//             position: "relative",
//             zIndex: 5,
//             padding: "0 1rem",
//           }}
//         >
//           <div
//             className="feature-row"
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               gap: "1.5rem", // ✅ Default gap (will reduce on small screens)
//               maxWidth: "1200px",
//               margin: "0 auto",
//               flexWrap: "nowrap",
//             }}
//           >
//             <FeatureCard
//               icon="🧹"
//               title="Waste Management"
//               description="Improve collection, segregation, and disposal practices."
//               hideWasteOnMobile={true}
//             />
//             <FeatureCard
//               icon="♻️"
//               title="Sustainability"
//               description="Promote waste reduction and resource reuse."
//             />
//             <FeatureCard
//               icon="🌿"
//               title="Volunteers"
//               description="Engage citizens in ground-level initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CleanKeralaLanding;







import React, { useEffect, useRef, useState } from "react";
import img2 from "../assets/landingImg.png";

// FeatureCard Component
const FeatureCard = ({ icon, title, description, hideWasteOnMobile, fontScale }) => {
  const [firstWord, ...rest] = title.split(" ");
  const restOfTitle = rest.join(" ");

  const cardWidth = 240 * fontScale;
  const iconSize = 36 * fontScale;
  const titleSize = 18 * fontScale;
  const descSize = 15 * fontScale;
  const cardPadding = 12 * fontScale;
  const cardGap = 24 * fontScale;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: `${16 * fontScale}px`,
        // padding: `${cardPadding}px`,
         padding: `${16 * fontScale}px ${Math.max(12, 1 * fontScale)}px`, // ✅ Updated here
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        width: `${cardWidth}px`,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ fontSize: `${iconSize}px`, marginBottom: `${12 * fontScale}px` }}>{icon}</div>
      <h3
        style={{
          fontSize: `${titleSize}px`,
          fontWeight: "600",
          marginBottom: `${8 * fontScale}px`,
          lineHeight: 1.3,
        }}
      >
        {hideWasteOnMobile ? (
          <>
            <span className="hide-waste">{firstWord} </span>
            {restOfTitle}
          </>
        ) : (
          title
        )}
      </h3>
      <p
        className="feature-description"
        style={{
          fontSize: `${descSize}px`,
          color: "#333",
          lineHeight: 1.5,
          maxWidth: "90%",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
};

// CleanKeralaLanding Page
const CleanKeralaLanding = () => {
  const containerRef = useRef();
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const scale = Math.max(0.55, Math.min(1, width / 1200)); // Clamp between 0.55 and 1
        setFontScale(scale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .feature-description {
            display: none;
          }
          .hide-waste {
            display: none;
          }
        }
      `}</style>

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
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Towards a Clean Kerala
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                marginBottom: "1.5rem",
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
                padding: "12px 24px",
                fontSize: "17px",
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
            marginTop: "-60px",
            position: "relative",
            zIndex: 5,
            padding: "0 16px",
          }}
        >
          <div
            ref={containerRef}
            className="feature-row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: `${24 * fontScale}px`,
              flexWrap: "nowrap",
              overflow: "hidden",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: `${16 * fontScale}px 0`,
              transition: "all 0.3s ease",
            }}
          >
            <FeatureCard
              icon="🧹"
              title="Waste Management"
              description="Improve collection, segregation, and disposal."
              hideWasteOnMobile={true}
              fontScale={fontScale}
            />
            <FeatureCard
              icon="♻️"
              title="Sustainability"
              description="Promote waste reduction and resource reuse."
              fontScale={fontScale}
            />
            <FeatureCard
              icon="🌿"
              title="Volunteers"
              description="Engage citizens in ground-level initiatives."
              fontScale={fontScale}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanKeralaLanding;




// import React from "react";
// import img2 from "../assets/landingImg.png";

// const FeatureCard = ({ icon, title, description, hideWasteOnMobile }) => {
//   const [firstWord, ...rest] = title.split(" ");
//   const restOfTitle = rest.join(" ");

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "16px",
//         padding: "12px 16px",
//         textAlign: "center",
//         boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//         flex: "1 1 clamp(250px, 30%, 280px)", // match LeaderCard responsiveness
//         // width: "clamp(220px, 25%, 280px)", // ✅ consistent sizing
//             maxWidth: "280px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div style={{ fontSize: "36px", marginBottom: "12px" }}>{icon}</div>
//       <h3
//         style={{
//           fontSize: "18px",
//           fontWeight: "600",
//           marginBottom: "8px",
//           lineHeight: 1.3,
//         }}
//       >
//         {hideWasteOnMobile ? (
//           <>
//             <span className="hide-waste">{firstWord} </span>
//             {restOfTitle}
//           </>
//         ) : (
//           title
//         )}
//       </h3>
//       <p
//         className="feature-description"
//         style={{
//           fontSize: "15px",
//           color: "#333",
//           lineHeight: 1.5,
//           maxWidth: "90%",
//           margin: 0,
//         }}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   return (
//     <>
//       <style>{`
//         @media (max-width: 768px) {
         
//           .feature-description {
//             display: none;
//           }
//           .hide-waste {
//             display: none;
//           }
//           .feature-row {
//           justify-content: center;
//             // gap: 12px !important;
//           }
//         }
//       `}</style>

//       <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//         {/* Hero Section */}
//         <div
//           style={{
//             position: "relative",
//             height: "60vh",
//             minHeight: "400px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage: `url(${img2})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 1,
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.6)",
//               zIndex: 2,
//             }}
//           />
//           <div
//             style={{
//               position: "relative",
//               zIndex: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "16px",
//               color: "white",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "clamp(2rem, 5vw, 3rem)",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//               }}
//             >
//               Towards a Clean Kerala
//             </h1>
//             <p
//               style={{
//                 fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
//                 marginBottom: "1.5rem",
//                 maxWidth: "90%",
//               }}
//             >
//               Uniting efforts for a greener, cleaner, and healthier Kerala
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "12px 24px",
//                 fontSize: "17px",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "background 0.3s",
//               }}
//             >
//               Explore Programs
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div
//           style={{
//             marginTop: "-60px",
//             position: "relative",
//             zIndex: 5,
//             padding: "0 16px",
//           }}
//         >
//           <div
//             className="feature-row"
//             style={{
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "nowrap",
//     gap: "16px",
//     padding: "16px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//   }}
//             // style={{
//             //   display: "flex",
//             //   justifyContent: "center", // ✅ Center align horizontally
//             //   gap: "24px",
//             //   maxWidth: "1200px",
//             //   margin: "0 auto",
//             //   flexWrap: "nowrap", // ✅ Force single row always
//             // }}
//           >
//             <FeatureCard
//               icon="🧹"
//               title="Waste Management"
//               description="Improve collection, segregation, and disposal practices."
//               hideWasteOnMobile={true}
//             />
//             <FeatureCard
//               icon="♻️"
//               title="Sustainability"
//               description="Promote waste reduction and resource reuse."
//             />
//             <FeatureCard
//               icon="🌿"
//               title="Volunteers"
//               description="Engage citizens in ground-level initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CleanKeralaLanding;
























// import React from "react";
// import img2 from '../assets/landingImg.png'

// const FeatureCard = ({ icon, title, description, hideWasteOnMobile }) => {
//   const [firstWord, ...rest] = title.split(" ");
//   const restOfTitle = rest.join(" ");

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "16px",
//         padding: "12px 16px", // ✅ Reduced vertical padding in px
//         textAlign: "center",
//         boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        
//         // width: "calc(30% - 1rem)",
//         width: "clamp(220px, 25%, 280px)",
        
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           fontSize: "36px",
//           marginBottom: "12px",
//         }}
//       >
//         {icon}
//       </div>
//       <h3
//         style={{
//           fontSize: "18px",
//           fontWeight: "600",
//           marginBottom: "8px",
//           lineHeight: 1.3,
//         }}
//       >
//         {hideWasteOnMobile ? (
//           <>
//             <span className="hide-waste">{firstWord} </span>
//             {restOfTitle}
//           </>
//         ) : (
//           title
//         )}
//       </h3>
//       <p
//         className="feature-description"
//         style={{
//           fontSize: "15px",
//           color: "#333",
//           lineHeight: 1.5,
//           maxWidth: "90%",
//           margin: 0,
//         }}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const CleanKeralaLanding = () => {
//   return (
//     <>
//       <style>{`
//         @media (max-width: 768px) {
//           .feature-description {
//             display: none;
//           }
//           .hide-waste {
//             display: none;
//           }
//           .feature-row {
//             gap: 12px !important; /* ✅ Smaller gap in px */
//           }
//         }
//       `}</style>

//       <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
//         {/* Hero Section */}
//         <div
//           style={{
//             position: "relative",
//             height: "70vh",
//             minHeight: "400px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
              
//               backgroundImage: `url(${img2})`,
               
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 1,
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.6)",
//               zIndex: 2,
//             }}
//           />
//           <div
//             style={{
//               position: "relative",
//               zIndex: 3,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "16px",
//               color: "white",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "42px",
//                 fontWeight: "bold",
//                 marginBottom: "16px",
//               }}
//             >
//               Towards a Clean Kerala
//             </h1>
//             <p
//               style={{
//                 fontSize: "20px",
//                 marginBottom: "24px",
//                 maxWidth: "90%",
//               }}
//             >
//               Uniting efforts for a greener, cleaner, and healthier Kerala
//             </p>
//             <button
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "12px 24px",
//                 fontSize: "17px",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "background 0.3s",
//               }}
//             >
//               Explore Programs
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div
//           style={{
//             marginTop: "-60px",
//             position: "relative",
//             zIndex: 5,
//             padding: "0 16px",
//           }}
//         >
//           <div
//             className="feature-row"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "24px", // ✅ Default gap (reduced on small screens)
//               maxWidth: "1200px",
//               margin: "0 auto",
//               flexWrap: "nowrap",
//             }}
//           >
//             <FeatureCard
//               icon="🧹"
//               title="Waste Management"
//               description="Improve collection, segregation, and disposal practices."
//               hideWasteOnMobile={true}
//             />
//             <FeatureCard
//               icon="♻️"
//               title="Sustainability"
//               description="Promote waste reduction and resource reuse."
//             />
//             <FeatureCard
//               icon="🌿"
//               title="Volunteers"
//               description="Engage citizens in ground-level initiatives."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CleanKeralaLanding;
