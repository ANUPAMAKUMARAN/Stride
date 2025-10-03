


import React, { useState, useEffect, useRef } from 'react';

const KlarnaBrands = ({ attributes }) => {
    const data = attributes || {};
    const { title, titleColor, slides } = data;

    const COLUMN_COUNT = 4;
    const GAP = 15;
    const MOBILE_BREAKPOINT = 768;
    const BASE_MOBILE_WIDTH = 414;
    
    
    const BASE_SCROLL_DURATION_SECONDS = 1.7;
    const STAGGER_DELAY_MS = 2000;
    const CYCLE_PAUSE_MS = 1000;

    const [isMobile, setIsMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
   
    const [hoveredIndex, setHoveredIndex] = useState(null); 

    const gridInnerRef = useRef(null);
    const columnRefs = useRef(Array(COLUMN_COUNT).fill(null).map(() => React.createRef()));

    const [scrollData, setScrollData] = useState([]);

 
    useEffect(() => {
        const checkScreenSize = () => {
            if (typeof window !== 'undefined') {
                const width = window.innerWidth;
                setWindowWidth(width);
                setIsMobile(width <= MOBILE_BREAKPOINT);
            }
        };
        checkScreenSize();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', checkScreenSize);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', checkScreenSize);
            }
        };
    }, []);

    const getScaleFactor = () => {
        if (!isMobile) return 1;
        return Math.min(windowWidth / BASE_MOBILE_WIDTH, 1.2);
    };

    const scale = getScaleFactor();
    const getScaledValue = (px) => isMobile ? Math.round(px * scale) : px;
    const scaleValue = (px) => `${getScaledValue(px)}px`;

 
    useEffect(() => {
        if (isMobile) return;

        const timeout = setTimeout(() => {
            const viewportHeight = getScaledValue(650);
            const columns = columnRefs.current.map(ref => ref.current);
            let totalMaxScroll = 0;

            const calculatedData = columns.map(el => {
                if (!el) return { maxScroll: 0, duration: 0 };
                
                const maxScroll = Math.max(0, el.scrollHeight - viewportHeight);
                totalMaxScroll += maxScroll;
                return { maxScroll, duration: 0 };
            });

            if (totalMaxScroll > 0) {
                const avgMaxScroll = totalMaxScroll / COLUMN_COUNT;
                calculatedData.forEach(data => {
                    if (data.maxScroll > 0) {
                        data.duration = (data.maxScroll / avgMaxScroll) * BASE_SCROLL_DURATION_SECONDS;
                    }
                });
            }
            
            setScrollData(calculatedData);
        }, 50);

        return () => clearTimeout(timeout);
    }, [isMobile, windowWidth, slides]);


    
    useEffect(() => {
        if (isMobile || scrollData.length === 0) return;

        let timeouts = [];
        
        const runSequence = (direction) => {
            const isUp = direction === 'UP';
            const target = isUp ? (data) => data.maxScroll : () => 0;

            scrollData.forEach((column, index) => {
                if (column.maxScroll <= 0) return;

                const delay = index * STAGGER_DELAY_MS;
                
                const timerId = setTimeout(() => {
                    const ref = columnRefs.current[index].current;
                    if (ref) {
                        ref.style.transition = `transform ${column.duration}s linear`;
                        ref.style.transform = `translateY(${-target(column)}px)`;
                    }
                }, delay);
                timeouts.push(timerId);
            });

            const lastColumn = scrollData[COLUMN_COUNT - 1];
            const totalSequenceTime = (COLUMN_COUNT - 1) * STAGGER_DELAY_MS + lastColumn.duration * 1000;
            
            const nextSequenceTimer = setTimeout(() => {
                    columnRefs.current.forEach(ref => {
                        if (ref.current) {
                            ref.current.style.transition = 'none';
                        }
                    });

                    if (isUp) {
                        runSequence('DOWN');
                    } else {
                        
                    }
            }, totalSequenceTime + CYCLE_PAUSE_MS);
            timeouts.push(nextSequenceTimer);
        };
        
        runSequence('UP');

        return () => {
            timeouts.forEach(clearTimeout);
            columnRefs.current.forEach(ref => {
                if (ref.current) {
                    ref.current.style.transition = 'none';
                    ref.current.style.transform = 'translateY(0px)';
                }
            });
        };
    }, [isMobile, scrollData]);


    // --- Styles ---
    const styles = {
        container: {
            padding: isMobile ? `${scaleValue(20)} 0` : `${scaleValue(40)} ${scaleValue(180)}`,
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#fff',
        },
        header: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            marginBottom: isMobile ? scaleValue(10) : scaleValue(30),
            padding: isMobile ? `0 ${scaleValue(20)}` : '0',
        },
        title: {
            color: titleColor || '#000',
            fontSize: isMobile ? scaleValue(24) : scaleValue(28),
            fontWeight: '700',
        },
        
        seeAll: { 
            color: '#ff4081',
            textDecoration: 'none',
            fontSize: scaleValue(14),
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: isMobile ? scaleValue(10) : '0',
        },
        
        desktopGridOuter: {
            position: 'relative',
            height: scaleValue(650),
            overflow: 'hidden', 
            width: '100%',
            display: isMobile ? 'none' : 'block',
        },

        desktopGridInner: {
            display: 'flex',
            gap: scaleValue(GAP),
            alignItems: 'flex-start',
            width: '100%',
        },
        
        columnWrapper: { 
            display: 'flex',
            flexDirection: 'column', 
            
            flex: `0 0 calc( (100% - ${scaleValue(GAP * (COLUMN_COUNT - 1))}) / ${COLUMN_COUNT} )`, 
            boxSizing: 'border-box',
        },

        columnContent: {
            display: 'flex',
            flexDirection: 'column',
            gap: scaleValue(GAP),
            willChange: 'transform',
        },

        slideItemBase: {
            display: 'block', 
            borderRadius: scaleValue(20),
            overflow: 'hidden',
            position: 'relative',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: `0 ${getScaledValue(4)}px ${getScaledValue(15)}px rgba(0,0,0,0.05)`,
            cursor: 'pointer',
            width: '100%',
            flexShrink: 0,
            transition: 'transform 0.3s ease-out',
            textDecoration: 'none', 
            color: 'inherit', 
        },
      
        slideContentInner: {
            position: 'relative',
            width: '100%',
            height: '100%',
        },

        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            zIndex: 1,
        },

        cashbackTag: {
            backgroundColor: 'white',
            color: '#ff4081',
            padding: `${getScaledValue(5)}px ${getScaledValue(10)}px`,
            borderRadius: scaleValue(15),
            fontSize: scaleValue(12),
            fontWeight: 'bold',
            marginBottom: scaleValue(10),
            alignSelf: 'flex-start',
            boxShadow: `0 ${getScaledValue(2)}px ${getScaledValue(4)}px rgba(0,0,0,0.1)`,
        },

        centeredIconWrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
        },

        iconBox: {
            width: scaleValue(80),
            height: scaleValue(80),
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: `0 ${getScaledValue(4)}px ${getScaledValue(8)}px rgba(0,0,0,0.15)`,
        },

        fadeOverlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: scaleValue(120),
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 90%)',
            pointerEvents: 'none',
            zIndex: 5,
        },

        iconImage: {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
        },
        
      
        mobileCarouselWrapper: {
            display: 'flex',
            gap: scaleValue(GAP),
            overflowX: 'auto',
            padding: `0 ${scaleValue(20)}`,
            paddingBottom: scaleValue(20),
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        },
        mobileCardStyle: {
         
            width: `calc( (100vw - ${getScaledValue(40)}px - ${GAP * 0.7}px) / 1.3 - ${scaleValue(GAP)})`, 
            height: scaleValue(350),
            flexShrink: 0,
        },
    };

 
    const distributeSlides = (slides = [], numColumns) => {
        const columns = Array.from({ length: numColumns }, () => []);
        slides.forEach((slide, index) => {
            columns[index % numColumns].push(slide);
        });
        return columns;
    };

    const columnsData = distributeSlides(slides || [], COLUMN_COUNT);
    

    const renderCardContent = (slide, cardId, isMobileView) => {
        const isHovered = hoveredIndex === cardId;
        const linkUrl = slide.linkUrl || '#';
        const hasLink = !!slide.linkUrl;

        const cardStyle = {
            ...styles.slideItemBase,
            backgroundImage: slide.backgroundimage,
            
            ...(isMobileView ? styles.mobileCardStyle : { 
                height: slide.height ? scaleValue(parseInt(slide.height, 10)) : scaleValue(250) 
            }),

            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            cursor: hasLink ? 'pointer' : 'default',
        };

        const CardInnerContent = (
            <div 
                style={cardStyle}
                onPointerEnter={() => hasLink && setHoveredIndex(cardId)}
                onPointerLeave={() => hasLink && setHoveredIndex(null)}
            >
               
                <div style={styles.slideContentInner}>
                    <div style={styles.overlay}></div>
                    {slide.cashback && (
                        <div
                            style={{
                                ...styles.cashbackTag,
                                position: 'absolute',
                                top: scaleValue(15),
                                left: scaleValue(15),
                                zIndex: 3,
                            }}
                        >
                            {slide.cashback}
                        </div>
                    )}
                    {slide.iconImage && (
                        <div style={styles.centeredIconWrapper}>
                            <div style={styles.iconBox}>
                                <img src={slide.iconImage} alt="Brand Icon" style={styles.iconImage} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );

        
        if (hasLink) {
            return (
                <a 
                    key={cardId}
                    href={linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ textDecoration: 'none', display: 'block' }} 
                >
                    {CardInnerContent}
                </a>
            );
        }

        return (
            <div key={cardId}>
                {CardInnerContent}
            </div>
        );
    };

    const renderMobileCarousel = () => {
        if (!slides) return null;
        return (
            <div style={styles.mobileCarouselWrapper}>
                {slides.map((slide, slideIndex) => 
                    renderCardContent(slide, `mobile-${slideIndex}`, true)
                )}
            </div>
        );
    };

    const renderDesktopGrid = () =>
        columnsData.map((columnSlides, columnIndex) => (
            <div 
                key={columnIndex} 
                style={styles.columnWrapper}
            >
                <div 
                    ref={columnRefs.current[columnIndex]} 
                    style={styles.columnContent}
                >
                    {columnSlides.map((slide, slideIndex) => 
                        renderCardContent(slide, `desktop-${columnIndex}-${slideIndex}`, false)
                    )}
                </div>
            </div>
        ));

    if (!slides || slides.length === 0) return null;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2 style={styles.title}>{title}</h2>
              
                <a href="#" style={styles.seeAll}>
                    See all
                </a>
            </header>

           
            {isMobile ? (
                renderMobileCarousel()
            ) : (
                <div style={styles.desktopGridOuter}>
                    <div ref={gridInnerRef} style={styles.desktopGridInner}>
                        {renderDesktopGrid()}
                    </div>
                    <div style={styles.fadeOverlay}></div>
                </div>
            )}
        </div>
    );
};

