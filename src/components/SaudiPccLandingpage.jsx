
import React, { useEffect, useState, useRef } from "react";

const SaudiPccLandingpage = ({ attributes }) => {
    const {
        backgroundColor,
        caption,
        captionColor,
        title,
        titleColor,
        subTitle,
        subTitleColor,
        description,
        descriptionColor,
        buttons = [],
        reviews = [],
        videoUrl,
        iconLinks = [],
        mobileOverlayOpacity,
    } = attributes;

    const [hoveredReview, setHoveredReview] = useState(null);
    const isMobile = window.innerWidth <= 768;

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [scale, setScale] = useState(1);
    const [outerMargin, setOuterMargin] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // breakpoint (adjust as needed)
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

            // scale relative to max design width
            const maxWidth = 1325;
            let newScale = containerWidth / maxWidth;
            if (newScale > 1) newScale = 1;

            // set values
            setOuterMargin(margin / 2);
            setScale(newScale);

            if (isMobile) {
                // only one visible card → 100% width
                setSlideWidth(width);
            } else {
                // desktop → two cards
                setSlideWidth(containerWidth - margin);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const iconItemBasis = `${100 / 4}%`;


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
                backgroundColor: backgroundColor,
                boxSizing: "border-box",
            }}
        >
            {/* Left Content */}
            <div
                style={{
                    width: slideWidth,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "left",
                    position: "relative",
                    boxSizing: "border-box",
                }}
            >
                {/* Mobile Video Background */}
                {isMobile && (
                    <>
                        <video
                            src={videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                                position: "absolute",
                                top: 0,
                                width: "100%",
                                left: isMobile ? 0 : outerMargin,
                                height: "100%",
                                objectFit: "cover",
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

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* Tag */}
                    <div
                        style={{
                            backgroundColor: "#d6f0ff",
                            color: captionColor,
                            padding: `${6 * scale}px ${12 * scale}px`,
                            borderRadius: `${20 * scale}px`,
                            fontSize: `${24 * scale}px`,
                            fontWeight: 600,
                            marginBottom: `${18 * scale}px`,
                            display: "inline-block",

                            marginTop: isMobile ? "10px" : "10",
                        }}
                    >
                        {caption}
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: `${90 * scale}px`,
                            fontWeight: 600,
                            lineHeight: 1.2,
                            marginBottom: `${22 * scale}px`,
                            color: isMobile ? "#fff" : titleColor,
                            width: "min(90%, 550px)",
                            //                    
                        }}
                    >
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontSize: `${40 * scale}px`,
                            color: isMobile ? "#fff" : subTitleColor,
                            marginBottom: `${10 * scale}px`,
                        }}
                    >
                        {subTitle}
                    </p>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: `${35 * scale}px`,
                            color: isMobile ? "#fff" : descriptionColor,
                            marginBottom: `${28 * scale}px`,
                        }}
                    >
                        {description}
                    </p>

                    {/* Buttons */}
                    <div style={{ textAlign: "center", marginTop: `${15 * scale}px` }}>
                        {/* First row (first half of buttons) */}
                        <div
                            style={{
                                display: "flex",
                                gap: `${12 * scale}px`,
                                justifyContent: "center",
                                marginBottom: `${19 * scale}px`,
                                flexWrap: "nowrap", // force single line
                            }}
                        >
                            {buttons.slice(0, Math.ceil(buttons.length / 2)).map((btn, idx) => (
                                <button
                                    key={idx}
                                    style={{
                                        padding: `${10 * scale}px ${16 * scale}px`,
                                        backgroundColor: btn.buttonColor,
                                        color: btn.buttonTextColor,
                                        border: "none",
                                        borderRadius: "6px",
                                        fontWeight: 600,
                                        fontSize: `${26 * scale}px`,
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {btn.buttonText}
                                </button>
                            ))}
                        </div>

                        {/* Second row (remaining buttons) */}
                        <div
                            style={{
                                display: "flex",
                                gap: `${12 * scale}px`,
                                justifyContent: "center",
                                flexWrap: "nowrap",
                              
                                marginBottom: `${20 * scale}px`,
                            }}
                        >
                            {buttons.slice(Math.ceil(buttons.length / 2)).map((btn, idx) => (
                                <button
                                    key={idx}
                                    style={{
                                        padding: `${10 * scale}px ${16 * scale}px`,
                                        backgroundColor: btn.buttonColor,
                                        color: btn.buttonTextColor,
                                        border: "none",
                                        borderRadius: "6px",
                                        fontWeight: 600,
                                        fontSize: `${26 * scale}px`,
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {btn.buttonText}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Reviews */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: `${63 * scale}px`,
                            marginTop: `${15 * scale}px`,
                        }}
                    >
                        {/* Reviewer images with overlap */}
                        <div style={{ display: "flex", alignItems: "center" }}>

                            {reviews.map((rev, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        position: "relative",
                                        zIndex: reviews.length - idx,
                                        marginLeft: idx === 0 ? 0 : `-${28 * scale}px`,
                                    }}
                                    onMouseEnter={() => setHoveredReview(idx)}
                                    onMouseLeave={() => setHoveredReview(null)}
                                >
                                    <img
                                        src={rev.image}
                                        alt="Reviewer"
                                        style={{
                                            width: `${45 * scale}px`,
                                            height: `${45 * scale}px`,
                                            borderRadius: "50%",
                                            border: `${2 * scale}px solid #fff`,
                                            objectFit: "cover",
                                            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
                                            cursor: "pointer",
                                        }}
                                    />

                                    {/* Hover Popup */}
                                    {hoveredReview === idx && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: `${60 * scale}px`,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                background: "#fff",
                                                color: "#000",
                                                padding: `${10 * scale}px`,
                                                borderRadius: "8px",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",

                                                width: `${180 * scale}px`,
                                                maxHeight: `${150 * scale}px`,
                                                maxWidth: "80vw",
                                                overflow: "hidden",
                                                textAlign: "left",
                                                zIndex: 100,
                                            }}
                                        >

                                            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                                <img
                                                    src={rev.image}
                                                    alt="Reviewer Large"
                                                    style={{
                                                        width: `${50 * scale}px`,
                                                        height: `${50 * scale}px`,
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: "600", fontSize: `${14 * scale}px` }}>{rev.name}</div>
                                                    <div style={{ fontSize: `${12 * scale}px`, color: "#666" }}>{rev.date}</div>
                                                </div>
                                            </div>


                                            <div style={{ marginBottom: "6px", fontSize: `${14 * scale}px`, color: "#f5b50a" }}>
                                                {"⭐".repeat(rev.stars)}
                                            </div>


                                            <div style={{ fontSize: `${13 * scale}px`, color: "#333" }}>
                                                {rev.caption}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>

                        {/* Review text */}
                        <div
                            style={{
                                marginLeft: `${15 * scale}px`,
                                fontSize: `${24 * scale}px`,
                                color: isMobile ? "#fff" : descriptionColor,
                                fontWeight: "500",

                            }}
                        >
                            <div>⭐⭐⭐⭐⭐</div>
                            <div>End-to-end service trusted by</div>
                            <div>500+ professionals worldwide</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Video + IconLinks */}
            {!isMobile && (
                <div
                    style={{
                        width: slideWidth,
                        // minHeight: `${900 * scale}px`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Video with Play Button */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            width: slideWidth,
                             height:"100%",
                            alignItems: "center",
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            style={{
                                borderRadius: "10px",
                                objectFit: "cover",
                                width: slideWidth - outerMargin,
                                height:"100%",
                                backgroundColor: "#000",
                                marginTop: `${100 * scale}px`,

                            }}
                            onClick={togglePlay}
                        />
                        {!isPlaying && (
                            <div
                                style={{
                                    position: "absolute",
                                    width: `${100 * scale}px`,
                                    height: `${100 * scale}px`,
                                    borderRadius: "50%",
                                    backgroundColor: "#000",
                                    opacity: 0.75,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                                onClick={togglePlay}
                            >
                                <div
                                    style={{
                                        width: 0,
                                        height: 0,
                                        borderLeft: `${25 * scale}px solid white`,
                                        borderTop: `${18 * scale}px solid transparent`,
                                        borderBottom: `${18 * scale}px solid transparent`,
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    
                    {/* Icon Links */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "nowrap",
                            gap: `${5 * scale}px`,
                            marginTop: `${60 * scale}px`,
                            fontWeight: 500,
                            color: "#000",
                            width: slideWidth - outerMargin,   // match video width
                            marginBottom: `${100 * scale}px`,
                            
                        }}
                    >
                        {iconLinks.map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    flex: "1 1 0",  
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: `${8 * scale}px`,
                                    padding: `${1 * scale}px ${4 * scale}px`,
                                    boxSizing: "border-box",
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.text}
                                    style={{
                                        width: `${48 * scale}px`,
                                        height: `${48 * scale}px`,
                                        objectFit: "contain",
                                        flexShrink: 0,
                                    }}
                                />
                                <span
                                    style={{
                                        lineHeight: 1.2,
                                        fontSize: `${25 * scale}px`,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>


                </div>
            )}

            {/* Mobile iconLinks */}

            {isMobile && (
                <div
                   iv
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "nowrap",
                            gap: `${5 * scale}px`,
                          
                            fontWeight: 500,
                            color: "#000",
                            width: slideWidth - outerMargin,  
                            marginBottom: `${30 * scale}px`,
                            marginTop: `${20 * scale}px`,
                        }}
                >
                    {iconLinks.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                 flex: "1 1 0", 
                                display: "flex",
                                // alignItems: "center",
                                gap: `${8 * scale}px`,
                                // width: "100%",
                                maxWidth: iconItemBasis,
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.text}
                                style={{
                                    width: `${50 * scale}px`,
                                    height: `${50 * scale}px`,
                                    objectFit: "contain",
                                }}
                            />
                            <span
                                style={{
                                    lineHeight: 1.2,
                                    fontSize: `${25 * scale}px`,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                     WebkitBoxOrient: "vertical",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    // maxHeight: `${1.2 * 2 * 13 * scale}px`,
                                }}
                            >
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SaudiPccLandingpage;