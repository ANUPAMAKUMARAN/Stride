


import React, { useState, useEffect } from "react";

const FestiveBanner = ({ attributes }) => {
  const {
    titleOne,
    titleTwo,
    titleColor,
    imageOne,
    imageTwo,
    imageThree,
    text,
    textColor,
    description,
    descriptionColor,
    buttonText,
    buttonColor,
    buttonHoverColor,
  } = attributes;

  const images = [imageOne, imageTwo, imageThree];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // 🔁 Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 📱 Scaling & responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobile(true);
        setScaleMultiplier(0.9);
      } else if (width < 1024) {
        setIsMobile(false);
        setScaleMultiplier(0.95);
      } else {
        setIsMobile(false);
        setScaleMultiplier(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        background: "#fff",
        transform: `scale(${scaleMultiplier})`,
        transformOrigin: "center top",
        transition: "transform 0.3s ease",
        margin: 0,
        padding: 0,
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: isMobile ? "unset" : "1.8",
          position: "relative",
          textAlign: "center",
          color: titleColor,
          minHeight: isMobile ? "280px" : "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "0px" : "40px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Slideshow */}
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === currentIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: 0,
            }}
          />
        ))}

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1,
          }}
        ></div>

        {/* Two-line Title */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "40px",
              lineHeight: "1.3",
              fontWeight: "400",
              margin: 0,
              fontFamily: "serif",
              color: titleColor,
            }}
          >
            {titleOne} <br /> {titleTwo}
          </h2>
        </div>

        {/* Move right content below in mobile */}
        {isMobile && (
          <div
            style={{
              marginTop: "25px",
              zIndex: 3,
              position: "relative",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: buttonColor,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "20px",
                margin: "0 auto 15px auto",
                color: "#fff",
              }}
            >
              D’
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "500",
                color: isMobile ? "#f5f5f5" : textColor,
                marginBottom: "10px",
              }}
            >
              {text}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: isMobile ? "#f5f5f5" : descriptionColor,
                marginBottom: "20px",
              }}
            >
              {description}
            </div>
            <button
              style={{
                backgroundColor: buttonColor,
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                cursor: "pointer",
                marginBottom: "25px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = buttonHoverColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = buttonColor)
              }
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      {!isMobile && (
        <div
          style={{
            flex: "1",
            background: "#fff",
            textAlign: "center",
            padding: "40px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: "50px",
              width: "50px",
              backgroundColor: buttonColor,
              color: "#fff",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            D’
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "500",
              color: textColor,
              marginBottom: "10px",
            }}
          >
            {text}
          </div>
          <div
            style={{
              fontSize: "18px",
              color: descriptionColor,
              marginBottom: "25px",
            }}
          >
            {description}
          </div>
          <button
            style={{
              backgroundColor: buttonColor,
              color: "#fff",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = buttonHoverColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = buttonColor)
            }
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default FestiveBanner;