export default KlarnaBrands;
// import React, { useState, useEffect, useRef } from 'react';

// const KlarnaBrands = ({ attributes }) => {
//     const data = attributes || {};
//     const { title, titleColor, slides } = data;

//     const COLUMN_COUNT = 4;
//     const GAP = 15;
//     const MOBILE_BREAKPOINT = 768;
//     const BASE_MOBILE_WIDTH = 414;
    
    
//     const BASE_SCROLL_DURATION_SECONDS = 4.7;
//     const STAGGER_DELAY_MS = 5000;
//     const CYCLE_PAUSE_MS = 1000;

//     const [isMobile, setIsMobile] = useState(false);
//     const [windowWidth, setWindowWidth] = useState(0);
    
//     const [hoveredIndex, setHoveredIndex] = useState(null); 

//     const gridInnerRef = useRef(null);
//     const columnRefs = useRef(Array(COLUMN_COUNT).fill(null).map(() => React.createRef()));

//     const [scrollData, setScrollData] = useState([]);
//     // Ref to manage the loop timer for infinite scrolling
//     const loopTimerRef = useRef(null); 
    

    
//     useEffect(() => {
//         const checkScreenSize = () => {
//             if (typeof window !== 'undefined') {
//                 const width = window.innerWidth;
//                 setWindowWidth(width);
//                 setIsMobile(width <= MOBILE_BREAKPOINT);
//             }
//         };
//         checkScreenSize();
//         if (typeof window !== 'undefined') {
//             window.addEventListener('resize', checkScreenSize);
//         }
//         return () => {
//             if (typeof window !== 'undefined') {
//                 window.removeEventListener('resize', checkScreenSize);
//             }
//         };
//     }, []);

