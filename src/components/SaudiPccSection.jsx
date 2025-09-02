

import React, { useRef, useState, useEffect } from "react";

const SaudiPccLandingpage = ({ attributes }) => {
    const {
        backgroundColor,
        caption,
        captionColor,
        titleOne,
        titleOneColor,
        titleTwo,
        titleTwoColor,
        subtitle,
        subtitleColor,
        description,
        descriptionColor,
        buttons = [],
        iconLinks = [],
        backgroundImage,
        endline,          
        endlineColor,
        mobileOverlayOpacity,
    } = attributes;

    
    
    const isMobile = window.innerWidth <= 768;

    const videoRef = useRef(null);              // kept so the API surface is unchanged
    const [isPlaying, setIsPlaying] = useState(false); // kept to preserve original logic surface

    const [scale, setScale] = useState(1);
    const [outerMargin, setOuterMargin] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const isMobile = width <= 768;

            // container width: full for mobile, half for desktop 
            const containerWidth = isMobile ? width : width / 2;

            // margin relative to container width 
            const margin =
                width <= 600
                    ? containerWidth * 0.02
                    : width <= 1000
                        ? containerWidth * 0.05
                        : containerWidth * 0.1;
            const maxWidth = 1325;
            let newScale = containerWidth / maxWidth;
            if (newScale > 1) newScale = 1;

            setOuterMargin(margin / 2);
            setScale(newScale);

            if (isMobile) {
               
                setSlideWidth(width);
            } else {
               
                setSlideWidth(containerWidth - margin);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "100%",
                margin: "0",
                padding: "0",
                backgroundColor,
                boxSizing: "border-box",
            }}
        >
            {/* LEFT CONTENT  */}
            <div
                style={{
                    flex: 1,
                    width: slideWidth,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "left",
                    position: "relative",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                {/* MOBILE*/}
                {isMobile && backgroundImage && (
                    <>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0, 
                                width: "100%",
                                height: "100%",
                                minHeight: "100vh", 
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                zIndex: 0,
                            }}
                        />
                        {/* Mobile dark overlay */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: `rgba(0,0,0,${mobileOverlayOpacity || 0.2})`,
                                zIndex: 1,
                            }}
                        />
                    </>
                )}

                {/* TEXT STACK */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: isMobile ? `${16 * scale}px` : 0,
                        paddingBottom: isMobile ? `${20 * scale}px` : 0,
                    }}
                >
                    {/* Caption  */}
                    <div
                        style={{
                            color: captionColor,
                            padding: `${6 * scale}px ${12 * scale}px`,                         
                            fontSize: `${24 * scale}px`,
                            fontWeight: 600,
                            marginBottom: `${18 * scale}px`,
                            display: "inline-block",
                            marginTop: isMobile ? "10px" : "10",
                        }}
                    >
                        {caption}
                    </div>

                    {/* Titles */}
                    <h1
                        style={{
                            fontSize: `${90 * scale}px`,
                            fontWeight: 700,
                            lineHeight: 1.1,
                            margin: 0,
                            color: isMobile ? "#fff" : titleOneColor,
                            width: "min(90%, 700px)",
                        }}
                    >
                        {titleOne}
                    </h1>
                    <h1
                        style={{
                            fontSize: `${90 * scale}px`,
                            fontWeight: 700,
                            lineHeight: 1.1,
                            marginTop: `${6 * scale}px`,
                            marginBottom: `${22 * scale}px`,
                            color: isMobile ? "#fff" : titleTwoColor,
                            width: "min(90%, 700px)",
                        }}
                    >
                        {titleTwo}
                    </h1>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontSize: `${40 * scale}px`,
                            color: isMobile ? "#fff" : subtitleColor,
                            marginBottom: `${14 * scale}px`,
                            width: "min(90%, 720px)",
                        }}
                    >
                        {subtitle}
                    </p>

                    {/*  icon row   */}
                    <div
                        style={{
                            display: "flex",
                            gap: `${24 * scale}px`,
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginBottom: `${16 * scale}px`,
                            color: isMobile ? "#fff" : "#fff",
                        }}
                    >
                        {iconLinks.map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: `${10 * scale}px`,
                                    fontSize: `${26 * scale}px`,
                                    fontWeight: 600,
                                }}
                            >
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    style={{
                                        width: `${40 * scale}px`,
                                        height: `${40 * scale}px`,
                                        objectFit: "contain",
                                    }}
                                />
                                <span>{item.title}</span>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: `${35 * scale}px`,
                            color: isMobile ? "#fff" : descriptionColor,
                            marginBottom: `${20 * scale}px`,
                            width: "min(90%, 720px)",
                        }}
                    >
                        {description}
                    </p>

                    {/* Buttons  */}
                    <div style={{ textAlign: "center", marginTop: `${10 * scale}px` }}>
                       
                        {/* Buttons row */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row", 
                                justifyContent: "center",
                                alignItems: "center",
                                gap: `${18 * scale}px`,
                                marginTop: `${16 * scale}px`,
                                flexWrap: "nowrap",
                                
                            }}
                        >
                            {buttons.map((btn, idx) => (
                                <a
                                    key={idx}
                                    href={btn.link}
                                    style={{
                                        backgroundColor: btn.bgColor,
                                        color: btn.textColor,
                                        padding: `${17 * scale}px ${20 * scale}px`,
                                        fontSize: `${26 * scale}px`,
                                        fontWeight: "600",
                                        borderRadius: `${8 * scale}px`,
                                        textDecoration: "none",
                                        whiteSpace: "nowrap", 
                                        textAlign: "center",
                                        transition: "transform 0.2s ease",
                                         border: "1px solid #ccc",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                >
                                    {btn.text}
                                </a>
                            ))}
                        </div>

                    </div>


                    {/* Endline */}
                    {endline && (
                        <p
                            style={{
                                fontSize: `${18 * scale}px`,
                                color: isMobile ? "#fff" : endlineColor,
                                opacity: 0.9,
                                marginTop: `${4 * scale}px`,
                            }}
                        >
                            {endline}
                        </p>
                    )}
                </div>
            </div>

            {/* RIGHT: Image area (desktop only),  */}
            {!isMobile && (
                <div
                    style={{
                        flex: 1, 
                        width: slideWidth,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Image */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            width: " 100%",
                            height: "100%",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{

                                width: "100%",            
                                height: "100%",          
                                minHeight: "70vh",       
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}


                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default SaudiPccLandingpage;
