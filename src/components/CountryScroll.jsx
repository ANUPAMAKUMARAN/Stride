
import React, { useState, useEffect, useRef, useMemo } from "react";

const CountryScroll = ({ attributes }) => {

    const {
        slideShow,
        navigationButton,
        backgroundColor,
        slides
    } = attributes;


    const [searchTerm, setSearchTerm] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const listRef = useRef(null);

    const toggleSlide = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const filteredSlides = useMemo(
        () =>
            slides.filter((slide) =>
                slide.countryName.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [searchTerm, slides]
    );

    const slideHeight = isSmallScreen ? 100 : 120;
    const containerHeight = `${slideShow * slideHeight}px`;
    const containerWidth = isSmallScreen ? "95%" : "700px";
    const containerPadding = isSmallScreen ? "16px" : "30px";
    const titleFont = isSmallScreen ? "18px" : "22px";
    const bodyFont = isSmallScreen ? "14px" : "16px";
    const buttonFont = isSmallScreen ? "12px" : "20px";

    const scrollPrev = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ top: -slideHeight, behavior: "smooth" });
        }
    };

    const scrollNext = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ top: slideHeight, behavior: "smooth" });
        }
    };

    return (
        <div
            style={{
                width: "100%",
                padding: isSmallScreen ? "16px" : "40px",
                background: backgroundColor,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: containerWidth,
                    border: "1px solid #e0e7ff",
                    borderRadius: "12px",
                    padding: containerPadding,
                    background: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/*  Search bar */}
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: "16px",
                        padding: "8px",
                        fontSize: bodyFont,
                        border: "1px solid #e0e7ff",
                        borderRadius: "8px",
                        outline: "none",
                    }}
                />

                {/* Scrollable list */}
                <div
                    ref={listRef}
                    style={{
                        height: filteredSlides.length > 0 ? containerHeight : "60px",
                        overflowY: filteredSlides.length > 0 ? "auto" : "hidden",
                        paddingRight: "4px",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {filteredSlides.length > 0 ? (
                        filteredSlides.map((slide, index) => (
                            <div
                                key={slide.countryName}
                                style={{
                                    border: "1px solid #4A6CF7",
                                    borderRadius: "12px",
                                    marginBottom: "16px",
                                    padding: "16px",
                                    background: "#fff",
                                    boxShadow: "0 2px 6px rgba(74,108,247,0.1)",
                                    minHeight: `${slideHeight - 20}px`,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: titleFont,
                                        fontWeight: "600",
                                        marginBottom: "8px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        color: "#1e3a8a",
                                    }}
                                >
                                    {slide.countryName}
                                    <button
                                        onClick={() => toggleSlide(index)}
                                        style={{
                                            fontSize: buttonFont,
                                            padding: "4px 10px",
                                            border: "1px solid #4A6CF7",
                                            borderRadius: "20px",
                                            background: openIndex === index ? "#4A6CF7" : "#fff",
                                            color: openIndex === index ? "#fff" : "#4A6CF7",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            transition: "0.3s",
                                        }}
                                    >
                                        {openIndex === index ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {openIndex === index && (
                                    <div
                                        style={{
                                            fontSize: bodyFont,
                                            color: "#374151",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <p style={{ marginBottom: "6px" }}>
                                            <strong style={{ color: "#111827" }}>
                                                Organisation or Body:{" "}
                                            </strong>
                                            {slide.organisation}
                                        </p>
                                        <p>
                                            <strong style={{ color: "#111827" }}>Website: </strong>
                                            {slide.website}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                color: "#6b7280",
                                fontSize: bodyFont,
                            }}
                        >
                            No countries found.
                        </div>
                    )}
                </div>

                {/* Navigation buttons */}
                {navigationButton === "true" && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "16px",
                        }}
                    >
                        <button
                            onClick={scrollPrev}
                            style={{
                                fontSize: buttonFont,
                                padding: "6px 14px",
                                border: "1px solid #4A6CF7",
                                borderRadius: "8px",
                                background: "#fff",
                                color: "#4A6CF7",
                                fontWeight: "500",
                                cursor: "pointer",
                            }}
                        >
                            ⏫ Prev
                        </button>
                        <button
                            onClick={scrollNext}
                            style={{
                                fontSize: buttonFont,
                                padding: "6px 14px",
                                border: "1px solid #4A6CF7",
                                borderRadius: "8px",
                                background: "#fff",
                                color: "#4A6CF7",
                                fontWeight: "500",
                                cursor: "pointer",
                            }}
                        >
                            Next ⏬
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountryScroll;

// import React, { useState, useEffect, useRef, useMemo } from "react";

// const CountryScroll = ({ attributes }) => {

//     const {
//         slideShow,
//         navigationButton,
//         slides
//     } = attributes;


//     const [searchTerm, setSearchTerm] = useState("");
//     const [openIndex, setOpenIndex] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(false);

//     const listRef = useRef(null);

//     const toggleSlide = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);


//     const filteredSlides = useMemo(
//         () =>
//             slides.filter((slide) =>
//                 slide.countryName.toLowerCase().includes(searchTerm.toLowerCase())
//             ),
//         [searchTerm, slides]
//     );

//     const slideHeight = isSmallScreen ? 100 : 120;
//     const containerHeight = `${slideShow * slideHeight}px`;
//     const containerWidth = isSmallScreen ? "95%" : "700px";
//     const containerPadding = isSmallScreen ? "16px" : "30px";
//     const titleFont = isSmallScreen ? "18px" : "22px";
//     const bodyFont = isSmallScreen ? "14px" : "16px";
//     const buttonFont = isSmallScreen ? "12px" : "20px";

//     const scrollPrev = () => {
//         if (listRef.current) {
//             listRef.current.scrollBy({ top: -slideHeight, behavior: "smooth" });
//         }
//     };

//     const scrollNext = () => {
//         if (listRef.current) {
//             listRef.current.scrollBy({ top: slideHeight, behavior: "smooth" });
//         }
//     };

//     return (
//         <div
//             style={{
//                 width: "100%",
//                 padding: isSmallScreen ? "16px" : "40px",
//                 background: "#f0f4ff",
//                 display: "flex",
//                 justifyContent: "center",
//             }}
//         >
//             <div
//                 style={{
//                     width: containerWidth,
//                     border: "1px solid #e0e7ff",
//                     borderRadius: "12px",
//                     padding: containerPadding,
//                     background: "#ffffff",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                     display: "flex",
//                     flexDirection: "column",
//                 }}
//             >
//                 {/*  Search bar */}
//                 <input
//                     type="text"
//                     placeholder="Search countries..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{
//                         width: "100%",
//                         marginBottom: "16px",
//                         padding: "8px",
//                         fontSize: bodyFont,
//                         border: "1px solid #e0e7ff",
//                         borderRadius: "8px",
//                         outline: "none",
//                     }}
//                 />

//                 {/* Scrollable list */}
//                 <div
//                     ref={listRef}
//                     style={{
//                         height: filteredSlides.length > 0 ? containerHeight : "60px",
//                         overflowY: filteredSlides.length > 0 ? "auto" : "hidden",
//                         paddingRight: "4px",
//                         scrollbarWidth: "none",
//                         msOverflowStyle: "none",
//                     }}
//                 >
//                     {filteredSlides.length > 0 ? (
//                         filteredSlides.map((slide, index) => (
//                             <div
//                                 key={slide.countryName}
//                                 style={{
//                                     border: "1px solid #4A6CF7",
//                                     borderRadius: "12px",
//                                     marginBottom: "16px",
//                                     padding: "16px",
//                                     background: "#fff",
//                                     boxShadow: "0 2px 6px rgba(74,108,247,0.1)",
//                                     minHeight: `${slideHeight - 20}px`,
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     justifyContent: "center",
//                                 }}
//                             >
//                                 <div
//                                     style={{
//                                         fontSize: titleFont,
//                                         fontWeight: "600",
//                                         marginBottom: "8px",
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         alignItems: "center",
//                                         color: "#1e3a8a",
//                                     }}
//                                 >
//                                     {slide.countryName}
//                                     <button
//                                         onClick={() => toggleSlide(index)}
//                                         style={{
//                                             fontSize: buttonFont,
//                                             padding: "4px 10px",
//                                             border: "1px solid #4A6CF7",
//                                             borderRadius: "20px",
//                                             background: openIndex === index ? "#4A6CF7" : "#fff",
//                                             color: openIndex === index ? "#fff" : "#4A6CF7",
//                                             fontWeight: "500",
//                                             cursor: "pointer",
//                                             transition: "0.3s",
//                                         }}
//                                     >
//                                         {openIndex === index ? "Hide" : "Show"}
//                                     </button>
//                                 </div>
//                                 {openIndex === index && (
//                                     <div
//                                         style={{
//                                             fontSize: bodyFont,
//                                             color: "#374151",
//                                             marginTop: "10px",
//                                         }}
//                                     >
//                                         <p style={{ marginBottom: "6px" }}>
//                                             <strong style={{ color: "#111827" }}>
//                                                 Organisation or Body:{" "}
//                                             </strong>
//                                             {slide.organisation}
//                                         </p>
//                                         <p>
//                                             <strong style={{ color: "#111827" }}>Website: </strong>
//                                             {slide.website}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <div
//                             style={{
//                                 textAlign: "center",
//                                 color: "#6b7280",
//                                 fontSize: bodyFont,
//                             }}
//                         >
//                             No countries found.
//                         </div>
//                     )}
//                 </div>

//                {/* Navigation buttons */}
// {navigationButton === "true" && (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-between",
//       marginTop: "16px",
//     }}
//   >
//     <button
//       onClick={scrollPrev}
//       style={{
//         fontSize: buttonFont,
//         padding: "6px 14px",
//         border: "1px solid #4A6CF7",
//         borderRadius: "8px",
//         background: "#fff",
//         color: "#4A6CF7",
//         fontWeight: "500",
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         gap: "6px",
//       }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d="M12 8l6 6H6z" /> {/* Up arrow */}
//       </svg>
//       Prev
//     </button>

//     <button
//       onClick={scrollNext}
//       style={{
//         fontSize: buttonFont,
//         padding: "6px 14px",
//         border: "1px solid #4A6CF7",
//         borderRadius: "8px",
//         background: "#fff",
//         color: "#4A6CF7",
//         fontWeight: "500",
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         gap: "6px",
//       }}
//     >
//       Next
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d="M12 16l-6-6h12z" /> {/* Down arrow */}
//       </svg>
//     </button>
//   </div>
// )}

//             </div>
//         </div>
//     );
// };

// export default CountryScroll;
