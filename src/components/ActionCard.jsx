


import React, { useState, useEffect } from "react";

const ActionCard = ({ slide, cardWidth, cardHeight, scale }) => {

  const {
    title,
    titleColor,
    description,
    descriptionColor,
    backgroundColor,
    icon,
    buttonText,
    buttonColor,
  } = slide;

  const fontSize = 20 * scale;
  const titleFontSize = 28 * scale;
  const imgSize = 36 * scale; 
  const buttonFontSize = 18 * scale;
  const gap = 8 * scale;
  const padding = 24 * scale;
  const buttonPaddingY = 8 * scale;
  const buttonPaddingX = 16 * scale;

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
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <h3
          style={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: `${gap}px`,
            marginBottom: `${gap}px`,
            fontSize: `${titleFontSize}px`,
            color: titleColor || "#000000",
            whiteSpace: "nowrap",
          }}
        >
          <img
            src={icon}
            alt=""
            style={{ width: `${imgSize}px`, height: `${imgSize}px`, objectFit: "contain" }}
          />
          {title}
        </h3>
        <p
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.3,
            maxHeight: `${1.3 * fontSize * 2}px`,
            overflow: "hidden",
            color: descriptionColor || "#000000",

          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: `${gap * 2}px`,
        }}
      >
        <button
          style={{
            backgroundColor: buttonColor,
            color: "#fff",
            borderRadius: `${6 * scale}px`,
            fontWeight: 500,
            boxShadow: `0 ${2 * scale}px ${6 * scale}px rgba(0,0,0,0.1)`,
            padding: `${buttonPaddingY}px ${buttonPaddingX}px`,
            fontSize: `${buttonFontSize}px`,
            cursor: "pointer",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const ActionGrid = ({ attributes }) => {
  const { title,
    titleColor,
    subTitle,
    subTitleColor,
    backgroundColor,
    slides = [] } = attributes;

  const presetCardWidth = 450;
  const presetCardHeight = 225;
  const presetGap = 44;
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
      <div
        style={{
          textAlign: "center",
          marginBottom: `${40 * scale}px`,
          maxWidth: "90%",
        }}
      >
        <h1
          style={{
            fontSize: `${40 * scale}px`,
            fontWeight: "bold",
            marginBottom: `${8 * scale}px`,
            color: titleColor || "#000",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: `${20 * scale}px`,
            fontStyle: "italic",
            fontWeight: 600,
            color: subTitleColor || "#000",
          }}
        >
          {subTitle}
        </p>
      </div>

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

        {slides.map((slide, index) => (
          <div key={index}>
            <ActionCard
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

export default ActionGrid;
