

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


    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
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
            <div className="max-w-9xl mx-auto  grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">


                {/* LEFT SIDE */}
                <div className="col-span-1 flex flex-col relative  h-full">
                    {isMobile ? (
                        /* --- MOBILE LAYOUT --- */
                        <div className="flex flex-row items-center justify-center gap-2">
                            {/* Caption + Title */}
                            <div className="flex flex-col items-center text-center">
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontSize: `${15 * dimensions.fontScale}px`,
                                        color: captionColor,
                                        fontWeight: 600,
                                        marginBottom: `${5 * dimensions.fontScale}px`,
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
                                        marginBottom: `${5 * dimensions.fontScale}px`,
                                    }}
                                >
                                    <div style={{ color: titleColor || "#0F172A" }}>{title}</div>
                                    <div style={{ color: subtitleColor || "#0F172A" }}>{subtitle}</div>
                                </h2>
                            </div>

                            {/* Buttons next to titles */}
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={scrollLeft}
                                    className="rounded-full w-8 h-8 bg-white shadow text-gray-600 flex items-center justify-center"
                                >
                                    {"<"}
                                </button>
                                <button
                                    onClick={scrollRight}
                                    className="rounded-full w-8 h-8 bg-white shadow text-gray-600 flex items-center justify-center"
                                >
                                    {">"}
                                </button>
                            </div>
                        </div>

                    ) : (
                        /* --- DESKTOP LAYOUT --- */
                        <div className="flex flex-col items-center justify-center text-center h-full">
                            {/* Caption */}
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: `${15 * dimensions.fontScale}px`,
                                    color: captionColor,
                                    fontWeight: 600,
                                    marginBottom: `${10 * dimensions.fontScale}px`,
                                }}
                            >
                                {caption}
                            </p>

                            {/* Title & Subtitle */}
                            <h2
                                style={{
                                    textAlign: "center",
                                    fontSize: `${72 * dimensions.fontScale}px`,
                                    fontWeight: 500,
                                    lineHeight: 1.2,
                                    marginBottom: `${20 * dimensions.fontScale}px`,
                                }}
                            >
                                <div style={{ color: titleColor || "#0F172A" }}>{title}</div>
                                <div style={{ color: subtitleColor || "#0F172A" }}>{subtitle}</div>
                            </h2>

                            {/* Buttons centered under subtitle (desktop) */}
                            <div className="flex gap-4 justify-center mt-4">
                                <button
                                    onClick={scrollLeft}
                                    className="rounded-full w-12 h-12 bg-white shadow text-gray-600 flex items-center justify-center"
                                >
                                    {"<"}
                                </button>
                                <button
                                    onClick={scrollRight}
                                    className="rounded-full w-12 h-12 bg-white shadow text-gray-600 flex items-center justify-center"
                                >
                                    {">"}
                                </button>
                            </div>
                        </div>
                    )}
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
// import React, { useCallback, useEffect, useRef, useState } from "react";

// const SampleComponent = ({attributes}) => {
//   const {
// 		slides = [],
// 		slideGap = 30,
// 		backgroundColor = "#ffffff",
// 		title = "Our Projects",
// 		titleColor = "#000000",
// 		minSlidesToShow = 1.3,
// 		autoScrolling = false,
// 		buttonSize = 40,
//         caption
// 	} = attributes;
// 	const presetSlideHeight = 550;
// 	const presetSlideWidth = 400;
//     const [fullContainerWidth, setFullContainerWidth] = useState();
//     const [margin, setmargin] = useState();
// 	const scrollRef = useRef(null);
// 	const [isDragging, setIsDragging] = useState(false);
// 	const [startX, setStartX] = useState(0);
// 	const [scrollPosition, setScrollPosition] = useState(0);
// 	const [isHovered, setIsHovered] = useState(false);
// 	const autoScrollInterval = useRef(null);

// 	const [dimensions, setDimensions] = useState({
// 		cardWidth: presetSlideWidth,
// 		cardHeight: presetSlideHeight,
// 		fontScale: 1,
// 	});

// 	const [canScrollLeft, setCanScrollLeft] = useState(false);
// 	const [canScrollRight, setCanScrollRight] = useState(true);
// 	const [isMobileView, setIsMobileView] = useState(false);

// 	// Update slide dimensions dynamically
// 	useEffect(() => {

// 		const updateDimensions = () => {
// 			const containerWidth = scrollRef.current?.offsetWidth || 0;
//             if(isMobileView){
//                 setFullContainerWidth(containerWidth*0.6)
//             }else{
//                 setFullContainerWidth(containerWidth)
//             }

