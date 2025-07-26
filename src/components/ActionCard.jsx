
import React from "react";

const ActionCard = ({ emoji, title, subtitle, buttonText, bgColor, textColor, buttonColor }) => (
    <div
        className={`rounded-2xl shadow-md p-6 ${bgColor} text-${textColor} flex flex-col justify-between`}
        style={{
            width: "clamp(160px, 42vw, 425px)",
            height: "clamp(160px, 20vw, 200px)",
        }}
    >
        <div style={{ flexGrow: 1 }}>
            {/* Title - Single line but dynamically scaled */}
            <h3
                className="font-semibold flex items-center gap-2 mb-2"
                style={{
                    fontSize: "clamp(0.9rem, 2.1vw, 1.4rem)",
                    whiteSpace: "nowrap",  // force one line
                    overflow: "visible",   // no text cutting
                }}
            >
                <span style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}>{emoji}</span>
                {title}
            </h3>

            {/* Subtitle - Always 2 lines visible */}
            <p
                style={{
                    fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                    lineHeight: 1.3,
                    maxHeight: "calc(1.3em * 2)", // exactly two lines
                    overflow: "hidden", // prevent extra line overflow
                }}
            >
                {subtitle}
            </p>
        </div>

        {/* Button - Fixed size and position */}
        <div className="flex justify-end mt-4">
            <button
                className={`text-white rounded-md shadow-md font-medium ${buttonColor}`}
                style={{
                    //   width: "140px",
                    //   height: "38px",
                    padding: "clamp(4px, 0.5vw, 8px) clamp(10px, 1vw, 16px)",
                    fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
                    flexShrink: 0,
                }}
            >
                {buttonText}
            </button>
        </div>
    </div>
);

const ActionGrid = () => {
    return (
        <div className="w-full bg-gradient-to-b from-[#f4fff4] to-[#effef1] py-12 flex flex-col items-center">
            <div className="text-center mb-10" style={{ maxWidth: "90%" }}>
                <h1 className="text-4xl font-bold mb-2 text-black">
                    Your Voice, A Cleaner Kerala
                </h1>
                <p className="text-xl italic font-semibold text-black">
                    Report, Resolve, and Get Rewarded
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)", // keep fixed 2x2
                    gap: "clamp(12px, 3vw, 24px)",
                    maxWidth: "900px",
                    width: "100%",
                    padding: "0 16px",
                }}
            >
                <ActionCard
                    emoji="📝"
                    title="Register a Complaint"
                    subtitle="Facing uncollected waste, blocked drains, or broken bins?"
                    buttonText="Register"
                    bgColor="bg-green-100"
                    textColor="green-800"
                    buttonColor="bg-green-600 hover:bg-green-700"
                />
                <ActionCard
                    emoji="🚫"
                    title="Illegal Dumping"
                    subtitle="Seen waste dumped in unauthorized areas?"
                    buttonText="Report Now"
                    bgColor="bg-orange-100"
                    textColor="orange-700"
                    buttonColor="bg-orange-500 hover:bg-orange-600"
                />
                <ActionCard
                    emoji="🎁"
                    title="Get Rewarded"
                    subtitle="Earn rewards for verified reports."
                    buttonText="Learn How"
                    bgColor="bg-blue-100"
                    textColor="blue-800"
                    buttonColor="bg-blue-600 hover:bg-blue-700"
                />
                <ActionCard
                    emoji="🌱"
                    title="Community Programs"
                    subtitle="Join clean-up drives, green clubs, and waste awareness campaigns across Kerala."
                    buttonText="Explore Programs"
                    bgColor="bg-green-50"
                    textColor="green-800"
                    buttonColor="bg-green-400 hover:bg-green-500"
                />
            </div>
        </div>
    );
};

export default ActionGrid;

// import React, { useState, useEffect, useRef } from "react";

// const ActionCard = ({ emoji, title, subtitle, buttonText, bgColor, textColor, buttonColor, cardWidth, cardHeight, fontScale }) => (
//     <div
//         className={`rounded-2xl shadow-md p-6 ${bgColor} text-${textColor} flex flex-col justify-between`}
//         style={{
//             width: cardWidth,
//             height: cardHeight,
//         }}
//     >
//         <div style={{ flexGrow: 1 }}>
//             {/* Title */}
//             <h3
//                 className="font-semibold flex items-center gap-2 mb-2"
//                 style={{
//                     fontSize: `${1.4 * fontScale}rem`,
//                     whiteSpace: "nowrap",
//                     overflow: "visible",
//                 }}
//             >
//                 <span style={{ fontSize: `${2 * fontScale}rem` }}>{emoji}</span>
//                 {title}
//             </h3>

