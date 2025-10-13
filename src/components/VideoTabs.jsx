



import React, { useState, useRef, useEffect, useCallback } from "react";

let youtubePlayer = null;

const VideoTabs = ({ attributes }) => {
    const {
        backgroundColor = "#f5f7ff",
        barBoxColor = "#ffffff",
        hoverBoxColor = "#dfe5ff",
        hoverTextBackground = "#4e6ef2",
        icons = [],
    } = attributes;

    const [activeIndex, setActiveIndex] = useState(0);
    const [muted, setMuted] = useState(true);
    const [scale, setScale] = useState(1); 
    const [videoProgress, setVideoProgress] = useState(0); // 👈 NEW: State for progress (0-100)
    
    const videoRef = useRef(null);
    const youtubeContainerRef = useRef(null);
    const barRef = useRef(null);
    const buttonRefs = useRef([]);
    const progressIntervalRef = useRef(null); // 👈 NEW: Ref to hold the interval ID

    const isYouTube = (url) =>
        url?.includes("youtube.com") || url?.includes("youtu.be");

    const currentUrl = icons[activeIndex]?.vdo || "";
    const isCurrentVideoYouTube = isYouTube(currentUrl);

    const getYouTubeId = useCallback((url) => {
        if (url.includes("youtu.be")) return url.split("youtu.be/")[1]?.split("?")[0];
        if (url.includes("watch?v=")) return url.split("watch?v=")[1]?.split("&")[0];
        return null;
    }, []);

    const getEmbedUrl = useCallback(
        (url) => (isYouTube(url) ? getYouTubeId(url) : url),
        [getYouTubeId]
    );

    const embedId = getEmbedUrl(currentUrl);
    
    // -------------------------------------------------------------------
    // 🔹 Progress Tracking Logic (NEW)
    // -------------------------------------------------------------------

    const updateProgress = useCallback(() => {
        let currentTime = 0;
        let duration = 0;

        if (isCurrentVideoYouTube && youtubePlayer?.getPlayerState) {
            // Check if player is playing (state 1) or paused (state 2)
            const playerState = youtubePlayer.getPlayerState();
            if (playerState === window.YT.PlayerState.PLAYING || playerState === window.YT.PlayerState.PAUSED) {
                duration = youtubePlayer.getDuration();
                currentTime = youtubePlayer.getCurrentTime();
            }
        } else if (videoRef.current && !isCurrentVideoYouTube) {
            const videoElement = videoRef.current;
            if (!videoElement.paused) {
                duration = videoElement.duration;
                currentTime = videoElement.currentTime;
            }
        }
        
        if (duration > 0) {
            const progress = (currentTime / duration) * 100;
            setVideoProgress(progress);
        } else if (duration === 0) {
            setVideoProgress(0);
        }
    }, [isCurrentVideoYouTube]);

    const startProgressTracking = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        // Update progress every 200ms
        progressIntervalRef.current = setInterval(updateProgress, 200);
    }, [updateProgress]);

    const stopProgressTracking = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
        setVideoProgress(0); // Reset progress when stopped
    }, []);

    // -------------------------------------------------------------------
    // 🔹 Scale multiplier calculation (EXISTING)
    // -------------------------------------------------------------------

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let newScale = Math.min(Math.max(width / 1200, 0.75), 1);
            setScale(newScale);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // -------------------------------------------------------------------
    // 🔇 Mute Toggle Logic (EXISTING)
    // -------------------------------------------------------------------

    const toggleMute = () => {
        const newMuted = !muted;
        setMuted(newMuted);

        if (isCurrentVideoYouTube && youtubePlayer) {
            if (newMuted) youtubePlayer.mute();
            else {
                youtubePlayer.unMute();
                youtubePlayer.setVolume(50);
            }
        }
    };

    // -------------------------------------------------------------------
    // 🎬 YouTube Player Effect (UPDATED to include progress tracking)
    // -------------------------------------------------------------------

    useEffect(() => {
        stopProgressTracking(); // Stop tracking from previous video/state
        setVideoProgress(0); // Reset progress

        if (isCurrentVideoYouTube && embedId && window.YT) {
            if (youtubePlayer) {
                youtubePlayer.destroy();
                youtubePlayer = null;
            }

            youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
                videoId: embedId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    fs: 0,
                    playsinline: 1,
                    mute: 1,
                },
                events: {
                    onReady: (event) => {
                        if (muted) event.target.mute();
                        else {
                            event.target.unMute();
                            event.target.setVolume(50);
                        }
                        event.target.playVideo();
                        startProgressTracking(); // 👈 Start tracking
                    },
                    onStateChange: (event) => { // 👈 Handle video end
                        // YT.PlayerState.ENDED is 0
                        if (event.data === window.YT.PlayerState.ENDED) {
                            setVideoProgress(100);
                            stopProgressTracking();
                        } else if (event.data === window.YT.PlayerState.PLAYING) {
                            startProgressTracking();
                        }
                    },
                },
            });
        }

        return () => {
            stopProgressTracking(); // 👈 Stop tracking on cleanup
            if (youtubePlayer?.destroy) {
                youtubePlayer.destroy();
                youtubePlayer = null;
            }
        };
    }, [activeIndex, isCurrentVideoYouTube, embedId, muted, startProgressTracking, stopProgressTracking]); // Added new dependencies

    // -------------------------------------------------------------------
    // 🌐 Load YouTube API (EXISTING)
    // -------------------------------------------------------------------

    useEffect(() => {
        if (!window.YT && !document.getElementById("youtube-iframe-api")) {
            const tag = document.createElement("script");
            tag.id = "youtube-iframe-api";
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
            // Initial player logic is now handled by the main useEffect to ensure correct cleanup/re-initialization.
        };
    }, []);

    // -------------------------------------------------------------------
    // 📼 HTML5 Video Effect (UPDATED to include progress tracking)
    // -------------------------------------------------------------------
    
    useEffect(() => {
        stopProgressTracking(); // Reset tracking when tab changes
        
        if (videoRef.current && !isCurrentVideoYouTube) {
            const videoElement = videoRef.current;
            videoElement.muted = muted;
            
            // Listen for native video end
            const handleVideoEnd = () => {
                setVideoProgress(100);
                stopProgressTracking();
            };
            videoElement.addEventListener('ended', handleVideoEnd);

            videoElement.play().then(() => {
                 startProgressTracking(); // 👈 Start tracking after successful play
            }).catch(() => { });

            return () => {
                stopProgressTracking();
                videoElement.removeEventListener('ended', handleVideoEnd);
            };
        }
        // Cleanup when switching to YouTube video
        return () => {
            stopProgressTracking();
        }
    }, [activeIndex, muted, isCurrentVideoYouTube, startProgressTracking, stopProgressTracking]);


    // -------------------------------------------------------------------
    // 📱 Mobile Scroll Effect (EXISTING)
    // -------------------------------------------------------------------
    
    useEffect(() => {
        const bar = barRef.current;
        const activeButton = buttonRefs.current[activeIndex];
    
        if (bar && activeButton && window.innerWidth <= 768) {
            const scrollLeft =
                activeButton.offsetLeft -
                bar.clientWidth / 2 +
                activeButton.clientWidth / 2;
    
            bar.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            });
        }
    }, [activeIndex]);


    if (!icons.length)
        return <p style={{ textAlign: "center" }}>No videos available.</p>;

    return (
        <div
            // 🔹 Outer Wrapper (takes full width and height)
            style={{
                width: "100%",
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: `${1200 * scale}px`,
                    backgroundColor,
                    borderRadius: `${25 * scale}px`,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    fontFamily: "Inter, Arial, sans-serif",
                    padding: window.innerWidth <= 768 ? "20px" : `${30 * scale}px`,
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    transform: "none",
                    transformOrigin: "unset",
                    margin: window.innerWidth <= 768 ? "30px 0 0 0" : "20px auto",
                    boxSizing: "border-box",
                }}
            >

                {/* Tabs Bar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: `${25 * scale}px`,
                    }}
                >
                    <div
                        ref={barRef}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: `${20 * scale}px`,
                            backgroundColor: "#e7ebfc",
                            padding: `${15 * scale}px ${25 * scale}px`,
                            borderRadius: `${40 * scale}px`,
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            scrollbarWidth: "none",
                            maxWidth: "100%",
                        }}
                    >
                        {icons.map((item, index) => {
                            const isButtonActive = index === activeIndex;
                            const currentProgress = isButtonActive ? videoProgress : 0;
                            const textButtonColor = isButtonActive ? "#003366" : "#333";
                            const buttonBaseColor = barBoxColor; // e.g., #ffffff
                            const buttonProgressColor = "#dfe5ff"; // e.g., #4e6ef2

                            return (
                                <button
                                    key={index}
                                    ref={(el) => (buttonRefs.current[index] = el)}
                                    onClick={() => setActiveIndex(index)}
                                    style={{
                                        flexShrink: 0,
                                        width: `${160 * scale}px`,
                                        padding: `${10 * scale}px ${18 * scale}px`,
                                        border: "none",
                                        borderRadius: `${24 * scale}px`,
                                        cursor: "pointer",
                                        
                                        // 👈 NEW: Base color for the button (unfilled part)
                                        backgroundColor: buttonBaseColor,

                                        // 👈 NEW: Use linear-gradient to visualize progress
                                        backgroundImage: isButtonActive
                                            ? `linear-gradient(to right, ${buttonProgressColor} ${currentProgress}%, ${buttonBaseColor} ${currentProgress}%)`
                                            : 'none',

                                        // 👈 NEW: Smooth transition for the background-image (progress bar)
                                        transition: "all 0.3s ease, background-image 0.2s linear",
                                        
                                        // Text Color
                                        color: textButtonColor,
                                        
                                        fontWeight: "600",
                                        fontSize: `${16 * scale}px`,
                                        textAlign: "center",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {item.title}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Video Container (EXISTING) */}
                <div
                    className="video-player-responsive-area"
                    style={{
                        width: "100%",
                        height: 0,
                        position: "relative",
                        paddingBottom: "56.25%",
                        backgroundColor: "#000",
                        borderRadius: `${10 * scale}px`,
                        overflow: "hidden",
                    }}
                >
                    {isCurrentVideoYouTube ? (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <div
                                ref={youtubeContainerRef}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    ) : (
                        <video
                            ref={videoRef}
                            key={embedId}
                            src={embedId}
                            autoPlay
                            loop
                            muted={muted}
                            playsInline
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    )}
                </div>

                {/* 🔇 Mute Button (EXISTING) */}
                <button
                    className="mute-btn-responsive"
                    onClick={toggleMute}
                    style={{
                        background: "transparent",
                        border: "none",
                        fontSize: `${26 * scale}px`,
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "all 0.3s ease",
                    }}
                    title={muted ? "Unmute" : "Mute"}
                >
                    {muted ? "🔇" : "🔊"}
                </button>

                <style>
                    {`
                        .video-tabs-bar::-webkit-scrollbar {
                            display: none;
                        }

                        @media (max-width: 768px) {
                            .mute-btn-responsive {
                                position: absolute;
                                bottom: calc(30px + 15px);
                                right: 45px;
                                color: #fff;
                                text-shadow: 0 0 5px rgba(0,0,0,0.5);
                            }
                        }

                        @media (min-width: 769px) {
                            .mute-btn-responsive {
                                position: absolute;
                                top: 35px;
                                right: 30px;
                                color: #333;
                            }
                        }
                    `}
                </style>
            </div>
        </div>
    );
};

