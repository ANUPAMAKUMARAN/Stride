
import React, { useEffect, useState } from "react";


const useIsMobile = (MOBILE_BREAKPOINT = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleChange = (event) => setIsMobile(event.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
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

  const interval = 5000; 
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  
  useEffect(() => {
    setProgress(0);
    const start = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / interval) * 100, 100);
      setProgress(percent);

      if (elapsed >= interval) {
        setCurrent((prev) => (prev + 1) % images.length);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [current, images.length, interval]);

  // Handle left/right screen click on mobile
  const handleMobileClick = (e) => {
    if (!isMobile) return;
    const { clientX, currentTarget } = e;
    const middle = currentTarget.offsetWidth / 2;

    if (clientX < middle) {
      // Tap left → previous image
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      // Tap right → next image
      setCurrent((prev) => (prev + 1) % images.length);
    }
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
      {/*  Progress Bars */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          right: "10px",
          display: "flex",
          gap: "4px",
          zIndex: 10,
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              height: "3px",
              background:
                index < current
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.3)",
              borderRadius: "5px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {index === current && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${progress}%`,
                  background: "white",
                  transition: "width 0.05s linear",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/*  Image */}
      <img
        src={images[current]}
        alt="status"
        style={{
          width: isMobile ? "100%" : "70%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          transition: "opacity 0.5s ease-in-out",
          display: "block",
        }}
      />
    </div>
  );
};

export default ImageTabs;











// import React, { useEffect, useState } from "react";

// // Custom hook to detect if user is on a mobile device
// const useIsMobile = (MOBILE_BREAKPOINT = 768) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

//     const handleChange = (event) => {
//       setIsMobile(event.matches);
//     };

//     // Set initial state
//     setIsMobile(mediaQuery.matches);

//     // Listen for changes
//     mediaQuery.addEventListener("change", handleChange);
//     return () => {
//       mediaQuery.removeEventListener("change", handleChange);
//     };
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

//   const interval = 5000; // 5 seconds per image
//   const [current, setCurrent] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const isMobile = useIsMobile(); // detect screen size

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

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         overflow: "hidden",
//         backgroundColor: isMobile ? "transparent" : "black", // remove black on mobile
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: isMobile ? "300px" : "700px", // dynamic height
//       }}
//     >
//       {/* Progress Bars */}
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

//       {/* Image */}
//       <img
//         src={images[current]}
//         alt="status"
//         style={{
//           width: isMobile ? "100%" : "70%", // makes image fill horizontally on mobile
//           height: "100%",
//           objectFit: "cover", // ensures no gaps
//           borderRadius: "10px",
//           transition: "opacity 0.5s ease-in-out",
//           display: "block",
//         }}
//       />
//     </div>
//   );
// };

// export default ImageTabs;
