


import React, { useEffect, useState } from "react";

const SaudiPCCSection = () => {
    const baseWidth = 1325;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const scale = Math.min(1, windowWidth / baseWidth);
    const isMobile = windowWidth <= 768;


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const backgroundImageUrl =
        "https://thumbs.dreamstime.com/b/office-life-concepts-person-drinking-coffee-using-computer-laptop-window-view-135173696.jpg";

    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                width: "100%",
                backgroundColor: "#1f2e84",
                color: "white",
                boxSizing: "border-box",
                flexWrap: "wrap",
            }}
        >
            {/* Left Text Section */}
            <div
                style={{
                    flex: 1,
                    // padding: `${10 * scale}px ${isMobile ? 16 * scale : 10 * scale}px`,
                    // padding:"10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: isMobile ? "100%" : "50%",
                    backgroundImage: isMobile ? `url(${backgroundImageUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: `${500 * scale}px`,
                    position: "relative",
                }}
            >
                {/* Dark Overlay for mobile */}
                {isMobile && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1,
                        }}
                    />
                )}

                {/* Content Block */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        maxWidth: `${480 * scale}px`,
                        marginLeft: isMobile ? "auto" : 0,
                        marginRight: isMobile ? "auto" : "unset",
                        textAlign: "left",
                        alignItems: "flex-start",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >

                   
                    <p
                        style={{
                            color: "#cbd5e0",
                            fontSize: `${14 * scale}px`,
                            marginBottom: `${8 * scale}px`,
                            
                        }}
                    >
                        SAUDI PCC SERVICE
                    </p>
                    <h1
                        style={{
                            fontSize: `${36 * scale}px`,
                            fontWeight: "bold",
                            lineHeight: 1.2,
                            marginBottom: `${16 * scale}px`,
                            
                        }}
                    >
                        Want Your Saudi PCC–<br />
                        Fast & Hassle-Free?
                    </h1>
                    <p
                        style={{
                            fontSize: `${16 * scale}px`,
                            marginBottom: `${24 * scale}px`,
                         
                        }}
                    >
                        Let our expert team do the legwork. You relax.
                    </p>

                    {/* Icons Row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: `${24 * scale}px`,
                            marginBottom: `${24 * scale}px`,
                            fontSize: `${14 * scale}px`,
                            fontWeight: 600,
                            flexWrap: "wrap",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          📄 Secure
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            📄 Transparent
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            📄 Affordable
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: `${15 * scale}px`,
                            marginBottom: `${24 * scale}px`,
                            lineHeight: 1.4,
                            maxWidth: isMobile ? "100%" : "480px",
                            textAlign: "left", 
                        }}
                    >
                        Tired of confusing embassy processes? We’ll handle your Saudi PCC completely online.
                    </p>

                    {/* Buttons */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: `${12 * scale}px`,
                            marginBottom: `${16 * scale}px`,
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            style={{
                                padding: `${12 * scale}px ${20 * scale}px`,
                                backgroundColor: "#00c4ff",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: 600,
                                color: "#000",
                                cursor: "pointer",
                                fontSize: `${14 * scale}px`,
                            }}
                        >
                            GET STARTED NOW
                        </button>
                        <button
                            style={{
                                padding: `${12 * scale}px ${20 * scale}px`,
                                backgroundColor: "transparent",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                fontWeight: 600,
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: `${14 * scale}px`,
                            }}
                        >
                            REQUEST YOUR SAUDI PCC NOW
                        </button>
                    </div>

                    <p
                        style={{
                            fontSize: `${13 * scale}px`,
                            color: "#ccc",
                            textAlign: "center",
                        }}
                    >
                        100% support until delivery. No hidden charges
                    </p>
                </div>
            </div>

            {/* Right Image (Desktop Only) */}
            {!isMobile && (
                <div
                    style={{
                        flex: 1,
                        minWidth: "300px",
                        minHeight: `${500 * scale}px`,
                        display: "flex",
                    }}
                >
                    <img
                        src={backgroundImageUrl}
                        alt="Saudi PCC"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default SaudiPCCSection;