//             const fullSlideWidth = presetSlideWidth;
//             const width = window.innerWidth;
//                 setmargin(width*0.15)
//             if(width <= 600){
//                 setIsMobileView(true)
//             }
// 			const baseRequiredWidth =
// 				fullSlideWidth * minSlidesToShow + (minSlidesToShow - 1) * slideGap;

// 			if (containerWidth < baseRequiredWidth) {
// 				// Estimate unscaled card width
// 				const roughAdjustedWidth = containerWidth / minSlidesToShow;
// 				const fontScale = roughAdjustedWidth / presetSlideWidth;

// 				// Scale the gap now
// 				const scaledGap = slideGap * fontScale;
// 				const totalGap = (minSlidesToShow - 1) * scaledGap;
// 				const adjustedWidth = (containerWidth - totalGap) / minSlidesToShow;

// 				setDimensions({
// 					cardWidth: adjustedWidth,
// 					cardHeight: (adjustedWidth * presetSlideHeight) / presetSlideWidth,
// 					fontScale,
// 				});
// 			} else {
// 				setDimensions({
// 					cardWidth: fullSlideWidth,
// 					cardHeight: presetSlideHeight,
// 					fontScale: 1,
// 				});
// 			}
// 		};

// 		// 🛠 Run once layout is ready
// 		requestAnimationFrame(updateDimensions);

// 		// 🔁 Update on resize
// 		window.addEventListener("resize", updateDimensions);

// 		return () => {
// 			window.removeEventListener("resize", updateDimensions);
// 		};
// 	}, [minSlidesToShow, presetSlideWidth, presetSlideHeight, slideGap, margin]);

// 	const getScrollDistance = () =>
// 		dimensions.cardWidth + dimensions.fontScale * slideGap;

// 	// Scroll Left
// 	const scrollLeft = useCallback(() => {
// 		if (scrollRef.current) {
// 			scrollRef.current.scrollBy({
// 				left: -getScrollDistance(),
// 				behavior: "smooth",
// 			});
// 		}
// 	}, [dimensions, slideGap]);

// 	// Scroll Right
// 	const scrollRight = useCallback(() => {
// 		if (scrollRef.current) {
// 			scrollRef.current.scrollBy({
// 				left: getScrollDistance(),
// 				behavior: "smooth",
// 			});
// 		}
// 	}, [dimensions, slideGap]);

// 	// Start Dragging
// 	const handleMouseDown = (e) => {
// 		setIsDragging(true);
// 		setStartX(e.pageX - scrollRef.current.offsetLeft);
// 		setScrollPosition(scrollRef.current.scrollLeft);
// 	};

// 	// Drag Move with smooth animation
// 	useEffect(() => {
// 		let animationFrameId = null;

// 		const smoothScroll = (target) => {
// 			if (!scrollRef.current) return;
// 			const start = scrollRef.current.scrollLeft;
// 			const change = target - start;
// 			let startTime = null;

// 			const animate = (currentTime) => {
// 				if (!startTime) startTime = currentTime;
// 				const progress = Math.min((currentTime - startTime) / 200, 1);
// 				scrollRef.current.scrollLeft = start + change * easeInOutQuad(progress);
// 				if (progress < 1) {
// 					animationFrameId = requestAnimationFrame(animate);
// 				} else {
// 					setScrollPosition(target);
// 				}
// 			};

// 			animationFrameId = requestAnimationFrame(animate);
// 		};

// 		const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// 		const handleMouseMove = (e) => {
// 			if (!isDragging || !scrollRef.current) return;
// 			e.preventDefault();
// 			const x = e.pageX - scrollRef.current.offsetLeft;

// 			// Dynamically scaled drag scroll
// 			const baseCardWidth = 400; // match your base slide width
// 			const scale = dimensions.cardWidth / baseCardWidth;
// 			const scrollDistance = (x - startX) * scale;
// 			const target = scrollPosition - scrollDistance;
// 			smoothScroll(target);
// 		};

// 		if (isDragging) {
// 			window.addEventListener("mousemove", handleMouseMove);
// 		} else {
// 			if (animationFrameId) cancelAnimationFrame(animationFrameId);
// 		}

// 		return () => {
// 			window.removeEventListener("mousemove", handleMouseMove);
// 			if (animationFrameId) cancelAnimationFrame(animationFrameId);
// 		};
// 	}, [isDragging, startX, scrollPosition, dimensions.cardWidth]);

