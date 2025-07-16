

import React from "react";
import img2 from "../assets/landingImg.png";

const FeatureCard = ({ icon, title, description, hideText }) => {
  const isDesktop = window.innerWidth >= 768; 

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: isDesktop
          ? "clamp(0.8rem, 1.6vw, 1.4rem)"
          : "clamp(0.5rem, 1.2vw, 1rem)",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        width: isDesktop
          ? "clamp(130px, 32vw, 260px)"
          : "clamp(100px, 26vw, 200px)",
        height: isDesktop
          ? "clamp(130px, 26vw, 200px)"
          : "clamp(100px, 22vw, 160px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: isDesktop
            ? "clamp(26px, 3vw, 34px)"
            : "clamp(20px, 2.5vw, 28px)",
          marginBottom: "6px",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: isDesktop
            ? "clamp(14px, 1.8vw, 20px)"
            : "clamp(12px, 1.4vw, 16px)",
          fontWeight: "600",
          marginBottom: hideText ? "0px" : "4px",
        }}
      >
        {title}
      </h3>
      {!hideText && (
        <p
          style={{
            fontSize: isDesktop
              ? "clamp(13px, 1.4vw, 16px)"
              : "clamp(10px, 1vw, 13px)",
            color: "#333",
            lineHeight: 1.4,
            maxWidth: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

const CleanKeralaLanding = () => {
  // Responsive check using state (to support re-renders on resize)
  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.innerWidth < 768
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Towards a Clean Kerala
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 20px)",
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
              padding: "clamp(6px, 1vw, 12px) clamp(12px, 2vw, 24px)",
              fontSize: "clamp(12px, 1.5vw, 18px)",
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
          marginTop: "-70px",
          position: "relative",
          zIndex: 5,
          padding: "0 16px",
          
        }}
      >
        <div className="py-6"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            maxWidth: "100%",
            margin: "0 auto",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <FeatureCard
            icon="🧹"
            title=" Management"
            description="Improve collection, segregation,and disposal practices."
            hideText={isSmallScreen}
          />
          <FeatureCard
            icon="♻️"
            title="Sustainability"
            description="Promote waste reduction and resource reuse."
            hideText={isSmallScreen}
          />
          <FeatureCard
            icon="🌿"
            title="Volunteers"
            description="Engage citizens in ground-level initiatives."
            hideText={isSmallScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default CleanKeralaLanding;
