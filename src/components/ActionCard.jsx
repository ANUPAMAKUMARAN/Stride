
import React, { useState, useEffect, useRef } from "react";

const ActionCard = ({
  emoji,
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
  const emojiFontSize = 32 * scale;
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
          <span style={{ fontSize: `${emojiFontSize}px` }}>{emoji}</span>
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
  const scrollRef = useRef();
  const presetCardWidth = 425;
  const presetCardHeight = 200;
  const presetGap = 24;
  const maxWidth = 1325; // This is now the max total width of the grid

  const [scale, setScale] = useState(1);
  const [outerMargin, setOuterMargin] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Calculate the total required width for the grid at full scale (2 cards + 1 gap)
      const fullGridWidth = (presetCardWidth * 2) + presetGap;
      
      // If the screen width is less than the full grid width, we need to scale down.
      let newScale;
      let newOuterMargin;

      if (width > fullGridWidth) {
        // Screen is wide enough, use a max width and center the grid.
        newScale = 1;
        newOuterMargin = (width - fullGridWidth) / 2;
      } else {
        // Screen is too narrow, calculate scale to make it fit
        // The `16` here is a fixed small margin to prevent content from touching the edge.
        const smallScreenMargin = 16;
        const containerWidth = width - (smallScreenMargin * 2);
        newScale = containerWidth / fullGridWidth;
        newOuterMargin = smallScreenMargin;
      }
      
      // Cap the scale at 1 to prevent elements from getting larger than their preset size
      if (newScale > 1) {
        newScale = 1;
      }

      setScale(newScale);
      setOuterMargin(newOuterMargin);
    };

    handleResize();
    const timeout = setTimeout(handleResize, 50);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardWidth = presetCardWidth * scale;
  const cardHeight = presetCardHeight * scale;

  return (
    <div
      ref={scrollRef}
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
          emoji="📝"
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
          emoji="🚫"
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
          emoji="🎁"
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
          emoji="🌱"
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