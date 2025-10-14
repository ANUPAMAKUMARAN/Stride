
// import React, { useState, useRef, useEffect, useCallback } from "react";

// let youtubePlayer = null;

// const VideoTabs = ({ attributes }) => {
//     const {
//         backgroundColor,
//         barBoxColor,
//         icons = [],
//     } = attributes;

//     const [activeIndex, setActiveIndex] = useState(0);
//     const [muted, setMuted] = useState(true);
//     const [scale, setScale] = useState(1);
//     const [videoProgress, setVideoProgress] = useState(0);

//     const videoRef = useRef(null);
//     const youtubeContainerRef = useRef(null);
//     const barRef = useRef(null);
//     const buttonRefs = useRef([]);
//     const progressIntervalRef = useRef(null);

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


//     // Video progress tracking
//     // -------------------------------------------------------------------
//     const updateProgress = useCallback(() => {
//         let currentTime = 0;
//         let duration = 0;

//         if (isCurrentVideoYouTube && youtubePlayer?.getPlayerState) {
//             const state = youtubePlayer.getPlayerState();
//             if (state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.PAUSED) {
//                 duration = youtubePlayer.getDuration();
//                 currentTime = youtubePlayer.getCurrentTime();
//             }
//         } else if (videoRef.current && !isCurrentVideoYouTube) {
//             const videoElement = videoRef.current;
//             duration = videoElement.duration || 0;
//             currentTime = videoElement.currentTime || 0;
//         }

//         if (duration > 0) setVideoProgress((currentTime / duration) * 100);
//         else setVideoProgress(0);
//     }, [isCurrentVideoYouTube]);

//     const startProgressTracking = useCallback(() => {
//         if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
//         progressIntervalRef.current = setInterval(updateProgress, 200);
//     }, [updateProgress]);

//     const stopProgressTracking = useCallback(() => {
//         if (progressIntervalRef.current) {
//             clearInterval(progressIntervalRef.current);
//             progressIntervalRef.current = null;
//         }
//     }, []);

//     // -------------------------------------------------------------------
//     // Scale calculation
//     // -------------------------------------------------------------------
//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth;
//             setScale(Math.min(Math.max(width / 1200, 0.75), 1));
//         };
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Toggle mute
    
//     const toggleMute = () => {
//         const newMuted = !muted;
//         setMuted(newMuted);

//         if (isCurrentVideoYouTube && youtubePlayer) {
//             if (newMuted) youtubePlayer.mute();
//             else {
//                 youtubePlayer.unMute();
//                 youtubePlayer.setVolume(50);
//             }
//         } else if (videoRef.current && !isCurrentVideoYouTube) {
//             videoRef.current.muted = newMuted;
//         }
//     };

   
//     // YouTube player initialization (muted toggle decoupled)
   
//     useEffect(() => {
//         stopProgressTracking();
//         setVideoProgress(0);

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
//                         startProgressTracking();
//                     },
//                     onStateChange: (event) => {
//                         if (event.data === window.YT.PlayerState.ENDED) {
//                             setVideoProgress(100);
//                             stopProgressTracking();
//                         } else if (event.data === window.YT.PlayerState.PLAYING) {
//                             startProgressTracking();
//                         }
//                     },
//                 },
//             });
//         }

//         return () => {
//             stopProgressTracking();
//             if (youtubePlayer?.destroy) {
//                 youtubePlayer.destroy();
//                 youtubePlayer = null;
//             }
//         };
//     }, [activeIndex, isCurrentVideoYouTube, embedId, startProgressTracking, stopProgressTracking]);


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

//             if (icons.length && isYouTube(icons[0]?.vdo) && !youtubePlayer) {
//                 const embedId = getEmbedUrl(icons[0].vdo);
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
//                             startProgressTracking();
//                         },
//                         onStateChange: (event) => {
//                             if (event.data === window.YT.PlayerState.ENDED) {
//                                 setVideoProgress(100);
//                                 stopProgressTracking();
//                             } else if (event.data === window.YT.PlayerState.PLAYING) {
//                                 startProgressTracking();
//                             }
//                         },
//                     },
//                 });
//             }
//         };
//     }, []);


   
//     // HTML5 video effect
    
