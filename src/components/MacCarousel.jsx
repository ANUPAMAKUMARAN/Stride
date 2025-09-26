import React, { useState, useEffect, useRef ,useCallback} from "react";

const MacCarousel = ({ attributes }) => {
  const { title, titleColor, slides } = attributes;
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [progress, setProgress] = useState(0);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const containerRef = useRef(null);
const modalOverlayRef = useRef(null); 

  const getScaleMultiplier = () => {
    const width = window.innerWidth;
    return width >= 768 ? 1 : Math.max(0.5, width / 768);
  };


  useEffect(() => {
    const handleResize = () => {
      setScaleMultiplier(getScaleMultiplier());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const jumpSlide = (dir) => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.querySelector(".carousel-slide")?.offsetWidth || 0;
      const perSlide = slideWidth + 20 * scaleMultiplier;
      containerRef.current.scrollBy({
        left: dir === "next" ? perSlide : -perSlide,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const isDesktop = window.innerWidth >= 768;

// 👇 ADDED: Memoized function to close the modal
const handleClose = useCallback(() => {
    setShowModal(false);
    setSelectedSlide(null); // Clear selected slide
}, []);

// 👇 ADDED: useEffect for handling ESC key and Click Outside
useEffect(() => {
    if (!showModal) return;

    // Handler for ESC key press
    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            handleClose();
        }
    };

    // Handler for clicking outside the content box
    const handleClickOutside = (event) => {
        // Check if the click occurred on the modal overlay (the fixed parent)
        if (modalOverlayRef.current && event.target === modalOverlayRef.current) {
            handleClose();
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [showModal, handleClose]); // Depend on showModal and handleClose


  // SVG icons 
  
    const plusIconSvg = (
   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    // width="34" 
    // height="34" 
    width={isDesktop ? `${34 * scaleMultiplier}` : `24px`}
      height={isDesktop ? `${30 * scaleMultiplier}` : `20px`}
    zoomAndPan="magnify" viewBox="0 0 367.5 899.999968" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="a5db39e3f6"><path d="M 184 568.507812 L 195 568.507812 L 195 580 L 184 580 Z M 184 568.507812 " clip-rule="nonzero"/></clipPath><clipPath id="3249df443a"><path d="M 171.515625 586 L 194 586 L 194 627 L 171.515625 627 Z M 171.515625 586 " clip-rule="nonzero"/></clipPath><clipPath id="a1e22f24b7"><path d="M 1.496094 279 L 329 279 L 329 884 L 1.496094 884 Z M 1.496094 279 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#a5db39e3f6)"><path fill="#ffffff" d="M 190.175781 568.59375 C 190.011719 568.582031 189.855469 568.585938 189.699219 568.59375 C 184.890625 568.828125 182.511719 576.558594 187.234375 578.742188 C 191.183594 580.363281 195.480469 576.308594 194.515625 572.257812 C 194.214844 570.152344 192.335938 568.519531 190.175781 568.59375 Z M 190.175781 568.59375 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#3249df443a)"><path fill="#ffffff" d="M 190.773438 616.210938 C 188.992188 617.421875 184.820312 621.214844 184.0625 617.910156 C 185.636719 609.539062 188.535156 601.492188 190.398438 593.1875 C 191.351562 589.574219 190.820312 586.007812 187.753906 586.203125 C 187.046875 586.25 186.199219 586.484375 185.210938 586.980469 C 180.371094 589.523438 175.898438 593.453125 171.515625 596.65625 C 172.066406 598.148438 172.691406 599.359375 174.007812 597.703125 C 175.644531 596.730469 181.144531 592.480469 180.597656 596.65625 C 178.84375 604.386719 176.691406 612.023438 175.058594 619.78125 C 174.070312 623.933594 177.308594 627.667969 181.269531 625.269531 C 185.484375 623.132812 189.285156 620.429688 193.066406 617.785156 C 192.550781 616.519531 192.289062 615.007812 190.773438 616.210938 Z M 190.773438 616.210938 " fill-opacity="1" fill-rule="nonzero"/></g><path fill="#ffffff" d="M 284.890625 11.722656 C 282.40625 11.539062 280.039062 11.597656 277.667969 11.722656 C 204.621094 15.265625 168.515625 132.648438 240.199219 165.84375 C 300.164062 190.46875 365.457031 128.859375 350.773438 67.347656 C 346.214844 35.390625 317.6875 10.582031 284.890625 11.722656 Z M 284.890625 11.722656 " fill-opacity="1" fill-rule="nonzero"/><g clip-path="url(#a1e22f24b7)"><path fill="#ffffff" d="M 293.945312 734.867188 C 266.898438 753.277344 203.558594 810.878906 192.015625 760.679688 C 215.929688 633.53125 259.972656 511.363281 288.265625 385.222656 C 302.765625 330.347656 294.65625 276.183594 248.128906 279.148438 C 237.359375 279.859375 224.515625 283.40625 209.476562 290.917969 C 135.960938 329.578125 68.066406 389.253906 1.472656 437.910156 C 9.878906 460.574219 19.351562 478.976562 39.359375 453.769531 C 64.21875 439.027344 147.742188 374.449219 139.394531 437.910156 C 112.757812 555.285156 80.082031 671.296875 55.28125 789.089844 C 40.308594 852.195312 89.496094 908.898438 149.636719 872.4375 C 213.625 840 271.335938 798.976562 328.8125 758.78125 C 320.9375 739.546875 316.972656 716.582031 293.945312 734.867188 Z M 293.945312 734.867188 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
  );

 

  const leftArrowSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${24 * scaleMultiplier}`}
      height={`${24 * scaleMultiplier}`}
      fill="#333"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );

  const rightArrowSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${24 * scaleMultiplier}`}
      height={`${24 * scaleMultiplier}`}
      fill="#333"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );

  return (
    <div
      style={{
        width: "100%",
        padding: `${40 * scaleMultiplier}px 0`,
        paddingLeft: window.innerWidth < 768 ? "0px" : `${100 * scaleMultiplier}px`,
      }}
    >
      <h2
        style={{
          textAlign: "left",
          color: titleColor || "#000",
          fontSize: `${44 * scaleMultiplier}px`,
          fontWeight: `600`,
          marginBottom: `${20 * scaleMultiplier}px`,
          paddingLeft: `${20 * scaleMultiplier}px`,
        }}
      >
        {title}
      </h2>

      {/* Slide Wrapper with native scrolling */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: `${20 * scaleMultiplier}px`,
          paddingLeft: `${20 * scaleMultiplier}px`,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              flex: `0 0 ${window.innerWidth < 768 ? window.innerWidth * 0.63 : window.innerWidth * 0.27}px`,
              borderRadius: `${16 * scaleMultiplier}px`,
              overflow: "hidden",
              position: "relative",
              backgroundColor: slide.backgroundColor || "#f5f5f5",
            }}
          >

            {slide.image && (
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: `${16 * scaleMultiplier}px`,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
              />
              // <img
              //   src={slide.image}
              //   alt={slide.title}
              //   style={{
              //     width: "100%",
              //     maxHeight: `${650 * scaleMultiplier}px`,
              //     objectFit: "cover",
              //     borderRadius: `${16 * scaleMultiplier}px`,
              //     userSelect: "none",
              //     pointerEvents: "none",
              //   }}
              //   draggable={false}
              // />

            )}

            {/* Text Overlay */}
            <div
              style={{
                position: "absolute",
                top: `${20 * scaleMultiplier}px`,
                left: `${20 * scaleMultiplier}px`,
                right: `${20 * scaleMultiplier}px`,
                color: slide.titleColor || "#fff",
              }}
            >
              <h4
                style={{
                  color: slide.captionColor || "#fff",
                  fontSize: `${19 * scaleMultiplier}px`,
                  marginBottom: `${3 * scaleMultiplier}px`,
                }}
              >
                {slide.caption}
              </h4>
              <h3
                style={{
                  color: slide.titleColor || "#fff",
                  fontSize: `${30 * scaleMultiplier}px`,
                  fontWeight: "bold",
                  lineHeight: "1.3",
                }}
              >
                {slide.title}
              </h3>
            </div>

            {/* info Button */}
            <button
              style={{
                position: "absolute",
                bottom: `${20 * scaleMultiplier}px`,
                right: `${20 * scaleMultiplier}px`,
                width: isDesktop ? `${48 * scaleMultiplier}px` : `38px`,
                height: isDesktop ? `${48 * scaleMultiplier}px` : `38px`,
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,0,1)",
                border: `1px solid rgba(255, 255, 255, 0.4)`,
                backdropFilter: "blur(10px)",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(${1.1})`;
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(255, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `scale(${1})`;
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => {
                setSelectedSlide(slide);
                setCurrentPageIndex(0);
                setShowModal(true);
              }}
            >
              {plusIconSvg}
              {/* {infoIconSvg} */}
            </button>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div
        style={{
          display: "flex",
          justifyContent: isDesktop ? "flex-end" : "center",
          marginTop:isDesktop ? `${15 * scaleMultiplier}px`:`${45 * scaleMultiplier}px` ,
          gap: `${20 * scaleMultiplier}px`,
          paddingRight: isDesktop ? "20px" : "0",
        }}
      >
        <button
          onClick={() => jumpSlide("prev")}
          style={{
            width: isDesktop ? `${40 * scaleMultiplier}px` : `36px`,
            
             height: isDesktop ? `${40 * scaleMultiplier}px` : `36px`,
            borderRadius: "50%",
            border: `1px solid #ccc`,
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {leftArrowSvg}
        </button>
        <button
          onClick={() => jumpSlide("next")}
          style={{
            width: isDesktop ? `${40 * scaleMultiplier}px` : `36px`,
            
             height: isDesktop ? `${40 * scaleMultiplier}px` : `36px`,
            borderRadius: "50%",
            border: `1px solid #ccc`,
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {rightArrowSvg}
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedSlide && (
        <div
        ref={modalOverlayRef}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "0px 10px",
              textAlign: "left",
              position: "relative",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Close Button */}

            <div
              style={{
                position: "sticky",
                top: "0px",
                right: "0px",
                zIndex: 10,               
                display: "flex",
                justifyContent: "flex-end", 
                margin: "-15px -15px 0 0",
                padding: "15px", 
              }}
            >
             
              <button
                // onClick={() => setShowModal(false)}
                onClick={handleClose}
                style={{
                                    position: "static",
                  background: "#fff",
                  borderRadius: "50%",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  width: "40px",
                  height: "40px",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                   width={isDesktop ? `${35 * scaleMultiplier}` : `25px`}
      height={isDesktop ? `${35 * scaleMultiplier}` : `25px`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

           {/* All Pages */}
            {selectedSlide.pages && selectedSlide.pages.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {selectedSlide.pages.map((page, idx) => (
                  <div
                    key={idx}
                    style={{
                      paddingBottom: "20px",
                      borderBottom:
                        idx !== selectedSlide.pages.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                  >
                    {page.img && (
                      <img
                        src={page.img}
                        alt={`page-${idx}`}
                        style={{
                          maxWidth: "100%",
                          borderRadius: "12px",
                          marginBottom: "15px",
                        }}
                      />
                    )}
                    <p
                      style={{
                        fontSize: "18px",
                        color: page.descriptionColor || "#444",
                        lineHeight: "1.6",
                      }}
                    >
                      {page.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MacCarousel;






