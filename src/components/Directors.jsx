
// import React, { useRef, useEffect, useState } from "react";

// const Directors = () => {
//     const carouselRef = useRef(null);
//     const [scrollX, setScrollX] = useState(0);
//     const [cardSize, setCardSize] = useState({
//         width: 0,
//         height: 0,
//         padding: 0,
//     });

//     const items = [
//         {
//             imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
//             heading: "Alice Johnson",
//             subheading: "Managing Director",
//         },
//         {
//             imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
//             heading: "Bob Smith",
//             subheading: "Technical Director",
//         },
//         {
//             imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
//             heading: "Catherine Liu",
//             subheading: "Operations Head",
//         },
//         {
//             imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
//             heading: "David Kim",
//             subheading: "Finance Director",
//         },
//         {
//             imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
//             heading: "Eva Chen",
//             subheading: "Design Head",
//         },
//         {
//             imgSrc: "https://img.freepik.com/free-photo/3d-cartoon-character_23-2151021986.jpg",
//             heading: "Sam Leo",
//             subheading: "Sales Director",
//         },
//     ];


//     const updateCardSize = () => {
//     const containerWidth = carouselRef.current?.offsetWidth || 0;
//     const screenWidth = window.innerWidth;

//     let visibleFullCards, totalVisible;

//     if (screenWidth >= 1024) {
//         visibleFullCards = 3;     // 🖥 Show 3 full cards
//         totalVisible = 3;
//     } else if (screenWidth >= 640) {
//         visibleFullCards = 1.5;
//         totalVisible = 2.2;
//     } else {
//         visibleFullCards = 1;
//         totalVisible = 1.4;
//     }

//     const width = containerWidth / totalVisible;
//     const height = (width * 5) / 3;
//     const padding = (containerWidth - width * visibleFullCards) / 2;

//     setCardSize({ width, height, padding });
// };

//     useEffect(() => {
//         updateCardSize();
//         window.addEventListener("resize", updateCardSize);
//         return () => window.removeEventListener("resize", updateCardSize);
//     }, []);

//     useEffect(() => {
//         const ref = carouselRef.current;
//         const handleScroll = () => setScrollX(ref.scrollLeft);
//         ref?.addEventListener("scroll", handleScroll);
//         return () => ref?.removeEventListener("scroll", handleScroll);
//     }, []);

//     // 👉 Scroll to second card only on mobile on initial mount
//     useEffect(() => {
//         const isMobile = window.innerWidth < 1024;
//         if (isMobile && carouselRef.current && cardSize.width > 0) {
//             const scrollToX = (cardSize.width + 8) * 1; // index 1, 8 = gap
//             carouselRef.current.scrollTo({
//                 left: scrollToX,
//                 behavior: "smooth",
//             });
//         }
//     }, [cardSize]);

//     const getCardScale = (index) => {
//         const container = carouselRef.current;
//         if (!container) return 1;

//         const center = container.scrollLeft + container.offsetWidth / 2;
//         const cardLeft = index * (cardSize.width + 8);
//         const cardCenter = cardLeft + cardSize.width / 2;
//         const distance = Math.abs(center - cardCenter);

//         const threshold = cardSize.width / 1.5;
//         return distance < threshold ? 1 : 0.88;
//     };

//     return (
//         <div className="w-full py-6 bg-gradient-to-b from-white to-green-50">
//             <div className="max-w-screen-md mx-auto">
//                 <h2 className="text-center text-2xl font-semibold mb-4">Directors</h2>

//                 <div
//                     ref={carouselRef}
//                     className="flex overflow-x-auto no-scrollbar py-6"
//                     style={{
//                         paddingLeft: `${cardSize.padding}px`,
//                         paddingRight: `${cardSize.padding}px`,
//                         scrollSnapType: "x mandatory",
//                         gap: "8px",
//                     }}
//                 >
//                     {items.map((item, index) => {
//                         const scale = getCardScale(index);
//                         return (
//                             <div
//                                 key={index}
//                                 className="flex-shrink-0 py-0 bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out"
//                                 style={{
//                                     width: `${cardSize.width}px`,
//                                     height: `${cardSize.height}px`,
//                                     transform: `scale(${scale})`,
//                                     scrollSnapAlign: "center",
//                                 }}
//                             >
//                                 <img
//                                     src={item.imgSrc}
//                                     alt={item.heading}
//                                     className="w-full h-4/5 object-cover"
//                                     draggable="false"
//                                 />
//                                 <div className="h-1/5 text-center px-2 py-1">
//                                     <h3 className="font-medium text-sm truncate">{item.heading}</h3>
//                                     <p className="text-xs text-gray-600 truncate">{item.subheading}</p>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Directors;

import React, { useEffect, useRef, useState, useCallback } from "react";

const data = [
  {
    name: "Shri. Pinarayi Vijayan",
    designation: "Hon’ble Chief Minister",
    organization: "Government of Kerala",
    image: "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg",
  },
  {
    name: "Shri. M.B. Rajesh",
    designation: "Minister for LSGD",
    organization: "Government of Kerala",
    image: "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg",
  },
  {
    name: "G.K. Sureshkumar",
    designation: "Managing Director",
    organization: "Clean Kerala Company Ltd",
    image: "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg",
  },
];

