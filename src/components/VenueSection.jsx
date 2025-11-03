
import React, { useEffect, useState } from "react";

const VenueSection = ({ attributes }) => {
  const {
    backgroundColor,
    title,
    titleColor,
    caption,
    captionColor,
    buttonText,
    buttonColor,
    slides = [],
    leafImage,
  } = attributes;

  const [currentSet, setCurrentSet] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Auto slide every 2 seconds
  useEffect(() => {
    if (slides.length <= 4) return;
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % Math.ceil(slides.length / 4));
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth <= 1024 && windowWidth > 600;
  const isMobile = windowWidth <= 600;

  // Always show 4 images, just resize layout
  const startIndex = currentSet * 4;
  const visibleSlides = slides.slice(startIndex, startIndex + 4);

  const styles = {
    container: {
      backgroundColor,
      borderRadius: "20px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "20px" : "40px",
      width: isMobile ? "95%" : "80%",
      margin: "40px auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      flexWrap: "wrap",
      textAlign: isMobile ? "center" : "left",
      transition: "all 0.3s ease",
    },
    imageGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: isMobile ? "10px" : "15px",
      flex: "1 1 350px",
      minWidth: "280px",
      transition: "opacity 0.8s ease-in-out",
      justifyContent: "center",
    },
    imageBox: {
      position: "relative",
      width: "100%",
      paddingBottom: "70%", // fixed ratio (keeps desktop shape)
      borderRadius: "12px",
      overflow: "hidden",
      maxWidth: isMobile ? "160px" : "100%",
      margin: isMobile ? "0 auto" : "0",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px",
    },
    textSection: {
      flex: "1 1 300px",
      color: titleColor,
      padding: isMobile ? "10px" : "0 20px",
      position: "relative",
    },
    title: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: "600",
      color: titleColor,
      marginBottom: "15px",
    },
    caption: {
      fontSize: isMobile ? "14px" : "16px",
      color: captionColor,
      marginBottom: "25px",
      lineHeight: "1.6",
    },
    button: {
      background: buttonColor,
      border: "none",
      color: "#fff",
      padding: isMobile ? "10px 22px" : "12px 28px",
      borderRadius: "30px",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
    leaf: {
      position: isMobile ? "static" : "absolute",
      right: isMobile ? "0" : "-40px",
      bottom: isMobile ? "auto" : "0",
      width: isMobile ? "70px" : "100px",
      opacity: 0.8,
      marginTop: isMobile ? "10px" : "0",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageGrid} key={currentSet}>
        {visibleSlides.map((slide, index) => (
          <div style={styles.imageBox} key={index}>
            <img src={slide.image} alt={`Slide ${index}`} style={styles.image} />
          </div>
        ))}
      </div>

      <div style={styles.textSection}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.caption}>{caption}</p>
        {buttonText && <button style={styles.button}>{buttonText}</button>}
        {leafImage && <img src={leafImage} alt="leaf" style={styles.leaf} />}
      </div>
    </div>
  );
};

export default VenueSection;
