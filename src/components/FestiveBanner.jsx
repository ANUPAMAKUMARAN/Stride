

import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const waveStyleLeft = {
  position: "absolute",
  bottom: "75px",
  left: "40px",
  width: "150px",
  height: "10px",
  background:
    "radial-gradient(circle at 50% 100%, transparent 4px, #ccc 4px, #ccc 5px, transparent 5px) 0 0 / 10px 100% repeat-x",
  opacity: 0.8,
  zIndex: 1,
};

const waveStyleRight = {
  position: "absolute",
  bottom: "40px",
  right: "10px",
  width: "150px",
  height: "10px",
  background:
    "radial-gradient(circle at 50% 100%, transparent 4px, #ccc 4px, #ccc 5px, transparent 5px) 0 0 / 10px 100% repeat-x",
  opacity: 0.8,
  zIndex: 1,
};

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

  const allImages = [imageOne, imageTwo, imageThree].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  
  const [isMobile, setIsMobile] = useState(false);

const [scaledRadius, setScaledRadius] = useState("50px");

useEffect(() => {
  const updateRadius = () => {
    const width = window.innerWidth;
    
    let radius;
    if (width >= 1200) radius = 50;     
    else if (width >= 992) radius = 40; 
    else if (width >= 768) radius = 25; 
    
    else radius = 20;                   
    setScaledRadius(`${radius}px`);
  };

  updateRadius();
  window.addEventListener("resize", updateRadius);
  return () => window.removeEventListener("resize", updateRadius);
}, []);

  // Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  // Responsiveness
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

  const desktopSlides = [
    { position: "0% 0%" },
    { position: "33.33% 0%" },
    { position: "66.66% 0%" },
    { position: "100% 0%" },
  ];

  const currentImageSource = allImages[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        maxWidth: "100%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100vw",
          maxWidth: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transform: `scale(${scaleMultiplier})`,
          transformOrigin: "center top",
          transition: "transform 0.3s ease",
          margin: 0,
          padding: 0,
          clipPath: !isMobile
            ? "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)"
            : "none",
          borderRadius: "50px",
          marginTop: "20px",
        }}
      >
        {/* LEFT SECTION */}
        <div
          style={{
            width: "100%",
            flex: isMobile ? "unset" : "1.8",
            position: "relative",
            textAlign: "center",
            color: titleColor,
            minHeight: isMobile ? "280px" : "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: isMobile ? "0px" : "50px",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {/* Background image */}
          {!isMobile ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                zIndex: 0,
              }}
            >
              {desktopSlides.map((slide, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1",
                    backgroundImage: `url(${currentImageSource})`,
                    backgroundSize: "400% 100%",
                    backgroundPosition: `${i * 33.333}% 0%`,
                    backgroundRepeat: "no-repeat",
                    // borderRadius: "50px",
                    borderRadius: scaledRadius,
                    overflow: "hidden",
                    marginRight: "0px",
                    transition: "background-image 1s ease-in-out",
                  }}
                />
              ))}
            </div>
          ) : (
            <>
              {/* Mobile background */}
              <img
                src={currentImageSource}
                alt=""
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  // borderRadius: "50px"
                  // ,
                  borderRadius: scaledRadius,
                }}
              />

              {/* ✅ Mobile overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6))",
                  borderRadius: "50px",
                  zIndex: 1,
                }}
              />
            </>
          )}

          {/* TEXT */}
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

          {/* MOBILE BUTTON SECTION */}
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
                  color: "#f5f5f5",
                  marginBottom: "10px",
                }}
              >
                {text}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#f5f5f5",
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

        {/* RIGHT SECTION */}
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
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={waveStyleLeft}></div>
            <div style={waveStyleRight}></div>

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
                fontSize: "25px",
                marginBottom: "20px",
                zIndex: 2,
              }}
            >
              D’
            </div>
            <div
              style={{
                fontSize: "46px",
                fontWeight: "500",
                color: textColor,
                marginBottom: "10px",
                zIndex: 2,
              }}
            >
              {text}
            </div>
            <div
              style={{
                fontSize: "28px",
                color: descriptionColor,
                marginBottom: "25px",
                zIndex: 2,
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
                fontSize: "26px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                zIndex: 2,
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

        {/* THIRD SECTION - Icons */}
        {!isMobile && (
          <div
            style={{
              width: "90px",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "25px",
              borderLeft: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#25D366",
                fontSize: "30px",
                textDecoration: "none",
              }}
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:info@example.com"
              style={{
                color: "#6a1b9a",
                fontSize: "28px",
                textDecoration: "none",
              }}
            >
              <FaEnvelope />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FestiveBanner;