//     const getScaleFactor = () => {
//         if (!isMobile) return 1;
//         return Math.min(windowWidth / BASE_MOBILE_WIDTH, 1.2);
//     };

//     const scale = getScaleFactor();
//     const getScaledValue = (px) => isMobile ? Math.round(px * scale) : px;
//     const scaleValue = (px) => `${getScaledValue(px)}px`;

//     // -----------------------------------------------------------------
//     // UPDATED: Scroll Data Calculation (Using original logic, but will loop)
//     // -----------------------------------------------------------------
//     useEffect(() => {
//         if (isMobile) return;

//         const timeout = setTimeout(() => {
//             const viewportHeight = getScaledValue(650);
//             const columns = columnRefs.current.map(ref => ref.current);
//             let totalMaxScroll = 0;

//             const calculatedData = columns.map(el => {
//                 if (!el) return { maxScroll: 0, duration: 0 };
                
//                 // Max scroll is the total distance needed to move the content upwards
//                 const maxScroll = Math.max(0, el.scrollHeight - viewportHeight); 
                
//                 totalMaxScroll += maxScroll;
//                 return { maxScroll, duration: 0 };
//             });

//             if (totalMaxScroll > 0) {
//                 const avgMaxScroll = totalMaxScroll / COLUMN_COUNT;
//                 calculatedData.forEach(data => {
//                     if (data.maxScroll > 0) {
//                         data.duration = (data.maxScroll / avgMaxScroll) * BASE_SCROLL_DURATION_SECONDS;
//                     }
//                 });
//             }
            