//     useEffect(() => {
//         stopProgressTracking();

//         if (videoRef.current && !isCurrentVideoYouTube) {
//             const videoElement = videoRef.current;
//             videoElement.muted = muted;

//             const handleVideoEnd = () => {
//                 setVideoProgress(100);
//                 stopProgressTracking();
//             };
//             videoElement.addEventListener("ended", handleVideoEnd);

//             videoElement.play()
//                 .then(() => startProgressTracking())
//                 .catch(() => { });

//             return () => {
//                 stopProgressTracking();
//                 videoElement.removeEventListener("ended", handleVideoEnd);
//             };
//         }

//         return () => stopProgressTracking();
//     }, [activeIndex, isCurrentVideoYouTube, startProgressTracking, stopProgressTracking]);


//     // Scroll tabs on mobile

//     useEffect(() => {
//         const bar = barRef.current;
//         const activeButton = buttonRefs.current[activeIndex];

//         if (bar && activeButton && window.innerWidth <= 768) {
//             const scrollLeft =
//                 activeButton.offsetLeft -
//                 bar.clientWidth / 2 +
//                 activeButton.clientWidth / 2;

//             bar.scrollTo({ left: scrollLeft, behavior: "smooth" });
//         }
//     }, [activeIndex]);

//     if (!icons.length) return <p style={{ textAlign: "center" }}>No videos available.</p>;

//     return (
//         <div
//             style={{
//                 width: "100%",
//                 margin: 0, padding: 0,
//                 display: "flex", justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor,
//                 overflow: "hidden"
//             }}>
//             <div style={{
//                 width: "100%",
//                 maxWidth: `${1200 * scale}px`,
//                 backgroundColor,
//                 borderRadius: window.innerWidth <= 768 ? "0px" : `${25 * scale}px`,
//                 boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
//                 fontFamily: "Inter, Arial, sans-serif",
//                 padding: window.innerWidth <= 768 ? "20px" : `${30 * scale}px`,
//                 flexDirection: "column",
//                 alignItems: "center",
//                 position: "relative",
//                 transform: "none",
//                 transformOrigin: "unset",
//                 margin: window.innerWidth <= 768 ? "30px 0 0 0" : "20px auto",
//                 boxSizing: "border-box"
//             }}>

//                 {/* Tabs Bar */}
//                 <div style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     width: "100%",
//                     marginBottom: `${25 * scale}px`
//                 }}>
//                     <div
//                         ref={barRef}
//                         style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: `${20 * scale}px`,
//                             backgroundColor: "#e7ebfc",
//                             padding: `${15 * scale}px ${25 * scale}px`, borderRadius: `${40 * scale}px`,
//                             overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none",
//                             maxWidth: "100%"
//                         }}>
//                         {icons.map((item, index) => {
//                             const isButtonActive = index === activeIndex;
//                             const currentProgress = isButtonActive ? videoProgress : 0;
//                             const textButtonColor = isButtonActive ? "#003366" : "#333";
//                             const buttonBaseColor = barBoxColor;
//                             const buttonProgressColor = "#4e6ef2";

//                             return (
//                                 <button
//                                     key={index}
//                                     ref={(el) => (buttonRefs.current[index] = el)}
//                                     onClick={() => setActiveIndex(index)}
//                                     style={{
//                                         flexShrink: 0,
//                                         width: `${160 * scale}px`,
//                                         padding: `${10 * scale}px ${18 * scale}px`,
//                                         border: "none",
//                                         borderRadius: `${24 * scale}px`,
//                                         cursor: "pointer",
//                                         backgroundColor: buttonBaseColor,
//                                         backgroundImage: isButtonActive
//                                             ? `linear-gradient(to right, ${buttonProgressColor} ${currentProgress}%, ${buttonBaseColor} ${currentProgress}%)`
//                                             : "none",
//                                         transition: "all 0.3s ease, background-image 0.2s linear",
//                                         color: textButtonColor,
//                                         fontWeight: "600",
//                                         fontSize: `${16 * scale}px`,
//                                         textAlign: "center",
//                                         whiteSpace: "nowrap",
//                                     }}
//                                 >
//                                     {item.title}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Video Container */}
//                 <div
//                     className="video-player-responsive-area"
//                     style={{
//                         width: "100%",
//                         height: 0,
//                         position: "relative",
//                         paddingBottom: "56.25%",
//                         backgroundColor: "#000",
//                         borderRadius: `${10 * scale}px`,
//                         overflow: "hidden"
//                     }}>
//                     {isCurrentVideoYouTube ? (
//                         <div
//                             style={{
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 width: "100%",
//                                 height: "100%"
//                             }}>
//                             <div
//                                 ref={youtubeContainerRef}
//                                 style={{
//                                     width: "100%",
//                                     height: "100%"

