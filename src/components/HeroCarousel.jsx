import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const HeroCarousel = ({attributes}) => {
    const {
        slides=[]
    } = attributes;
  const [current, setCurrent] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const autoSlideRef = useRef(null);
  const imageCycleRef = useRef(null);

  const darkenColor = (hex) => {
    if (!hex) return "#000";
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("");
    const num = parseInt(c, 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, ((num >> 8) & 0xff) - 30);
    const b = Math.max(0, (num & 0xff) - 30);
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setScale(w < 480 ? 0.55 : w < 768 ? 0.7 : w < 1024 ? 0.85 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setImageIndex(0);
    resetAutoSlide();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setImageIndex(0);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    if (imageCycleRef.current) clearInterval(imageCycleRef.current);
    startAutoSlide();
  };

  const startAutoSlide = () => {
    autoSlideRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setImageIndex(0);
    }, 6000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      clearInterval(autoSlideRef.current);
      clearInterval(imageCycleRef.current);
    };
  }, []);

  useEffect(() => {
    if (imageCycleRef.current) clearInterval(imageCycleRef.current);
    imageCycleRef.current = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % slides[current].images.length);
    }, 3000);
    return () => clearInterval(imageCycleRef.current);
  }, [current]);

  const slide = slides[current];

  return (
    <div
      className="relative w-full  overflow-hidden"
      style={{
        height: `${90 * scale}vh`,
        transition: "height 0.3s ease",
      }}
    >
      {/* Background Images */}
      <AnimatePresence>
        <motion.div
          key={slide.images[imageIndex]}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url(${slide.images[imageIndex]})`,
            filter: "brightness(0.9)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Gradient Overlay  */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-center text-white pointer-events-auto"
        style={{
          height: "100%",
          paddingLeft: `${100 * scale}px`,
          maxWidth: `${800 * scale}px`,
          transition: "all 0.3s ease",
        }}
      >
        <motion.h2
          style={{
            fontSize: `${58 * scale}px`,
            lineHeight: 1.2,
            marginBottom: `${20 * scale}px`,
            fontWeight: "700",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {slide.title}
        </motion.h2>

        <motion.p
          style={{
            fontSize: `${30 * scale}px`,
            marginBottom: `${30 * scale}px`,
            maxWidth: `${600 * scale}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {slide.description}
        </motion.p>

        <div className="flex gap-4" style={{ gap: `${16 * scale}px` }}>
          {[slide.btn1, slide.btn2].map((btn, i) => (
            <a
              key={i}
              href={btn.link}
              style={{
                background: btn.btn1Color || btn.btn2Color,
                color: "#fff",
                fontSize: `${22 * scale}px`,
                padding: `${10 * scale}px ${24 * scale}px`,
                borderRadius: `${50 * scale}px`,
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = darkenColor(
                  btn.btn1Color || btn.btn2Color
                ))
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  btn.btn1Color || btn.btn2Color)
              }
            >
              {btn.text}
            </a>
          ))}
        </div>
      </div>

      {/* Arrows (TOP Z-index, clickable on all screens) */}
      <button
        onClick={prevSlide}
        className="absolute z-50 text-white"
        style={{
          left: `${20 * scale}px`,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          padding: `${10 * scale}px`,
          borderRadius: "50%",
          fontSize: `${20 * scale}px`,
        }}
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute z-50 text-white"
        style={{
          right: `${20 * scale}px`,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          padding: `${10 * scale}px`,
          borderRadius: "50%",
          fontSize: `${20 * scale}px`,
        }}
      >
        <FaArrowRight />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-5 w-full flex justify-center z-40"
        style={{ gap: `${8 * scale}px` }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              setImageIndex(0);
              resetAutoSlide();
            }}
            style={{
              width: `${10 * scale}px`,
              height: `${10 * scale}px`,
              borderRadius: "50%",
              background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