export default VideoTabs;






// import React, { useState, useRef, useEffect, useCallback } from "react";

// let youtubePlayer = null;

// const VideoTabs = ({ attributes }) => {
//     const {
//         backgroundColor = "#f5f7ff",
//         barBoxColor = "#ffffff",
//         hoverBoxColor = "#dfe5ff",
//         hoverTextBackground = "#4e6ef2",
//         icons = [],
//     } = attributes;

//     const [activeIndex, setActiveIndex] = useState(0);
//     const [muted, setMuted] = useState(true);
//     const [scale, setScale] = useState(1); 
//     const videoRef = useRef(null);
//     const youtubeContainerRef = useRef(null);

//     const barRef = useRef(null);
//     const buttonRefs = useRef([]);



//     const isYouTube = (url) =>
//         url?.includes("youtube.com") || url?.includes("youtu.be");

//     const currentUrl = icons[activeIndex]?.vdo || "";
//     const isCurrentVideoYouTube = isYouTube(currentUrl);

//     const getYouTubeId = useCallback((url) => {
//         if (url.includes("youtu.be")) return url.split("youtu.be/")[1]?.split("?")[0];
//         if (url.includes("watch?v=")) return url.split("watch?v=")[1]?.split("&")[0];
//         return null;
//     }, []);