//                                 }} />
//                         </div>
//                     ) : (
//                         <video
//                             ref={videoRef}
//                             key={embedId}
//                             src={embedId}
//                             autoPlay
//                             loop
//                             muted={muted}
//                             playsInline
//                             style={{
//                                 position: "absolute",
//                                 top: 0, left: 0,
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover"
//                             }} />
//                     )}
//                 </div>

//                 {/* Mute Button */}
//                 <button
//                     className="mute-btn-responsive"
//                     onClick={toggleMute}
//                     style={{
//                         background: "transparent",
//                         border: "none",
//                         fontSize: `${26 * scale}px`,
//                         cursor: "pointer",
//                         zIndex: 10,
//                         transition: "all 0.3s ease"
//                     }}
//                     title={muted ? "Unmute" : "Mute"}>
//                     {muted ? "🔇" : "🔊"}
//                 </button>

//                 <style>{`
//           .video-tabs-bar::-webkit-scrollbar { display: none; }

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
//         `}</style>

//             </div>
//         </div>
//     );
// };

// export default VideoTabs;



import React, { useState, useRef, useEffect, useCallback } from "react";

let youtubePlayer = null;

const VideoTabs = ({ attributes }) => {
    const {
        backgroundColor,
        barBoxColor,
        icons = [],
    } = attributes;

    const [activeIndex, setActiveIndex] = useState(0);
    const [muted, setMuted] = useState(true);
    const [scale, setScale] = useState(1);
    const [videoProgress, setVideoProgress] = useState(0);

    const videoRef = useRef(null);
    const youtubeContainerRef = useRef(null);
    const barRef = useRef(null);
    const buttonRefs = useRef([]);
    const progressIntervalRef = useRef(null);

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


    // Video progress tracking
    // -------------------------------------------------------------------
    const updateProgress = useCallback(() => {
        let currentTime = 0;
        let duration = 0;

        if (isCurrentVideoYouTube && youtubePlayer?.getPlayerState) {
            const state = youtubePlayer.getPlayerState();
            if (state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.PAUSED) {
                duration = youtubePlayer.getDuration();
                currentTime = youtubePlayer.getCurrentTime();
            }
        } else if (videoRef.current && !isCurrentVideoYouTube) {
            const videoElement = videoRef.current;
            duration = videoElement.duration || 0;
            currentTime = videoElement.currentTime || 0;
        }

        if (duration > 0) setVideoProgress((currentTime / duration) * 100);
        else setVideoProgress(0);
    }, [isCurrentVideoYouTube]);

    const startProgressTracking = useCallback(() => {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = setInterval(updateProgress, 20);
    }, [updateProgress]);

    const stopProgressTracking = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    // -------------------------------------------------------------------
    // Scale calculation
    // -------------------------------------------------------------------
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScale(Math.min(Math.max(width / 1200, 0.75), 1));
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Toggle mute
    
    const toggleMute = () => {
        const newMuted = !muted;
        setMuted(newMuted);

        if (isCurrentVideoYouTube && youtubePlayer) {
            if (newMuted) youtubePlayer.mute();
            else {
                youtubePlayer.unMute();
                youtubePlayer.setVolume(50);
            }
        } else if (videoRef.current && !isCurrentVideoYouTube) {
            videoRef.current.muted = newMuted;
        }
    };

   
    // YouTube player initialization (muted toggle decoupled)
   
    useEffect(() => {
        stopProgressTracking();
        setVideoProgress(0);

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
                        startProgressTracking();
                    },
                    onStateChange: (event) => {
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
            stopProgressTracking();
            if (youtubePlayer?.destroy) {
                youtubePlayer.destroy();
                youtubePlayer = null;
            }
        };
    }, [activeIndex, isCurrentVideoYouTube, embedId, startProgressTracking, stopProgressTracking]);


    // Load YouTube API


    useEffect(() => {
        if (!window.YT && !document.getElementById("youtube-iframe-api")) {
            const tag = document.createElement("script");
            tag.id = "youtube-iframe-api";
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {

            if (icons.length && isYouTube(icons[0]?.vdo) && !youtubePlayer) {
                const embedId = getEmbedUrl(icons[0].vdo);
                youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
                    videoId: embedId,
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        mute: 1,
                        playsinline: 1,
                    },
                    events: {
                        onReady: (event) => {
                            if (muted) event.target.mute();
                            else {
                                event.target.unMute();
                                event.target.setVolume(50);
                            }
                            event.target.playVideo();
                            startProgressTracking();
                        },
                        onStateChange: (event) => {
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
        };
    }, []);


   
    // HTML5 video effect
    
    useEffect(() => {
        stopProgressTracking();

        if (videoRef.current && !isCurrentVideoYouTube) {
            const videoElement = videoRef.current;
            videoElement.muted = muted;

            const handleVideoEnd = () => {
                setVideoProgress(100);
                stopProgressTracking();
            };
            videoElement.addEventListener("ended", handleVideoEnd);

            videoElement.play()
                .then(() => startProgressTracking())
                .catch(() => { });

            return () => {
                stopProgressTracking();
                videoElement.removeEventListener("ended", handleVideoEnd);
            };
        }

        return () => stopProgressTracking();
    }, [activeIndex, isCurrentVideoYouTube, startProgressTracking, stopProgressTracking]);


    // Scroll tabs on mobile

    useEffect(() => {
        const bar = barRef.current;
        const activeButton = buttonRefs.current[activeIndex];

        if (bar && activeButton && window.innerWidth <= 768) {
            const scrollLeft =
                activeButton.offsetLeft -
                bar.clientWidth / 2 +
                activeButton.clientWidth / 2;

            bar.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }
    }, [activeIndex]);

    if (!icons.length) return <p style={{ textAlign: "center" }}>No videos available.</p>;

    return (
        <div
            style={{
                width: "100%",
                margin: 0, padding: 0,
                display: "flex", justifyContent: "center",
                alignItems: "center",
                backgroundColor,
                overflow: "hidden"
            }}>
            <div style={{
                width: "100%",
                maxWidth: `${1200 * scale}px`,
                backgroundColor,
                borderRadius: window.innerWidth <= 768 ? "0px" : `${25 * scale}px`,
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                fontFamily: "Inter, Arial, sans-serif",
                padding: window.innerWidth <= 768 ? "20px" : `${30 * scale}px`,
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transform: "none",
                transformOrigin: "unset",
                margin: window.innerWidth <= 768 ? "30px 0 0 0" : "20px auto",
                boxSizing: "border-box"
            }}>

                {/* Tabs Bar */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: `${25 * scale}px`
                }}>
                    <div
                        ref={barRef}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: `${20 * scale}px`,
                            backgroundColor: "#e7ebfc",
                            padding: `${15 * scale}px ${25 * scale}px`, borderRadius: `${40 * scale}px`,
                            overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none",
                            maxWidth: "100%"
                        }}>
                        {icons.map((item, index) => {
                            const isButtonActive = index === activeIndex;
                            const currentProgress = isButtonActive ? videoProgress : 0;
                            const textButtonColor = isButtonActive ? "#003366" : "#333";
                            const buttonBaseColor = barBoxColor;
                            const buttonProgressColor = "#4e6ef2";

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
                                        backgroundColor: buttonBaseColor,
                                        backgroundImage: isButtonActive
                                            ? `linear-gradient(to right, ${buttonProgressColor} ${currentProgress}%, ${buttonBaseColor} ${currentProgress}%)`
                                            : "none",
                                        transition: "background 0.4s linear, color 0.3s ease, transform 0.2s ease",

                                        color: textButtonColor,
                                        fontWeight: "600",
                                        fontSize: `${16 * scale}px`,
                                        textAlign: "center",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {item.title}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Video Container */}
                <div
                    className="video-player-responsive-area"
                    style={{
                        width: "100%",
                        height: 0,
                        position: "relative",
                        paddingBottom: "56.25%",
                        backgroundColor: "#000",
                        borderRadius: `${10 * scale}px`,
                        overflow: "hidden"
                    }}>
                    {isCurrentVideoYouTube ? (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }}>
                            <div
                                ref={youtubeContainerRef}
                                style={{
                                    width: "100%",
                                    height: "100%"

                                }} />
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
                                top: 0, left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} />
                    )}
                </div>

                {/* Mute Button */}
                <button
                    className="mute-btn-responsive"
                    onClick={toggleMute}
                    style={{
                        background: "transparent",
                        border: "none",
                        fontSize: `${26 * scale}px`,
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "all 0.3s ease"
                    }}
                    title={muted ? "Unmute" : "Mute"}>
                    {muted ? "🔇" : "🔊"}
                </button>

                <style>{`
          .video-tabs-bar::-webkit-scrollbar { display: none; }

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
        `}</style>

            </div>
        </div>
    );
};

