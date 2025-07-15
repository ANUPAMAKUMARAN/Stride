

import React from "react";
import img2 from '../assets/landingImg.png'

const FeatureCard = ({ icon, title, description, hideWasteOnMobile }) => {
  const [firstWord, ...rest] = title.split(" ");
  const restOfTitle = rest.join(" ");

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "12px 16px", // ✅ Reduced vertical padding in px
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        // width: "clamp(220px, 25%, 280px)",
         width: "clamp(100px, 18vw, 250px)", // ✅ More flexible for small screens
    flexShrink: 1, // ✅ Allow cards to shrink
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "36px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>
      <h3 className="feature-card-title"
        style={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "8px",
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
          fontSize: "15px",
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

const CleanKeralaLanding = () => {
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
          .feature-row {
            gap: 12px !important; /* ✅ Smaller gap in px */
          }
             .feature-card-title {
      font-size: 10px !important; /* 🟢 Reduced font size for small screens */
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
                fontSize: "42px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Towards a Clean Kerala
            </h1>
            <p
              style={{
                fontSize: "20px",
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
            className="feature-row"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px", // ✅ Default gap (reduced on small screens)
              maxWidth: "100%",
              margin: "0 auto",
              flexWrap: "nowrap",
               overflow: "hidden",
            }}
          >
            <FeatureCard
              icon="🧹"
              title="Waste Management"
              description="Improve collection, segregation, and disposal."
              hideWasteOnMobile={true}
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