//     const getEmbedUrl = useCallback(
//         (url) => (isYouTube(url) ? getYouTubeId(url) : url),
//         [getYouTubeId]
//     );

//     const embedId = getEmbedUrl(currentUrl);

//     // 🔹 Scale multiplier calculation
//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth;
//             // Adjust multiplier based on width (smooth scaling)
//             let newScale = Math.min(Math.max(width / 1200, 0.75), 1);
//             // ensures between 0.75x and 1x
//             setScale(newScale);
//         };

//         handleResize(); // initialize on mount
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // 🔇 Mute Toggle Logic
//     const toggleMute = () => {
//         const newMuted = !muted;
//         setMuted(newMuted);

//         if (isCurrentVideoYouTube && youtubePlayer) {
//             if (newMuted) youtubePlayer.mute();
//             else {
//                 youtubePlayer.unMute();
//                 youtubePlayer.setVolume(50);
//             }
//         }
//     };

//     useEffect(() => {
//         if (isCurrentVideoYouTube && embedId && window.YT) {
//             if (youtubePlayer) {
//                 youtubePlayer.destroy();
//                 youtubePlayer = null;
//             }

//             youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
//                 videoId: embedId,
//                 playerVars: {
//                     autoplay: 1,
//                     controls: 0,
//                     modestbranding: 1,
//                     rel: 0,
//                     fs: 0,
//                     playsinline: 1,
//                     mute: 1,
//                 },
//                 events: {
//                     onReady: (event) => {
//                         if (muted) event.target.mute();
//                         else {
//                             event.target.unMute();
//                             event.target.setVolume(50);
//                         }
//                         event.target.playVideo();
//                     },
//                 },
//             });
//         }

