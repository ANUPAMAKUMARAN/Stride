
// import React, { useState } from "react";
// import { FaShieldAlt, FaGlobe, FaLock, FaStar } from "react-icons/fa";
// import img1 from "../assets/pic.png";

// const benefits = [

//   {
//     icon: <FaGlobe size={30} />,
//     title: "End-to-end service (MOFA, translation, apostille, courier)",
//     description:
//       "We handle everything including MOFA attestation, courier and certified translations.",
//     link: "https://example.com/end-to-end",
//   },
//   {
//     icon: <FaShieldAlt size={30} />,
//     title: "Direct approach with Saudi police",
//     description:
//       "We work directly with Saudi authorities to speed up the process securely.",
//     link: "https://example.com/saudi-police",
//   },
//   {
//     icon: <FaLock size={30} />,
//     title: "Faster, Simple more Secure",
//     description: "We deliver a highly secure and reliable service process.",
//     link: "https://example.com/secure-process",
//   },
//   {
//     icon: <FaStar size={30} />,
//     title: "Trusted by professionals, nurses & job seekers worldwide",
//     description: "Trusted across 50+ countries.",
//     link: "https://example.com/trust",
//   },
// ];

// const WhyChooseUs = () => {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   const renderIconCard = (item, index, whiteText = false, hideTitle = false) => (
//     <a
//       key={index}
//       href={item.link}
//       onMouseEnter={() => setHoveredIndex(index)}
//       onMouseLeave={() => setHoveredIndex(null)}
//       onTouchStart={() => setHoveredIndex(index)}
//       onTouchEnd={() => setHoveredIndex(null)}
//       className="relative flex flex-col items-center text-center group transition-all gap-2"
//     >
//       <div
//         className="relative flex flex-col items-center text-center gap-2"
//         style={{
//           fontSize: "clamp(12.8px, 1vw, 16px)", 
//           lineHeight: "22.4px",                 
//           maxWidth: "180px"
//         }}
//       >
//         <div className="relative flex items-center justify-center w-12 h-12 mb-1">
//           <span
//             className="absolute w-10 h-10 rounded-full animate-ping bg-indigo-900 opacity-70"
//             style={{ animation: "ping 2.5s cubic-bezier(0, 0, 0.9, 1) infinite" }}
//           />
//           <div
//             className="relative z-10 text-indigo-900"
//             style={{ fontSize: "clamp(32px, 2.5vw, 48px)" }} 
//           >
//             {item.icon}
//           </div>
//         </div>
//       </div>
//       {!hideTitle && (
//         <p
//           className={`text-xs sm:text-sm font-medium ${whiteText ? "text-white" : "text-gray-800"
//             } max-w-[160px] sm:max-w-[200px]`}
//         >
//           {item.title}
//         </p>
//       )}
//      {hoveredIndex === index && (
//         <div
//           className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 shadow-md p-3 rounded-lg z-50 transition-all duration-300 ease-in-out
//       bg-white text-gray-800
//       flex flex-col items-center text-center`}
//         >
//           <div className="flex items-center justify-center mb-2 h-8">
//             <div className="text-indigo-900 text-xl">{item.icon}</div>
//           </div>
//           <p className="text-xs leading-tight">{item.description}</p>
//         </div>
//       )}

//     </a>
//   );

//   return (
//     <section className="bg-[#f8faff] flex items-center justify-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[90vh]">
//       <div className="w-full relative">

//         {/* Heading over image (only for lg+) */}
//         <div className="hidden lg:block absolute top-10 left-1/2 transform -translate-x-1/2 z-20 text-center">
//           <p className="text-sm text-blue-500 uppercase mb-2 tracking-wide">
//             Choose us for Saudi PCC service?
//           </p>
//           <h2 className="text-3xl font-semibold text-gray-900">
//             We are Experienced <br />
//             <span className="text-indigo-900">
//               Saudi PCC Online Service Provider
//             </span>
//           </h2>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden lg:flex flex-row items-center justify-center gap-0 pt-18">
//           {/* Left Column */}
//           <div className="flex flex-col gap-y-20  mt-24 items-center w-1/7">
//             {benefits.slice(0, 2).map((item, index) =>
//               renderIconCard(item, index)
//             )}
//           </div>

//           {/* Center Image */}
//           <div className="w-full max-w-[380px] xl:max-w-[480px] relative flex justify-center">
//             <img
//               src={img1}
//               alt="Group of Professionals"
//               className="w-full h-auto max-h-[500px] object-contain"
//             />
//           </div>

//           {/* Right Column */}
//           <div className="flex flex-col gap-y-20 mt-24 items-center w-1/7">
//             {benefits.slice(2, 4).map((item, index) =>
//               renderIconCard(item, index + 2)
//             )}
//           </div>
//         </div>


//         {/* Mobile & Tablet View */}
//         <div className="block lg:hidden relative w-full mb-6  rounded-xl">
//           <img
//             src={img1}
//             alt="Group of Professionals"
//             className="w-full h-[70vh] sm:h-[75vh] object-cover object-bottom"
//           />
//           {/* darkshade */}
//           <div
//             className="absolute inset-0 flex flex-col items-center justify-start px-4 pt-8 sm:pt-10 pb-4"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
//           >
//             <div className="text-center mb-14 sm:mb-22 md:mb-26 px-2">
//               <p className="text-xs text-blue-500 uppercase mt-10 mb-2 tracking-wide">
//                 Choose us for Saudi PCC service?
//               </p>
//               <h2 className="text-xl font-semibold leading-snug text-gray-900">
//                 We are Experienced <br />
//                 <span className="text-indigo-900 font-bold">
//                   Saudi PCC Online Service Provider
//                 </span>
//               </h2>
//             </div>

//             <div className="flex w-full gap-4 justify-center flex-nowrap">
//               <div className="flex flex-col gap-y-28 sm:gap-y-32 items-center w-1/2">
//                 {benefits
//                   .slice(0, 2)
//                   .map((item, index) =>
//                     renderIconCard(item, index, true, true)
//                   )}
//               </div>
//               <div className="flex flex-col gap-y-28 sm:gap-y-32 items-center w-1/2">
//                 {benefits
//                   .slice(2, 4)
//                   .map((item, index) =>
//                     renderIconCard(item, index + 2, true, true)
//                   )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;