//             setScrollData(calculatedData);
//         }, 50);

//         return () => clearTimeout(timeout);
//     }, [isMobile, windowWidth, slides]);


//     // -----------------------------------------------------------------
//     // UPDATED: Infinite Staggered Up/Down Loop Logic
//     // -----------------------------------------------------------------
//     useEffect(() => {
//         if (isMobile || scrollData.length === 0) return;

//         // Helper function to run a single sequence (UP or DOWN)
//         const runSequence = (direction, onComplete) => {
//             const isUp = direction === 'UP';
//             // Target is -maxScroll (UP) or 0 (DOWN)
//             const target = isUp ? (data) => data.maxScroll : () => 0;

//             scrollData.forEach((column, index) => {
//                 if (column.maxScroll <= 0) return;

//                 const delay = index * STAGGER_DELAY_MS;
                
//                 // Use a dedicated timer for each column's move
//                 loopTimerRef.current = setTimeout(() => {
//                     const ref = columnRefs.current[index].current;
//                     if (ref) {
//                         ref.style.transition = `transform ${column.duration}s linear`;
//                         // UP = translateY(-maxScroll), DOWN = translateY(0)
//                         ref.style.transform = `translateY(${-target(column)}px)`;
//                     }
//                 }, delay);
//             });

//             // Calculate when the entire sequence is finished
//             const lastColumn = scrollData[COLUMN_COUNT - 1];
//             // Time = (Last Column's Stagger Delay) + (Last Column's Duration)
//             const totalSequenceTime = (COLUMN_COUNT - 1) * STAGGER_DELAY_MS + lastColumn.duration * 1000;
            
//             // Set a timer for the completion/pause phase
//             loopTimerRef.current = setTimeout(() => {
//                 // Remove transition before the next step/loop
//                 columnRefs.current.forEach(ref => {
//                     if (ref.current) {
//                         ref.current.style.transition = 'none';
//                     }
//                 });
                
//                 // Call the completion callback to schedule the next step
//                 onComplete();
//             }, totalSequenceTime + CYCLE_PAUSE_MS); 
//         };
        
//         // --- Main Infinite Loop Function ---
//         const startLoop = () => {
//             clearTimeout(loopTimerRef.current);
            
//             const upSequence = () => {
//                 runSequence('UP', () => {
//                     // After UP sequence is complete (and paused), start DOWN
//                     loopTimerRef.current = setTimeout(downSequence, 50); 
//                 });
//             };

//             const downSequence = () => {
//                 runSequence('DOWN', () => {
//                     // After DOWN sequence is complete (and paused), restart UP to loop
//                     loopTimerRef.current = setTimeout(upSequence, 50); 
//                 });
//             };

//             // Start the infinite sequence
//             loopTimerRef.current = setTimeout(upSequence, 50);
//         };

//         startLoop();

//         return () => {
//             // Cleanup: Stop the loop and reset positions
//             clearTimeout(loopTimerRef.current);
//             loopTimerRef.current = null;
            
//             columnRefs.current.forEach(ref => {
//                 if (ref.current) {
//                     ref.current.style.transition = 'none';
//                     ref.current.style.transform = 'translateY(0px)';
//                 }
//             });
//         };
//     }, [isMobile, scrollData, STAGGER_DELAY_MS, CYCLE_PAUSE_MS]);


