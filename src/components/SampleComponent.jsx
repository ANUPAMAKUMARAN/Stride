
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

    const ICON_COLUMNS = 4;

    const iconItemBasis = `${100 / ICON_COLUMNS}%`;

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