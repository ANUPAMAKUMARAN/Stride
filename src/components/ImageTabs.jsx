// import React, { useEffect, useState, useRef } from "react";

// const useIsMobile = (MOBILE_BREAKPOINT = 768) => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const mq = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`);
//     const update = () => setIsMobile(mq.matches);
//     update();
//     mq.addEventListener("change", update);
//     return () => mq.removeEventListener("change", update);
//   }, [MOBILE_BREAKPOINT]);
//   return isMobile;
// };

// const ImageTabs = () => {
//   const images = [
//     "https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?cs=srgb&dl=pexels-abbykihano-431722.jpg&fm=jpg",
//     "https://festivalpro.com/articles/1568.png",
//     "https://www.rishabhsoft.com/wp-content/uploads/2010/11/Festivals-Celebrations-Then-and-Now.jpg",
//     "https://s1.it.atcdn.net/wp-content/uploads/2020/01/Hero-Holi-Festival-India.jpg",
//     "https://media.assettype.com/thequint%2F2022-03%2F2170dfa9-9e52-47f8-9a61-6b9acc70bd52%2FiStock_522121310.jpg?auto=format%2Ccompress&fmt=webp&width=720",
//   ];

//   const DURATION = 4000;
//   const FADE_DURATION = 600;

//   const [current, setCurrent] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [fading, setFading] = useState(false);
//   const [manual, setManual] = useState(false);
//   const isMobile = useIsMobile();

//   const rafRef = useRef(null);
//   const startTimeRef = useRef(performance.now());

//   const goToImage = (targetIndex) => {
//     cancelAnimationFrame(rafRef.current);
//     setFading(true);
//     setManual(true);

//     setTimeout(() => {
//       setCurrent(targetIndex);
//       setProgress(0);
//       setFading(false);
//       setManual(false);
//       startTimeRef.current = performance.now();
//       startProgress();
//     }, FADE_DURATION);
//   };

//   const startProgress = () => {
//     const animate = (now) => {
//       const elapsed = now - startTimeRef.current;
//       const percent = Math.min((elapsed / DURATION) * 100, 100);
//       setProgress(percent);

//       if (percent < 100) {
//         rafRef.current = requestAnimationFrame(animate);
//       } else {
//         goToImage((current + 1) % images.length);
//       }
//     };
//     rafRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     startProgress();
//     return () => cancelAnimationFrame(rafRef.current);
//     // eslint-disable-next-line
//   }, [current]);

//   const handleMobileClick = (e) => {
//     if (!isMobile) return;
//     const { clientX, currentTarget } = e;
//     const middle = currentTarget.offsetWidth / 2;
//     const targetIndex =
//       clientX < middle
//         ? (current - 1 + images.length) % images.length
//         : (current + 1) % images.length;

//     goToImage(targetIndex);
//   };

