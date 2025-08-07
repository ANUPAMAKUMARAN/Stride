import React, { useState, useEffect, useRef } from "react";

const sidebarItems = [
  { icon: "🏠", label: "Home" },
  { icon: "ℹ️", label: "Info" },
  { icon: "🌿", label: "Sustainability" },
  { icon: "🛠️", label: "Tools" },
  { icon: "📞", label: "Contact" },
  { icon: "♻️", label: "Recycle" },
  { icon: "🔔", label: "Notifications" },
  { icon: "⬇️", label: "Download" },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const timeoutRef = useRef(null);

  const handleExpand = () => {
    setExpanded(true);
    resetHideTimer();
  };

  const resetHideTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 5000);
  };

  useEffect(() => {
    const scrollBar = document.getElementById("scrollBarArea");
    if (!scrollBar) return;
    scrollBar.addEventListener("wheel", handleExpand);
    return () => scrollBar.removeEventListener("wheel", handleExpand);
  }, []);

  return (
    <div
      id="scrollBarArea"
      onClick={handleExpand}
      style={{
        position: "fixed",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 1000,
        height: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: expanded ? 50 : 6,
          height: expanded ? "100%" : 40, // Thin bar is small initially
          backgroundColor: expanded ? "#f0f0f0" : "#ccc",
          borderRadius: expanded ? "20px" : "4px",
          boxShadow: expanded ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
          padding: expanded ? "10px 0" : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          gap: expanded ? 15 : 0,
          transition: "all 0.3s ease-in-out",
          overflow: "visible",
          cursor: "pointer",
        }}
      >
        {expanded &&
          sidebarItems.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "relative",
                padding: "5px 0",
              }}
            >
              <div style={{ fontSize: 22 }}>{item.icon}</div>
              {hoveredIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    right: "110%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: 4,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    zIndex: 2000,
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;