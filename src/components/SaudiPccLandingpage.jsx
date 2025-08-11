


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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [hoveredReview, setHoveredReview] = useState(null);
    const isMobile = windowWidth <= 768;
    const scale = Math.min(1, Math.max(0.6, windowWidth / 1400));

    // Video control state
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // const ICON_COLUMNS = 4;
    const iconItemBasis = `${100 / 4}%`;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxWidth: `${1200 * scale}px`,
                margin: "0 auto",
                backgroundColor: backgroundColor,
                boxSizing: "border-box",

            }}

        >
            {/* Left Content */}
            <div
                style={{


                    width: isMobile ? "100%" : "50%",
                    height: isMobile ? "auto" : `${559 * scale}px`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: isMobile ? "center" : "flex-start",

                    position: "relative",

                    paddingRight: isMobile ? 0 : `${30 * scale}px`,
                    boxSizing: "border-box",
                    // overflow: "hidden",
                }}
            >
                {/* Mobile Video Background */}
                {isMobile && (
                    <video
                        src={videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 0,
                        }}
                    />
                )}

                {/* Mobile dark overlay */}
                {isMobile && (
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
                )}

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        maxWidth: `${520 * scale}px`,
                        textAlign: isMobile ? "center" : "left",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isMobile ? "center" : "flex-start",
                    }}
                >
                    {/* Tag */}
                    <div
                        style={{
                            backgroundColor: "#d6f0ff",
                            color: captionColor,
                            padding: `${6 * scale}px ${12 * scale}px`,
                            borderRadius: "20px",
                            fontSize: `${15 * scale}px`,
                            fontWeight: 600,
                            marginBottom: `${16 * scale}px`,
                            display: "inline-block",
                            marginTop: "10px"
                        }}
                    >
                        {caption}
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: `${55 * scale}px`,
                            fontWeight: 600,
                            lineHeight: 1.2,
                            marginBottom: `${18 * scale}px`,
                            color: isMobile ? "#fff" : titleColor,
                        }}
                    >
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontSize: `${24 * scale}px`,
                            color: isMobile ? "#fff" : subTitleColor,
                            marginBottom: `${8 * scale}px`,
                        }}
                    >
                        {subTitle}
                    </p>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: `${18 * scale}px`,
                            color: isMobile ? "#fff" : descriptionColor,
                            marginBottom: `${24 * scale}px`,
                        }}
                    >
                        {description}
                    </p>

                    {/* Buttons */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: `${12 * scale}px`,
                            marginBottom: `${20 * scale}px`,
                        }}
                    >
                        {buttons.map((btn, idx) => (
                            <button
                                key={idx}
                                style={{
                                    padding: `${10 * scale}px ${14 * scale}px`,
                                    backgroundColor: btn.buttonColor,
                                    color: btn.buttonTextColor,
                                    border: "none",
                                    borderRadius: "6px",
                                    fontWeight: 600,
                                    fontSize: `${13 * scale}px`,
                                    cursor: "pointer",
                                }}
                            >
                                {btn.buttonText}
                            </button>
                        ))}
                    </div>

                    {/* Reviews */}



                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: `${30 * scale}px`,
                        }}
                    >
                        {/* Reviewer images with overlap */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {reviews.map((rev, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        position: "relative",
                                        zIndex: reviews.length - idx, // ensures left-most is on top
                                        marginLeft: idx === 0 ? 0 : `-${28 * scale}px`, // tight overlap
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
                                            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)", // subtle outline
                                            cursor: "pointer",
                                        }}
                                    />
                                    {hoveredReview === idx && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: `${55 * scale}px`,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                background: "#000",
                                                color: "#fff",
                                                padding: `${6 * scale}px ${10 * scale}px`,
                                                borderRadius: "6px",
                                                fontSize: `${12 * scale}px`,
                                                whiteSpace: "nowrap",
                                                pointerEvents: "none",
                                                zIndex: 100,
                                            }}
                                        >
                                            {rev.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Review text */}
                        <div
                            style={{
                                marginLeft: `${15 * scale}px`,
                                fontSize: `${14 * scale}px`,
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
                        width: "50%",
                        minHeight: `${500 * scale}px`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        position: "relative",
                        paddingBottom: `${20 * scale}px`,
                        boxSizing: "border-box",
                    }}
                >
                    {/* Video with Play Button */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",

                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            width: "100%",
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            style={{
                                width: "100%",
                                maxWidth: `${590 * scale}px`,
                                height: `${480 * scale}px`,
                                borderRadius: "12px",
                                objectFit: "cover",
                                backgroundColor: "#000",
                                marginTop: "50px"
                            }}

                            onClick={togglePlay}
                        />
                        {!isPlaying && (
                            <div
                                style={{
                                    position: "absolute",
                                    width: `${60 * scale}px`,
                                    height: `${60 * scale}px`,
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
                                        borderLeft: `${18 * scale}px solid white`,
                                        borderTop: `${12 * scale}px solid transparent`,
                                        borderBottom: `${12 * scale}px solid transparent`,
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
                            gap: `${1 * scale}px`,
                            fontSize: `${14 * scale}px`,
                            fontWeight: 500,
                            color: "#000",
                            width: "100%",
                            maxWidth: `${590 * scale}px`,

                            width: `${650 * scale}px`,
                            marginBottom: "30px",
                            marginTop: "20px"
                        }}
                    >
                        {iconLinks.map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    maxWidth: iconItemBasis,
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: `${2 * scale}px`,
                                    padding: `${6 * scale}px ${4 * scale}px`,
                                    boxSizing: "border-box",
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.text}
                                    style={{
                                        width: `${28 * scale}px`,
                                        height: `${28 * scale}px`,
                                        objectFit: "contain",
                                        flexShrink: 0,
                                    }}
                                />
                                <span
                                    style={{
                                        lineHeight: 1.2,
                                        fontSize: `${12 * scale}px`,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        maxHeight: `${1.2 * 2 * 13 * scale}px`,
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
                    style={{
                        display: "flex",
                        padding: "0px 10px",
                        flexWrap: "nowrap",
                        gap: `${20 * scale}px`,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: `${20 * scale}px`,
                        fontSize: `${14 * scale}px`,
                        fontWeight: 500,
                        color: "#000",
                        marginBottom: `${30 * scale}px`,
                    }}
                >
                    {iconLinks.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: `${8 * scale}px`,
                                width: "100%",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.text}
                                style={{
                                    width: `${28 * scale}px`,
                                    height: `${28 * scale}px`,
                                    objectFit: "contain",
                                }}
                            />
                            <span
                                style={{
                                    lineHeight: 1.2,
                                    fontSize: `${12 * scale}px`,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    maxHeight: `${1.2 * 2 * 13 * scale}px`,
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



// import React, { useEffect, useState, useRef } from "react";

// const SaudiPccLandingpage = ({ attributes }) => {
//     const {
//         backgroundColor,
//         caption,
//         captionColor,
//         title,
//         titleColor,
//         subTitle,
//         subTitleColor,
//         description,
//         descriptionColor,
//         buttons = [],
//         reviews = [],
//         videoUrl,
//         iconLinks = [],
//         mobileOverlayOpacity,
//     } = attributes;

//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [hoveredReview, setHoveredReview] = useState(null);
//     const isMobile = windowWidth <= 768;
//     const scale = Math.min(1, Math.max(0.6, windowWidth / 1400));

//     // Video control state
//     const videoRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const togglePlay = () => {
//         if (!videoRef.current) return;
//         if (isPlaying) {
//             videoRef.current.pause();
//         } else {
//             videoRef.current.play();
//         }
//         setIsPlaying(!isPlaying);
//     };

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const ICON_COLUMNS = 4;
   
//     const iconItemBasis = `${100 / ICON_COLUMNS}%`;

//     return (
//         <div
//          style={{
//         display: "flex",
//         flexDirection: isMobile ? "column" : "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         width: "100%",
//         maxWidth: `${1200 * scale}px`, 
//         margin: "0 auto", 
//         backgroundColor: backgroundColor,
//         boxSizing: "border-box",
        
//     }}
           
//         >
//             {/* Left Content */}
//             <div
//                 style={{

                   
//                     width: isMobile ? "100%" : "50%",
//                     height: isMobile ? "auto" : `${559 * scale}px`,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: isMobile ? "center" : "flex-start",
                    
//                     position: "relative",
                   
//                     paddingRight: isMobile ? 0 : `${30 * scale}px`,
//                     boxSizing: "border-box",
//                     // overflow: "hidden",
//                 }}
//             >
//                 {/* Mobile Video Background */}
//                 {isMobile && (
//                     <video
//                         src={videoUrl}
//                         autoPlay
//                         muted
//                         loop
//                         playsInline
//                         style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             zIndex: 0,
//                         }}
//                     />
//                 )}

//                 {/* Mobile dark overlay */}
//                 {isMobile && (
//                     <div
//                         style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             backgroundColor: `rgba(0,0,0,${mobileOverlayOpacity || 0.2})`,
//                             zIndex: 1,
//                         }}
//                     />
//                 )}

//                 <div
//                     style={{
//                         position: "relative",
//                         zIndex: 2,
//                         width: "100%",
//                         maxWidth: `${520 * scale}px`,
//                         textAlign: isMobile ? "center" : "left",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: isMobile ? "center" : "flex-start",
//                     }}
//                 >
//                     {/* Tag */}
//                     <div
//                         style={{
//                             backgroundColor: "#d6f0ff",
//                             color: captionColor,
//                             padding: `${6 * scale}px ${12 * scale}px`,
//                             borderRadius: "20px",
//                             fontSize: `${15 * scale}px`,
//                             fontWeight: 600,
//                             marginBottom: `${16 * scale}px`,
//                             display: "inline-block",
//                             marginTop:"10px"
//                         }}
//                     >
//                         {caption}
//                     </div>

//                     {/* Title */}
//                     <h1
//                         style={{
//                             fontSize: `${55 * scale}px`,
//                             fontWeight: 600,
//                             lineHeight: 1.2,
//                             marginBottom: `${18 * scale}px`,
//                             color: isMobile ? "#fff" : titleColor,
//                         }}
//                     >
//                         {title}
//                     </h1>

//                     {/* Subtitle */}
//                     <p
//                         style={{
//                             fontSize: `${24 * scale}px`,
//                             color: isMobile ? "#fff" : subTitleColor,
//                             marginBottom: `${8 * scale}px`,
//                         }}
//                     >
//                         {subTitle}
//                     </p>

//                     {/* Description */}
//                     <p
//                         style={{
//                             fontSize: `${18 * scale}px`,
//                             color: isMobile ? "#fff" : descriptionColor,
//                             marginBottom: `${24 * scale}px`,
//                         }}
//                     >
//                         {description}
//                     </p>

//                     {/* Buttons */}
//                     <div
//                         style={{
//                             display: "flex",
//                             flexWrap: "wrap",
//                             gap: `${12 * scale}px`,
//                             marginBottom: `${20 * scale}px`,
//                         }}
//                     >
//                         {buttons.map((btn, idx) => (
//                             <button
//                                 key={idx}
//                                 style={{
//                                     padding: `${10 * scale}px ${14 * scale}px`,
//                                     backgroundColor: btn.buttonColor,
//                                     color: btn.buttonTextColor,
//                                     border: "none",
//                                     borderRadius: "6px",
//                                     fontWeight: 600,
//                                     fontSize: `${13 * scale}px`,
//                                     cursor: "pointer",
//                                 }}
//                             >
//                                 {btn.buttonText}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Reviews */}
                    

                   
//                    <div
//     style={{
//         display: "flex",
//         alignItems: "center",
//         marginBottom: `${30 * scale}px`,
//     }}
// >
//     {/* Reviewer images with overlap */}
//     <div style={{ display: "flex", alignItems: "center" }}>
//         {reviews.map((rev, idx) => (
//             <div
//                 key={idx}
//                 style={{
//                     position: "relative",
//                     zIndex: reviews.length - idx, // ensures left-most is on top
//                     marginLeft: idx === 0 ? 0 : `-${28 * scale}px`, // tight overlap
//                 }}
//                 onMouseEnter={() => setHoveredReview(idx)}
//                 onMouseLeave={() => setHoveredReview(null)}
//             >
//                 <img
//                     src={rev.image}
//                     alt="Reviewer"
//                     style={{
//                         width: `${45 * scale}px`,
//                         height: `${45 * scale}px`,
//                         borderRadius: "50%",
//                         border: `${2 * scale}px solid #fff`,
//                         objectFit: "cover",
//                         boxShadow: "0 0 0 1px rgba(0,0,0,0.05)", // subtle outline
//                         cursor: "pointer",
//                     }}
//                 />
//                 {hoveredReview === idx && (
//                     <div
//                         style={{
//                             position: "absolute",
//                             bottom: `${55 * scale}px`,
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             background: "#000",
//                             color: "#fff",
//                             padding: `${6 * scale}px ${10 * scale}px`,
//                             borderRadius: "6px",
//                             fontSize: `${12 * scale}px`,
//                             whiteSpace: "nowrap",
//                             pointerEvents: "none",
//                             zIndex: 100,
//                         }}
//                     >
//                         {rev.caption}
//                     </div>
//                 )}
//             </div>
//         ))}
//     </div>

//     {/* Review text */}
//     <div
//         style={{
//             marginLeft: `${15 * scale}px`,
//             fontSize: `${14 * scale}px`,
//             color: isMobile ? "#fff" : descriptionColor,
//             fontWeight: "500",
//         }}
//     >

//         <div>⭐⭐⭐⭐⭐</div>
//         <div>End-to-end service trusted by</div>
//         <div>500+ professionals worldwide</div>
//     </div>
// </div>

//                 </div>
//             </div>

//             {/* Right Video + IconLinks */}
//             {!isMobile && (
//                 <div
//                     style={{
//                         width: "50%",
//                         minHeight: `${500 * scale}px`,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "flex-start",
//                         alignItems: "center",
//                         position: "relative",
//                         paddingBottom: `${20 * scale}px`,
//                         boxSizing: "border-box",
//                     }}
//                 >
//                     {/* Video with Play Button */}
//                     <div
//                         style={{
//                             flex: 1,
//                             display: "flex",
                            
//                             justifyContent: "center",
//                             alignItems: "center",
//                             position: "relative",
//                             width: "100%",
//                         }}
//                     >
//                         <video
//                             ref={videoRef}
//                             src={videoUrl}
//                             style={{
//     width: "100%",
//     maxWidth: `${590 * scale}px`, 
//     height: `${480 * scale}px`,
//     borderRadius: "12px",
//     objectFit: "cover",
//     backgroundColor: "#000",
//     marginTop:"50px"
// }}
                           
//                             onClick={togglePlay}
//                         />
//                         {!isPlaying && (
//                             <div
//                                 style={{
//                                     position: "absolute",
//                                     width: `${60 * scale}px`,
//                                     height: `${60 * scale}px`,
//                                     borderRadius: "50%",
//                                     backgroundColor: "#000",
//                                     opacity: 0.75,
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     cursor: "pointer",
//                                 }}
//                                 onClick={togglePlay}
//                             >
//                                 <div
//                                     style={{
//                                         width: 0,
//                                         height: 0,
//                                         borderLeft: `${18 * scale}px solid white`,
//                                         borderTop: `${12 * scale}px solid transparent`,
//                                         borderBottom: `${12 * scale}px solid transparent`,
//                                     }}
//                                 />
//                             </div>
//                         )}
//                     </div>

//                     {/* Icon Links */}
//                     <div
//                         style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "flex-start",
//                             flexWrap: "nowrap",
//                             gap: `${1 * scale}px`,
//                             fontSize: `${14 * scale}px`,
//                             fontWeight: 500,
//                             color: "#000",
//                             width: "100%",
//                              maxWidth: `${590 * scale}px`, 
                            
//                             width: `${650 * scale}px`,
//                             marginBottom: "30px",
//                             marginTop: "20px"
//                         }}
//                     >
//                         {iconLinks.map((item, idx) => (
//                             <div
//                                 key={idx}
//                                 style={{
//                                     maxWidth: iconItemBasis,
//                                     display: "flex",
//                                     alignItems: "flex-start",
//                                     gap: `${2 * scale}px`,
//                                     padding: `${6 * scale}px ${4 * scale}px`,
//                                     boxSizing: "border-box",
//                                 }}
//                             >
//                                 <img
//                                     src={item.img}
//                                     alt={item.text}
//                                     style={{
//                                         width: `${28 * scale}px`,
//                                         height: `${28 * scale}px`,
//                                         objectFit: "contain",
//                                         flexShrink: 0,
//                                     }}
//                                 />
//                                 <span
//                                     style={{
//                                         lineHeight: 1.2,
//                                         fontSize: `${12 * scale}px`,
//                                         display: "-webkit-box",
//                                         WebkitLineClamp: 2,
//                                         WebkitBoxOrient: "vertical",
//                                         textOverflow: "ellipsis",
//                                         overflow: "hidden",
//                                         maxHeight: `${1.2 * 2 * 13 * scale}px`,
//                                     }}
//                                 >
//                                     {item.text}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Mobile iconLinks */}
//             {isMobile && (
//                 <div
//                     style={{
//                         display: "flex",
//                         padding: "0px 10px",
//                         flexWrap: "nowrap",
//                         gap: `${20 * scale}px`,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         marginTop: `${20 * scale}px`,
//                         fontSize: `${14 * scale}px`,
//                         fontWeight: 500,
//                         color: "#000",
//                         marginBottom: `${30 * scale}px`,
//                     }}
//                 >
//                     {iconLinks.map((item, idx) => (
//                         <div
//                             key={idx}
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: `${8 * scale}px`,
//                                 width: "100%",
//                                 justifyContent: "center",
//                             }}
//                         >
//                             <img
//                                 src={item.img}
//                                 alt={item.text}
//                                 style={{
//                                     width: `${28 * scale}px`,
//                                     height: `${28 * scale}px`,
//                                     objectFit: "contain",
//                                 }}
//                             />
//                             <span
//                                 style={{
//                                     lineHeight: 1.2,
//                                     fontSize: `${12 * scale}px`,
//                                     display: "-webkit-box",
//                                     WebkitLineClamp: 2,
//                                     textOverflow: "ellipsis",
//                                     overflow: "hidden",
//                                     maxHeight: `${1.2 * 2 * 13 * scale}px`,
//                                 }}
//                             >
//                                 {item.text}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SaudiPccLandingpage;