export default VideoTabs;


// import React, { useState, useRef, useEffect, useCallback } from "react";

// let youtubePlayer = null;

// const VideoTabs = ({ attributes }) => {
//   const {
//     backgroundColor ,
//     barBoxColor ,
//     icons = [],
//   } = attributes;

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [muted, setMuted] = useState(true);
//   const [scale, setScale] = useState(1);
//   const [videoProgress, setVideoProgress] = useState(0);

//   const videoRef = useRef(null);
//   const youtubeContainerRef = useRef(null);
//   const barRef = useRef(null);
//   const buttonRefs = useRef([]);
//   const progressIntervalRef = useRef(null);

//   const isYouTube = (url) =>
//     url?.includes("youtube.com") || url?.includes("youtu.be");

//   const currentUrl = icons[activeIndex]?.vdo || "";
//   const isCurrentVideoYouTube = isYouTube(currentUrl);

//   const getYouTubeId = useCallback((url) => {
//     if (url.includes("youtu.be")) return url.split("youtu.be/")[1]?.split("?")[0];
//     if (url.includes("watch?v=")) return url.split("watch?v=")[1]?.split("&")[0];
//     return null;
//   }, []);

//   const getEmbedUrl = useCallback(
//     (url) => (isYouTube(url) ? getYouTubeId(url) : url),
//     [getYouTubeId]
//   );

