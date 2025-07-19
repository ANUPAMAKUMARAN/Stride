

import React, { useState } from "react";
import { FaShieldAlt, FaGlobe, FaLock, FaStar } from "react-icons/fa";
import img1 from '../assets/pic.png';

const benefits = [
  {
    icon: <FaShieldAlt size={20} />,
    title: "Direct approach with Saudi police",
    description: "We work directly with Saudi authorities to speed up the process securely.",
    link: "https://example.com/saudi-police"
  },
  {
    icon: <FaGlobe size={20} />,
    title: "End-to-end service (MOFA, translation, apostille, courier)",
    description: "We handle everything including MOFA attestation, courier and certified translations.",
    link: "https://example.com/end-to-end"
  },
  {
    icon: <FaLock size={20} />,
    title: "Faster, Simple more Secure",
    description: "We deliver a highly secure and reliable service process.",
    link: "https://example.com/secure-process"
  },
  {
    icon: <FaStar size={20} />,
    title: "Trusted by professionals, nurses & job seekers worldwide",
    description: "Trusted across 50+ countries.",
    link: "https://example.com/trust"
  },
];

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const renderIconCard = (item, index) => (
    <a
      key={index}
      href={item.link}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative flex flex-col items-center text-center group transition-all gap-2"
    >
      <div className="bg-indigo-900 text-white rounded-full p-4 mb-1">
        {item.icon}
      </div>
      <p className="text-xs sm:text-sm font-medium text-white sm:text-gray-800 max-w-[160px] sm:max-w-[200px]">
        {item.title}
      </p>
      {/* Tooltip for desktop & mobile (tap/hover) */}
      {hoveredIndex === index && (
        <div className="absolute mt-2 w-56 bg-white shadow-lg p-3 rounded-md text-sm text-gray-600 z-10 hidden sm:block">
          {item.description}
        </div>
      )}
    </a>
  );

  return (
    <section className="bg-[#f8faff] py-12 px-4 sm:px-6 lg:px-16 text-center">
      {/* Heading */}
      <p className="text-sm text-blue-500 uppercase mb-2 tracking-wide">
        Choose us for Saudi PCC service?
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
        We are Experienced <br />
        <span className="text-indigo-900">Saudi PCC Online Service Provider</span>
      </h2>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row items-center justify-center gap-10">
        {/* Left Column */}
        <div className="flex flex-col gap-10 items-center w-1/4">
          {benefits.slice(0, 2).map((item, index) => renderIconCard(item, index))}
        </div>

        {/* Center Image */}
        <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">
          <img
            src={img1}
            alt="Group of Professionals"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10 items-center w-1/4">
          {benefits.slice(2, 4).map((item, index) => renderIconCard(item, index + 2))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden w-full relative mt-6 px-0">
        <img
          src={img1}
          alt="Group of Professionals"
          className="w-full h-auto object-cover rounded-xl"
        />
        {/* Light overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />

        {/* Icons Overlaid */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {/* Left Side */}
          <div className="flex flex-col gap-6 items-center w-1/2 pt-4">
            {benefits.slice(0, 2).map((item, index) => renderIconCard(item, index))}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6 items-center w-1/2 pt-4">
            {benefits.slice(2, 4).map((item, index) => renderIconCard(item, index + 2))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
