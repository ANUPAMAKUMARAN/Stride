

import React, { useState, useEffect } from "react";

const ActionCard = ({
  imgSrc,
  title,
  subtitle,
  buttonText,
  bgColor,
  textColor,
  buttonColor,
  cardWidth,
  cardHeight,
  scale,
}) => {
  const fontSize = 16 * scale;
  const titleFontSize = 22 * scale;
  const imgSize = 32 * scale; // Image scaling
  const buttonFontSize = 14 * scale;
  const gap = 8 * scale;
  const padding = 24 * scale;
  const buttonPaddingY = 8 * scale;
  const buttonPaddingX = 16 * scale;

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
            whiteSpace: "nowrap",
          }}
        >
          <img
            src={imgSrc}
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
          }}
        >
          {subtitle}
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

const ActionGrid = () => {
  const presetCardWidth = 425;
  const presetCardHeight = 200;
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

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(to bottom, #f4fff4, #effef1)",
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
            fontSize: `${36 * scale}px`,
            fontWeight: "bold",
            marginBottom: `${8 * scale}px`,
            color: "#000",
          }}
        >
          Your Voice, A Cleaner Kerala
        </h1>
        <p
          style={{
            fontSize: `${20 * scale}px`,
            fontStyle: "italic",
            fontWeight: 600,
            color: "#000",
          }}
        >
          Report, Resolve, and Get Rewarded
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
        <ActionCard
          imgSrc="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" // Register a Complaint icon
          title="Register a Complaint"
          subtitle="Facing uncollected waste, blocked drains, or broken bins?"
          buttonText="Register"
          bgColor="#d1fae5"
          textColor="#065f46"
          buttonColor="#059669"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
        <ActionCard
          imgSrc="https://cdn-icons-png.flaticon.com/512/1828/1828665.png" // Illegal Dumping icon
          title="Illegal Dumping"
          subtitle="Seen waste dumped in unauthorized areas?"
          buttonText="Report Now"
          bgColor="#ffedd5"
          textColor="#c2410c"
          buttonColor="#f97316"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
        <ActionCard
          imgSrc="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" // Reward icon
          title="Get Rewarded"
          subtitle="Earn rewards for verified reports."
          buttonText="Learn How"
          bgColor="#dbeafe"
          textColor="#1e3a8a"
          buttonColor="#2563eb"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
        <ActionCard
          imgSrc="https://cdn-icons-png.flaticon.com/512/765/765485.png" // Community Programs icon
          title="Community Programs"
          subtitle="Join clean-up drives, green clubs, and waste awareness campaigns across Kerala."
          buttonText="Explore Programs"
          bgColor="#ecfdf5"
          textColor="#065f46"
          buttonColor="#34d399"
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          scale={scale}
        />
      </div>
    </div>
  );
};

export default ActionGrid;
