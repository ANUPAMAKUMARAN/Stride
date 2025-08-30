

import React, { useRef, useState, useEffect, useCallback } from "react";

const FaqCarousel = ({ attributes }) => {

    const {
        caption,
        captionColor,
        title,
        titleColor,
        subtitle,
        subtitleColor,
        backgroundColor,
        slideGap,
        minSlidesToShow,
        autoScrolling,
        slides = [],
    } = attributes;



    const presetSlideHeight = 580;
    const presetSlideWidth = 800;
    const scrollRef = useRef(null);

    // const [progress, setProgress] = useState(0);
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

    // Update slide dimensions dynamically
    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = scrollRef.current?.offsetWidth || 0;
            const fullSlideWidth = presetSlideWidth;

            const baseRequiredWidth =
                fullSlideWidth * minSlidesToShow + (minSlidesToShow - 1) * slideGap;

            if (containerWidth < baseRequiredWidth) {
                const roughAdjustedWidth = containerWidth / minSlidesToShow;
                const fontScale = roughAdjustedWidth / presetSlideWidth;

                const scaledGap = slideGap * fontScale;
                const totalGap = (minSlidesToShow - 1) * scaledGap;
                const adjustedWidth = (containerWidth - totalGap) / minSlidesToShow;

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

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);

    const getScrollDistance = () =>
        dimensions.cardWidth + dimensions.fontScale * slideGap;

    // Scroll Left
    const scrollLeft = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -getScrollDistance(),
                behavior: "smooth",
            });
        }
    }, [dimensions, slideGap]);

    // Scroll Right
    const scrollRight = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: getScrollDistance(),
                behavior: "smooth",
            });
        }
    }, [dimensions, slideGap]);

    // Start Dragging
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollPosition(scrollRef.current.scrollLeft);
    };

    // Drag Move with smooth animation
    useEffect(() => {
        let animationFrameId = null;

        const smoothScroll = (target) => {
            if (!scrollRef.current) return;
            const start = scrollRef.current.scrollLeft;
            const change = target - start;
            let startTime = null;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / 200, 1);
                scrollRef.current.scrollLeft = start + change * easeInOutQuad(progress);
                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setScrollPosition(target);
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        };

        const easeInOutQuad = (t) =>
            t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const handleMouseMove = (e) => {
            if (!isDragging || !scrollRef.current) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const baseCardWidth = 400;
            const scale = dimensions.cardWidth / baseCardWidth;
            const scrollDistance = (x - startX) * scale;
            const target = scrollPosition - scrollDistance;
            smoothScroll(target);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Wheel & Trackpad Scrolling
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const isTrackpad = (e) => Math.abs(e.deltaY) < 50 && e.deltaMode === 0;

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
                const scrollAmount = (e.deltaX || e.deltaY) * (scrollDistance / 100);

                if (e.deltaY < 0 && !atStart) {
                    scrollContainer.scrollBy({ left: -Math.abs(scrollAmount), behavior: "smooth" });
                    e.preventDefault();
                } else if (e.deltaY > 0 && !atEnd) {
                    scrollContainer.scrollBy({ left: Math.abs(scrollAmount), behavior: "smooth" });
                    e.preventDefault();
                }
            }
        };

        scrollContainer.addEventListener("wheel", handleWheelScroll, { passive: false });
        return () => {
            scrollContainer.removeEventListener("wheel", handleWheelScroll);
        };
    }, [isHovered, dimensions, slideGap]);

    // Keyboard Scrolling
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isHovered) return;
            if (e.key === "ArrowLeft") {
                scrollLeft();
            } else if (e.key === "ArrowRight") {
                scrollRight();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isHovered, scrollLeft, scrollRight]);

    // Check Scrollability
    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const updateScrollability = () => {
            if (!scrollContainer) return;

            setCanScrollLeft(scrollContainer.scrollLeft > 0);

            setCanScrollRight(
                scrollContainer.scrollLeft <
                scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1,
            );
        };

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", updateScrollability);
        }

        updateScrollability();

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", updateScrollability);
            }
        };
    }, [dimensions, slides]);

    // Auto-scrolling
    useEffect(() => {
        if (!autoScrolling || slides.length <= 3) return;

        const startAutoScroll = () => {
            if (autoScrollInterval.current) return;
            autoScrollInterval.current = setInterval(() => {
                if (!isHovered && !isDragging) {
                    if (scrollRef.current) {
                        scrollRef.current.scrollBy({
                            left: getScrollDistance(),
                            behavior: "smooth",
                        });
                    }
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
    }, [autoScrolling, isHovered, isDragging, dimensions.cardWidth, dimensions.fontScale, slideGap, slides.length]);

    // Progress bar
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
        if (!color || typeof color !== "string") return "#ffffff";
        const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
        const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color);
        const isGradient = /gradient\((.|\s)*\)/.test(color);
        const isNamed = /^[a-zA-Z]+$/.test(color);
        if (color === "transparent" || isHex || isRGB || isGradient || isNamed) {
            return color;
        }
        return "#ffffff";
    };

    return (
        <div

            style={{
                background: getValidColor(backgroundColor),
                padding: `${140 * dimensions.fontScale}px ${10 * dimensions.fontScale}px`, // top/bottom, left/right
            
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                handleMouseUp();
                setIsHovered(false);
            }}
        >
            <div className="max-w-9xl mx-auto  grid grid-cols-1 md:grid-cols-3 gap-10 items-start">


                {/* LEFT SIDE */}
                <div className="col-span-1">
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: `${15 * dimensions.fontScale}px`,
                            color: { captionColor },
                            fontWeight: 600,
                            marginBottom: `${10 * dimensions.fontScale}px`,
                        }}
                    >
                        {caption}
                    </p>


                    <h2
                        style={{
                            textAlign: "center",
                            fontSize: `${72 * dimensions.fontScale}px`,
                            fontWeight: 500,
                            lineHeight: 1.2,
                            marginBottom: `${30 * dimensions.fontScale}px`,
                        }}
                    >
                        <div style={{ color: titleColor || "#0F172A" }}>{title}</div>
                        <div style={{ color: subtitleColor || "#0F172A" }}>{subtitle}</div>
                    </h2>



                    {/* Navigation Buttons */}

                    <div className="flex gap-4 justify-center">

                        {/* Left Button */}
                        <button
                            onClick={scrollLeft}
                            className="rounded-full border border-gray-300 flex items-center justify-center bg-white shadow transition-transform 
               w-8 h-8 text-lg 
               sm:w-10 sm:h-10 sm:text-xl 
               md:w-12 md:h-12 md:text-2xl"
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            disabled={!canScrollLeft}
                        >
                            <span className="text-gray-600">{"<"}</span>
                        </button>

                        {/* Right Button */}
                        <button
                            onClick={scrollRight}
                            className="rounded-full border border-gray-300 flex items-center justify-center bg-white shadow transition-transform 
               w-8 h-8 text-lg 
               sm:w-10 sm:h-10 sm:text-xl 
               md:w-12 md:h-12 md:text-2xl"
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            disabled={!canScrollRight}
                        >
                            <span className="text-gray-600">{">"}</span>
                        </button>
                    </div>

                </div>


                {/* RIGHT SIDE CAROUSEL */}
                <div className="col-span-2 relative">
                    <div
                        ref={scrollRef}
                        className={`flex overflow-x-auto no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"
                            }`}
                        style={{
                            gap: `${dimensions.fontScale * slideGap}px`,
                            paddingBottom: `${20 * dimensions.fontScale}px`,
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    >
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-md"
                                style={{
                                    width: `${dimensions.cardWidth}px`,
                                    minHeight: `${dimensions.cardHeight}px`,
                                }}
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.question}
                                    draggable="false"
                                    onDragStart={(e) => e.preventDefault()}
                                    className="w-full h-full object-cover rounded-[8px] sm:rounded-[8px] md:rounded-[12px] lg:rounded-[16px] xl:rounded-[24px]"
                                />

                                {/* Q&A box */}

                                <div
                                    className="absolute rounded-lg shadow-md flex flex-col justify-center"
                                    style={{

                                        left: "50%",

                                        bottom: `${dimensions.cardHeight * 0.05}px`,
                                        transform: "translateX(-50%)", // Center horizontally
                                        width: `${dimensions.cardWidth * 0.9}px`,
                                        height: `${dimensions.cardHeight * 0.25}px`,
                                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                                        padding: `${0.5 * dimensions.fontScale}rem ${0.75 * dimensions.fontScale}rem`,
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Question */}
                                    <p
                                        className="font-semibold mb-1"
                                        style={{
                                            color: item.questionColor || "#0F172A",
                                            fontSize: `${28 * dimensions.fontScale}px`,
                                            lineHeight: "1.2",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.question}
                                    </p>

                                    {/* Answer */}
                                    <p
                                        style={{
                                            color: item.answerColor || "#334155",
                                            fontSize: `${24 * dimensions.fontScale}px`,
                                            lineHeight: "1.2",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.answer}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
export default FaqCarousel;


// import React, { useRef, useState, useEffect, useCallback } from "react";

// const FaqCarousel = ({ attributes }) => {

//     const {
//         caption,
//         captionColor,
//         title,
//         titleColor,
//         subtitle,
//         subtitleColor,
//         backgroundColor,
//         slideGap,
//         minSlidesToShow,
//         autoScrolling,
//         slides = [],
//     } = attributes;



//     const presetSlideHeight = 600;
//     const presetSlideWidth = 750;
//     const scrollRef = useRef(null);

//     // const [progress, setProgress] = useState(0);
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

//     // Update slide dimensions dynamically
//     useEffect(() => {
//         const updateDimensions = () => {
//             const containerWidth = scrollRef.current?.offsetWidth || 0;
//             const fullSlideWidth = presetSlideWidth;

//             const baseRequiredWidth =
//                 fullSlideWidth * minSlidesToShow + (minSlidesToShow - 1) * slideGap;

//             if (containerWidth < baseRequiredWidth) {
//                 const roughAdjustedWidth = containerWidth / minSlidesToShow;
//                 const fontScale = roughAdjustedWidth / presetSlideWidth;

//                 const scaledGap = slideGap * fontScale;
//                 const totalGap = (minSlidesToShow - 1) * scaledGap;
//                 const adjustedWidth = (containerWidth - totalGap) / minSlidesToShow;

//                 setDimensions({
//                     cardWidth: adjustedWidth,
//                     cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
//                     fontScale,
//                 });
//             } else {
//                 setDimensions({
//                     cardWidth: fullSlideWidth,
//                     cardHeight: presetSlideHeight,
//                     fontScale: 1,
//                 });
//             }
//         };

//         requestAnimationFrame(updateDimensions);
//         window.addEventListener("resize", updateDimensions);

//         return () => {
//             window.removeEventListener("resize", updateDimensions);
//         };
//     }, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap]);

//     const getScrollDistance = () =>
//         dimensions.cardWidth + dimensions.fontScale * slideGap;

//     // Scroll Left
//     const scrollLeft = useCallback(() => {
//         if (scrollRef.current) {
//             scrollRef.current.scrollBy({
//                 left: -getScrollDistance(),
//                 behavior: "smooth",
//             });
//         }
//     }, [dimensions, slideGap]);

//     // Scroll Right
//     const scrollRight = useCallback(() => {
//         if (scrollRef.current) {
//             scrollRef.current.scrollBy({
//                 left: getScrollDistance(),
//                 behavior: "smooth",
//             });
//         }
//     }, [dimensions, slideGap]);

//     // Start Dragging
//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         setStartX(e.pageX - scrollRef.current.offsetLeft);
//         setScrollPosition(scrollRef.current.scrollLeft);
//     };

//     // Drag Move with smooth animation
//     useEffect(() => {
//         let animationFrameId = null;

//         const smoothScroll = (target) => {
//             if (!scrollRef.current) return;
//             const start = scrollRef.current.scrollLeft;
//             const change = target - start;
//             let startTime = null;

//             const animate = (currentTime) => {
//                 if (!startTime) startTime = currentTime;
//                 const progress = Math.min((currentTime - startTime) / 200, 1);
//                 scrollRef.current.scrollLeft = start + change * easeInOutQuad(progress);
//                 if (progress < 1) {
//                     animationFrameId = requestAnimationFrame(animate);
//                 } else {
//                     setScrollPosition(target);
//                 }
//             };

//             animationFrameId = requestAnimationFrame(animate);
//         };

//         const easeInOutQuad = (t) =>
//             t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

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
//         } else {
//             if (animationFrameId) cancelAnimationFrame(animationFrameId);
//         }

//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//             if (animationFrameId) cancelAnimationFrame(animationFrameId);
//         };
//     }, [isDragging, startX, scrollPosition, dimensions.cardWidth]);

//     const handleMouseUp = () => {
//         setIsDragging(false);
//     };

//     // Wheel & Trackpad Scrolling
//     useEffect(() => {
//         const scrollContainer = scrollRef.current;
//         if (!scrollContainer) return;

//         const isTrackpad = (e) => Math.abs(e.deltaY) < 50 && e.deltaMode === 0;

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
//                 const scrollAmount = (e.deltaX || e.deltaY) * (scrollDistance / 100);

//                 if (e.deltaY < 0 && !atStart) {
//                     scrollContainer.scrollBy({ left: -Math.abs(scrollAmount), behavior: "smooth" });
//                     e.preventDefault();
//                 } else if (e.deltaY > 0 && !atEnd) {
//                     scrollContainer.scrollBy({ left: Math.abs(scrollAmount), behavior: "smooth" });
//                     e.preventDefault();
//                 }
//             }
//         };

//         scrollContainer.addEventListener("wheel", handleWheelScroll, { passive: false });
//         return () => {
//             scrollContainer.removeEventListener("wheel", handleWheelScroll);
//         };
//     }, [isHovered, dimensions, slideGap]);

//     // Keyboard Scrolling
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (!isHovered) return;
//             if (e.key === "ArrowLeft") {
//                 scrollLeft();
//             } else if (e.key === "ArrowRight") {
//                 scrollRight();
//             }
//         };

//         document.addEventListener("keydown", handleKeyDown);
//         return () => {
//             document.removeEventListener("keydown", handleKeyDown);
//         };
//     }, [isHovered, scrollLeft, scrollRight]);

//     // Check Scrollability
//     useEffect(() => {
//         const scrollContainer = scrollRef.current;

//         const updateScrollability = () => {
//             if (!scrollContainer) return;

//             setCanScrollLeft(scrollContainer.scrollLeft > 0);

//             setCanScrollRight(
//                 scrollContainer.scrollLeft <
//                 scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1,
//             );
//         };

//         if (scrollContainer) {
//             scrollContainer.addEventListener("scroll", updateScrollability);
//         }

//         updateScrollability();

//         return () => {
//             if (scrollContainer) {
//                 scrollContainer.removeEventListener("scroll", updateScrollability);
//             }
//         };
//     }, [dimensions, slides]);

//     // Auto-scrolling
//     useEffect(() => {
//         if (!autoScrolling || slides.length <= 3) return;

//         const startAutoScroll = () => {
//             if (autoScrollInterval.current) return;
//             autoScrollInterval.current = setInterval(() => {
//                 if (!isHovered && !isDragging) {
//                     if (scrollRef.current) {
//                         scrollRef.current.scrollBy({
//                             left: getScrollDistance(),
//                             behavior: "smooth",
//                         });
//                     }
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
//     }, [autoScrolling, isHovered, isDragging, dimensions.cardWidth, dimensions.fontScale, slideGap, slides.length]);

//     // Progress bar
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
//         if (!color || typeof color !== "string") return "#ffffff";
//         const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
//         const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color);
//         const isGradient = /gradient\((.|\s)*\)/.test(color);
//         const isNamed = /^[a-zA-Z]+$/.test(color);
//         if (color === "transparent" || isHex || isRGB || isGradient || isNamed) {
//             return color;
//         }
//         return "#ffffff";
//     };

//     return (
//         <div

//             style={{
//                 background: getValidColor(backgroundColor),
//                 paddingTop: `${80 * dimensions.fontScale}px`,
//                 paddingBottom: `${80 * dimensions.fontScale}px`,
//             }}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => {
//                 handleMouseUp();
//                 setIsHovered(false);
//             }}
//         >
//             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">


//                 {/* LEFT SIDE */}
//                 <div className="col-span-1">
//                     <p
//                         style={{
//                             textAlign: "center",
//                             fontSize: `${15 * dimensions.fontScale}px`,
//                             color: { captionColor },
//                             fontWeight: 600,
//                             marginBottom: `${10 * dimensions.fontScale}px`,
//                         }}
//                     >
//                         {caption}
//                     </p>


//                     <h2
//                         style={{
//                             textAlign: "center",
//                             fontSize: `${56 * dimensions.fontScale}px`,
//                             fontWeight: "bold",
//                             lineHeight: 1.2,
//                             marginBottom: `${30 * dimensions.fontScale}px`,
//                         }}
//                     >
//                         <div style={{ color: titleColor || "#0F172A" }}>{title}</div>
//                         <div style={{ color: subtitleColor || "#0F172A" }}>{subtitle}</div>
//                     </h2>



//                     {/* Navigation Buttons */}

//                     <div className="flex gap-4 justify-center">

//                         {/* Left Button */}
//                         <button
//                             onClick={scrollLeft}
//                             className="rounded-full border border-gray-300 flex items-center justify-center bg-white shadow transition-transform 
//                w-8 h-8 text-lg 
//                sm:w-10 sm:h-10 sm:text-xl 
//                md:w-12 md:h-12 md:text-2xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
//                             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//                             disabled={!canScrollLeft}
//                         >
//                             <span className="text-gray-600">{"<"}</span>
//                         </button>

//                         {/* Right Button */}
//                         <button
//                             onClick={scrollRight}
//                             className="rounded-full border border-gray-300 flex items-center justify-center bg-white shadow transition-transform 
//                w-8 h-8 text-lg 
//                sm:w-10 sm:h-10 sm:text-xl 
//                md:w-12 md:h-12 md:text-2xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
//                             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//                             disabled={!canScrollRight}
//                         >
//                             <span className="text-gray-600">{">"}</span>
//                         </button>
//                     </div>

//                 </div>


//                 {/* RIGHT SIDE CAROUSEL */}
//                 <div className="col-span-2 relative">
//                     <div
//                         ref={scrollRef}
//                         className={`flex overflow-x-auto no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"
//                             }`}
//                         style={{
//                             gap: `${dimensions.fontScale * slideGap}px`,
//                             paddingBottom: `${20 * dimensions.fontScale}px`,
//                         }}
//                         onMouseDown={handleMouseDown}
//                         onMouseUp={handleMouseUp}
//                     >
//                         {slides.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-md"
//                                 style={{
//                                     width: `${dimensions.cardWidth}px`,
//                                     minHeight: `${dimensions.cardHeight}px`,
//                                 }}
//                             >
//                                 {/* Image */}
//                                 <img
//                                     src={item.image}
//                                     alt={item.question}
//                                     draggable="false"
//                                     onDragStart={(e) => e.preventDefault()}
//                                     className="w-full h-full object-cover rounded-[8px] sm:rounded-[8px] md:rounded-[12px] lg:rounded-[16px] xl:rounded-[24px]"
//                                 />

//                                 {/* Q&A box */}

//                                 <div
//                                     className="absolute rounded-lg shadow-md flex flex-col justify-center"
//                                     style={{

//                                         left: "50%",

//                                         bottom: `${dimensions.cardHeight * 0.05}px`,
//                                         transform: "translateX(-50%)", // Center horizontally
//                                         width: `${dimensions.cardWidth * 0.9}px`,
//                                         height: `${dimensions.cardHeight * 0.25}px`,
//                                         backgroundColor: "rgba(255, 255, 255, 0.95)",
//                                         padding: `${0.5 * dimensions.fontScale}rem ${0.75 * dimensions.fontScale}rem`,
//                                         overflow: "hidden",
//                                     }}
//                                 >
//                                     {/* Question */}
//                                     <p
//                                         className="font-semibold mb-1"
//                                         style={{
//                                             color: item.questionColor || "#0F172A",
//                                             fontSize: `${20 * dimensions.fontScale}px`,
//                                             lineHeight: "1.2",
//                                             whiteSpace: "nowrap",
//                                             textOverflow: "ellipsis",
//                                             overflow: "hidden",
//                                         }}
//                                     >
//                                         {item.question}
//                                     </p>

//                                     {/* Answer */}
//                                     <p
//                                         style={{
//                                             color: item.answerColor || "#334155",
//                                             fontSize: `${17 * dimensions.fontScale}px`,
//                                             lineHeight: "1.2",
//                                             display: "-webkit-box",
//                                             WebkitLineClamp: 2,
//                                             WebkitBoxOrient: "vertical",
//                                             overflow: "hidden",
//                                         }}
//                                     >
//                                         {item.answer}
//                                     </p>
//                                 </div>

//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }
// export default FaqCarousel;