//   const embedId = getEmbedUrl(currentUrl);

//   // -------------------------------------------------------------------
//   // Video progress tracking
//   // -------------------------------------------------------------------
//   const updateProgress = useCallback(() => {
//     let currentTime = 0;
//     let duration = 0;

//     if (isCurrentVideoYouTube && youtubePlayer?.getPlayerState) {
//       const state = youtubePlayer.getPlayerState();
//       if (state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.PAUSED) {
//         duration = youtubePlayer.getDuration();
//         currentTime = youtubePlayer.getCurrentTime();
//       }
//     } else if (videoRef.current && !isCurrentVideoYouTube) {
//       const videoElement = videoRef.current;
//       duration = videoElement.duration || 0;
//       currentTime = videoElement.currentTime || 0;
//     }

//     if (duration > 0) setVideoProgress((currentTime / duration) * 100);
//     else setVideoProgress(0);
//   }, [isCurrentVideoYouTube]);

//   const startProgressTracking = useCallback(() => {
//     if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
//     progressIntervalRef.current = setInterval(updateProgress, 200);
//   }, [updateProgress]);

//   const stopProgressTracking = useCallback(() => {
//     if (progressIntervalRef.current) {
//       clearInterval(progressIntervalRef.current);
//       progressIntervalRef.current = null;
//     }
//   }, []);

//   // -------------------------------------------------------------------
//   // Scale calculation
//   // -------------------------------------------------------------------
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setScale(Math.min(Math.max(width / 1200, 0.75), 1));
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // -------------------------------------------------------------------
//   // Toggle mute
//   // -------------------------------------------------------------------
//   const toggleMute = () => {
//     const newMuted = !muted;
//     setMuted(newMuted);