// 	// Stop Dragging
// 	const handleMouseUp = () => {
// 		setIsDragging(false);
// 	};

// 	// Enable Smooth Scrolling with Mouse Wheel & Trackpad
// 	useEffect(() => {
// 		const scrollContainer = scrollRef.current;
// 		if (!scrollContainer) return;

// 		const handleWheelScroll = (e) => {
// 			if (!isHovered) return;

// 			// Dynamically calculate scroll amount
// 			const scrollDistance = getScrollDistance();
// 			const scrollAmount = (e.deltaX || e.deltaY) * (scrollDistance / 100);

// 			scrollRef.current.scrollBy({
// 				left: scrollAmount,
// 				behavior: "smooth",
// 			});

// 			if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
// 				e.preventDefault();
// 			}
// 		};

// 		scrollContainer.addEventListener("wheel", handleWheelScroll, {
// 			passive: false,
// 		});
// 		return () => {
// 			scrollContainer.removeEventListener("wheel", handleWheelScroll);
// 		};
// 	}, [isHovered, dimensions, slideGap]);

// 	// Enable Keyboard Arrow Scrolling
// 	useEffect(() => {
// 		const handleKeyDown = (e) => {
// 			if (!isHovered) return;
// 			if (e.key === "ArrowLeft") {
// 				scrollLeft();
// 			} else if (e.key === "ArrowRight") {
// 				scrollRight();
// 			}
// 		};

// 		document.addEventListener("keydown", handleKeyDown);
// 		return () => {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		};
// 	}, [isHovered, scrollLeft, scrollRight]);

// 	// Check Scrollability
// 	useEffect(() => {
// 		const scrollContainer = scrollRef.current;

// 		const updateScrollability = () => {
// 			if (!scrollContainer) return;

// 			setCanScrollLeft(scrollContainer.scrollLeft > 0);

// 			setCanScrollRight(
// 				scrollContainer.scrollLeft <
// 					scrollContainer.scrollWidth - scrollContainer.offsetWidth - 1,
// 			);
// 		};

// 		if (scrollContainer) {
// 			scrollContainer.addEventListener("scroll", updateScrollability);
// 		}

// 		updateScrollability();

// 		return () => {
// 			if (scrollContainer) {
// 				scrollContainer.removeEventListener("scroll", updateScrollability);
// 			}
// 		};
// 	}, [dimensions, slides]);

// 	// Auto-scrolling
// 	useEffect(() => {
// 		if (!autoScrolling || slides.length <= 3) return;

// 		const startAutoScroll = () => {
// 			if (autoScrollInterval.current) return;
// 			autoScrollInterval.current = setInterval(() => {
// 				if (!isHovered && !isDragging) {
// 					if (scrollRef.current) {
// 						scrollRef.current.scrollBy({
// 							left: getScrollDistance(),
// 							behavior: "smooth",
// 						});
// 					}
// 				}
// 			}, 3000);
// 		};

// 		const stopAutoScroll = () => {
// 			if (autoScrollInterval.current) {
// 				clearInterval(autoScrollInterval.current);
// 				autoScrollInterval.current = null;
// 			}
// 		};

// 		startAutoScroll();
// 		return stopAutoScroll;
// 	}, [
// 		autoScrolling,
// 		isHovered,
// 		isDragging,
// 		dimensions.cardWidth,
// 		dimensions.fontScale,
// 		slideGap,
// 		slides.length,
// 	]);

// 	// Validate backgroundColor to prevent invalid CSS
// 	const getValidColor = (color) => {
// 		if (!color || typeof color !== "string") return "#ffffff";

// 		const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color); // #fff or #ffffff
// 		const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color); // rgb() or rgba()
// 		const isGradient = /gradient\((.|\s)*\)/.test(color); // linear or radial
// 		const isNamed = /^[a-zA-Z]+$/.test(color); // red, blue, etc.

// 		if (color === "transparent" || isHex || isRGB || isGradient || isNamed) {
// 			return color;
// 		}

// 		return "#ffffff"; // Fallback
// 	};

