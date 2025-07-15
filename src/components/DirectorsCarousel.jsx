

import React, { useRef, useEffect, useState, useMemo } from "react";


const SCROLL_SPEED = 0.4; // 🆕 Lower for smoother wheel
const DRAG_SPEED = 1.2;

const DirectorsCarousel = () => {
  const carouselRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0, padding: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const items = [
    { imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg", heading: "Alice Johnson", subheading: "Managing Director" },
    { imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg", heading: "Bob Smith", subheading: "Technical Director" },
    { imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg", heading: "Catherine Liu", subheading: "Operations Head" },
    { imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg", heading: "David Kim", subheading: "Finance Director" },
    { imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg", heading: "Eva Chen", subheading: "Design Head" },
    { imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg", heading: "Sam Leo", subheading: "Sales Director" }
  ];

  const loopedItems = [...items, ...items, ...items];

  
const [screenWidth, setScreenWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const { visibleFullCards, totalVisible } = useMemo(() => {
  if (screenWidth >= 1024) {
    return { visibleFullCards: 3, totalVisible: 2.5 };
  } else if (screenWidth >= 640) {
    return { visibleFullCards: 1.5, totalVisible: 2.2 };
  } else {
    return { visibleFullCards: 1, totalVisible: 1.4 };
  }
}, [screenWidth]);

useEffect(() => {
  const containerWidth = carouselRef.current?.offsetWidth || 0;
  const width = containerWidth / totalVisible;
  const height = (width * 5) / 3;
  const padding = (containerWidth - width * visibleFullCards) / 2;

  setCardSize({ width, height, padding });
}, [screenWidth, totalVisible, visibleFullCards]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container || cardSize.width === 0) return;

    const singleListWidth = items.length * (cardSize.width + 8);
    const totalListWidth = loopedItems.length * (cardSize.width + 3);

    let animationFrame;

    const checkLoop = () => {
      if (isDragging) return; // 🔧 Skip while dragging

      const scrollLeft = container.scrollLeft;

      if (scrollLeft <= singleListWidth * 0.25) {
        container.scrollLeft += singleListWidth;
      } else if (scrollLeft >= totalListWidth - singleListWidth * 1.25) {
        container.scrollLeft -= singleListWidth;
      }

      setScrollX(container.scrollLeft);
      animationFrame = requestAnimationFrame(checkLoop);
    };

    animationFrame = requestAnimationFrame(checkLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [cardSize, isDragging]);

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

  // 🔧 Mouse Drag Events (smooth)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftStart(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * DRAG_SPEED;
    carouselRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // 🔧 Smooth wheel scroll
  const handleWheel = (e) => {
    if (carouselRef.current) {
      e.preventDefault();
      carouselRef.current.scrollBy({
        left: e.deltaY * SCROLL_SPEED,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full py-6 bg-gradient-to-b from-white to-white">
      <div className="w-full max-w-[900px] mx-auto relative px-2 sm:px-4 lg:px-8">
        <h2 className="text-center text-2xl font-semibold mb-4">Directors</h2>

        {/* Gradients */}
        <div className="absolute top-0 left-0 h-full z-10 pointer-events-none w-[15%] sm:w-[12%] md:w-[10%] lg:w-[25%]"
          style={{
            background: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)"
          }}
        />
        <div className="absolute top-0 right-0 h-full z-10 pointer-events-none w-[15%] sm:w-[12%] md:w-[10%] lg:w-[25%]"
          style={{
            background: "linear-gradient(to left, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)"
          }}
        />

        {/* Carousel */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          className={`flex overflow-x-auto no-scrollbar py-6 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{
            paddingLeft: `${cardSize.padding}px`,
            paddingRight: `${cardSize.padding}px`,
            scrollSnapType: "x mandatory",
            gap: "8px",
            scrollBehavior: "smooth" // 🆕
          }}
        >
          {loopedItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out"
              style={{
                width: `${cardSize.width}px`,
                height: `${cardSize.height}px`,
                transform: `scale(${getCardScale(index)})`,
                scrollSnapAlign: "center"
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

export default DirectorsCarousel;