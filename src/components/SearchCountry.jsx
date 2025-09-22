
import React, { useState, useEffect, useRef } from "react";

const CountryChart = ({ attributes }) => {
  const { slideShow, slides } = attributes;
  const [openIndex, setOpenIndex] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const listRef = useRef(null); // reference for scrollable div

  const toggleSlide = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Styles
  const slideHeight = isSmallScreen ? 100 : 120;
  const containerHeight = `${slideShow * slideHeight}px`;
  const containerWidth = isSmallScreen ? "95%" : "700px";
  const containerPadding = isSmallScreen ? "16px" : "30px";
  const titleFont = isSmallScreen ? "18px" : "22px";
  const bodyFont = isSmallScreen ? "14px" : "16px";
  const buttonFont = isSmallScreen ? "12px" : "14px";

  const Wrapper = ({ children }) =>
    isSmallScreen ? (
      <>{children}</>
    ) : (
      <div
        style={{
          width: "100%",
          padding: "40px",
          background: "#f0f4ff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    );

  // Filtered slides
  const filteredSlides = slides.filter((slide) =>
    slide.countryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll controls
  // Scroll controls - one by one
const scrollPrev = () => {
  if (listRef.current) {
    listRef.current.scrollBy({
      top: -slideHeight, // scroll exactly one slide
      behavior: "smooth",
    });
  }
};

const scrollNext = () => {
  if (listRef.current) {
    listRef.current.scrollBy({
      top: slideHeight, // scroll exactly one slide
      behavior: "smooth",
    });
  }
};

  // const scrollPrev = () => {
  //   if (listRef.current) {
  //     listRef.current.scrollBy({
  //       top: -slideHeight * slideShow,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const scrollNext = () => {
  //   if (listRef.current) {
  //     listRef.current.scrollBy({
  //       top: slideHeight * slideShow,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <Wrapper>
      <div
        style={{
          width: containerWidth,
          border: "1px solid #e0e7ff",
          borderRadius: "12px",
          padding: containerPadding,
          background: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "16px",
            padding: "8px",
            fontSize: bodyFont,
            border: "1px solid #e0e7ff",
            borderRadius: "8px",
            outline: "none",
          }}
        />

        {/* Scrollable country list */}
        <div
          ref={listRef}
          style={{
            height: filteredSlides.length > 0 ? containerHeight : "60px",
            overflowY: filteredSlides.length > 0 ? "auto" : "hidden",
            paddingRight: "4px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredSlides.length > 0 ? (
            filteredSlides.map((slide, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #4A6CF7",
                  borderRadius: "12px",
                  marginBottom: "16px",
                  padding: "16px",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(74,108,247,0.1)",
                  minHeight: `${slideHeight - 20}px`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: titleFont,
                    fontWeight: "600",
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#1e3a8a",
                  }}
                >
                  {slide.countryName}
                  <button
                    onClick={() => toggleSlide(index)}
                    style={{
                      fontSize: buttonFont,
                      padding: "4px 10px",
                      border: "1px solid #4A6CF7",
                      borderRadius: "20px",
                      background: openIndex === index ? "#4A6CF7" : "#fff",
                      color: openIndex === index ? "#fff" : "#4A6CF7",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    {openIndex === index ? "Hide" : "Show"}
                  </button>
                </div>
                {openIndex === index && (
                  <div
                    style={{
                      fontSize: bodyFont,
                      color: "#374151",
                      marginTop: "10px",
                    }}
                  >
                    <p style={{ marginBottom: "6px" }}>
                      <strong style={{ color: "#111827" }}>
                        Organisation or Body:{" "}
                      </strong>
                      {slide.organisation}
                    </p>
                    <p>
                      <strong style={{ color: "#111827" }}>Website: </strong>
                      {slide.website}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: bodyFont,
              }}
            >
              No countries found.
            </div>
          )}
        </div>

        {/* Scroll Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <button
            onClick={scrollPrev}
            style={{
              fontSize: buttonFont,
              padding: "6px 14px",
              border: "1px solid #4A6CF7",
              borderRadius: "8px",
              background: "#fff",
              color: "#4A6CF7",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            ⬆ Prev
          </button>
          <button
            onClick={scrollNext}
            style={{
              fontSize: buttonFont,
              padding: "6px 14px",
              border: "1px solid #4A6CF7",
              borderRadius: "8px",
              background: "#fff",
              color: "#4A6CF7",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Next ⬇
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CountryChart;
