
import React, { useState } from "react";
import "../styles/WhyChooseUs.scss";
import { FaShieldAlt, FaGlobe, FaLock, FaStar } from "react-icons/fa";
import img1 from '../assets/pic.png'

const benefits = [
  {
    icon: <FaShieldAlt />,
    title: "Direct approach with Saudi police",
    description: "We work directly with Saudi authorities to speed up the process securely.",
    link: "https://example.com/saudi-police"
  },
  {
    icon: <FaGlobe />,
    title: "End-to-end service (MOFA, translation, apostille, courier)",
    description: "We handle everything including MOFA attestation, courier and certified translations.",
    link: "https://example.com/end-to-end"
  },
  {
    icon: <FaLock />,
    title: "Faster, Simple, more Secure",
    description: "We deliver a highly secure and reliable service process.",
    link: "https://example.com/secure-process"
  },
  {
    icon: <FaStar />,
    title: "Trusted by professionals worldwide",
    description: "Our services are trusted by nurses, engineers, job seekers across 50+ countries.",
    link: "https://example.com/trust"
  }
];

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="why-choose-us">

      <h2 className="title">
        <span>We are an Experienced</span>
        <span className="block-span">Saudi PCC Online Service Provider</span>
      </h2>


      <div className="content">
        {/* Left icons */}
        <div className="icon-column">
          {benefits.slice(0, 2).map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="icon-wrapper"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="icon-circle">{item.icon}</div>
              <p className="label">{item.title}</p>
              {hoveredIndex === index && (
                <div className="tooltip-card">{item.description}</div>
              )}
            </a>
          ))}
        </div>

        {/* Center image */}
        <div className="image-container">
          <img
            src={img1}
            alt="Group of Professionals"
            className="main-image"
          />
        </div>

        {/* Right icons */}
        <div className="icon-column">
          {benefits.slice(2, 4).map((item, index) => (
            <a
              key={index + 2}
              href={item.link}
              className="icon-wrapper"
              onMouseEnter={() => setHoveredIndex(index + 2)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="icon-circle">{item.icon}</div>
              <p className="label">{item.title}</p>
              {hoveredIndex === index + 2 && (
                <div className="tooltip-card">{item.description}</div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default WhyChooseUs;