//     // -----------------------------------------------------------------
//     // UPDATED: Content Duplication for Infinite Scroll
//     // -----------------------------------------------------------------
//     const distributeSlides = (slides = [], numColumns) => {
//         const columns = Array.from({ length: numColumns }, () => []);
        
//         // Ensure slides exist to prevent errors
//         if (slides.length === 0) return columns;

//         // Duplicate the slides. We need enough content to fill the columns
//         // and allow the stagger pattern to complete without running out.
//         const originalContent = slides.map((slide, index) => ({ ...slide, key: `original-${index}` }));
        
//         // Duplicate the set and append it. This ensures enough content for the scroll pattern.
//         const fullContent = [...originalContent, ...originalContent.map((slide, index) => ({...slide, key: `duplicate-${index}`}))];
        
//         // Distribute full content into columns
//         fullContent.forEach((slide, index) => {
//             columns[index % numColumns].push(slide);
//         });
        
//         return columns;
//     };

//     const columnsData = distributeSlides(slides || [], COLUMN_COUNT);
    

//     const renderCardContent = (slide, cardId, isMobileView) => {
//         const isHovered = hoveredIndex === cardId;
//         const linkUrl = slide.linkUrl || '#';
//         const hasLink = !!slide.linkUrl;

//         const cardStyle = {
//             ...styles.slideItemBase,
//             backgroundImage: slide.backgroundimage,
            
//             ...(isMobileView ? styles.mobileCardStyle : { 
//                 height: slide.height ? scaleValue(parseInt(slide.height, 10)) : scaleValue(250) 
//             }),

//             transform: isHovered ? 'scale(1.03)' : 'scale(1)',
//             cursor: hasLink ? 'pointer' : 'default',
//         };

//         const CardInnerContent = (
//             <div 
//                 style={cardStyle}
//                 onPointerEnter={() => hasLink && setHoveredIndex(cardId)}
//                 onPointerLeave={() => hasLink && setHoveredIndex(null)}
//             >
                
//                 <div style={styles.slideContentInner}>
//                     <div style={styles.overlay}></div>
//                     {slide.cashback && (
//                         <div
//                             style={{
//                                 ...styles.cashbackTag,
//                                 position: 'absolute',
//                                 top: scaleValue(15),
//                                 left: scaleValue(15),
//                                 zIndex: 3,
//                             }}
//                         >
//                             {slide.cashback}
//                         </div>
//                     )}
//                     {slide.iconImage && (
//                         <div style={styles.centeredIconWrapper}>
//                             <div style={styles.iconBox}>
//                                 <img src={slide.iconImage} alt="Brand Icon" style={styles.iconImage} />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );

        
//         if (hasLink) {
//             return (
//                 <a 
//                     key={slide.key || cardId} 
//                     href={linkUrl} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     style={{ textDecoration: 'none', display: 'block' }} 
//                 >
//                     {CardInnerContent}
//                 </a>
//             );
//         }

//         return (
//             <div key={slide.key || cardId}>
//                 {CardInnerContent}
//             </div>
//         );
//     };

//     const renderMobileCarousel = () => {
//         if (!slides) return null;
//         return (
//             <div style={styles.mobileCarouselWrapper}>
//                 {slides.map((slide, slideIndex) => 
//                     renderCardContent(slide, `mobile-${slideIndex}`, true)
//                 )}
//             </div>
//         );
//     };

//     const renderDesktopGrid = () =>
//         columnsData.map((columnSlides, columnIndex) => (
//             <div 
//                 key={columnIndex} 
//                 style={styles.columnWrapper}
//             >
//                 <div 
//                     ref={columnRefs.current[columnIndex]} 
//                     style={styles.columnContent}
//                 >
//                     {columnSlides.map((slide, slideIndex) => 
//                         renderCardContent(slide, `desktop-${columnIndex}-${slideIndex}`, false)
//                     )}
//                 </div>
//             </div>
//         ));

//     if (!slides || slides.length === 0) return null;

//     // --- Styles ---
//     const styles = {
//         container: {
//             padding: isMobile ? `${scaleValue(20)} 0` : `${scaleValue(40)} ${scaleValue(180)}`,
//             fontFamily: 'Arial, sans-serif',
//             backgroundColor: '#fff',
//         },
//         header: {
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             justifyContent: 'space-between',
//             alignItems: isMobile ? 'flex-start' : 'center',
//             marginBottom: isMobile ? scaleValue(10) : scaleValue(30),
//             padding: isMobile ? `0 ${scaleValue(20)}` : '0',
//         },
//         title: {
//             color: titleColor || '#000',
//             fontSize: isMobile ? scaleValue(24) : scaleValue(28),
//             fontWeight: '700',
//         },
        
