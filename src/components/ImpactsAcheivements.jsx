

import React, { useState, useEffect } from "react";

const ImpactCard = ({
  img,
  title,
  subtitle,
  bgColor,
  textColor,
  cardWidth,
  cardHeight,
  scale,
}) => {
  const fontSize = 16 * scale;
  const titleFontSize = 22 * scale;
  const iconSize = 48 * scale; 
  const gap = 16 * scale;
  const padding = 24 * scale;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        padding: `${padding}px`,
        borderRadius: `${16 * scale}px`,
        boxShadow: `0 ${4 * scale}px ${10 * scale}px rgba(0,0,0,0.05)`,
        display: "flex",
        alignItems: "center",
        gap: `${gap}px`,
      }}
    >
      {/* Left Icon Block */}
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <img
          src={img}
          alt="icon"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Right Text Block */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3
          style={{
            fontWeight: 600,
            fontSize: `${titleFontSize}px`,
            margin: 0,
            marginBottom: `${gap / 4}px`,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: `${fontSize}px`,
            margin: 0,
            color: textColor,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const ImpactsAchievements = () => {
  const presetCardWidth = 425;
  const presetCardHeight = 180;
  const presetGap = 32;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fullGridWidth = presetCardWidth * 2 + presetGap;

  let scale, outerMargin;
  if (windowWidth > fullGridWidth) {
    scale = 1;
    outerMargin = (windowWidth - fullGridWidth) / 2;
  } else {
    const smallScreenMargin = 16;
    const containerWidth = windowWidth - smallScreenMargin * 2;
    scale = containerWidth / fullGridWidth;
    outerMargin = smallScreenMargin;
  }
  if (scale > 1) scale = 1;

  const cardWidth = presetCardWidth * scale;
  const cardHeight = presetCardHeight * scale;

  return (
    <div
      style={{
        width: "100%",
        background: "#ebf9ed",
        paddingTop: `${48 * scale}px`,
        paddingBottom: `${48 * scale}px`,
        paddingLeft: `${outerMargin}px`,
        paddingRight: `${outerMargin}px`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: `${32 * scale}px`,
          fontWeight: 700,
          color: "#000",
          marginBottom: `${40 * scale}px`,
          textAlign: "center",
        }}
      >
        Impact & Achievements
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, auto)",
          gap: `${presetGap * scale}px`,
          width: `${(presetCardWidth * 2 + presetGap) * scale}px`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImpactCard
          img="https://cdn-icons-png.flaticon.com/512/4299/4299926.png"
          title="12,500+ Tons of waste Recycled"
          subtitle="Across 14 districts since 2020"
          bgColor="#b2e4b5"
          textColor="#000"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
        <ImpactCard
          img="https://cdn-icons-png.flaticon.com/512/3034/3034094.png"
          title="200+ Clean Campus Campaigns"
          subtitle="Reaching over 1.2 lakhs students"
          bgColor="#b2e4b5"
          textColor="#000"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
        <ImpactCard
          img="https://cdn-icons-png.flaticon.com/512/992/992651.png"
          title="100+ LSGIs Partners"
          subtitle="In sustainable waste practices"
          bgColor="#b2e4b5"
          textColor="#000"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
        <ImpactCard
          img="https://cdn-icons-png.flaticon.com/512/3159/3159616.png"
          title="15,000+ People Engaged in Clean-up Drives"
          subtitle="Through volunteer & CSR programs"
          bgColor="#b2e4b5"
          textColor="#000"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
      </div>
    </div>
  );
};

export default ImpactsAchievements;


