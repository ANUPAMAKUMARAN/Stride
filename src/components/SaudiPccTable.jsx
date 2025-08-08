
import React, { useEffect, useState } from "react";

const useScaleMultiplier = (minScale = 0.6, maxScale = 1.2) => {
  const [scale, setScale] = useState(1);

  const updateScale = () => {
    const width = window.innerWidth;
    const newScale = Math.max(minScale, Math.min(width / 1325, maxScale));
    setScale(newScale);
  };

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [minScale, maxScale]);

  return scale;
};

// Check and Cross icons with scale support
const Check = ({ color = "white", bg = "#00B3E3", scale = 1 }) => (
  <span
    style={{
      backgroundColor: bg,
      color: color,
      borderRadius: "50%",
      width: 24 * scale,
      height: 24 * scale,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14 * scale,
      margin: "0 auto",
    }}
  >
    ✓
  </span>
);

const Cross = ({ color = "white", bg = "#FF5A5A", scale = 1 }) => (
  <span
    style={{
      backgroundColor: bg,
      color: color,
      borderRadius: "50%",
      width: 24 * scale,
      height: 24 * scale,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14 * scale,
      margin: "0 auto",
    }}
  >
    ✕
  </span>
);

const ComparisonTable = ({ attributes }) => {
  const {
    caption,
    captionColor,
    title,
    titleColor,
    tableBorder,
    tableHeaderColor,
    tableHeaderOne,
    tableHeaderTwo,
    tableHeaderThree,
    tableHeaderFour,
    tableHeaderTextColor,
    columnOneBackground,
    columnTwoBackground,
    columnThreeBackground,
    columnFourBackground,
    tickColor,
    tickBackground,
    untickColor,
    untickBackground,
    itemsTextColor,
    items = [],
    description,
    descriptionColor,
    primaryButtonText,
    primaryButtonTextColor,
    primaryButtonColor,
    SecondaryButtonText,
    SecondaryButtonTextColor,
    SecondaryButtonColor,
  } = attributes;

  const scale = useScaleMultiplier();

  return (
    <div
      style={{
        width: "100%",
        padding: "40px 20px",
        boxSizing: "border-box",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Headings */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <p
          style={{
            color: captionColor || "#00B3E3",
            textTransform: "uppercase",
            fontSize: 14 * scale,
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          {caption}
        </p>
        <h2
          style={{
            color: titleColor || "#1E2A78",
            fontSize: 28 * scale,
            fontWeight: "bold",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Table with gradient border */}
      <div
        style={{
          borderRadius: tableBorder * scale,
          padding: `${7 * scale}px`, // thicker border padding
          background:
            tableHeaderColor ||
            "linear-gradient(135deg, #00EFFF, #7B1FA2, #00EFFF)",
          marginTop: 30,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18 * scale,
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              borderRadius: 18 * scale,
              overflow: "hidden",
            }}
          >
            <colgroup>
              <col style={{ width: "40%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>

            <thead>
              <tr
                style={{
                  background: "linear-gradient(to right, #00B3E3, #3B0B9F)",
                  color: tableHeaderTextColor || "white",
                }}
              >
                <th style={tableHeaderStyle(scale)}>{tableHeaderOne}</th>
                <th style={tableHeaderStyle(scale)}>{tableHeaderTwo}</th>
                <th style={tableHeaderStyle(scale)}>{tableHeaderThree}</th>
                <th style={tableHeaderStyle(scale)}>{tableHeaderFour}</th>
              </tr>
            </thead>

            <tbody>
              {items.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                    color: itemsTextColor || "#000",
                  }}
                >
                  <td
                    style={{
                      ...tableCellStyle(scale),
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      backgroundColor: columnOneBackground || "transparent"
                    }}
                  >
                    {row.text}
                  </td>
                  <td style={{...iconCellStyle(scale), backgroundColor: columnTwoBackground || "transparent" }}>
                    {row.columnOne ? (
                      <Check
                        scale={scale}
                        color={tickColor || "white"}
                        bg={tickBackground || "#00B3E3"}
                      />
                    ) : (
                      <Cross
                        scale={scale}
                        color={untickColor || "white"}
                        bg={untickBackground || "#FF0000"}
                      />
                    )}
                  </td>
                  <td style={{...iconCellStyle(scale), backgroundColor: columnThreeBackground || "transparent"}}>
                    {row.columnTwo ? (
                      <Check
                        scale={scale}
                        color={tickColor || "white"}
                        bg={tickBackground || "#00B3E3"}
                      />
                    ) : (
                      <Cross
                        scale={scale}
                        color={untickColor || "white"}
                        bg={untickBackground || "#FF0000"}
                      />
                    )}
                  </td>
                  <td style={{...iconCellStyle(scale), backgroundColor: columnFourBackground || "transparent"}}>
                    {row.columnThree ? (
                      <Check
                        scale={scale}
                        color={tickColor || "white"}
                        bg={tickBackground || "#00B3E3"}
                      />
                    ) : (
                      <Cross
                        scale={scale}
                        color={untickColor || "white"}
                        bg={untickBackground || "#FF0000"}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom text */}
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontSize: 14 * scale,
          marginTop: 24,
          color: descriptionColor || "#1E2A78",
        }}
      >
        {description}
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12 * scale,
          flexWrap: "nowrap",
          marginTop: 20 * scale,
        }}
      >
        <button
          style={{
            backgroundColor: primaryButtonColor || "#00B3E3",
            color: primaryButtonTextColor || "white",
            width: 150 * scale,
            height: 34 * scale,
            borderRadius: 4 * scale,
            border: "none",
            fontWeight: 500,
            fontSize: 12 * scale,
            lineHeight: `${34 * scale}px`,
            cursor: "pointer",
          }}
        >
          {primaryButtonText}
        </button>
        <button
          style={{
            border: `1px solid ${SecondaryButtonTextColor || "#00B3E3"}`,
            color: SecondaryButtonTextColor || "#00B3E3",
            width: 230 * scale,
            height: 34 * scale,
            borderRadius: 4 * scale,
            fontWeight: 500,
            fontSize: 12 * scale,
            lineHeight: `${34 * scale}px`,
            backgroundColor: SecondaryButtonColor || "white",
            cursor: "pointer",
          }}
        >
          {SecondaryButtonText}
        </button>
      </div>
    </div>
  );
};

// Reusable styles
const tableHeaderStyle = (scale) => ({
  padding: `${14 * scale}px ${16 * scale}px`,
  textAlign: "center",
  fontWeight: 600,
  fontSize: 16 * scale,
});

const tableCellStyle = (scale) => ({
  padding: `${12 * scale}px ${16 * scale}px`,
  fontSize: 14 * scale,
  verticalAlign: "middle",
});

const iconCellStyle = (scale) => ({
  textAlign: "center",
  padding: `${12 * scale}px ${16 * scale}px`,
});

export default ComparisonTable;
