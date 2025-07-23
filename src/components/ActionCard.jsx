


import React, { useEffect, useState } from 'react';

const useScale = (baseWidth = 900) => {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      const newScale = Math.min(1, window.innerWidth / baseWidth);
      setScale(newScale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [baseWidth]);
  return scale;
};

const ActionCard = ({ emoji, title, subtitle, buttonText, bgColor, textColor, buttonColor }) => (
  <div
    className={`rounded-2xl shadow-md p-6 ${bgColor} text-${textColor} flex flex-col justify-between`}
    style={{
      width: '425px',
      height: '200px',
    }}
  >
    <div>
      <h3 className="text-2xl font-semibold flex items-center gap-2 mb-2">
        <span className="text-3xl">{emoji}</span> {title}
      </h3>
      <p className="text-base leading-tight">{subtitle}</p>
    </div>
    <div className="flex justify-end mt-4">
      <button
        className={`text-white rounded-md shadow-md font-medium text-sm ${buttonColor}`}
        style={{
          width: '145px',
          height: '38px',
        }}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

const ActionGrid = () => {
  const scale = useScale(900);

  return (
    <div className="w-full bg-gradient-to-b from-[#f4fff4] to-[#effef1] py-12 flex flex-col items-center">
      <div
        className="text-center mb-10"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: 900,
        }}
      >
        <h1 className="text-4xl font-bold mb-2 text-black">Your Voice, A Cleaner Kerala</h1>
        <p className="text-xl italic font-semibold text-black">
          Report, Resolve, and Get Rewarded
        </p>
      </div>

      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: 900,
        }}
      >
        <div className="flex flex-wrap justify-center gap-6">
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
    </div>
  );
};

export default ActionGrid;












// import React, { useEffect, useState } from 'react';

// const useScale = (baseWidth = 900) => {
//   const [scale, setScale] = useState(1);
//   useEffect(() => {
//     const updateScale = () => {
//       const newScale = Math.min(1, window.innerWidth / baseWidth);
//       setScale(newScale);
//     };
//     updateScale();
//     window.addEventListener('resize', updateScale);
//     return () => window.removeEventListener('resize', updateScale);
//   }, [baseWidth]);
//   return scale;
// };

// const ActionCard = ({ emoji, title, subtitle, buttonText, bgColor, textColor, buttonColor }) => (
//   <div
//     className={`rounded-2xl shadow-md p-6 ${bgColor} text-${textColor} flex flex-col justify-between`}
//     style={{
//       width: '425px',
//       height: '200px',
//     }}
//   >
//     <div>
//       <h3 className="text-2xl font-semibold flex items-center gap-2 mb-2">
//         <span className="text-3xl">{emoji}</span> {title}
//       </h3>
//       <p className="text-base leading-tight">{subtitle}</p>
//     </div>
//     <div className="flex justify-end mt-4">
//       <button
//         className={`text-white rounded-md shadow-md font-medium text-sm ${buttonColor}`}
//         style={{
//           width: '145px',
//           height: '38px',
//         }}
//       >
//         {buttonText}
//       </button>
//     </div>
//   </div>
// );

// const ActionGrid = () => {
//   const scale = useScale(900);

//   return (
//     <div className="w-full bg-gradient-to-b from-[#f4fff4] to-[#effef1] py-12 flex flex-col items-center">
//       <div
//   className="text-center"
//   style={{
//     marginBottom: `clamp(12px, ${32 * scale}px, 60px)` // dynamic vertical space
//   }}
// >
//   <div
//     style={{
//       transform: `scale(${scale})`,
//       transformOrigin: 'top center',
//       width: '900px',
//       margin: '0 auto',
//     }}
//   >
//     <h1 className="text-4xl font-bold mb-2 text-black">Your Voice, A Cleaner Kerala</h1>
//     <p className="text-xl italic font-semibold text-black">
//       Report, Resolve, and Get Rewarded
//     </p>
//   </div>
// </div>



//       <div
//         style={{
//           transform: `scale(${scale})`,
//           transformOrigin: 'top center',
//           width: 900,
//         }}
//       >
//         <div className="flex flex-wrap justify-center gap-6">
//           <ActionCard
//             emoji="📝"
//             title="Register a Complaint"
//             subtitle="Facing uncollected waste, blocked drains, or broken bins?"
//             buttonText="Register"
//             bgColor="bg-green-100"
//             textColor="green-800"
//             buttonColor="bg-green-600 hover:bg-green-700"
//           />
//           <ActionCard
//             emoji="🚫"
//             title="Illegal Dumping"
//             subtitle="Seen waste dumped in unauthorized areas?"
//             buttonText="Report Now"
//             bgColor="bg-orange-100"
//             textColor="orange-700"
//             buttonColor="bg-orange-500 hover:bg-orange-600"
//           />
//           <ActionCard
//             emoji="🎁"
//             title="Get Rewarded"
//             subtitle="Earn rewards for verified reports."
//             buttonText="Learn How"
//             bgColor="bg-blue-100"
//             textColor="blue-800"
//             buttonColor="bg-blue-600 hover:bg-blue-700"
//           />
//           <ActionCard
//             emoji="🌱"
//             title="Community Programs"
//             subtitle="Join clean-up drives, green clubs, and waste awareness campaigns across Kerala."
//             buttonText="Explore Programs"
//             bgColor="bg-green-50"
//             textColor="green-800"
//             buttonColor="bg-green-400 hover:bg-green-500"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionGrid;
