//             {/* Subtitle */}
//             <p
//                 style={{
//                     fontSize: `${1 * fontScale}rem`,
//                     lineHeight: 1.3,
//                     maxHeight: `calc(1.3em * 2)`,
//                     overflow: "hidden",
//                 }}
//             >
//                 {subtitle}
//             </p>
//         </div>

//         {/* Button */}
//         <div className="flex justify-end mt-4">
//             <button
//                 className={`text-white rounded-md shadow-md font-medium ${buttonColor}`}
//                 style={{
//                     padding: `${0.5 * fontScale}rem ${1 * fontScale}rem`,
//                     fontSize: `${0.9 * fontScale}rem`,
//                     flexShrink: 0,
//                 }}
//             >
//                 {buttonText}
//             </button>
//         </div>
//     </div>
// );

// const ActionGrid = () => {
//     const scrollRef = useRef();
//     const presetCardWidth = 425;
//     const presetCardHeight = 200;
//     const minCardsToShow = 2;
//     const cardGap = 24;

//     const [dimensions, setDimensions] = useState({
//         cardWidth: presetCardWidth,
//         cardHeight: presetCardHeight,
//         fontScale: 1,
//     });

//     useEffect(() => {
//         const updateDimensions = () => {
//             const containerWidth = scrollRef.current?.offsetWidth || 0;
//             const baseRequiredWidth = presetCardWidth * minCardsToShow + (minCardsToShow - 1) * cardGap;

//             if (containerWidth < baseRequiredWidth) {
//                 const roughWidth = containerWidth / minCardsToShow;
//                 const fontScale = roughWidth / presetCardWidth;
//                 const scaledGap = cardGap * fontScale;
//                 const adjustedWidth = (containerWidth - scaledGap * (minCardsToShow - 1)) / minCardsToShow;

//                 setDimensions({
//                     cardWidth: adjustedWidth,
//                     cardHeight: (adjustedWidth * presetCardHeight) / presetCardWidth,
//                     fontScale,
//                 });
//             } else {
//                 setDimensions({
//                     cardWidth: presetCardWidth,
//                     cardHeight: presetCardHeight,
//                     fontScale: 1,
//                 });
//             }
//         };

//         updateDimensions();
//         window.addEventListener("resize", updateDimensions);
//         return () => window.removeEventListener("resize", updateDimensions);
//     }, []);

//     return (
//         <div ref={scrollRef} className="w-full bg-gradient-to-b from-[#f4fff4] to-[#effef1] py-12 flex flex-col items-center">
//             <div className="text-center mb-10" style={{ maxWidth: "90%" }}>
//                 <h1 className="text-4xl font-bold mb-2 text-black">Your Voice, A Cleaner Kerala</h1>
//                 <p className="text-xl italic font-semibold text-black">Report, Resolve, and Get Rewarded</p>
//             </div>

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(2, 1fr)",
//                     gap: `${cardGap}px`,
//                     maxWidth: "900px",
//                     width: "100%",
//                     padding: "0 16px",
//                 }}
//             >
//                 <ActionCard emoji="📝" title="Register a Complaint" subtitle="Facing uncollected waste, blocked drains, or broken bins?" buttonText="Register" bgColor="bg-green-100" textColor="green-800" buttonColor="bg-green-600 hover:bg-green-700" {...dimensions} />
//                 <ActionCard emoji="🚫" title="Illegal Dumping" subtitle="Seen waste dumped in unauthorized areas?" buttonText="Report Now" bgColor="bg-orange-100" textColor="orange-700" buttonColor="bg-orange-500 hover:bg-orange-600" {...dimensions} />
//                 <ActionCard emoji="🎁" title="Get Rewarded" subtitle="Earn rewards for verified reports." buttonText="Learn How" bgColor="bg-blue-100" textColor="blue-800" buttonColor="bg-blue-600 hover:bg-blue-700" {...dimensions} />
//                 <ActionCard emoji="🌱" title="Community Programs" subtitle="Join clean-up drives, green clubs, and waste awareness campaigns across Kerala." buttonText="Explore Programs" bgColor="bg-green-50" textColor="green-800" buttonColor="bg-green-400 hover:bg-green-500" {...dimensions} />
//             </div>
//         </div>
//     );
// };

// export default ActionGrid;
