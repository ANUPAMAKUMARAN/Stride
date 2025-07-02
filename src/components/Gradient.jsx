

import React, { useRef, useEffect, useState } from "react";

const Gradient = () => {
    const carouselRef = useRef(null);
    const [scrollX, setScrollX] = useState(0);
    const [cardSize, setCardSize] = useState({ width: 0, height: 0, padding: 0 });

    const items = [
        {
            imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
            heading: "Alice Johnson",
            subheading: "Managing Director",
        },
        {
            imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
            heading: "Bob Smith",
            subheading: "Technical Director",
        },
        {
            imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
            heading: "Catherine Liu",
            subheading: "Operations Head",
        },
        {
            imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
            heading: "David Kim",
            subheading: "Finance Director",
        },
        {
            imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
            heading: "Eva Chen",
            subheading: "Design Head",
        },
        {
            imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
            heading: "Sam Leo",
            subheading: "Sales Director",
        },
    ];

    const loopedItems = [...items, ...items, ...items];

    const updateCardSize = () => {
        const containerWidth = carouselRef.current?.offsetWidth || 0;
        const screenWidth = window.innerWidth;

        let visibleFullCards, totalVisible;

        if (screenWidth >= 1024) {
            visibleFullCards = 3;
            totalVisible = 3;
        } else if (screenWidth >= 640) {
            visibleFullCards = 1.5;
            totalVisible = 2.2;
        } else {
            visibleFullCards = 1;
            totalVisible = 1.4;
        }

        const width = containerWidth / totalVisible;
        const height = (width * 5) / 3;
        const padding = (containerWidth - width * visibleFullCards) / 2;

        setCardSize({ width, height, padding });
    };

    useEffect(() => {
        updateCardSize();
        window.addEventListener("resize", updateCardSize);
        return () => window.removeEventListener("resize", updateCardSize);
    }, []);

    // ✅ FIXED smooth infinite scroll using requestAnimationFrame
    // useEffect(() => {
    //     const container = carouselRef.current;
    //     if (!container || cardSize.width === 0) return;

    //     const singleListWidth = items.length * (cardSize.width + 8);
    //     const totalListWidth = loopedItems.length * (cardSize.width + 8);

    //     let animationFrame;

    //     const checkLoop = () => {
    //         const scrollLeft = container.scrollLeft;

    //         if (scrollLeft <= singleListWidth * 0.25) {
    //             container.scrollLeft += singleListWidth;
    //         } else if (scrollLeft >= totalListWidth - singleListWidth * 1.25) {
    //             container.scrollLeft -= singleListWidth;
    //         }

    //         setScrollX(container.scrollLeft); // keep scaling working
    //         animationFrame = requestAnimationFrame(checkLoop);
    //     };

    //     animationFrame = requestAnimationFrame(checkLoop);

    //     return () => cancelAnimationFrame(animationFrame);
    // }, [cardSize]);

    useEffect(() => {
    const container = carouselRef.current;
    if (!container || cardSize.width === 0) return;

    const singleListWidth = items.length * (cardSize.width + 8);
    const totalListWidth = loopedItems.length * (cardSize.width + 8);

    let animationFrame;

    const checkLoop = () => {
        const scrollLeft = container.scrollLeft;

        // Only reset scrollLeft when it’s deep into one end to avoid visual jump
        if (scrollLeft <= singleListWidth * 0.25) {
            container.scrollLeft += singleListWidth;
        } else if (scrollLeft >= totalListWidth - singleListWidth * 1.25) {
            container.scrollLeft -= singleListWidth;
        }

        setScrollX(container.scrollLeft); // keep scaling working
        animationFrame = requestAnimationFrame(checkLoop);
    };

    animationFrame = requestAnimationFrame(checkLoop);

    return () => cancelAnimationFrame(animationFrame);
}, [cardSize]);

    // ✅ Initial center scroll to middle copy
    useEffect(() => {
        const container = carouselRef.current;
        if (container && cardSize.width > 0) {
            const middle = (loopedItems.length / 3) * (cardSize.width + 8);
            container.scrollLeft = middle - container.offsetWidth / 2;
        }
    }, [cardSize]);

    const getCardScale = (index) => {
        const container = carouselRef.current;
        if (!container) return 1;
        const center = container.scrollLeft + container.offsetWidth / 2;
        const cardLeft = index * (cardSize.width + 8);
        const cardCenter = cardLeft + cardSize.width / 2;
        const distance = Math.abs(center - cardCenter);
        const threshold = cardSize.width / 1.5;
        return distance < threshold ? 1 : 0.88;
    };

    return (
        <div className="w-full py-6 bg-gradient-to-b from-white to-green-50">
            <div className="max-w-screen-md mx-auto relative px-2 sm:px-4 lg:px-8">
                <h2 className="text-center text-2xl font-semibold mb-4">Directors</h2>

                {/* Left Gradient Overlay */}
                <div
                    className="absolute top-0 left-0 h-full z-10 pointer-events-none"
                    style={{
                        width: "25%",
                        background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.6), rgba(255,255,255,0))"
                    }}
                />

                {/* Right Gradient Overlay */}
                <div
                    className="absolute top-0 right-0 h-full z-10 pointer-events-none"
                    style={{
                        width: "25%",
                        background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0.6), rgba(255,255,255,0))"
                    }}
                />

                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto no-scrollbar py-6"
                    style={{
                        paddingLeft: `${cardSize.padding}px`,
                        paddingRight: `${cardSize.padding}px`,
                        scrollSnapType: "x mandatory",
                        gap: "8px",
                        scrollBehavior: "auto", // ensure no smooth animation during reset
                    }}
                >
                    {loopedItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 py-0 bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out"
                            style={{
                                width: `${cardSize.width}px`,
                                height: `${cardSize.height}px`,
                                transform: `scale(${getCardScale(index)})`,
                                scrollSnapAlign: "center",
                            }}
                        >
                            <img
                                src={item.imgSrc}
                                alt={item.heading}
                                className="w-full h-4/5 object-cover"
                                draggable="false"
                            />
                            <div className="h-1/5 text-center px-2 py-1">
                                <h3 className="font-medium text-sm truncate">{item.heading}</h3>
                                <p className="text-xs text-gray-600 truncate">{item.subheading}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gradient;