//     if (isCurrentVideoYouTube && youtubePlayer) {
//       if (newMuted) youtubePlayer.mute();
//       else {
//         youtubePlayer.unMute();
//         youtubePlayer.setVolume(50);
//       }
//     } else if (videoRef.current && !isCurrentVideoYouTube) {
//       videoRef.current.muted = newMuted;
//     }
//   };

//   // -------------------------------------------------------------------
//   // YouTube player initialization (muted toggle decoupled)
//   // -------------------------------------------------------------------
//   useEffect(() => {
//     stopProgressTracking();
//     setVideoProgress(0);

//     if (isCurrentVideoYouTube && embedId && window.YT) {
//       if (youtubePlayer) {
//         youtubePlayer.destroy();
//         youtubePlayer = null;
//       }

//       youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
//         videoId: embedId,
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           modestbranding: 1,
//           rel: 0,
//           fs: 0,
//           playsinline: 1,
//           mute: 1,
//         },
//         events: {
//           onReady: (event) => {
//             if (muted) event.target.mute();
//             else {
//               event.target.unMute();
//               event.target.setVolume(50);
//             }
//             event.target.playVideo();
//             startProgressTracking();
//           },
//           onStateChange: (event) => {
//             if (event.data === window.YT.PlayerState.ENDED) {
//               setVideoProgress(100);
//               stopProgressTracking();
//             } else if (event.data === window.YT.PlayerState.PLAYING) {
//               startProgressTracking();
//             }
//           },
//         },
//       });
//     }

//     return () => {
//       stopProgressTracking();
//       if (youtubePlayer?.destroy) {
//         youtubePlayer.destroy();
//         youtubePlayer = null;
//       }
//     };
//   }, [activeIndex, isCurrentVideoYouTube, embedId, startProgressTracking, stopProgressTracking]);

//   // -------------------------------------------------------------------
//   // Load YouTube API


// useEffect(() => {
//     if (!window.YT && !document.getElementById("youtube-iframe-api")) {
//         const tag = document.createElement("script");
//         tag.id = "youtube-iframe-api";
//         tag.src = "https://www.youtube.com/iframe_api";
//         const firstScriptTag = document.getElementsByTagName("script")[0];
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     }

//     window.onYouTubeIframeAPIReady = () => {
//         // Directly initialize the first video if it's a YouTube video
//         if (icons.length && isYouTube(icons[0]?.vdo) && !youtubePlayer) {
//             const embedId = getEmbedUrl(icons[0].vdo);
//             youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
//                 videoId: embedId,
//                 playerVars: {
//                     autoplay: 1,
//                     controls: 0,
//                     modestbranding: 1,
//                     rel: 0,
//                     mute: 1,
//                     playsinline: 1,
//                 },
//                 events: {
//                     onReady: (event) => {
//                         if (muted) event.target.mute();
//                         else {
//                             event.target.unMute();
//                             event.target.setVolume(50);
//                         }
//                         event.target.playVideo();
//                         startProgressTracking();
//                     },
//                     onStateChange: (event) => {
//                         if (event.data === window.YT.PlayerState.ENDED) {
//                             setVideoProgress(100);
//                             stopProgressTracking();
//                         } else if (event.data === window.YT.PlayerState.PLAYING) {
//                             startProgressTracking();
//                         }
//                     },
//                 },
//             });
//         }
//     };
// }, []);


//   // -------------------------------------------------------------------
//   // HTML5 video effect
//   // -------------------------------------------------------------------
//   useEffect(() => {
//     stopProgressTracking();

//     if (videoRef.current && !isCurrentVideoYouTube) {
//       const videoElement = videoRef.current;
//       videoElement.muted = muted;

//       const handleVideoEnd = () => {
//         setVideoProgress(100);
//         stopProgressTracking();
//       };
//       videoElement.addEventListener("ended", handleVideoEnd);

//       videoElement.play()
//         .then(() => startProgressTracking())
//         .catch(() => {});

//       return () => {
//         stopProgressTracking();
//         videoElement.removeEventListener("ended", handleVideoEnd);
//       };
//     }

