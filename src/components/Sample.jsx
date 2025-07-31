{/* <div
  className="relative select-none"
  style={{
    background: getValidColor(backgroundColor),
    paddingTop: `${100 * dimensions.fontScale}px`,
    paddingBottom: `${80 * dimensions.fontScale}px`,
    display: "flex",
    flexDirection: isMobileView ? "column" : "row",
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => {
    handleMouseUp();
    setIsHovered(false);
  }}
>
    <div>
        <h2
            className="font-bold text-center"
            style={{
                fontSize: `${60 * dimensions.fontScale}px`,
                marginBottom: `${30 * dimensions.fontScale}px`,
                color: titleColor || "#000",
            }}
        >
            {title}
        </h2>
    </div>

    <div
        className="relative w-full"
        style={{
            minHeight: `${dimensions.cardHeight + 40 * dimensions.fontScale}px`, // add space for shadow
            overflow: "visible",
        }}
    >
        {canScrollLeft && (
            <button
                onClick={scrollLeft}
                className="text-white carousel-button carousel-button-left hover:scale-150 blink-effect focus:outline-none"
                aria-label="Scroll left"
                style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    width: `${buttonSize * dimensions.fontScale}px`,
                    height: `${buttonSize * dimensions.fontScale}px`,
                    padding: 0,
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                        width: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
                        height: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
                        transform: "translateX(1px) rotate(180deg)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.transform =
                        "translateX(1px) rotate(180deg) scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                    (e.currentTarget.style.transform =
                        "translateX(1px) rotate(180deg)")
                    }
                >
                    <polygon points="4,2 20,12 4,22" />
                </svg>
            </button>
        )}
        <div
            ref={scrollRef}
            className={`flex overflow-x-auto no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
            style={{
                width: "100%",
                height: "100%",
                justifyContent: slides.length > 3 ? "start" : "center",
                overflowY: "visible",
                gap: `${dimensions.fontScale * slideGap}px`, // Padding to accommodate arrows
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {slides.map((item, index) => (
                <a href={item.link}>
                    <div
                        key={index}
                        className="relative flex-shrink-0 overflow-hidden transition duration-300 transform select-none hover:scale-105"
                        style={{
                            width: `${dimensions.cardWidth}px`,
                            minWidth: `${dimensions.cardWidth}px`,
                            height: `${dimensions.cardHeight}px`,
                            scrollSnapAlign: "start",
                            borderRadius: `${20 * dimensions.fontScale}px`,
                            marginBottom: `${50 * dimensions.fontScale}px`,
                            marginTop: `${30 * dimensions.fontScale}px`,
                            background: getValidColor(item.backgroundColor),
                            marginLeft:
                                index === 0 ? `${20 * dimensions.fontScale}px` : "0px",
                            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                            overflowY: "hidden",
                            position: "relative",
                            display: "block",
                        }}
                    >

                    </div>
                </a>
            ))}
        </div>
        {canScrollRight && (
            <button
                onClick={scrollRight}
                className="text-white carousel-button carousel-button-right hover:scale-150 blink-effect focus:outline-none"
                aria-label="Scroll right"
                style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    width: `${buttonSize * dimensions.fontScale}px`,
                    height: `${buttonSize * dimensions.fontScale}px`,
                    padding: 0,
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                        width: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
                        height: `${0.8 * (buttonSize * dimensions.fontScale)}px`,
                        transform: "translateX(1px)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateX(1px) scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateX(1px)")
                    }
                >
                    <polygon points="4,2 20,12 4,22" />
                </svg>
            </button>
        )}
    </div>
</div>
	);
} */}