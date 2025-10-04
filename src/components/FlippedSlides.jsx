
import React, { useState, useEffect, useRef } from 'react';


const ChevronRight = ({ color = '#fff', size = 24 }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ verticalAlign: 'middle' }}
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);


const FlippedSlides = ({ attributes }) => {
    const data = attributes || {};
    const { title, titleColor, slides } = data;

    const COLUMN_COUNT = 4;
    const GAP = 15;
    const MOBILE_BREAKPOINT = 768;
    const BASE_MOBILE_WIDTH = 414;
    
    
    const BASE_SCROLL_DURATION_SECONDS = 2.7;
    const STAGGER_DELAY_MS = 3000;
    const CYCLE_PAUSE_MS = 1500; 
    const [isMobile, setIsMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    
    const [flippedMobileCardId, setFlippedMobileCardId] = useState(null); 
    const [hoveredIndex, setHoveredIndex] = useState(null); 

    const gridInnerRef = useRef(null);
    const columnRefs = useRef(Array(COLUMN_COUNT).fill(null).map(() => React.createRef()));

    const [scrollData, setScrollData] = useState([]);
    
    const loopTimerRef = useRef(null); 
    

    
    const getFlipTransforms = (direction) => {
       
        switch (direction) {
            case 'right':
                return {
                    innerTransform: 'rotateY(180deg)',
                    backTransform: 'rotateY(-180deg)',
                };
            case 'left':
                return {
                    innerTransform: 'rotateY(-180deg)',
                    backTransform: 'rotateY(180deg)',
                };
            case 'down':
                return {
                    innerTransform: 'rotateX(-180deg)',
                    backTransform: 'rotateX(180deg)',
                };
            case 'up': 
            default:
                return {
                    innerTransform: 'rotateX(180deg)',
                    backTransform: 'rotateX(-180deg)',
                };
        }
    };

    useEffect(() => {
        const checkScreenSize = () => {
            if (typeof window !== 'undefined') {
                const width = window.innerWidth;
                setWindowWidth(width);
                setIsMobile(width <= MOBILE_BREAKPOINT);
                
                if (width > MOBILE_BREAKPOINT) {
                    setFlippedMobileCardId(null);
                }
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

       
        const runSequence = (direction, onComplete) => {
            const sequenceTimeouts = [];
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
                sequenceTimeouts.push(timerId);
            });

           
            const lastColumn = scrollData[COLUMN_COUNT - 1];
            const totalSequenceTime = (COLUMN_COUNT - 1) * STAGGER_DELAY_MS + lastColumn.duration * 1000;
            
            const nextStepTimer = setTimeout(() => {
              
                columnRefs.current.forEach(ref => {
                    if (ref.current) {
                        ref.current.style.transition = 'none';
                    }
                });
                
               
                onComplete();
            }, totalSequenceTime + CYCLE_PAUSE_MS); 
            sequenceTimeouts.push(nextStepTimer);

            return sequenceTimeouts;
        };
        
      
        const startLoop = () => {
            clearTimeout(loopTimerRef.current);
            
            const upSequence = () => {
                const upTimeouts = runSequence('UP', () => {
                  
                    loopTimerRef.current = setTimeout(downSequence, 50); 
                });
                return upTimeouts;
            };

            const downSequence = () => {
                const downTimeouts = runSequence('DOWN', () => {
                  
                    loopTimerRef.current = setTimeout(upSequence, 50); 
                });
                return downTimeouts;
            };

         
            loopTimerRef.current = setTimeout(upSequence, 50);
        };

        startLoop();

        return () => {
          
            clearTimeout(loopTimerRef.current);
            loopTimerRef.current = null;
            
         
            columnRefs.current.forEach(ref => {
                if (ref.current) {
                    ref.current.style.transition = 'none';
                    ref.current.style.transform = 'translateY(0px)';
                }
            });
        };
    }, [isMobile, scrollData, STAGGER_DELAY_MS, CYCLE_PAUSE_MS]); 


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
            boxShadow: `0 ${getScaledValue(4)}px ${getScaledValue(15)}px rgba(0,0,0,0.05)`,
            cursor: 'pointer',
            width: '100%',
            flexShrink: 0,
            textDecoration: 'none', 
            color: 'inherit', 
            perspective: '1000px',
        },

      
        flipCardInner: (isFlipped, flipTransform) => ({
            position: 'relative',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            transition: 'transform 0.6s ease', 
            transformStyle: 'preserve-3d',
        
            transform: isFlipped ? flipTransform : 'rotateX(0deg)',
            willChange: 'transform',
            
        }),

        cardFace: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
        },
        
        cardFaceFront: (slide) => ({
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: slide.backgroundimage,
            zIndex: 2,
        }),

        cardFaceBack: (backTransform) => ({
            backgroundColor: '#ff4081', 
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            padding: scaleValue(20),
            
            transform: backTransform, 
            fontSize: scaleValue(16),
            fontWeight: '600',
            textAlign: 'center',
            
            minHeight: '100%', 
        }),
  
        mobileCtaArrow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: scaleValue(20),
            right: scaleValue(20),
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: scaleValue(50),
            height: scaleValue(50),
            cursor: 'pointer',
            zIndex: 4,
            transition: 'background-color 0.2s',
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
            
            height: scaleValue(350), 
            width: `calc( (100vw - ${getScaledValue(40)}px - ${GAP * 0.7}px) / 1.3 - ${scaleValue(GAP)})`, 
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

    const handleMobileClick = (e, cardId, hasLink, hasDescription) => {
        if (!isMobile) return; 
        
        if (hasDescription) {
            e.preventDefault();
            setFlippedMobileCardId(flippedMobileCardId === cardId ? null : cardId);
            return;
        }
    }

    const handleArrowClick = (e, linkUrl) => {
        e.stopPropagation(); 
        e.preventDefault(); 
        
        if (linkUrl && linkUrl !== '#') {
            window.open(linkUrl, '_blank');
        }
    }

    const renderCardContent = (slide, cardId, isMobileView) => {
        
        const isFlipped = isMobileView 
            ? flippedMobileCardId === cardId 
            : hoveredIndex === cardId; 
        
        const linkUrl = slide.linkUrl || '#';
        const hasLink = !!slide.linkUrl;
        const hasDescription = !!slide.description;
        
        
        const direction = slide.flipDirection || 'up'; 
        const { innerTransform, backTransform } = getFlipTransforms(direction);


        // 1. Calculate the slide height 
        const slideHeight = isMobileView 
            ? styles.mobileCardStyle.height 
            : (slide.height ? scaleValue(parseInt(slide.height, 10)) : scaleValue(250));

        const cardContainerStyle = {
            ...styles.slideItemBase,
            
            height: slideHeight, 
            
            transform: isFlipped && !isMobileView && !hasDescription ? 'scale(1.03)' : 'scale(1)', 
            transition: 'transform 0.3s ease-out',
            
            ...(isMobileView ? styles.mobileCardStyle : {}),
            cursor: hasLink || hasDescription ? 'pointer' : 'default', 
        };

        
        const arrowSizePx = getScaledValue(28); 

        const CardInnerContent = (
            <div 
                style={cardContainerStyle}
                
                onPointerEnter={() => !isMobileView && (hasLink || hasDescription) && setHoveredIndex(cardId)}
                onPointerLeave={() => !isMobileView && (hasLink || hasDescription) && setHoveredIndex(null)}
               
                onClick={e => {
                    if (isMobileView && hasDescription) {
                        handleMobileClick(e, cardId, hasLink, hasDescription);
                    }
                }}
            >
                
                <div style={styles.flipCardInner(isFlipped, innerTransform)}>
                    
                    <div style={{ ...styles.cardFace, ...styles.cardFaceFront(slide) }}>
                        
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

                   {/* back description */}
                    {hasDescription && (
                        <div style={styles.cardFaceBack(backTransform)}>
                            {slide.description}
                            
                            
                            {isMobileView && hasLink && (
                                <div 
                                    style={styles.mobileCtaArrow}
                                    onClick={(e) => handleArrowClick(e, linkUrl)}
                                >
                                    <ChevronRight size={arrowSizePx} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );

       
        if (hasLink && (!isMobileView || !hasDescription)) { 
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

export default FlippedSlides;




// import React, { useState, useEffect, useRef } from 'react';

// // FIX: Ensure ChevronRight is defined outside the main component 
// const ChevronRight = ({ color = '#fff', size = 24 }) => (
//     <svg 
//         xmlns="http://www.w3.org/2000/svg" 
//         width={size} 
//         height={size} 
//         viewBox="0 0 24 24" 
//         fill="none" 
//         stroke={color} 
//         strokeWidth="2" 
//         strokeLinecap="round" 
//         strokeLinejoin="round"
//         style={{ verticalAlign: 'middle' }}
//     >
//         <polyline points="9 18 15 12 9 6"></polyline>
//     </svg>
// );


// const FlippedSlides = ({ attributes }) => {
//     // ... (rest of the component's state, constants, and useEffects remain the same)
//     const data = attributes || {};
//     const { title, titleColor, slides } = data;

//     const COLUMN_COUNT = 4;
//     const GAP = 15;
//     const MOBILE_BREAKPOINT = 768;
//     const BASE_MOBILE_WIDTH = 414;
    
    
//     const BASE_SCROLL_DURATION_SECONDS = 1.7;
//     const STAGGER_DELAY_MS = 2000;
//     const CYCLE_PAUSE_MS = 1000;

//     const [isMobile, setIsMobile] = useState(false);
//     const [windowWidth, setWindowWidth] = useState(0);
    
//     const [flippedMobileCardId, setFlippedMobileCardId] = useState(null); 
//     const [hoveredIndex, setHoveredIndex] = useState(null); 

//     const gridInnerRef = useRef(null);
//     const columnRefs = useRef(Array(COLUMN_COUNT).fill(null).map(() => React.createRef()));

//     const [scrollData, setScrollData] = useState([]);

    
    
//     const getFlipTransforms = (direction) => {
//         // ... (getFlipTransforms logic remains the same)
//         switch (direction) {
//             case 'right':
//                 return {
//                     innerTransform: 'rotateY(180deg)',
//                     backTransform: 'rotateY(-180deg)',
//                 };
//             case 'left':
//                 return {
//                     innerTransform: 'rotateY(-180deg)',
//                     backTransform: 'rotateY(180deg)',
//                 };
//             case 'down':
//                 return {
//                     innerTransform: 'rotateX(-180deg)',
//                     backTransform: 'rotateX(180deg)',
//                 };
//             case 'up': 
//             default:
//                 return {
//                     innerTransform: 'rotateX(180deg)',
//                     backTransform: 'rotateX(-180deg)',
//                 };
//         }
//     };

//     useEffect(() => {
//         const checkScreenSize = () => {
//             if (typeof window !== 'undefined') {
//                 const width = window.innerWidth;
//                 setWindowWidth(width);
//                 setIsMobile(width <= MOBILE_BREAKPOINT);
                
//                 if (width > MOBILE_BREAKPOINT) {
//                     setFlippedMobileCardId(null);
//                 }
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
 
//     useEffect(() => {
//         // ... (auto-scrolling effect logic remains the same)
//         if (isMobile) return;

//         const timeout = setTimeout(() => {
//             const viewportHeight = getScaledValue(650);
//             const columns = columnRefs.current.map(ref => ref.current);
//             let totalMaxScroll = 0;

//             const calculatedData = columns.map(el => {
//                 if (!el) return { maxScroll: 0, duration: 0 };
                
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

//     useEffect(() => {
//         // ... (auto-scrolling effect logic remains the same)
//         if (isMobile || scrollData.length === 0) return;

//         let timeouts = [];
        
//         const runSequence = (direction) => {
//             const isUp = direction === 'UP';
//             const target = isUp ? (data) => data.maxScroll : () => 0;

//             scrollData.forEach((column, index) => {
//                 if (column.maxScroll <= 0) return;

//                 const delay = index * STAGGER_DELAY_MS;
                
//                 const timerId = setTimeout(() => {
//                     const ref = columnRefs.current[index].current;
//                     if (ref) {
//                         ref.style.transition = `transform ${column.duration}s linear`;
//                         ref.style.transform = `translateY(${-target(column)}px)`;
//                     }
//                 }, delay);
//                 timeouts.push(timerId);
//             });

//             const lastColumn = scrollData[COLUMN_COUNT - 1];
//             const totalSequenceTime = (COLUMN_COUNT - 1) * STAGGER_DELAY_MS + lastColumn.duration * 1000;
            
//             const nextSequenceTimer = setTimeout(() => {
//                     columnRefs.current.forEach(ref => {
//                         if (ref.current) {
//                             ref.current.style.transition = 'none';
//                         }
//                     });

//                     if (isUp) {
//                         runSequence('DOWN');
//                     } else {
                        
//                     }
//             }, totalSequenceTime + CYCLE_PAUSE_MS);
//             timeouts.push(nextSequenceTimer);
//         };
        
//         runSequence('UP');

//         return () => {
//             timeouts.forEach(clearTimeout);
//             columnRefs.current.forEach(ref => {
//                 if (ref.current) {
//                     ref.current.style.transition = 'none';
//                     ref.current.style.transform = 'translateY(0px)';
//                 }
//             });
//         };
//     }, [isMobile, scrollData]);


//     // --- Styles ---
//     const styles = {
//         // ... (general styles)
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
//             boxShadow: `0 ${getScaledValue(4)}px ${getScaledValue(15)}px rgba(0,0,0,0.05)`,
//             cursor: 'pointer',
//             width: '100%',
//             flexShrink: 0,
//             textDecoration: 'none', 
//             color: 'inherit', 
//             perspective: '1000px',
//         },

        
//         // This function controls the flip animation for both mobile/desktop.
//         flipCardInner: (isFlipped, flipTransform) => ({
//             position: 'relative',
//             width: '100%',
//             height: '100%',
//             textAlign: 'center',
//             transition: 'transform 0.6s ease', 
//             transformStyle: 'preserve-3d',
        
//             transform: isFlipped ? flipTransform : 'rotateX(0deg)',
//             willChange: 'transform',
            
//         }),

//         cardFace: {
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             WebkitBackfaceVisibility: 'hidden',
//             backfaceVisibility: 'hidden',
//         },
        
//         cardFaceFront: (slide) => ({
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundImage: slide.backgroundimage,
//             zIndex: 2,
//         }),

//         cardFaceBack: (backTransform) => ({
//             backgroundColor: '#ff4081', 
//             color: '#fff',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center', 
//             alignItems: 'center',
//             padding: scaleValue(20),
            
//             transform: backTransform, 
//             fontSize: scaleValue(16),
//             fontWeight: '600',
//             textAlign: 'center',
            
//             minHeight: '100%', 
//         }),
        
//         // Style for the mobile CTA arrow on the back of the card
//         mobileCtaArrow: {
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'absolute',
//             bottom: scaleValue(20),
//             right: scaleValue(20),
//             backgroundColor: 'rgba(255, 255, 255, 0.2)',
//             borderRadius: '50%',
//             width: scaleValue(50),
//             height: scaleValue(50),
//             cursor: 'pointer',
//             zIndex: 4,
//             transition: 'background-color 0.2s',
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
            
//             height: scaleValue(350), 
//             width: `calc( (100vw - ${getScaledValue(40)}px - ${GAP * 0.7}px) / 1.3 - ${scaleValue(GAP)})`, 
//             flexShrink: 0,
//         },
//     };

 
//     const distributeSlides = (slides = [], numColumns) => {
//         const columns = Array.from({ length: numColumns }, () => []);
//         slides.forEach((slide, index) => {
//             columns[index % numColumns].push(slide);
//         });
//         return columns;
//     };

//     const columnsData = distributeSlides(slides || [], COLUMN_COUNT);

//     const handleMobileClick = (e, cardId, hasLink, hasDescription) => {
//         if (!isMobile) return; 
        
//         if (hasDescription) {
//             e.preventDefault();
//             setFlippedMobileCardId(flippedMobileCardId === cardId ? null : cardId);
//             return;
//         }
//     }

//     const handleArrowClick = (e, linkUrl) => {
//         e.stopPropagation(); 
//         e.preventDefault(); 
        
//         if (linkUrl && linkUrl !== '#') {
//             window.open(linkUrl, '_blank');
//         }
//     }

//     const renderCardContent = (slide, cardId, isMobileView) => {
//         // UPDATION: Define isFlipped based on view
//         const isFlipped = isMobileView 
//             ? flippedMobileCardId === cardId 
//             : hoveredIndex === cardId; 
        
//         const linkUrl = slide.linkUrl || '#';
//         const hasLink = !!slide.linkUrl;
//         const hasDescription = !!slide.description;
        
        
//         const direction = slide.flipDirection || 'up'; 
//         const { innerTransform, backTransform } = getFlipTransforms(direction);


//         // 1. Calculate the slide height 
//         const slideHeight = isMobileView 
//             ? styles.mobileCardStyle.height 
//             : (slide.height ? scaleValue(parseInt(slide.height, 10)) : scaleValue(250));

//         const cardContainerStyle = {
//             ...styles.slideItemBase,
            
//             height: slideHeight, 
            
//             // Desktop Scale Effect: Only scale if it's desktop AND hovered AND not a flipping card
//             // We use isFlipped here, as it's equivalent to hoveredIndex === cardId on desktop.
//             transform: isFlipped && !isMobileView && !hasDescription ? 'scale(1.03)' : 'scale(1)', 
//             transition: 'transform 0.3s ease-out',
            
//             ...(isMobileView ? styles.mobileCardStyle : {}),
//             cursor: hasLink || hasDescription ? 'pointer' : 'default', 
//         };

//         // Calculate the raw pixel size for the ChevronRight component 
//         const arrowSizePx = getScaledValue(28); 

//         const CardInnerContent = (
//             <div 
//                 style={cardContainerStyle}
//                 // UPDATION: Desktop Hover logic remains strict (only runs if !isMobileView)
//                 onPointerEnter={() => !isMobileView && (hasLink || hasDescription) && setHoveredIndex(cardId)}
//                 onPointerLeave={() => !isMobileView && (hasLink || hasDescription) && setHoveredIndex(null)}
                
//                 // Mobile Click logic: Triggers flip for mobile cards with descriptions
//                 onClick={e => {
//                     if (isMobileView && hasDescription) {
//                         handleMobileClick(e, cardId, hasLink, hasDescription);
//                     }
//                 }}
//             >
                
//                 <div style={styles.flipCardInner(isFlipped, innerTransform)}>
                    
//                     <div style={{ ...styles.cardFace, ...styles.cardFaceFront(slide) }}>
                        
//                         <div style={styles.slideContentInner}>
//                             <div style={styles.overlay}></div>
//                             {slide.cashback && (
//                                 <div
//                                     style={{
//                                         ...styles.cashbackTag,
//                                         position: 'absolute',
//                                         top: scaleValue(15),
//                                         left: scaleValue(15),
//                                         zIndex: 3,
//                                     }}
//                                 >
//                                     {slide.cashback}
//                                 </div>
//                             )}
//                             {slide.iconImage && (
//                                 <div style={styles.centeredIconWrapper}>
//                                     <div style={styles.iconBox}>
//                                         <img src={slide.iconImage} alt="Brand Icon" style={styles.iconImage} />
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Back Face (Description)  */}
//                     {hasDescription && (
//                         <div style={styles.cardFaceBack(backTransform)}>
//                             {slide.description}
                            
//                             {/* Mobile CTA Arrow (only shows on mobile, on flipped back face) */}
//                             {isMobileView && hasLink && (
//                                 <div 
//                                     style={styles.mobileCtaArrow}
//                                     onClick={(e) => handleArrowClick(e, linkUrl)}
//                                 >
//                                     <ChevronRight size={arrowSizePx} />
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );

        
//         // Desktop Link Logic: Only wrap in <a> if it has a link AND 
//         // it's desktop (hover controlled) OR it's a mobile card that can't flip (tap controlled).
//         if (hasLink && (!isMobileView || !hasDescription)) { 
//             return (
//                 <a 
//                     key={cardId}
//                     href={linkUrl} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     style={{ textDecoration: 'none', display: 'block' }} 
//                 >
//                     {CardInnerContent}
//                 </a>
//             );
//         }
        
//         // Mobile Link Logic (flippable cards): The link is handled by the inner div/arrow, no outer <a> tag.
//         return (
//             <div key={cardId}>
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

// export default FlippedSlides;

