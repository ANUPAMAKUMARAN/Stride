

// import React, { useEffect, useState } from "react";

// const carouselData = [
//   { title: "UK NHS Trust Nurses Recruitment Agency Conducting Free Nurses Recruitment in Kerala" },
//   { title: "All You Need to Know About WES Verification and Evaluation in 2024" },
//   { title: "Germany Skilled Workers Program – Apply for 2025 Now" },
//   { title: "Canada Express Entry Update – ECA, IELTS & PNP Guide 2025" },
//   { title: "UK NHS Trust Nurses Recruitment Agency Conducting Free Nurses Recruitment in Kerala" },
//   { title: "All You Need to Know About WES Verification and Evaluation in 2024" },
//   { title: "Germany Skilled Workers Program – Apply for 2025 Now" },
// ];

// const useScale = (baseWidth = 1325) => {
//   const [scale, setScale] = useState(1);
//   useEffect(() => {
//     const updateScale = () => {
//       const w = window.innerWidth;
//       const ratio = w / baseWidth;
//       setScale(ratio > 1 ? 1 : ratio);
//     };
//     updateScale();
//     window.addEventListener("resize", updateScale);
//     return () => window.removeEventListener("resize", updateScale);
//   }, [baseWidth]);
//   return scale;
// };

// const Arrow = ({ direction = "left", color = "black", size = 36, onClick }) => (
//   <div
//     onClick={onClick}
//     style={{
//       width: `${size}px`,
//       height: `${size}px`,
//       borderRadius: "50%",
//       backgroundColor: color,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//       flexShrink: 0,
//     }}
//   >
//     <span
//       style={{
//         color: direction === "left" ? "white" : "black",
//         fontSize: `${size * 0.6}px`,
//         lineHeight: 1,
//       }}
//     >
//       {direction === "left" ? "←" : "→"}
//     </span>
//   </div>
// );

// const ScalingCarousel = () => {
//   const scale = useScale();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prev = () =>
//     setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
//   const next = () => setCurrentIndex((prev) => (prev + 1) % carouselData.length);

//   const visibleItems = [
//     carouselData[currentIndex],
//     carouselData[(currentIndex + 1) % carouselData.length],
//   ];

//   const bgColors = ["#e3f7ff", "#00b9f1"];
//   const arrowColors = ["#009ddc", "white"];
//   const textColors = ["#1a1a1a", "white"];
//   const fontWeights = [500, 600];

//   return (
//     <div
//       style={{
//         width: "100%",
//         display: "flex",
//         flexDirection: "row",
//         minHeight: `${100 * scale}px`,
//       }}
//     >
//       {visibleItems.map((item, idx) => (
//         <div
//           key={idx}
//           style={{
//             flex: 1,
//             background: bgColors[idx % 2],
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: `${20 * scale}px`,
//             boxSizing: "border-box",
//             gap: `${10 * scale}px`,
//             flexDirection: idx === 0 ? "row" : "row-reverse",
//           }}
//         >
//           <Arrow
//             direction={idx === 0 ? "left" : "right"}
//             color={arrowColors[idx]}
//             size={36 * scale}
//             onClick={idx === 0 ? prev : next}
//           />
//           <p
//             style={{
//               fontSize: `${18 * scale}px`,
//               fontWeight: fontWeights[idx],
//               color: textColors[idx],
//               margin: 0,
//               lineHeight: 1.4,
//               textAlign: idx === 0 ? "left" : "right",
//               width: "100%",
//               maxWidth: `${380 * scale}px`,
//               overflow: "hidden",
//               display: "-webkit-box",
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: "vertical",
//             }}
//           >
//             {item.title}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ScalingCarousel;

import React, { useEffect, useState } from "react";

const carouselData = [
  { title: "UK NHS Trust Nurses Recruitment Agency Conducting Free Nurses Recruitment in Kerala" },
  { title: "All You Need to Know About WES Verification and Evaluation in 2024" },
  { title: "Germany Skilled Workers Program – Apply for 2025 Now" },
  { title: "Canada Express Entry Update – ECA, IELTS & PNP Guide 2025" },
  { title: "UK NHS Trust Nurses Recruitment Agency Conducting Free Nurses Recruitment in Kerala" },
  { title: "All You Need to Know About WES Verification and Evaluation in 2024" },
  { title: "Germany Skilled Workers Program – Apply for 2025 Now" },
];

const useScale = (baseWidth = 1325) => {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      const ratio = w / baseWidth;
      setScale(ratio > 1 ? 1 : ratio);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [baseWidth]);
  return scale;
};

const Arrow = ({ direction = "left", color = "black", size = 36, onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        color: direction ===  "black",
        fontSize: `${size * 0.6}px`,
        lineHeight: 1,
      }}
    >
      {direction === "left" ? "←" : "→"}
    </span>
  </div>
);

const ScalingCarousel = () => {
  const scale = useScale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlueFirst, setIsBlueFirst] = useState(true); // new toggle state

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    setIsBlueFirst((prev) => !prev); // toggle background
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    setIsBlueFirst((prev) => !prev); // toggle background
  };

  const visibleItems = [
    carouselData[currentIndex],
    carouselData[(currentIndex + 1) % carouselData.length],
  ];

  // Colors depending on toggle
  const bgColors = isBlueFirst ? ["#00b9f1", "#e3f7ff"] : ["#e3f7ff", "#00b9f1"];
  const arrowColors = isBlueFirst ? ["white", "#009ddc"] : ["#009ddc", "white"];
  const textColors = isBlueFirst ? ["white", "#1a1a1a"] : ["#1a1a1a", "white"];
  const fontWeights = [600, 500];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        minHeight: `${100 * scale}px`,
      }}
    >
      {visibleItems.map((item, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            background: bgColors[idx],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: `${20 * scale}px`,
            boxSizing: "border-box",
            gap: `${10 * scale}px`,
            flexDirection: idx === 0 ? "row" : "row-reverse",
          }}
        >
          <Arrow
            direction={idx === 0 ? "left" : "right"}
            color={arrowColors[idx]}
            size={36 * scale}
            onClick={idx === 0 ? prev : next}
          />
          <p
            style={{
              fontSize: `${18 * scale}px`,
              fontWeight: fontWeights[idx],
              color: textColors[idx],
              margin: 0,
              lineHeight: 1.4,
              textAlign: idx === 0 ? "left" : "right",
              width: "100%",
              maxWidth: `${380 * scale}px`,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScalingCarousel;