//         return () => {
//             if (youtubePlayer?.destroy) {
//                 youtubePlayer.destroy();
//                 youtubePlayer = null;
//             }
//         };
//     }, [activeIndex, isCurrentVideoYouTube, embedId]);

//     // Load YouTube API
//     useEffect(() => {
//         if (!window.YT && !document.getElementById("youtube-iframe-api")) {
//             const tag = document.createElement("script");
//             tag.id = "youtube-iframe-api";
//             tag.src = "https://www.youtube.com/iframe_api";
//             const firstScriptTag = document.getElementsByTagName("script")[0];
//             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//         }

//         window.onYouTubeIframeAPIReady = () => {
//             if (isCurrentVideoYouTube && embedId && youtubeContainerRef.current) {
//                 youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
//                     videoId: embedId,
//                     playerVars: {
//                         autoplay: 1,
//                         controls: 0,
//                         modestbranding: 1,
//                         rel: 0,
//                         mute: 1,
//                         playsinline: 1,
//                     },
//                     events: {
//                         onReady: (event) => {
//                             if (muted) event.target.mute();
//                             else {
//                                 event.target.unMute();
//                                 event.target.setVolume(50);
//                             }
//                             event.target.playVideo();
//                         },
//                     },
//                 });
//             }
//         };
//     }, []);

//     useEffect(() => {
//   const bar = barRef.current;
//   const activeButton = buttonRefs.current[activeIndex];

//   if (bar && activeButton && window.innerWidth <= 768) {
//     const barRect = bar.getBoundingClientRect();
//     const buttonRect = activeButton.getBoundingClientRect();
//     const scrollLeft =
//       activeButton.offsetLeft -
//       bar.clientWidth / 2 +
//       activeButton.clientWidth / 2;

//     bar.scrollTo({
//       left: scrollLeft,
//       behavior: "smooth",
//     });
//   }
// }, [activeIndex]);


//     useEffect(() => {
//         if (videoRef.current && !isCurrentVideoYouTube) {
//             videoRef.current.muted = muted;
//             videoRef.current.play().catch(() => { });
//         }
//     }, [activeIndex, muted, isCurrentVideoYouTube]);

//     if (!icons.length)
//         return <p style={{ textAlign: "center" }}>No videos available.</p>;

//   return (
//   <div
//     // 🔹 Outer Wrapper (takes full width and height)
//     style={{
//       width: "100%",
   
