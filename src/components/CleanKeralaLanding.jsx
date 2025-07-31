

import React, { useState, useEffect } from "react";
import img2 from "../assets/landingImg.png";


const FeatureCard = ({ icon, title, description, scale }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = window.innerWidth < 768;

  const cardWidth = isMobile ? window.innerWidth * 0.22 : 260 * scale;
  const cardHeight = isMobile ? 90 : 210 * scale;
  const padding = isMobile ? 6 : 16 * scale;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16 * scale,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        padding: padding,
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: isMobile ? "pointer" : "default",
        transition: "all 0.3s ease",
      }}
    >
      <img
        src={icon}
        alt={title}
        style={{
          width: `${50 * scale}px`,
          height: `${50 * scale}px`,
          marginBottom: 12 * scale,
        }}
      />
      <h3 style={{ fontSize: 20 * scale, fontWeight: "bold", marginBottom: 8 * scale }}>
        {title}
      </h3>

      {!isMobile && (
        <p
          style={{
            fontSize: 14 * scale,
            color: "#333",
            lineHeight: 1.4,
            maxWidth: "90%",
          }}
        >
          {description}
        </p>
      )}

      {isMobile && isHovered && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            color: "#333",
            fontSize: 13 * scale,
            padding: `${8 * scale}px ${12 * scale}px`,
            borderRadius: 8 * scale,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            marginTop: 8 * scale,
            zIndex: 999,
            width: "220px",
            textAlign: "center",
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

const CleanKeralaLanding = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = 1325;
      const newScale = Math.max(0.5, Math.min(window.innerWidth / maxWidth, 1));
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroHeight = 550 * scale;
  const cardOffset = 105 * scale;

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section with relative container */}
      <div
        style={{
          position: "relative",
          height: `${heroHeight}px`,
          backgroundImage: `url(${img2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />

        {/* Text on hero */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: 16,
          }}
        >
          <h1 style={{
             fontSize: 46 * scale,
              fontWeight: "bold",
              //  marginBottom: 16 * scale
                }}>
            Towards a Clean Kerala
          </h1>
          <p style={{ fontSize: 22 * scale, marginBottom: 24 * scale }}>
            Uniting efforts for a greener, cleaner, and healthier Kerala
          </p>
          <button
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: `${12 * scale}px ${24 * scale}px`,
              fontSize: 18 * scale,
              borderRadius: 6 * scale,
              cursor: "pointer",
            }}
          >
            Explore Programs
          </button>
        </div>

        {/* Feature Cards Overlapping Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: `-${cardOffset}px`,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 16 * scale,
            zIndex: 3,
          }}
        >
          <FeatureCard
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsJp-o-kVocZqMDOAq0aDHTDUmrDvpcGFTRj4Y_gE_PRSoLtXRLmu3gX_cI3r3HhyOUMo&usqp=CAU"
            title="Management"
            description="Improve collection, segregation, and disposal practices."
            scale={scale}
          />
          <FeatureCard
            icon="https://www.activesustainability.com/media/816156/desarrollo-sostenible.jpg"
            title="Sustainability"
            description="Promote waste reduction and resource reuse."
            scale={scale}
          />
          <FeatureCard
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZtboZRD3iRJImhCmjsKp6UxHExGozGSWu4sjPWOUyc4RFfprkAFjvW4aHyfZQX__VYE&usqp=CAU"
            title="Volunteers"
            description="Engage citizens in ground-level initiatives."
            scale={scale}
          />
        </div>
      </div>

      {/* Spacer to avoid overlap with next content */}
      <div style={{ height: `${cardOffset + 100 * scale}px` }} />

    </div>
  );
};

export default CleanKeralaLanding;