//         seeAll: { 
//             color: '#ff4081',
//             textDecoration: 'none',
//             fontSize: scaleValue(14),
//             fontWeight: '600',
//             cursor: 'pointer',
//             marginTop: isMobile ? scaleValue(10) : '0',
//         },
        
//         desktopGridOuter: {
//             position: 'relative',
//             height: scaleValue(650),
//             overflow: 'hidden', 
//             width: '100%',
//             display: isMobile ? 'none' : 'block',
//         },

//         desktopGridInner: {
//             display: 'flex',
//             gap: scaleValue(GAP),
//             alignItems: 'flex-start',
//             width: '100%',
//         },
        
//         columnWrapper: { 
//             display: 'flex',
//             flexDirection: 'column', 
            
//             flex: `0 0 calc( (100% - ${scaleValue(GAP * (COLUMN_COUNT - 1))}) / ${COLUMN_COUNT} )`, 
//             boxSizing: 'border-box',
//         },

//         columnContent: {
//             display: 'flex',
//             flexDirection: 'column',
//             gap: scaleValue(GAP),
//             willChange: 'transform',
//         },

//         slideItemBase: {
//             display: 'block', 
//             borderRadius: scaleValue(20),
//             overflow: 'hidden',
//             position: 'relative',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             boxShadow: `0 ${getScaledValue(4)}px ${getScaledValue(15)}px rgba(0,0,0,0.05)`,
//             cursor: 'pointer',
//             width: '100%',
//             flexShrink: 0,
//             transition: 'transform 0.3s ease-out',
//             textDecoration: 'none', 
//             color: 'inherit', 
//         },
        
//         slideContentInner: {
//             position: 'relative',
//             width: '100%',
//             height: '100%',
//         },

//         overlay: {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(255, 255, 255, 0.4)',
//             zIndex: 1,
//         },

//         cashbackTag: {
//             backgroundColor: 'white',
//             color: '#ff4081',
//             padding: `${getScaledValue(5)}px ${getScaledValue(10)}px`,
//             borderRadius: scaleValue(15),
//             fontSize: scaleValue(12),
//             fontWeight: 'bold',
//             marginBottom: scaleValue(10),
//             alignSelf: 'flex-start',
//             boxShadow: `0 ${getScaledValue(2)}px ${getScaledValue(4)}px rgba(0,0,0,0.1)`,
//         },

//         centeredIconWrapper: {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 2,
//         },

//         iconBox: {
//             width: scaleValue(80),
//             height: scaleValue(80),
//             backgroundColor: 'white',
//             borderRadius: '50%',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             overflow: 'hidden',
//             boxShadow: `0 ${getScaledValue(4)}px ${getScaledValue(8)}px rgba(0,0,0,0.15)`,
//         },

//         fadeOverlay: {
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: scaleValue(120),
//             background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 90%)',
//             pointerEvents: 'none',
//             zIndex: 5,
//         },

//         iconImage: {
//             objectFit: 'cover',
//             width: '100%',
//             height: '100%',
//         },
        
        
//         mobileCarouselWrapper: {
//             display: 'flex',
//             gap: scaleValue(GAP),
//             overflowX: 'auto',
//             padding: `0 ${scaleValue(20)}`,
//             paddingBottom: scaleValue(20),
//             WebkitOverflowScrolling: 'touch',
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//         },
//         mobileCardStyle: {
            
//             width: `calc( (100vw - ${getScaledValue(40)}px - ${GAP * 0.7}px) / 1.3 - ${scaleValue(GAP)})`, 
//             height: scaleValue(350),
//             flexShrink: 0,
//         },
//     };

//     return (
//         <div style={styles.container}>
//             <header style={styles.header}>
//                 <h2 style={styles.title}>{title}</h2>
                
//                 <a href="#" style={styles.seeAll}>
//                     See all
//                 </a>
//             </header>

            
//             {isMobile ? (
//                 renderMobileCarousel()
//             ) : (
//                 <div style={styles.desktopGridOuter}>
//                     <div ref={gridInnerRef} style={styles.desktopGridInner}>
//                         {renderDesktopGrid()}
//                     </div>
//                     <div style={styles.fadeOverlay}></div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default KlarnaBrands;