

import React, { useEffect, useState } from "react";

const FeatureCard = ({ icon, title, description, isMobile, scale }) => (
  <div
    style={{
      flex: "1 1 auto",
      minWidth: isMobile ? "90px" : "200px",
      maxWidth: isMobile ? "120px" : "300px",
      background: "#fff",
      borderRadius: "12px",
      padding: isMobile ? "10px" : "24px",
      textAlign: "center",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      zIndex: 3,
      position: "relative",
    }}
  >
    <div
      style={{
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        marginBottom: isMobile ? "8px" : "16px",
      }}
    >
      {icon}
    </div>
    <h3
      style={{
        fontSize: isMobile ? "0.85rem" : "1.2rem",
        fontWeight: "600",
        marginBottom: isMobile ? "4px" : "10px",
        whiteSpace: "nowrap",
      }}
    >
      {title}
    </h3>
    {!isMobile && (
      <p style={{ fontSize: "0.95rem", color: "#555" }}>{description}</p>
    )}
  </div>
);

const CleanKeralaLanding = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [cardGap, setCardGap] = useState(24);
  const [heroFontSize, setHeroFontSize] = useState(48);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setIsMobile(true);
        setScale(0.7);
        setHeroFontSize(24);
        setCardGap(12);
      } else if (width < 1024) {
        setIsMobile(false);
        setScale(0.9);
        setHeroFontSize(36);
        setCardGap(20);
      } else {
        setIsMobile(false);
        setScale(1);
        setHeroFontSize(48);
        setCardGap(24);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", position: "relative", background: "#fefefe" }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url('https://images.stockcake.com/public/0/7/3/073fc0c4-e7df-4830-a82b-de08181ad209_large/sunlit-forest-lake-stockcake.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: `${520 * scale}px`,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: `${heroFontSize}px`,
            fontWeight: "bold",
            marginBottom: `${20 * scale}px`,
            whiteSpace: "nowrap",
          }}
        >
          Towards a Clean Kerala
        </h1>

        {isMobile ? (
          <>
            <p style={{ fontSize: "16px", marginBottom: "8px" }}>
              Uniting efforts for a greener, cleaner, and
            </p>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              healthier Kerala
            </p>
          </>
        ) : (
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            Uniting efforts for a greener, cleaner, and healthier Kerala
          </p>
        )}

        {!isMobile && (
  <button
    style={{
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Explore Programs
  </button>
)}


        
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: `${cardGap}px`,
          width: "100%",
          padding: `${40 * scale}px 20px`,
          position: "relative",
          top: `-${130 * scale}px`,
          zIndex: 3,
          boxSizing: "border-box",
        }}
      >
        <FeatureCard
          icon="🧹"
          title={isMobile ? "Management" : "Waste Management"}
          description="Improve collection, segregation, and disposal practices."
          isMobile={isMobile}
          scale={scale}
        />
        <FeatureCard
          icon="♻️"
          title="Sustainability"
          description="Promote waste reduction and resource reuse."
          isMobile={isMobile}
          scale={scale}
        />
        <FeatureCard
          icon="🌿"
          title="Volunteers"
          description="Engage citizens in ground-level initiatives."
          isMobile={isMobile}
          scale={scale}
        />
      </div>
    </div>
  );
};

export default CleanKeralaLanding;
