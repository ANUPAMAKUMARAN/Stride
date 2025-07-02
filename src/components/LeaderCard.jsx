

import React, { useEffect, useRef, useState } from "react";

const data = [
  {
    name: "Shri. Pinarayi Vijayan",
    designation: "Hon’ble Chief Minister",
    organization: "Government of Kerala",
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg",
  },
  {
    name: "Shri. M.B. Rajesh",
    designation: "Minister for LSGD",
    organization: "Government of Kerala",
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg",
  },
  {
    name: "G.K. Sureshkumar",
    designation: "Managing Director",
    organization: "Clean Kerala Company Ltd",
    image:
      "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg",
  },
  
];

const LeaderCard = () => {
  const scrollRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    cardWidth: 300,
    cardHeight: 400,
    fontScale: 1,
    cardGap: 16,
  });

  const updateDimensions = () => {
    const containerWidth = scrollRef.current?.offsetWidth || window.innerWidth;
    const baseCardWidth = containerWidth > 1024 ? 360 : 280;
    const cardGap = containerWidth < 500 ? 6 : containerWidth < 768 ? 10 : 16;
    const width = (containerWidth - cardGap * 2) / 3;
    const scale = width / baseCardWidth;
    const height = width * 1.35;

    setDimensions({
      cardWidth: width,
      cardHeight: height,
      fontScale: scale,
      cardGap,
    });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const isCarousel = data.length > 3;

  const scrollBy = (dir) => {
    const scrollAmount = dimensions.cardWidth + dimensions.cardGap;
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative py-10 px-4 sm:px-6 md:px-10 lg:px-40 xl:px-60 bg-gradient-to-b from-white to-green-50">
      <h2
        className="text-center font-bold  mb-6 sm:mb-10"
        style={{ fontSize: `${2 * dimensions.fontScale}rem` }}
      >
        Guided by Visionary Leaders
      </h2>

      <div className="flex items-center gap-4">
        {/* Left Arrow Button */}
        {isCarousel && (
          <button
            onClick={() => scrollBy("left")}
            className="transition hover:scale-110"
            style={{
              backgroundColor: "transparent",
              fontSize: `${2 * dimensions.fontScale}rem`,
              lineHeight: 1,
            }}
          >
            ◀
          </button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
          style={{
            justifyContent: isCarousel ? "start" : "center",
            gap: `${dimensions.cardGap}px`,
            overflowY: "hidden",
            flexGrow: 1,
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-none bg-white rounded-xl shadow-md p-2 sm:p-2 flex flex-col items-center text-center"
              style={{
                width: `${dimensions.cardWidth}px`,
                minWidth: `${dimensions.cardWidth}px`,
                height: `${dimensions.cardHeight}px`,
              }}
            >
              {/* Image */}
              <div
                className="rounded-lg overflow-hidden mb-2"
                style={{
                  width: "100%",
                  height: `${dimensions.cardHeight * 0.8}px`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text */}
              <div
                className="flex flex-col justify-start flex-grow"
                style={{ minHeight: `${dimensions.cardHeight * 0.18}px` }}
              >
                <h3
                  className="font-semibold text-black truncate"
                  style={{
                    fontSize: `${1.05 * dimensions.fontScale}rem`,
                    marginBottom: "0.1rem",
                  }}
                  title={item.name}
                >
                  {item.name}
                </h3>
                <p
                  className="text-gray-600 truncate"
                  style={{
                    fontSize: `${0.95 * dimensions.fontScale}rem`,
                    marginBottom: "0.1rem",
                  }}
                  title={item.designation}
                >
                  {item.designation}
                </p>
                <p
                  className="text-gray-500 text-sm text-ellipsis overflow-hidden"
                  style={{
                    fontSize: `${0.85 * dimensions.fontScale}rem`,
                    lineHeight: 1.3,
                    maxHeight: `${1.3 * dimensions.fontScale * 2}rem`,
                    marginBottom: "0.2rem",
                  }}
                  title={item.organization}
                >
                  {item.organization}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {isCarousel && (
          <button
            onClick={() => scrollBy("right")}
            className="transition hover:scale-110"
            style={{
              backgroundColor: "transparent",
              fontSize: `${2 * dimensions.fontScale}rem`,
              lineHeight: 1,
            }}
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaderCard;