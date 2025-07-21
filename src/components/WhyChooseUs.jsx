
import React, { useState } from "react";
import { FaShieldAlt, FaGlobe, FaLock, FaStar } from "react-icons/fa";
import img1 from "../assets/pic.png";

const benefits = [
  {
    icon: <FaShieldAlt size={20} />,
    title: "Direct approach with Saudi police",
    description:
      "We work directly with Saudi authorities to speed up the process securely.",
    link: "https://example.com/saudi-police",
  },

  {
    icon: <FaLock size={20} />,
    title: "Faster, Simple more Secure",
    description: "We deliver a highly secure and reliable service process.",
    link: "https://example.com/secure-process",
  },
  {
    icon: <FaGlobe size={20} />,
    title: "End-to-end service (MOFA, translation, apostille, courier)",
    description:
      "We handle everything including MOFA attestation, courier and certified translations.",
    link: "https://example.com/end-to-end",
  },
  {
    icon: <FaStar size={20} />,
    title: "Trusted by professionals, nurses & job seekers worldwide",
    description: "Trusted across 50+ countries.",
    link: "https://example.com/trust",
  },
];

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const renderIconCard = (item, index, whiteText = false, hideTitle = false) => (
    <a
      key={index}
      href={item.link}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onTouchStart={() => setHoveredIndex(index)} // for mobile
      onTouchEnd={() => setHoveredIndex(null)}    // for mobile
      className="relative flex flex-col items-center text-center group transition-all gap-2"
    >
      <div
        className={`rounded-full p-4 mb-1 ${whiteText ? "bg-white/20 text-white" : "bg-indigo-900 text-white"}`}
      >
        {item.icon}
      </div>

      {!hideTitle && (
        <p
          className={`text-xs sm:text-sm font-medium ${whiteText ? "text-white" : "text-gray-800"} max-w-[160px] sm:max-w-[200px]`}
        >
          {item.title}
        </p>
      )}

      {hoveredIndex === index && (
        <div className={`absolute top-[48px] sm:top-[50px] md:top-[52px] w-56 bg-white shadow-lg p-3 rounded-md text-sm z-10 transition-all duration-300 ease-in-out ${whiteText ? "text-white bg-white/10" : "text-gray-600"}`}>
          {item.description}
        </div>
      )}


    </a>
  );


  return (
    <section className="bg-[#f8faff] px-4 sm:px-6 lg:px-16 flex items-center justify-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[90vh]">
      <div className="w-full">
        {/* Desktop Heading */}
        <div className="text-center mb-8 hidden lg:block">
          <p className="text-sm text-blue-500 uppercase mb-2 tracking-wide">
            Choose us for Saudi PCC service?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            We are Experienced <br />
            <span className="text-indigo-900">
              Saudi PCC Online Service Provider
            </span>
          </h2>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex flex-row items-center justify-center gap-10">
          <div className="flex flex-col gap-y-20 xl:gap-y-24 items-center w-1/4">
            {benefits.slice(0, 2).map((item, index) =>
              renderIconCard(item, index)
            )}
          </div>

          <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">
            <img
              src={img1}
              alt="Group of Professionals"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex flex-col gap-y-20 xl:gap-y-24 items-center w-1/4">
            {benefits.slice(2, 4).map((item, index) =>
              renderIconCard(item, index + 2)
            )}
          </div>
        </div>

        {/* Mobile & Tablet View */}
        <div className="block lg:hidden relative w-full mt-6 rounded-xl overflow-hidden">
          <img
            src={img1}
            alt="Group of Professionals"
            className="w-full h-[70vh] sm:h-[75vh] object-cover"
          />

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black flex flex-col items-center justify-start px-4 pt-8 sm:pt-10 pb-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} // change desired opacity
          >



            {/* Mobile Heading */}
            <div className="text-center  mb-14 sm:mb-22 md:mb-26  px-2">
              <p className="text-xs text-blue-300 uppercase mb-2 tracking-wide">
                Choose us for Saudi PCC service?
              </p>
              <h2 className="text-xl font-semibold leading-snug text-white">
                We are Experienced <br />
                <span className="text-white font-bold">
                  Saudi PCC Online Service Provider
                </span>
              </h2>
            </div>

            <div className="flex w-full gap-4 justify-center flex-nowrap">
              <div className="flex flex-col gap-y-28 sm:gap-y-32 items-center w-1/2">
                {benefits
                  .slice(0, 2)
                  .map((item, index) =>
                    renderIconCard(item, index, true, true)
                  )}
              </div>
              <div className="flex flex-col gap-y-28 sm:gap-y-32 items-center w-1/2">
                {benefits
                  .slice(2, 4)
                  .map((item, index) =>
                    renderIconCard(item, index + 2, true, true)
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