const Directors = () => {
  // Step 1: Constants (All in px)
  const SLIDE_WIDTH_BASE = 400;
  const SLIDE_HEIGHT_BASE = 500;
  const SLIDE_GAP_BASE = 16;
  const MIN_SLIDES_VISIBLE = 1.25;
  const DRAG_SCROLL_MULTIPLIER = 1;
  const WHEEL_SCROLL_SPEED = 7;

  // Step 2: Refs & States
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [slideDimensions, setSlideDimensions] = useState({
    width: SLIDE_WIDTH_BASE,
    height: SLIDE_HEIGHT_BASE,
    gap: SLIDE_GAP_BASE,
  });

  // Step 3: Responsive Slide Dimensions (Still px-based, just scaled)
  useEffect(() => {
    const updateSlideDimensions = () => {
      const containerWidth = carouselRef.current?.offsetWidth || 0;
      const minRequiredWidth = SLIDE_WIDTH_BASE * MIN_SLIDES_VISIBLE;

      if (containerWidth < minRequiredWidth) {
        const adjustedWidth = containerWidth / MIN_SLIDES_VISIBLE;
        setSlideDimensions({
          width: adjustedWidth,
          height: (adjustedWidth * SLIDE_HEIGHT_BASE) / SLIDE_WIDTH_BASE,
          gap: SLIDE_GAP_BASE,
        });
      } else {
        setSlideDimensions({
          width: SLIDE_WIDTH_BASE,
          height: SLIDE_HEIGHT_BASE,
          gap: SLIDE_GAP_BASE,
        });
      }
    };

    window.addEventListener("resize", updateSlideDimensions);
    updateSlideDimensions();
    return () => window.removeEventListener("resize", updateSlideDimensions);
  }, []);

  // Step 4: Scale factor for text
  const slideScaleFactor = slideDimensions.width / SLIDE_WIDTH_BASE;

  // Step 5: Scroll Functions
  const getSlideScrollDistance = useCallback(() => {
    return slideDimensions.width + slideDimensions.gap;
  }, [slideDimensions]);

  const handleScrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -getSlideScrollDistance(),
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    carouselRef.current?.scrollBy({
      left: getSlideScrollDistance(),
      behavior: "smooth",
    });
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.pageX);
    setInitialScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const distanceMoved = e.pageX - dragStartX;
    carouselRef.current.scrollLeft =
      initialScrollLeft - distanceMoved * DRAG_SCROLL_MULTIPLIER;
  };

  const handleDragEnd = () => setIsDragging(false);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleWheelScroll = (e) => {
      if (!isFocused) return;
      const scrollAmount = (e.deltaX || e.deltaY) * WHEEL_SCROLL_SPEED;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.preventDefault();
    };

    container.addEventListener("wheel", handleWheelScroll, { passive: false });
    return () => container.removeEventListener("wheel", handleWheelScroll);
  }, [isFocused]);

  useEffect(() => {
    const handleKeyNavigation = (e) => {
      if (!isFocused) return;
      if (e.key === "ArrowLeft") handleScrollLeft();
      if (e.key === "ArrowRight") handleScrollRight();
    };
    document.addEventListener("keydown", handleKeyNavigation);
    return () => document.removeEventListener("keydown", handleKeyNavigation);
  }, [isFocused, getSlideScrollDistance]);

  // Step 6: Carousel Rendering
  return (
    <div className="relative w-full pt-4 pb-4" onMouseEnter={() => setIsFocused(true)} onMouseLeave={() => setIsFocused(false)}>
      <h2
        className="text-center font-bold mb-6"
        style={{ fontSize: `${2 * slideScaleFactor}rem` }}
      >
        Guided by Visionary Leaders
      </h2>

      <div className="flex items-center justify-between px-4">
        <button onClick={handleScrollLeft} className="transition hover:scale-110" style={{ fontSize: `${2 * slideScaleFactor}rem` }}>◀</button>

        <div
          ref={carouselRef}
          className="flex w-full py-10 overflow-x-auto no-scrollbar touch-pan-x cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          style={{ gap: `${slideDimensions.gap}px` }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-none bg-white shadow-md flex flex-col items-center text-center rounded-xl overflow-hidden"
              style={{
                width: `${slideDimensions.width}px`,
                minWidth: `${slideDimensions.width}px`,
                height: `${slideDimensions.height}px`,
              }}
            >
              <div className="w-full overflow-hidden" style={{ height: `${slideDimensions.height * 0.8}px` }}>
                <img src={item.image} alt={item.name} className="object-cover w-full h-full" draggable="false" />
              </div>
              <div className="flex flex-col justify-start px-3 pt-2 flex-grow" style={{ minHeight: `${slideDimensions.height * 0.18}px` }}>
                <h3 className="font-semibold text-black truncate" style={{ fontSize: `${1.05 * slideScaleFactor}rem` }} title={item.name}>{item.name}</h3>
                <p className="text-gray-600 truncate" style={{ fontSize: `${0.95 * slideScaleFactor}rem` }} title={item.designation}>{item.designation}</p>
                <p className="text-gray-500 text-sm text-ellipsis overflow-hidden" style={{ fontSize: `${0.85 * slideScaleFactor}rem`, lineHeight: 1.3, maxHeight: `${1.3 * slideScaleFactor * 2}rem` }} title={item.organization}>{item.organization}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleScrollRight} className="transition hover:scale-110" style={{ fontSize: `${2 * slideScaleFactor}rem` }}>▶</button>
      </div>
    </div>
  );
};

export default Directors;