//     return () => stopProgressTracking();
//   }, [activeIndex, isCurrentVideoYouTube, startProgressTracking, stopProgressTracking]);

//   // -------------------------------------------------------------------
//   // Scroll tabs on mobile
//   // -------------------------------------------------------------------
//   useEffect(() => {
//     const bar = barRef.current;
//     const activeButton = buttonRefs.current[activeIndex];

//     if (bar && activeButton && window.innerWidth <= 768) {
//       const scrollLeft =
//         activeButton.offsetLeft -
//         bar.clientWidth / 2 +
//         activeButton.clientWidth / 2;

//       bar.scrollTo({ left: scrollLeft, behavior: "smooth" });
//     }
//   }, [activeIndex]);

//   if (!icons.length) return <p style={{ textAlign: "center" }}>No videos available.</p>;

//   return (
//     <div style={{ width: "100%", margin: 0, padding: 0, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor, overflow: "hidden" }}>
//       <div style={{ width: "100%", maxWidth: `${1200 * scale}px`, backgroundColor, borderRadius: `${25 * scale}px`, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", fontFamily: "Inter, Arial, sans-serif", padding: window.innerWidth <= 768 ? "20px" : `${30 * scale}px`, flexDirection: "column", alignItems: "center", position: "relative", transform: "none", transformOrigin: "unset", margin: window.innerWidth <= 768 ? "30px 0 0 0" : "20px auto", boxSizing: "border-box" }}>
        
//         {/* Tabs Bar */}
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: `${25 * scale}px` }}>
//           <div ref={barRef} style={{ display: "flex", alignItems: "center", gap: `${20 * scale}px`, backgroundColor: "#e7ebfc", padding: `${15 * scale}px ${25 * scale}px`, borderRadius: `${40 * scale}px`, overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none", maxWidth: "100%" }}>
//             {icons.map((item, index) => {
//               const isButtonActive = index === activeIndex;
//               const currentProgress = isButtonActive ? videoProgress : 0;
//               const textButtonColor = isButtonActive ? "#003366" : "#333";
//               const buttonBaseColor = barBoxColor;
//               const buttonProgressColor = "#4e6ef2";

//               return (
//                 <button
//                   key={index}
//                   ref={(el) => (buttonRefs.current[index] = el)}
//                   onClick={() => setActiveIndex(index)}
//                   style={{
//                     flexShrink: 0,
//                     width: `${160 * scale}px`,
//                     padding: `${10 * scale}px ${18 * scale}px`,
//                     border: "none",
//                     borderRadius: `${24 * scale}px`,
//                     cursor: "pointer",
//                     backgroundColor: buttonBaseColor,
//                     backgroundImage: isButtonActive
//                       ? `linear-gradient(to right, ${buttonProgressColor} ${currentProgress}%, ${buttonBaseColor} ${currentProgress}%)`
//                       : "none",
//                     transition: "all 0.3s ease, background-image 0.2s linear",
//                     color: textButtonColor,
//                     fontWeight: "600",
//                     fontSize: `${16 * scale}px`,
//                     textAlign: "center",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {item.title}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Video Container */}
//         <div className="video-player-responsive-area" style={{ width: "100%", height: 0, position: "relative", paddingBottom: "56.25%", backgroundColor: "#000", borderRadius: `${10 * scale}px`, overflow: "hidden" }}>
//           {isCurrentVideoYouTube ? (
//             <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
//               <div ref={youtubeContainerRef} style={{ width: "100%", height: "100%" }} />
//             </div>
//           ) : (
//             <video ref={videoRef} key={embedId} src={embedId} autoPlay loop muted={muted} playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
//           )}
//         </div>

//         {/* Mute Button */}
//         <button className="mute-btn-responsive" onClick={toggleMute} style={{ background: "transparent", border: "none", fontSize: `${26 * scale}px`, cursor: "pointer", zIndex: 10, transition: "all 0.3s ease" }} title={muted ? "Unmute" : "Mute"}>
//           {muted ? "🔇" : "🔊"}
//         </button>

//         <style>{`
//           .video-tabs-bar::-webkit-scrollbar { display: none; }

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
//         `}</style>

//       </div>
//     </div>
//   );
// };

// export default VideoTabs;

