import React, { useEffect, useState, useRef } from "react";

const useIsMobile = (MOBILE_BREAKPOINT = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [MOBILE_BREAKPOINT]);
  return isMobile;
};

const ImageTabs = () => {
  const images = [
    "https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?cs=srgb&dl=pexels-abbykihano-431722.jpg&fm=jpg",
    "https://festivalpro.com/articles/1568.png",
    "https://www.rishabhsoft.com/wp-content/uploads/2010/11/Festivals-Celebrations-Then-and-Now.jpg",
    "https://s1.it.atcdn.net/wp-content/uploads/2020/01/Hero-Holi-Festival-India.jpg",
    "https://media.assettype.com/thequint%2F2022-03%2F2170dfa9-9e52-47f8-9a61-6b9acc70bd52%2FiStock_522121310.jpg?auto=format%2Ccompress&fmt=webp&width=720",
  ];

  const DURATION = 4000;
  const FADE_DURATION = 600;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [manual, setManual] = useState(false);
  const isMobile = useIsMobile();

  const rafRef = useRef(null);
  const startTimeRef = useRef(performance.now());

  const goToImage = (targetIndex) => {
    cancelAnimationFrame(rafRef.current);
    setFading(true);
    setManual(true);

    setTimeout(() => {
      setCurrent(targetIndex);
      setProgress(0);
      setFading(false);
      setManual(false);
      startTimeRef.current = performance.now();
      startProgress();
    }, FADE_DURATION);
  };

  const startProgress = () => {
    const animate = (now) => {
      const elapsed = now - startTimeRef.current;
      const percent = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        goToImage((current + 1) % images.length);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgress();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line
  }, [current]);

  const handleMobileClick = (e) => {
    if (!isMobile) return;
    const { clientX, currentTarget } = e;
    const middle = currentTarget.offsetWidth / 2;
    const targetIndex =
      clientX < middle
        ? (current - 1 + images.length) % images.length
        : (current + 1) % images.length;

    goToImage(targetIndex);
  };

  return (
    <div
      onClick={handleMobileClick}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: isMobile ? "transparent" : "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: isMobile ? "300px" : "700px",
        cursor: isMobile ? "pointer" : "default",
      }}
    >
      {/* Progress Bars */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
          display: "flex",
          gap: 4,
          zIndex: 10,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              background:
                i < current ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
              borderRadius: 5,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width:
                  i === current ? `${progress}%` : i < current ? "100%" : "0%",
                background: "white",
                transition:
                  i === current
                    ? "width 0.15s linear"
                    : manual
                    ? "none"
                    : "width 0.1s linear",
              }}
            />
          </div>
        ))}
      </div>

      {/* Crossfade Images */}
      <div
        style={{
          position: "relative",
          width: isMobile ? "100%" : "70%",
          height: "100%",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 10,
              opacity: i === current ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTabs;