// 	// Get single color for fade effect (solid or first gradient stop)
// 	const getValidColorForFade = (color) => {
// 		if (!color || typeof color !== "string") return "rgba(255, 255, 255, 0.8)";
// 		const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
// 		const isRGB = /^rgb(a)?\([\d\s.,%]+\)$/.test(color);
// 		const isGradient = /gradient\((.|\s)*\)/.test(color);
// 		const isNamed = /^[a-zA-Z]+$/.test(color);
// 		if (color === "transparent") return "rgba(0, 0, 0, 0)";
// 		if (isNamed) return color;
// 		if (isRGB) {
// 			const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
// 			if (match) {
// 				const [, r, g, b] = match;
// 				return `rgba(${r}, ${g}, ${b}, 0.8)`;
// 			}
// 		}
// 		if (isHex) {
// 			const hex = color.replace("#", "");
// 			const r = parseInt(
// 				hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2),
// 				16,
// 			);
// 			const g = parseInt(
// 				hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4),
// 				16,
// 			);
// 			const b = parseInt(
// 				hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6),
// 				16,
// 			);
// 			return `rgba(${r}, ${g}, ${b}, 0.8)`;
// 		}
// 		return "rgba(255, 255, 255, 0.7)";
// 	};

// 	return (
// 		<div
// 			className="relative select-none"
// 			style={{
// 				background: getValidColor(backgroundColor),
// 				paddingTop: `${100 * dimensions.fontScale}px`,
// 				paddingBottom: `${80 * dimensions.fontScale}px`,
//                 display: "flex",
//                 flexDirection: isMobileView ? "column" : "row",
// 			}}
// 			onMouseEnter={() => setIsHovered(true)}
// 			onMouseLeave={() => {
// 				handleMouseUp();
// 				setIsHovered(false);
// 			}}
// 		>
//             <div
//             style={{
//                 marginLeft: isMobileView? "0px" : margin,
//                     width : isMobileView? "100%" :"40%",
//                     height : isMobileView? "100px" :`${280 * dimensions.fontScale}px`,
//                     marginLeft : isMobileView? "20px" : "0px",
//                     marginRight : isMobileView? "20px" : "0px",
//             }}>

//             {!isMobileView &&
//                 <span
//                 style={{
//                     fontSize: `${30 * dimensions.fontScale}px`
//                 }}>{caption}</span>
//             }
// 			<h2
// 				className="font-bold text-center"
// 				style={{
// 					fontSize: `${56 * dimensions.fontScale}px`,
// 					marginBottom: `${30 * dimensions.fontScale}px`,
// 					color: titleColor || "#000",
// 				}}
// 			>
// 				{title}
// 			</h2>
//             </div>

// 			<div
// 				className="relative w-full"
// 				style={{
// 					minHeight: `${dimensions.cardHeight + 40 * dimensions.fontScale}px`, // add space for shadow
//                     width: fullContainerWidth;
// 					overflow: "visible",
// 				}}
// 			>
// 				{canScrollLeft && (
// 					<button
// 						onClick={scrollLeft}
// 						className="text-white carousel-button carousel-button-left hover:scale-150 blink-effect focus:outline-none"
// 						aria-label="Scroll left"
// 						style={{
// 							position: "absolute",
// 							left: "0",
// 							top: "50%",
// 							transform: "translateY(-50%)",
// 							backgroundColor: "transparent",
// 							width: `${buttonSize * dimensions.fontScale}px`,
// 							height: `${buttonSize * dimensions.fontScale}px`,
// 							padding: 0,
// 							border: "none",
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "center",
// 							zIndex: 10,
// 						}}
// 					>
// 						<svg
// 							xmlns="http://www.w3.org/2000/svg"
// 							fill="currentColor"
// 							viewBox="0 0 24 24"
// 							stroke="currentColor"
// 							strokeWidth="2"
// 							style={{
// 								width: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
// 								height: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
// 								transform: "translateX(1px) rotate(180deg)",
// 								transition: "transform 0.2s ease-in-out",
// 							}}
// 							onMouseEnter={(e) =>
// 								(e.currentTarget.style.transform =
// 									"translateX(1px) rotate(180deg) scale(1.2)")
// 							}
// 							onMouseLeave={(e) =>
// 								(e.currentTarget.style.transform =
// 									"translateX(1px) rotate(180deg)")
// 							}
// 						>
// 							<polygon points="4,2 20,12 4,22" />
// 						</svg>
// 					</button>
// 				)}
// 				<div
// 					ref={scrollRef}
// 					className={`flex overflow-x-auto no-scrollbar ${
// 						isDragging ? "cursor-grabbing" : "cursor-grab"
// 					}`}
// 					style={{
// 						width: "100%",
// 						height: "100%",
// 						justifyContent: slides.length > 3 ? "start" : "center",
// 						overflowY: "visible",
// 						gap: `${dimensions.fontScale * slideGap}px`, // Padding to accommodate arrows
// 					}}
// 					onMouseDown={handleMouseDown}
// 					onMouseUp={handleMouseUp}
// 				>
// 					{slides.map((item, index) => (
// 						<a href={item.link}>
// 							<div
// 								key={index}
// 								className="relative flex-shrink-0 overflow-hidden transition duration-300 transform select-none hover:scale-105"
// 								style={{
// 									width: `${dimensions.cardWidth}px`,
// 									minWidth: `${dimensions.cardWidth}px`,
// 									height: `${dimensions.cardHeight}px`,
// 									scrollSnapAlign: "start",
// 									borderRadius: `${20 * dimensions.fontScale}px`,
// 									marginBottom: `${50 * dimensions.fontScale}px`,
// 									marginTop: `${30 * dimensions.fontScale}px`,
// 									background: getValidColor(item.backgroundColor),
// 									marginLeft: index === 0 ? `${20 * dimensions.fontScale}px` : "0px",
// 									boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
// 									overflowY: "hidden",
// 									position: "relative",
// 									display: "block",
// 								}}
// 							>
// 								{item.image && (
// 									<img
// 										src={item.image}
// 										alt={item.title}
// 										style={{
// 											position: "absolute",
// 											top: 0,
// 											left: 0,
// 											width: "100%",
// 											height: "100%",
// 											objectFit: "cover",
// 											transition: "opacity 0.3s ease",
// 											pointerEvents: "none",
// 										}}
// 									/>
// 								)}