//   return (
//     <div
//       onClick={handleMobileClick}
//       style={{
//         position: "relative",
//         width: "100%",
//         overflow: "hidden",
//         backgroundColor: isMobile ? "transparent" : "black",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: isMobile ? "300px" : "700px",
//         cursor: isMobile ? "pointer" : "default",
//       }}
//     >
//       {/* Progress Bars */}
//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           left: 10,
//           right: 10,
//           display: "flex",
//           gap: 4,
//           zIndex: 10,
//         }}
//       >
//         {images.map((_, i) => (
//           <div
//             key={i}
//             style={{
//               flex: 1,
//               height: 3,
//               background:
//                 i < current ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
//               borderRadius: 5,
//               overflow: "hidden",
//               position: "relative",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 height: "100%",
//                 width:
//                   i === current ? `${progress}%` : i < current ? "100%" : "0%",
//                 background: "white",
//                 transition:
//                   i === current
//                     ? "width 0.15s linear"
//                     : manual
//                     ? "none"
//                     : "width 0.1s linear",
//               }}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Crossfade Images */}
//       <div
//         style={{
//           position: "relative",
//           width: isMobile ? "100%" : "70%",
//           height: "100%",
//           borderRadius: 10,
//           overflow: "hidden",
//         }}
//       >
//         {images.map((src, i) => (
//           <img
//             key={i}
//             src={src}
//             alt=""
//             style={{
//               position: "absolute",
//               inset: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: 10,
//               opacity: i === current ? 1 : 0,
//               transition: `opacity ${FADE_DURATION}ms ease-in-out`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageTabs;



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

  // 🚀 start progress animation
  const startProgress = () => {
    cancelAnimationFrame(rafRef.current);
    startTimeRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startTimeRef.current;
      const percent = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        goToImage((current + 1) % images.length, false);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  // 🚀 change image immediately (manual or auto)
  const goToImage = (targetIndex, isManual = true) => {
    cancelAnimationFrame(rafRef.current);
    setFading(true);
    setManual(isManual);

    // reset progress immediately on manual tap
    if (isManual) setProgress(0);

    setTimeout(() => {
      setCurrent(targetIndex);
      setFading(false);
      setManual(false);
      setProgress(0);
      startProgress(); // start fresh progress for next
    }, FADE_DURATION);
  };

  useEffect(() => {
    startProgress();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line
  }, [current]);

  // 👆 handle mobile side tap
  const handleMobileClick = (e) => {
    if (!isMobile) return;
    const { clientX, currentTarget } = e;
    const middle = currentTarget.offsetWidth / 2;
    const targetIndex =
      clientX < middle
        ? (current - 1 + images.length) % images.length
        : (current + 1) % images.length;

    goToImage(targetIndex, true);
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




// import React, { useEffect, useState, useRef } from "react";

// const useIsMobile = (MOBILE_BREAKPOINT = 768) => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const mq = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`);
//     const update = () => setIsMobile(mq.matches);
//     update();
//     mq.addEventListener("change", update);
//     return () => mq.removeEventListener("change", update);
//   }, [MOBILE_BREAKPOINT]);
//   return isMobile;
// };

// const ImageTabs = () => {
//   const images = [
//     "https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?cs=srgb&dl=pexels-abbykihano-431722.jpg&fm=jpg",
//     "https://festivalpro.com/articles/1568.png",
//     "https://www.rishabhsoft.com/wp-content/uploads/2010/11/Festivals-Celebrations-Then-and-Now.jpg",
//     "https://s1.it.atcdn.net/wp-content/uploads/2020/01/Hero-Holi-Festival-India.jpg",
//     "https://media.assettype.com/thequint%2F2022-03%2F2170dfa9-9e52-47f8-9a61-6b9acc70bd52%2FiStock_522121310.jpg?auto=format%2Ccompress&fmt=webp&width=720",
//   ];

//   const interval = 4000; // ms per slide
//   const fadeDuration = 600; // ms fade duration
//   const [current, setCurrent] = useState(0);
//   const [next, setNext] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const [fading, setFading] = useState(false);
//   const isMobile = useIsMobile();
//   const timerRef = useRef();
//   const progressRef = useRef();

//   // clear all intervals
//   const clearAll = () => {
//     clearInterval(timerRef.current);
//     clearInterval(progressRef.current);
//   };

//   const startCycle = () => {
//     let elapsed = 0;
//     progressRef.current = setInterval(() => {
//       elapsed += 50;
//       setProgress(Math.min((elapsed / interval) * 100, 100));
//     }, 50);

//     timerRef.current = setTimeout(() => {
//       setFading(true);
//       setTimeout(() => {
//         setCurrent((prev) => (prev + 1) % images.length);
//         setNext((prev) => (prev + 1) % images.length);
//         setProgress(0);
//         setFading(false);
//         clearAll();
//         startCycle(); // restart
//       }, fadeDuration);
//     }, interval);
//   };

//   useEffect(() => {
//     startCycle();
//     return clearAll;
//     // eslint-disable-next-line
//   }, []);

//   const handleMobileClick = (e) => {
//     if (!isMobile) return;
//     const { clientX, currentTarget } = e;
//     const middle = currentTarget.offsetWidth / 2;
//     const nextIndex =
//       clientX < middle
//         ? (current - 1 + images.length) % images.length
//         : (current + 1) % images.length;

//     clearAll();
//     setFading(true);
//     setTimeout(() => {
//       setCurrent(nextIndex);
//       setNext((nextIndex + 1) % images.length);
//       setProgress(0);
//       setFading(false);
//       startCycle();
//     }, fadeDuration);
//   };

//   return (
//     <div
//       onClick={handleMobileClick}
//       style={{
//         position: "relative",
//         width: "100%",
//         overflow: "hidden",
//         backgroundColor: isMobile ? "transparent" : "black",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: isMobile ? "300px" : "700px",
//         cursor: isMobile ? "pointer" : "default",
//       }}
//     >
//       {/* Progress Bars */}
//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           left: 10,
//           right: 10,
//           display: "flex",
//           gap: 4,
//           zIndex: 10,
//         }}
//       >
//         {images.map((_, i) => (
//           <div
//             key={i}
//             style={{
//               flex: 1,
//               height: 3,
//               background:
//                 i < current ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
//               borderRadius: 5,
//               overflow: "hidden",
//               position: "relative",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 height: "100%",
//                 width:
//                   i === current ? `${progress}%` : i < current ? "100%" : "0%",
//                 background: "white",
//                 transition:
//                   i === current ? "width 0.1s linear" : "none",
//               }}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Cross-fade image layer */}
//       <div
//         style={{
//           position: "relative",
//           width: isMobile ? "100%" : "70%",
//           height: "100%",
//           borderRadius: 10,
//           overflow: "hidden",
//         }}
//       >
//         <img
//           key={current}
//           src={images[current]}
//           alt=""
//           style={{
//             position: "absolute",
//             inset: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             borderRadius: 10,
//             opacity: fading ? 0 : 1,
//             transition: `opacity ${fadeDuration}ms ease-in-out`,
//           }}
//         />
//         <img
//           key={next}
//           src={images[next]}
//           alt=""
//           style={{
//             position: "absolute",
//             inset: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             borderRadius: 10,
//             opacity: fading ? 1 : 0,
//             transition: `opacity ${fadeDuration}ms ease-in-out`,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageTabs;






// import React, { useEffect, useState } from "react";


// const useIsMobile = (MOBILE_BREAKPOINT = 768) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

//     const handleChange = (event) => setIsMobile(event.matches);
//     setIsMobile(mediaQuery.matches);
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [MOBILE_BREAKPOINT]);

//   return isMobile;
// };

// const ImageTabs = () => {
//   const images = [
//     "https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?cs=srgb&dl=pexels-abbykihano-431722.jpg&fm=jpg",
//     "https://festivalpro.com/articles/1568.png",
//     "https://www.rishabhsoft.com/wp-content/uploads/2010/11/Festivals-Celebrations-Then-and-Now.jpg",
//     "https://s1.it.atcdn.net/wp-content/uploads/2020/01/Hero-Holi-Festival-India.jpg",
//     "https://media.assettype.com/thequint%2F2022-03%2F2170dfa9-9e52-47f8-9a61-6b9acc70bd52%2FiStock_522121310.jpg?auto=format%2Ccompress&fmt=webp&width=720",
//   ];

//   const interval = 5000; 
//   const [current, setCurrent] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const isMobile = useIsMobile();

  
//   useEffect(() => {
//     setProgress(0);
//     const start = Date.now();

//     const progressInterval = setInterval(() => {
//       const elapsed = Date.now() - start;
//       const percent = Math.min((elapsed / interval) * 100, 100);
//       setProgress(percent);

//       if (elapsed >= interval) {
//         setCurrent((prev) => (prev + 1) % images.length);
//       }
//     }, 50);

//     return () => clearInterval(progressInterval);
//   }, [current, images.length, interval]);

//   // Handle left/right screen click on mobile
//   const handleMobileClick = (e) => {
//     if (!isMobile) return;
//     const { clientX, currentTarget } = e;
//     const middle = currentTarget.offsetWidth / 2;

//     if (clientX < middle) {
//       // Tap left → previous image
//       setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     } else {
//       // Tap right → next image
//       setCurrent((prev) => (prev + 1) % images.length);
//     }
//   };

//   return (
//     <div
//       onClick={handleMobileClick}
//       style={{
//         position: "relative",
//         width: "100%",
//         overflow: "hidden",
//         backgroundColor: isMobile ? "transparent" : "black",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: isMobile ? "300px" : "700px",
//         cursor: isMobile ? "pointer" : "default",
//       }}
//     >
//       {/*  Progress Bars */}
//       <div
//         style={{
//           position: "absolute",
//           top: "10px",
//           left: "10px",
//           right: "10px",
//           display: "flex",
//           gap: "4px",
//           zIndex: 10,
//         }}
//       >
//         {images.map((_, index) => (
//           <div
//             key={index}
//             style={{
//               flex: 1,
//               height: "3px",
//               background:
//                 index < current
//                   ? "rgba(255,255,255,1)"
//                   : "rgba(255,255,255,0.3)",
//               borderRadius: "5px",
//               overflow: "hidden",
//               position: "relative",
//             }}
//           >
//             {index === current && (
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   height: "100%",
//                   width: `${progress}%`,
//                   background: "white",
//                   transition: "width 0.05s linear",
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/*  Image */}
//       <img
//         src={images[current]}
//         alt="status"
//         style={{
//           width: isMobile ? "100%" : "70%",
//           height: "100%",
//           objectFit: "cover",
//           borderRadius: "10px",
//           transition: "opacity 0.5s ease-in-out",
//           display: "block",
//         }}
//       />
//     </div>
//   );
// };

// export default ImageTabs;
