import React, { useState, useEffect } from "react";

const ImpactCard = ({ slide, cardWidth, cardHeight, scale }) => {
  const {
    title,
    titleColor,
    description,
    descriptionColor,
    backgroundColor,
    icon,
  } = slide;

  const fontSize = 16 * scale; 
  const titleFontSize = 29 * scale; 
  const gap = 16 * scale;
  const padding = 24 * scale;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        padding: `${padding}px`,
        borderRadius: `${16 * scale}px`,
        boxShadow: `0 ${4 * scale}px ${10 * scale}px rgba(0,0,0,0.05)`,
        display: "flex",
        alignItems: "center",
        gap: `${gap}px`,
        boxSizing: "border-box",
      }}
    >
      {/* Left Image (28% width) */}
      <div
        style={{
          width: `${cardWidth * 0.28}px`,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <img
          src={icon}
          alt="icon"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Right Text (72% width) */}
      <div
        style={{
          width: `${cardWidth * 0.72 - gap}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            color: titleColor || "#000000",
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
            color: descriptionColor || "#000000",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const ImpactsAchievements = ({ attributes }) => {
  const { title, titleColor, backgroundColor, slideGap, slides = [] } =
    attributes;

  const presetCardWidth = 450;
  const presetCardHeight = 225;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fullGridWidth = presetCardWidth * 2 + slideGap;
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

  const getValidColor = (color) => {
    if (!color || typeof color !== "string") return "#ffffff";
    const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
    const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color);
    const isGradient = /gradient\((.|\s)*\)/.test(color);
    const isNamed = /^[a-zA-Z]+$/.test(color);
    return color === "transparent" || isHex || isRGB || isGradient || isNamed
      ? color
      : "#ffffff";
  };

  return (
    <div
      style={{
        width: "100%",
        background: getValidColor(backgroundColor),
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
          fontSize: `${40 * scale}px`, 
          fontWeight: 700,
          color: titleColor || "#000",
          marginBottom: `${40 * scale}px`,
          textAlign: "center",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, auto)",
          gap: `${slideGap * scale}px`,
          width: `${(presetCardWidth * 2 + slideGap) * scale}px`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <ImpactCard
              slide={slide}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              scale={scale}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactsAchievements;
