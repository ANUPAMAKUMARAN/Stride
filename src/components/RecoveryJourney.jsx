import React, { useState } from "react";
// import { RecoveryJourneyData } from "./RecoveryJourneyData";

const RecoveryJourney = ({attributes}) => {
  const { caption, captionColor, titleOne, titleOneColor, titleTwo, titleTwoColor, slides } = attributes;

  const [page, setPage] = useState(0); // 0 = first 3 slides, 1 = second 3 slides, 2 = last 3 slides
  const slidesPerPage = 3;
  const totalPages = Math.ceil(slides.length / slidesPerPage);

  const startIndex = page * slidesPerPage;
  const visibleSlides = slides.slice(startIndex, startIndex + slidesPerPage);

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      {/* Caption */}
      <p style={{ fontSize: "14px", fontWeight: "500", color: captionColor || "#00bcd4", marginBottom: "8px" }}>
        {caption}
      </p>

      {/* Title */}
      <h2 style={{ fontSize: "28px", fontWeight: "600", color: "#222", marginBottom: "40px" }}>
        <span style={{ color: titleOneColor || "#000" }}>{titleOne} </span>
        <span style={{ color: titleTwoColor || "#000" }}>{titleTwo}</span>
      </h2>

{/* Pagination */}
{/* Pagination with dots */}
<div style={{ marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
  {Array.from({ length: totalPages }).map((_, i) => (
    <React.Fragment key={i}>
      {/* Page number */}
      <button
        onClick={() => setPage(i)}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: page === i ? "#00bcd4" : "#ddd",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {i + 1}
      </button>

      {/* Connector dots (only show if not the last number) */}
      {i < totalPages - 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {Array.from({ length: 5 }).map((_, dotIndex) => (
            <div
              key={dotIndex}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
              }}
            ></div>
          ))}
        </div>
      )}
    </React.Fragment>
  ))}
</div>

      {/* <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "12px" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: page === i ? "#00bcd4" : "#ddd",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div> */}
      {/* Slides */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "0 auto",
          marginTop:"30px",
        }}
      >
        {visibleSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              backgroundColor: slide.backgroundColor || "#f9f9f9",
              border: `1px solid ${slide.borderColor || "#ddd"}`,
              borderRadius: "10px",
              padding: "24px",
              textAlign: "left",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            }}
          >
            {/* Icon */}
            <div style={{ fontSize: "28px", marginBottom: "16px" }}>{slide.icon || "🔹"}</div>

            {/* Title */}
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
              {slide.title}
            </h3>

            {/* Description */}
            <p style={{ fontSize: "14px", color: "#555" }}>{slide.description}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default RecoveryJourney;