// 								<div
// 									className="absolute inset-0 flex"
// 									style={{
// 										backgroundImage:
// 											item.textPosition === "top"
// 												? `linear-gradient(to bottom, ${getValidColorForFade(
// 														item.filterColor,
// 												  )}, transparent)`
// 												: `linear-gradient(to top, ${getValidColorForFade(
// 														item.filterColor,
// 												  )}, transparent)`,
// 										alignItems:
// 											item.textPosition === "top" ? "flex-start" : "flex-end",
// 										paddingTop:
// 											item.textPosition === "top"
// 												? `${60 * 0.3 * dimensions.fontScale}px`
// 												: `${30 * dimensions.fontScale}px`,
// 										paddingBottom:
// 											item.textPosition === "bottom"
// 												? `${60 * 0.3 * dimensions.fontScale}px`
// 												: `${30 * dimensions.fontScale}px`,
// 										paddingLeft: `${60 * 0.5 * dimensions.fontScale}px`,
// 										paddingRight: `${60 * 0.5 * dimensions.fontScale}px`,
// 										transition: "padding 0.3s ease-out",
// 									}}
// 								>
// 									<h3
// 										className="font-semibold text-center"
// 										style={{
// 											color: item.titleColor || "#000",
// 											maxWidth: `${dimensions.cardWidth * 0.8}px`,
// 											margin: `${30 * dimensions.fontScale}px auto`,
// 											fontSize: `${24 * dimensions.fontScale}px`,
// 											lineHeight: 1.2,
// 											wordBreak: "break-word",
// 										}}
// 									>
// 										{item.title}
// 									</h3>
// 								</div>
// 							</div>
// 						</a>
// 					))}
// 				</div>
// 				{canScrollRight && (
// 					<button
// 						onClick={scrollRight}
// 						className="text-white carousel-button carousel-button-right hover:scale-150 blink-effect focus:outline-none"
// 						aria-label="Scroll right"
// 						style={{
// 							position: "absolute",
// 							right: "0",
// 							top: "50%",
// 							transform: "translateY(-50%)",
// 							backgroundColor: "transparent",
// 							width: `${buttonSize * dimensions.fontScale}px`,
// 							height: `${buttonSize * dimensions.fontScale}px`,
// 							padding: 0,
// 							border: "none",
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "center",
// 							zIndex: 10,
// 						}}
// 					>
// 						<svg
// 							xmlns="http://www.w3.org/2000/svg"
// 							className="w-full h-full"
// 							fill="currentColor"
// 							viewBox="0 0 24 24"
// 							stroke="currentColor"
// 							strokeWidth="2"
// 							style={{
// 								width: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
// 								height: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
// 								transform: "translateX(1px)",
// 								transition: "transform 0.2s ease-in-out",
// 							}}
// 							onMouseEnter={(e) =>
// 								(e.currentTarget.style.transform = "translateX(1px) scale(1.2)")
// 							}
// 							onMouseLeave={(e) =>
// 								(e.currentTarget.style.transform = "translateX(1px)")
// 							}
// 						>
// 							<polygon points="4,2 20,12 4,22" />
// 						</svg>
// 					</button>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// export default SampleComponent;