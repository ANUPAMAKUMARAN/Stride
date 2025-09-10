



import React, { useRef, useState, useEffect, useCallback } from "react";

const StoryCraftCarousel = ({ attributes }) => {
    const {
        caption,
        captionColor,
        titleOne,
        titleOneColor,
        titleTwo,
        titleTwoColor,
        slides = [],
        slideGap,
        backgroundColor,
        minSlidesToShow,
        autoScrolling,
        progressbarColor,
        progressbar,
    } = attributes;

    const presetSlideHeight = 550;
    const presetSlideWidth = 380;
    const scrollRef = useRef(null);


    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoScrollInterval = useRef(null);

    const [dimensions, setDimensions] = useState({
        cardWidth: presetSlideWidth,
        cardHeight: presetSlideHeight,
        fontScale: 1,
    });

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // 🔹 Resize handling
    useEffect(() => {
    const updateDimensions = () => {
        const containerWidth = scrollRef.current?.offsetWidth || 0;
        const fullSlideWidth = presetSlideWidth;

        // 🔹 Decide slidesToShow dynamically
        let slidesToShow = minSlidesToShow;

        // If mobile screen, force 1.5 slides
        if (window.innerWidth <= 768) {
            slidesToShow = 1.5;
        }

        const baseRequiredWidth =
            fullSlideWidth * slidesToShow + (slidesToShow - 1) * slideGap;

        if (containerWidth < baseRequiredWidth) {
            const roughAdjustedWidth = containerWidth / slidesToShow;
            const fontScale = roughAdjustedWidth / presetSlideWidth;
            const scaledGap = slideGap * fontScale;
            const totalGap = (slidesToShow - 1) * scaledGap;
            const adjustedWidth = (containerWidth - totalGap) / slidesToShow;

            setDimensions({
                cardWidth: adjustedWidth,
                cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
                fontScale,
            });
        } else {
            setDimensions({
                cardWidth: fullSlideWidth,
                cardHeight: presetSlideHeight,
                fontScale: 1,
            });
        }
    };

    requestAnimationFrame(updateDimensions);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
}, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);


    const getScrollDistance = () =>
        dimensions.cardWidth + dimensions.fontScale * slideGap;


    const scrollLeft = useCallback(() => {
        scrollRef.current?.scrollBy({
            left: -getScrollDistance(),
            behavior: "auto",
        });
    }, [dimensions, slideGap]);


    const scrollRight = useCallback(() => {
        scrollRef.current?.scrollBy({
            left: getScrollDistance(),
            behavior: "auto",
        });
    }, [dimensions, slideGap]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollPosition(scrollRef.current.scrollLeft);
    };
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        let animationFrameId = null;

        const easeInOutQuad = (t) =>
            t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const smoothScroll = (target) => {
            if (!scrollRef.current) return;
            const start = scrollRef.current.scrollLeft;
            const change = target - start;
            let startTime = null;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / 200, 1);
                scrollRef.current.scrollLeft =
                    start + change * easeInOutQuad(progress);
                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setScrollPosition(target);
                }
            };
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            if (!isDragging || !scrollRef.current) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const baseCardWidth = 400;
            const scale = dimensions.cardWidth / baseCardWidth;
            const scrollDistance = (x - startX) * scale;
            const target = scrollPosition - scrollDistance;
            scrollRef.current.scrollLeft = target;

        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);


    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const isTrackpad = (e) =>
            Math.abs(e.deltaY) < 50 && e.deltaMode === 0;

        const handleWheelScroll = (e) => {
            if (!isHovered) return;
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
            const atStart = scrollLeft <= 0;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

            if (isTrackpad(e)) {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    if (e.deltaX < 0 && !atStart) {
                        scrollContainer.scrollLeft += e.deltaX;
                        e.preventDefault();
                    } else if (e.deltaX > 0 && !atEnd) {
                        scrollContainer.scrollLeft += e.deltaX;
                        e.preventDefault();
                    }
                }
            } else {
                const scrollDistance = getScrollDistance();
                const scrollAmount =
                    (e.deltaX || e.deltaY) * (scrollDistance / 100);

                if (e.deltaY < 0 && !atStart) {
                    scrollContainer.scrollBy({
                        left: -Math.abs(scrollAmount),
                        behavior: "smooth",
                    });
                    e.preventDefault();
                } else if (e.deltaY > 0 && !atEnd) {
                    scrollContainer.scrollBy({
                        left: Math.abs(scrollAmount),
                        behavior: "smooth",
                    });
                    e.preventDefault();
                }
            }
        };

        scrollContainer.addEventListener("wheel", handleWheelScroll, {
            passive: false,
        });
        return () => {
            scrollContainer.removeEventListener("wheel", handleWheelScroll);
        };
    }, [isHovered, dimensions, slideGap]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isHovered) return;
            if (e.key === "ArrowLeft") scrollLeft();
            if (e.key === "ArrowRight") scrollRight();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isHovered, scrollLeft, scrollRight]);


    useEffect(() => {
        const scrollContainer = scrollRef.current;
        const updateScrollability = () => {
            if (!scrollContainer) return;
            setCanScrollLeft(scrollContainer.scrollLeft > 0);
            setCanScrollRight(
                scrollContainer.scrollLeft <
                scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1
            );
        };
        scrollContainer?.addEventListener("scroll", updateScrollability);
        updateScrollability();
        return () =>
            scrollContainer?.removeEventListener("scroll", updateScrollability);
    }, [dimensions, slides]);


    useEffect(() => {
        if (!autoScrolling || slides.length <= 3) return;
        const startAutoScroll = () => {
            if (autoScrollInterval.current) return;
            autoScrollInterval.current = setInterval(() => {
                if (!isHovered && !isDragging) {
                    scrollRef.current?.scrollBy({
                        left: getScrollDistance(),
                        behavior: "auto",
                    });
                }
            }, 3000);
        };
        const stopAutoScroll = () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current);
                autoScrollInterval.current = null;
            }
        };
        startAutoScroll();
        return stopAutoScroll;
    }, [
        autoScrolling,
        isHovered,
        isDragging,
        dimensions.cardWidth,
        dimensions.fontScale,
        slideGap,
        slides.length,
    ]);


    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;
        const handleScroll = () => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            setProgress(maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0);
        };
        slider.addEventListener("scroll", handleScroll);
        return () => slider.removeEventListener("scroll", handleScroll);
    }, []);

    const getValidColor = (color) => {
        const valid =
            /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color) ||
            /^rgb(a)?\([\d\s.,%]+\)$/.test(color) ||
            /gradient\((.|\s)*\)/.test(color) ||
            /^[a-zA-Z]+$/.test(color) ||
            color === "transparent";
        return valid ? color : "#ffffff";
    };

    const getValidColorForFade = (color) => {
        if (!color || typeof color !== "string" || color === "transparent")
            return "rgba(0, 0, 0, 0)";
        const hexToRgb = (hex) => {
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, 0.8)`
                : "rgba(255, 255, 255, 0.7)";
        };
        if (color.startsWith("#")) return hexToRgb(color);
        if (color.startsWith("rgb")) return color.replace(")", ", 0.8)");
        return "rgba(255, 255, 255, 0.7)";
    };
    return (
        <div
            style={{
                background: backgroundColor,
                marginTop: `${60 * dimensions.fontScale}px `,
                paddingLeft: `${140 * dimensions.fontScale}px`,
                textAlign: "center",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Caption */}
            <p
                style={{
                    color: captionColor || "#7a7a7a",
                    fontSize: `${16 * dimensions.fontScale}px`,
                    marginBottom: `${5 * dimensions.fontScale}px`,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                {caption}
            </p>

            {/* Titles */}
            <div
                style={{

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: `${40 * dimensions.fontScale}px`,
                    flexWrap: "wrap",
                }}
            >
                <div style={{ textAlign: "left" }}>
                    <h2
                        style={{
                            fontSize: `${42 * dimensions.fontScale}px`,
                            fontWeight: "bold",
                            color: titleOneColor || "#111",
                            margin: "0",
                        }}
                    >
                        {titleOne}
                    </h2>
                    <h2
                        style={{
                            fontSize: `${42 * dimensions.fontScale}px`,
                            fontWeight: "bold",
                            color: titleTwoColor || "#3a2d84",
                            margin: "0",
                        }}
                    >
                        {titleTwo}
                    </h2>
                </div>
            </div>

            {/* Carousel */}

            <div style={{ position: "relative", width: "100%" }}>
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: `${dimensions.fontScale * slideGap}px`,
                        scrollSnapType: "x mandatory",
                        paddingBottom: `${20 * dimensions.fontScale}px`,
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {slides.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                flexShrink: 0,
                                width: `${dimensions.cardWidth}px`,
                                height: `${dimensions.cardHeight}px`,
                                borderRadius: `${16 * dimensions.fontScale}px`,
                                background: "#f4f7ff",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            {/*  Title + Subtitle + Arrow */}

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: `${8 * dimensions.fontScale}px`,
                                    padding: `${16 * dimensions.fontScale}px`,
                                    textAlign: "left",
                                }}
                            >
                                {/* Title */}
                                <h3
                                    style={{
                                        fontSize: `${22 * dimensions.fontScale}px`,
                                        fontWeight: "600",
                                        paddingRight: `${14 * dimensions.fontScale}px`,
                                        color: "#111",
                                        margin: 0,
                                        textAlign: "left",
                                    }}
                                >
                                    {item.title}
                                </h3>

                                {/* Subtitle  */}

                                <p
                                    style={{
                                        fontSize: `${16 * dimensions.fontScale}px`,
                                        color: "#555",
                                        margin: 0,
                                        paddingRight: `${14 * dimensions.fontScale}px`,
                                    }}
                                >
                                    {item.subtitle}
                                </p>

                            </div>


                            {/* image */}
                            {/* image with arrow button at bottom-right */}
                            <div
                                style={{
                                    flex: 1,
                                    padding: `0 ${20 * dimensions.fontScale}px ${20 * dimensions.fontScale}px ${20 * dimensions.fontScale}px`,
                                    position: "relative",
                                }}
                            >
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: `${12 * dimensions.fontScale}px`,
                                        }}
                                    />
                                )}

                                {/* Arrow button positioned bottom-right */}

                                <button
                                    aria-label="Open Slide"
                                    style={{
                                        position: "absolute",
                                        bottom: `${21 * dimensions.fontScale}px`,
                                        right: `${19 * dimensions.fontScale}px`,
                                        width: `${42 * dimensions.fontScale}px`,
                                        height: `${42 * dimensions.fontScale}px`,
                                        borderRadius: `${6 * dimensions.fontScale}px`,
                                        background: "rgba(255,255,255,0.9)",
                                        border: "1px solid #7b3fe4",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        fontSize: `${32 * dimensions.fontScale}px`,
                                        fontWeight: "bold",
                                        color: "#333",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "linear-gradient(135deg, #7b3fe4, #3f9be4)";
                                        const arrow = e.currentTarget.querySelector("span");
                                        arrow.style.color = "#fff";
                                        arrow.style.transform = "rotate(0deg)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                                        const arrow = e.currentTarget.querySelector("span");
                                        arrow.style.color = "#333";
                                        arrow.style.transform = "rotate(-45deg)";
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            transform: "rotate(-45deg)", // default ↗
                                            transition: "transform 0.3s ease, color 0.3s ease",
                                        }}
                                    >
                                        →
                                    </span>
                                </button>



                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Progress bar */}
            {progressbar && (
                <div
                    style={{
                        width: "80%",
                        height: `${6 * dimensions.fontScale}px`,
                        background: "#eee",
                        margin: `${30 * dimensions.fontScale}px`,
                        borderRadius: "3px",
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            height: "100%",
                            background: progressbarColor,
                            borderRadius: "3px",
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default StoryCraftCarousel;




// import React, { useRef, useState, useEffect, useCallback } from "react";

// const StoryCraftCarousel = ({ attributes }) => {
//     const {
//         caption,
//         captionColor,
//         titleOne,
//         titleOneColor,
//         titleTwo,
//         titleTwoColor,
//         slides = [],
//         slideGap,
//         backgroundColor,
//         minSlidesToShow,
//         autoScrolling,
//         progressbarColor,
//         progressbar,
//     } = attributes;

//     const presetSlideHeight = 550;
//     const presetSlideWidth = 380;
//     const scrollRef = useRef(null);


//     const [progress, setProgress] = useState(0);
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const [isHovered, setIsHovered] = useState(false);
//     const autoScrollInterval = useRef(null);

//     const [dimensions, setDimensions] = useState({
//         cardWidth: presetSlideWidth,
//         cardHeight: presetSlideHeight,
//         fontScale: 1,
//     });

//     const [canScrollLeft, setCanScrollLeft] = useState(false);
//     const [canScrollRight, setCanScrollRight] = useState(true);

//     // 🔹 Resize handling
//     useEffect(() => {
//     const updateDimensions = () => {
//         const containerWidth = scrollRef.current?.offsetWidth || 0;
//         const fullSlideWidth = presetSlideWidth;

//         // 🔹 Decide slidesToShow dynamically
//         let slidesToShow = minSlidesToShow;

//         // If mobile screen, force 1.5 slides
//         if (window.innerWidth <= 768) {
//             slidesToShow = 1.5;
//         }

//         const baseRequiredWidth =
//             fullSlideWidth * slidesToShow + (slidesToShow - 1) * slideGap;

//         if (containerWidth < baseRequiredWidth) {
//             const roughAdjustedWidth = containerWidth / slidesToShow;
//             const fontScale = roughAdjustedWidth / presetSlideWidth;
//             const scaledGap = slideGap * fontScale;
//             const totalGap = (slidesToShow - 1) * scaledGap;
//             const adjustedWidth = (containerWidth - totalGap) / slidesToShow;

//             setDimensions({
//                 cardWidth: adjustedWidth,
//                 cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
//                 fontScale,
//             });
//         } else {
//             setDimensions({
//                 cardWidth: fullSlideWidth,
//                 cardHeight: presetSlideHeight,
//                 fontScale: 1,
//             });
//         }
//     };

//     requestAnimationFrame(updateDimensions);
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
// }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);


//     const getScrollDistance = () =>
//         dimensions.cardWidth + dimensions.fontScale * slideGap;


//     const scrollLeft = useCallback(() => {
//         scrollRef.current?.scrollBy({
//             left: -getScrollDistance(),
//             behavior: "smooth",
//         });
//     }, [dimensions, slideGap]);


//     const scrollRight = useCallback(() => {
//         scrollRef.current?.scrollBy({
//             left: getScrollDistance(),
//             behavior: "smooth",
//         });
//     }, [dimensions, slideGap]);

//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         setStartX(e.pageX - scrollRef.current.offsetLeft);
//         setScrollPosition(scrollRef.current.scrollLeft);
//     };
//     const handleMouseUp = () => setIsDragging(false);

//     useEffect(() => {
//         let animationFrameId = null;

//         const easeInOutQuad = (t) =>
//             t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

//         const smoothScroll = (target) => {
//             if (!scrollRef.current) return;
//             const start = scrollRef.current.scrollLeft;
//             const change = target - start;
//             let startTime = null;

//             const animate = (currentTime) => {
//                 if (!startTime) startTime = currentTime;
//                 const progress = Math.min((currentTime - startTime) / 200, 1);
//                 scrollRef.current.scrollLeft =
//                     start + change * easeInOutQuad(progress);
//                 if (progress < 1) {
//                     animationFrameId = requestAnimationFrame(animate);
//                 } else {
//                     setScrollPosition(target);
//                 }
//             };
//             animationFrameId = requestAnimationFrame(animate);
//         };

//         const handleMouseMove = (e) => {
//             if (!isDragging || !scrollRef.current) return;
//             e.preventDefault();
//             const x = e.pageX - scrollRef.current.offsetLeft;
//             const baseCardWidth = 400;
//             const scale = dimensions.cardWidth / baseCardWidth;
//             const scrollDistance = (x - startX) * scale;
//             const target = scrollPosition - scrollDistance;
//             smoothScroll(target);
//         };

//         if (isDragging) {
//             window.addEventListener("mousemove", handleMouseMove);
//         }
//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//             if (animationFrameId) cancelAnimationFrame(animationFrameId);
//         };
//     }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);


//     useEffect(() => {
//         const scrollContainer = scrollRef.current;
//         if (!scrollContainer) return;

//         const isTrackpad = (e) =>
//             Math.abs(e.deltaY) < 50 && e.deltaMode === 0;

//         const handleWheelScroll = (e) => {
//             if (!isHovered) return;
//             const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
//             const atStart = scrollLeft <= 0;
//             const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

//             if (isTrackpad(e)) {
//                 if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
//                     if (e.deltaX < 0 && !atStart) {
//                         scrollContainer.scrollLeft += e.deltaX;
//                         e.preventDefault();
//                     } else if (e.deltaX > 0 && !atEnd) {
//                         scrollContainer.scrollLeft += e.deltaX;
//                         e.preventDefault();
//                     }
//                 }
//             } else {
//                 const scrollDistance = getScrollDistance();
//                 const scrollAmount =
//                     (e.deltaX || e.deltaY) * (scrollDistance / 100);

//                 if (e.deltaY < 0 && !atStart) {
//                     scrollContainer.scrollBy({
//                         left: -Math.abs(scrollAmount),
//                         behavior: "smooth",
//                     });
//                     e.preventDefault();
//                 } else if (e.deltaY > 0 && !atEnd) {
//                     scrollContainer.scrollBy({
//                         left: Math.abs(scrollAmount),
//                         behavior: "smooth",
//                     });
//                     e.preventDefault();
//                 }
//             }
//         };

//         scrollContainer.addEventListener("wheel", handleWheelScroll, {
//             passive: false,
//         });
//         return () => {
//             scrollContainer.removeEventListener("wheel", handleWheelScroll);
//         };
//     }, [isHovered, dimensions, slideGap]);


//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (!isHovered) return;
//             if (e.key === "ArrowLeft") scrollLeft();
//             if (e.key === "ArrowRight") scrollRight();
//         };
//         document.addEventListener("keydown", handleKeyDown);
//         return () => document.removeEventListener("keydown", handleKeyDown);
//     }, [isHovered, scrollLeft, scrollRight]);


//     useEffect(() => {
//         const scrollContainer = scrollRef.current;
//         const updateScrollability = () => {
//             if (!scrollContainer) return;
//             setCanScrollLeft(scrollContainer.scrollLeft > 0);
//             setCanScrollRight(
//                 scrollContainer.scrollLeft <
//                 scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1
//             );
//         };
//         scrollContainer?.addEventListener("scroll", updateScrollability);
//         updateScrollability();
//         return () =>
//             scrollContainer?.removeEventListener("scroll", updateScrollability);
//     }, [dimensions, slides]);


//     useEffect(() => {
//         if (!autoScrolling || slides.length <= 3) return;
//         const startAutoScroll = () => {
//             if (autoScrollInterval.current) return;
//             autoScrollInterval.current = setInterval(() => {
//                 if (!isHovered && !isDragging) {
//                     scrollRef.current?.scrollBy({
//                         left: getScrollDistance(),
//                         behavior: "smooth",
//                     });
//                 }
//             }, 3000);
//         };
//         const stopAutoScroll = () => {
//             if (autoScrollInterval.current) {
//                 clearInterval(autoScrollInterval.current);
//                 autoScrollInterval.current = null;
//             }
//         };
//         startAutoScroll();
//         return stopAutoScroll;
//     }, [
//         autoScrolling,
//         isHovered,
//         isDragging,
//         dimensions.cardWidth,
//         dimensions.fontScale,
//         slideGap,
//         slides.length,
//     ]);


//     useEffect(() => {
//         const slider = scrollRef.current;
//         if (!slider) return;
//         const handleScroll = () => {
//             const maxScroll = slider.scrollWidth - slider.clientWidth;
//             setProgress(maxScroll > 0 ? (slider.scrollLeft / maxScroll) * 100 : 0);
//         };
//         slider.addEventListener("scroll", handleScroll);
//         return () => slider.removeEventListener("scroll", handleScroll);
//     }, []);

//     const getValidColor = (color) => {
//         const valid =
//             /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color) ||
//             /^rgb(a)?\([\d\s.,%]+\)$/.test(color) ||
//             /gradient\((.|\s)*\)/.test(color) ||
//             /^[a-zA-Z]+$/.test(color) ||
//             color === "transparent";
//         return valid ? color : "#ffffff";
//     };

//     const getValidColorForFade = (color) => {
//         if (!color || typeof color !== "string" || color === "transparent")
//             return "rgba(0, 0, 0, 0)";
//         const hexToRgb = (hex) => {
//             const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//             hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
//             const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//             return result
//                 ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, 0.8)`
//                 : "rgba(255, 255, 255, 0.7)";
//         };
//         if (color.startsWith("#")) return hexToRgb(color);
//         if (color.startsWith("rgb")) return color.replace(")", ", 0.8)");
//         return "rgba(255, 255, 255, 0.7)";
//     };
//     return (
//         <div
//             style={{
//                 background: backgroundColor,
//                 marginTop: `${60 * dimensions.fontScale}px `,
//                 paddingLeft: `${140 * dimensions.fontScale}px`,
//                 textAlign: "center",
//             }}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Caption */}
//             <p
//                 style={{
//                     color: captionColor || "#7a7a7a",
//                     fontSize: `${16 * dimensions.fontScale}px`,
//                     marginBottom: `${5 * dimensions.fontScale}px`,
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-end",
//                 }}
//             >
//                 {caption}
//             </p>

//             {/* Titles */}
//             <div
//                 style={{

//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-end",
//                     marginBottom: `${40 * dimensions.fontScale}px`,
//                     flexWrap: "wrap",
//                 }}
//             >
//                 <div style={{ textAlign: "left" }}>
//                     <h2
//                         style={{
//                             fontSize: `${42 * dimensions.fontScale}px`,
//                             fontWeight: "bold",
//                             color: titleOneColor || "#111",
//                             margin: "0",
//                         }}
//                     >
//                         {titleOne}
//                     </h2>
//                     <h2
//                         style={{
//                             fontSize: `${42 * dimensions.fontScale}px`,
//                             fontWeight: "bold",
//                             color: titleTwoColor || "#3a2d84",
//                             margin: "0",
//                         }}
//                     >
//                         {titleTwo}
//                     </h2>
//                 </div>
//             </div>

//             {/* Carousel */}

//             <div style={{ position: "relative", width: "100%" }}>
//                 <div
//                     ref={scrollRef}
//                     onMouseDown={handleMouseDown}
//                     onMouseUp={handleMouseUp}
//                     style={{
//                         display: "flex",
//                         overflowX: "auto",
//                         gap: `${dimensions.fontScale * slideGap}px`,
//                         scrollSnapType: "x mandatory",
//                         paddingBottom: `${20 * dimensions.fontScale}px`,
//                         scrollbarWidth: "none",
//                         msOverflowStyle: "none",
//                     }}
//                 >
//                     {slides.map((item, index) => (
//                         <div
//                             key={index}
//                             style={{
//                                 flexShrink: 0,
//                                 width: `${dimensions.cardWidth}px`,
//                                 height: `${dimensions.cardHeight}px`,
//                                 borderRadius: `${16 * dimensions.fontScale}px`,
//                                 background: "#f4f7ff",
//                                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 overflow: "hidden",
//                             }}
//                         >
//                             {/*  Title + Subtitle + Arrow */}

//                             <div
//                                 style={{
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     gap: `${8 * dimensions.fontScale}px`,
//                                     padding: `${16 * dimensions.fontScale}px`,
//                                     textAlign: "left",
//                                 }}
//                             >
//                                 {/* Title */}
//                                 <h3
//                                     style={{
//                                         fontSize: `${22 * dimensions.fontScale}px`,
//                                         fontWeight: "600",
//                                         paddingRight: `${14 * dimensions.fontScale}px`,
//                                         color: "#111",
//                                         margin: 0,
//                                         textAlign: "left",
//                                     }}
//                                 >
//                                     {item.title}
//                                 </h3>

//                                 {/* Subtitle  */}

//                                 <p
//                                     style={{
//                                         fontSize: `${16 * dimensions.fontScale}px`,
//                                         color: "#555",
//                                         margin: 0,
//                                         paddingRight: `${14 * dimensions.fontScale}px`,
//                                     }}
//                                 >
//                                     {item.subtitle}
//                                 </p>

//                             </div>


//                             {/* image */}
//                             {/* image with arrow button at bottom-right */}
//                             <div
//                                 style={{
//                                     flex: 1,
//                                     padding: `0 ${20 * dimensions.fontScale}px ${20 * dimensions.fontScale}px ${20 * dimensions.fontScale}px`,
//                                     position: "relative",
//                                 }}
//                             >
//                                 {item.image && (
//                                     <img
//                                         src={item.image}
//                                         alt={item.title}
//                                         style={{
//                                             width: "100%",
//                                             height: "100%",
//                                             objectFit: "cover",
//                                             borderRadius: `${12 * dimensions.fontScale}px`,
//                                         }}
//                                     />
//                                 )}

//                                 {/* Arrow button positioned bottom-right */}

//                                 <button
//                                     aria-label="Open Slide"
//                                     style={{
//                                         position: "absolute",
//                                         bottom: `${21 * dimensions.fontScale}px`,
//                                         right: `${19 * dimensions.fontScale}px`,
//                                         width: `${42 * dimensions.fontScale}px`,
//                                         height: `${42 * dimensions.fontScale}px`,
//                                         borderRadius: `${6 * dimensions.fontScale}px`,
//                                         background: "rgba(255,255,255,0.9)",
//                                         border: "1px solid #7b3fe4",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
//                                         cursor: "pointer",
//                                         transition: "all 0.3s ease",
//                                         fontSize: `${32 * dimensions.fontScale}px`,
//                                         fontWeight: "bold",
//                                         color: "#333",
//                                     }}
//                                     onMouseEnter={(e) => {
//                                         e.currentTarget.style.background =
//                                             "linear-gradient(135deg, #7b3fe4, #3f9be4)";
//                                         const arrow = e.currentTarget.querySelector("span");
//                                         arrow.style.color = "#fff";
//                                         arrow.style.transform = "rotate(0deg)";
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         e.currentTarget.style.background = "rgba(255,255,255,0.9)";
//                                         const arrow = e.currentTarget.querySelector("span");
//                                         arrow.style.color = "#333";
//                                         arrow.style.transform = "rotate(-45deg)";
//                                     }}
//                                 >
//                                     <span
//                                         style={{
//                                             display: "inline-block",
//                                             transform: "rotate(-45deg)", // default ↗
//                                             transition: "transform 0.3s ease, color 0.3s ease",
//                                         }}
//                                     >
//                                         →
//                                     </span>
//                                 </button>



//                             </div>

//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Progress bar */}
//             {progressbar && (
//                 <div
//                     style={{
//                         width: "80%",
//                         height: `${6 * dimensions.fontScale}px`,
//                         background: "#eee",
//                         margin: `${30 * dimensions.fontScale}px`,
//                         borderRadius: "3px",
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: `${progress}%`,
//                             height: "100%",
//                             background: progressbarColor,
//                             borderRadius: "3px",
//                             transition: "width 0.3s ease",
//                         }}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StoryCraftCarousel;




