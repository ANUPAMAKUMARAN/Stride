
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

import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1rem",
        padding: "clamp(1rem, 2vw, 1.5rem)",
        textAlign: "center",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        flex: "1 1 0",
        minWidth: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>{icon}</div>
      <h3
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        <span className="waste-word">Waste </span>Management
      </h3>
      <p className="feature-description" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: "#555", margin: 0 }}>
        {description}
      </p>
    </div>
  );
};

const CleanKeralaLanding = () => {
  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .feature-description {
              display: none;
            }
            .waste-word {
              display: none;
            }
          }
        `}
      </style>

      <div style={{ fontFamily: "Arial, sans-serif", background: "#fefefe" }}>
        {/* Hero Section */}
        <div
          style={{
            position: "relative",
            height: "60vh",
            minHeight: "400px",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url('https://img.freepik.com/premium-photo/blue-water-forest-lake-with-pine-trees_104337-4178.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          />
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 2,
            }}
          />
          {/* Text Content */}
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
              padding: "1rem",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
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
                padding: "clamp(0.5rem, 1.5vw, 0.9rem) clamp(1rem, 3vw, 2rem)",
                fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background 0.3s",
                marginTop: "0.5rem",
              }}
            >
              Explore Programs
            </button>
          </div>
        </div>

        {/* Feature Cards — Always 3, Responsive */}
        <div
          style={{
            marginTop: "-60px",
            position: "relative",
            zIndex: 5,
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(0.75rem, 2vw, 1.5rem)",
              maxWidth: "1200px",
              margin: "0 auto",
              flexWrap: "nowrap",
            }}
          >
            <FeatureCard
              icon="🧹"
              title="Management"
              description="Improve collection, segregation, and disposal practices."
            />
            <FeatureCard
              icon="♻️"
              title="Sustainability"
              description="Promote waste reduction and resource reuse."
            />
            <FeatureCard
              icon="🌿"
              title="Volunteers"
              description="Engage citizens in ground-level initiatives."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanKeralaLanding;
