
import React, { useRef, useState, useEffect } from "react";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [dimensions, setDimensions] = useState({
    slideWidth: 400,
    slideHeight: 500,
    fontScale: 1,
  });

  const steps = [
    {
      step: 1,
      title: "Submit Required Documents",
      description: "We need any one of the following:",
      checklist: [
        "Iqama Copy",
        "OR Iqama Number",
        "OR First Saudi Visa copy from your passport",
        "Bio page of your passport",
      ],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_00_44-AM.png",
    },
    {
      step: 2,
      title: "Record Check & Verification",
      description: "We access Saudi police records to:",
      checklist: ["Confirm your file", "Retrieve fingerprint & photo records"],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_10_06-AM.png",
    },
    {
      step: 3,
      title: "Issuance of Saudi PCC",
      description: "Final Saudi PCC issued with the official seal.",
      checklist: ["Attestation by MOFA (if requested)", "Courier or soft copy delivery"],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_12_54-AM.png",
    },
    {
      step: 4,
      title: "Translation Services (if required)",
      description: "We offer translation for official use:",
      checklist: ["Arabic to English translation", "Certified translator approval"],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_15_46-AM.png",
    },
    {
      step: 5,
      title: "MOFA Attestation",
      description: "We help with Ministry of Foreign Affairs Attestation:",
      checklist: ["Document submission to MOFA", "Collection and confirmation"],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_00_44-AM.png",
    },
    {
      step: 6,
      title: "Courier Service Setup",
      description: "Secure delivery of your documents via trusted courier partners.",
      checklist: [
        "Domestic & international shipping",
        "Tracking details shared"
      ],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_10_06-AM.png",
      titleColor: "#0E0E52",
      descriptionColor: "#666B8A",
      checklistColor: "#0082F4",
      slideBackgroundColor: "#F8F9FC"
    },
    {
      step: 7,
      title: "Customer Support",
      description: "Dedicated help for every stage of the process.",
      checklist: [
        "Phone, Email & WhatsApp assistance",
        "Real-time status updates"
      ],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_12_54-AM.png",
      titleColor: "#0E0E52",
      descriptionColor: "#666B8A",
      checklistColor: "#0082F4",
      slideBackgroundColor: "#F8F9FC"
    },
    {
      step: 8,
      title: "Data Security Assurance",
      description: "Your data is safe with us.",
      checklist: [
        "End-to-end encryption",
        "No third-party access"
      ],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_15_46-AM.png",
      titleColor: "#0E0E52",
      descriptionColor: "#666B8A",
      checklistColor: "#0082F4",
      slideBackgroundColor: "#F8F9FC"
    },
    {
      step: 9,
      title: "Soft Copy Archival",
      description: "We provide you with soft copies for your records.",
      checklist: [
        "PDF & image format",
        "Secure cloud storage link (optional)"
      ],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_00_44-AM.png",
      titleColor: "#0E0E52",
      descriptionColor: "#666B8A",
      checklistColor: "#0082F4",
      slideBackgroundColor: "#F8F9FC"
    },
    {
      step: 10,
      title: "Completion & Feedback",
      description: "Once complete, we welcome your feedback.",
      checklist: [
        "Quick rating system",
        "Optional testimonial submission"
      ],
      image: "https://project251.hrstride.academy/wp-content/uploads/2025/06/ChatGPT-Image-Jun-27-2025-01_10_06-AM.png",
      titleColor: "#0E0E52",
      descriptionColor: "#666B8A",
      checklistColor: "#0082F4",
      slideBackgroundColor: "#F8F9FC"
    }
  ];

  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = carouselRef.current?.offsetWidth || 0;
      const fullSlideWidth = 400;
      const requiredWidth = fullSlideWidth * 1.25;
      if (containerWidth < requiredWidth) {
        const adjustedWidth = containerWidth / 1.25;
        const fontScale = adjustedWidth / 400;
        setDimensions({
          slideWidth: adjustedWidth,
          slideHeight: (adjustedWidth * 500) / 400,
          fontScale,
        });
      } else {
        setDimensions({ slideWidth: fullSlideWidth, slideHeight: 500, fontScale: 1 });
      }
    };
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeftPos(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const distance = e.pageX - startX;
    carouselRef.current.scrollLeft = scrollLeftPos - distance * 1.5;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Inline scrollbar styling
  const getScrollbarStyles = () => ({
    scrollbarWidth: "thin",
    scrollbarColor: "#bbb transparent",
    overflowY: "hidden",
  });

  const getWebkitScrollbarStyles = () => `
    ::-webkit-scrollbar {
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 10px;
    }
  `;

  return (
    <div className="w-full py-10 px-4 bg-white overflow-hidden">
      <style>{getWebkitScrollbarStyles()}</style>

      <div className="max-w-6xl mx-auto bg-[#F8F9FC] p-8 rounded-2xl shadow-md relative">
        <div className="text-center mb-8">
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">SAUDI PCC ONLINE PROCESS</p>
          <h2 className="text-3xl font-bold text-[#0E0E52] mt-2">Step-by-Step Process</h2>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto px-2 cursor-grab active:cursor-grabbing"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            ...getScrollbarStyles(),
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeaveCapture={() => setIsActive(false)}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-row flex-shrink-0 bg-white rounded-2xl shadow hover:shadow-xl transition-transform hover:scale-[1.01]"
              style={{
                scrollSnapAlign: "start",
                width: `${dimensions.slideWidth}px`,
                height: `${dimensions.slideHeight}px`,
                padding: `${dimensions.fontScale * 20}px`,
                marginLeft: index === 0 ? "1rem" : "0",
              }}
            >
              <img
                src={step.image}
                alt={step.title}
                className="rounded-xl object-cover pointer-events-none"
                draggable="false"
                style={{
                  width: `${dimensions.slideWidth * 0.4}px`,
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="pl-4 flex flex-col justify-center">
                <h3 className="font-bold mb-1 text-[#0E0E52]" style={{ fontSize: `${1.3 * dimensions.fontScale}rem` }}>
                  STEP {String(step.step).padStart(2, "0")}
                </h3>
                <h4 className="font-bold mb-1 text-[#0E0E52]" style={{ fontSize: `${1.6 * dimensions.fontScale}rem` }}>
                  {step.title}
                </h4>
                <p className="font-medium mb-2 text-[#666B8A]" style={{ fontSize: `${1.1 * dimensions.fontScale}rem` }}>
                  {step.description}
                </p>
                <ul className="list-disc pl-5">
                  {step.checklist.map((item, idx) => (
                    <li key={idx} className="text-[#0082F4] mb-1" style={{ fontSize: `${1 * dimensions.fontScale}rem` }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 z-10"
          onClick={scrollLeft}
        >
          &#8592;
        </button>
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 z-10"
          onClick={scrollRight}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