//       margin: 0,
//       padding: 0,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor, // matches container background
//       overflow: "hidden",
//     }}
//   >
//   <div
//   style={{
//     width: "100%",
//     maxWidth: `${1200 * scale}px`,
//     backgroundColor,
//     borderRadius: `${25 * scale}px`,
//     boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
//     fontFamily: "Inter, Arial, sans-serif",
//     padding: window.innerWidth <= 768 ? "20px" : `${30 * scale}px`,
//     flexDirection: "column",
//     alignItems: "center",
//     position: "relative",
//     // ✅ remove transform scaling (let width handle scaling)
//     transform: "none",
//     transformOrigin: "unset",
//     // ✅ responsive margin: no left margin on small screen
//     margin: window.innerWidth <= 768 ? "30px 0 0 0" : "20px auto",
//     boxSizing: "border-box",
//   }}
// >

//       {/* Tabs Bar */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100%",
//           marginBottom: `${25 * scale}px`,
//         }}
//       >
//         <div
//           ref={barRef}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: `${20 * scale}px`,
//             backgroundColor: "#e7ebfc",
//             padding: `${15 * scale}px ${25 * scale}px`,
//             borderRadius: `${40 * scale}px`,
//             overflowX: "auto",
//             whiteSpace: "nowrap",
//             scrollbarWidth: "none",
//             maxWidth: "100%",
//           }}
//         >
//           {icons.map((item, index) => (
//             <button
//               key={index}
//               ref={(el) => (buttonRefs.current[index] = el)}
//               onClick={() => setActiveIndex(index)}
//               style={{
//                 flexShrink: 0,
//                  width: `${160 * scale}px`, // ✅ fixed width for all buttons
//     //   padding: `${10 * scale}px 0`, // ✅ center text vertically
//                 padding: `${10 * scale}px ${18 * scale}px`,
//                 border: "none",
//                 borderRadius: `${24 * scale}px`,
//                 cursor: "pointer",
//                 backgroundColor:
//                   index === activeIndex ? hoverTextBackground : barBoxColor,
//                 color: index === activeIndex ? "#fff" : "#333",
//                 fontWeight: "600",
//                 transition: "all 0.3s ease",
//                 fontSize: `${16 * scale}px`,
//                  textAlign: "center", // ✅ ensures label stays centered
//       whiteSpace: "nowrap", // ✅ prevents text wrapping
//               }}
//             >
//               {item.title}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Video Container */}
//       <div
//         className="video-player-responsive-area"
//         style={{
//           width: "100%",
//           height: 0,
//           position: "relative",
//           paddingBottom: "56.25%",
//           backgroundColor: "#000",
//           borderRadius: `${10 * scale}px`,
//           overflow: "hidden",
//         }}
//       >
//         {isCurrentVideoYouTube ? (
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <div
//               ref={youtubeContainerRef}
//               style={{ width: "100%", height: "100%" }}
//             />
//           </div>
//         ) : (
//           <video
//             ref={videoRef}
//             key={embedId}
//             src={embedId}
//             autoPlay
//             loop
//             muted={muted}
//             playsInline
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />
//         )}
//       </div>

//       {/* 🔇 Mute Button */}
//       <button
//         className="mute-btn-responsive"
//         onClick={toggleMute}
//         style={{
//           background: "transparent",
//           border: "none",
//           fontSize: `${26 * scale}px`,
//           cursor: "pointer",
//           zIndex: 10,
//           transition: "all 0.3s ease",
//         }}
//         title={muted ? "Unmute" : "Mute"}
//       >
//         {muted ? "🔇" : "🔊"}
//       </button>

//       <style>
//         {`
//           .video-tabs-bar::-webkit-scrollbar {
//             display: none;
//           }

//           @media (max-width: 768px) {
//             .mute-btn-responsive {
//               position: absolute;
//               bottom: calc(30px + 15px);
//               right: 45px;
//               color: #fff;
//               text-shadow: 0 0 5px rgba(0,0,0,0.5);
//             }
//           }

//           @media (min-width: 769px) {
//             .mute-btn-responsive {
//               position: absolute;
//               top: 35px;
//               right: 30px;
//               color: #333;
//             }
//           }
//         `}
//       </style>
//     </div>
//   </div>
// );

// };

// export default VideoTabs;