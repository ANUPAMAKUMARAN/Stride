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
    const videoRef = useRef(null);
    const youtubeContainerRef = useRef(null); 

    const isYouTube = (url) =>
        url?.includes("youtube.com") || url?.includes("youtu.be");

    const currentUrl = icons[activeIndex]?.vdo || "";
    const isCurrentVideoYouTube = isYouTube(currentUrl);

    const getYouTubeId = useCallback((url) => {
        if (url.includes("youtu.be")) {
            return url.split("youtu.be/")[1]?.split("?")[0];
        } else if (url.includes("watch?v=")) {
            return url.split("watch?v=")[1]?.split("&")[0];
        }
        return null;
    }, []);

    const getEmbedUrl = useCallback((url) => {
        
        if (!isYouTube(url)) {
            return url;
        }
        
        return getYouTubeId(url);
    }, [getYouTubeId]);

    const embedId = getEmbedUrl(currentUrl);

    // 2. Mute/Unmute Logic
    const toggleMute = () => {
        const newMutedState = !muted;
        setMuted(newMutedState);

        if (isCurrentVideoYouTube && youtubePlayer) {
          
            if (newMutedState) {
                youtubePlayer.mute();
            } else {
                youtubePlayer.unMute();
                
                youtubePlayer.setVolume(50);
            }
        }
    };

    
    useEffect(() => {
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
                    showinfo: 0,
                    rel: 0,
                    iv_load_policy: 3,
                    fs: 0,
                    disablekb: 1,
                    playsinline: 1,
                    
                    mute: 1,
                },
                events: {
                    onReady: (event) => {
                        
                        if (muted) {
                            event.target.mute();
                        } else {
                            event.target.unMute();
                            event.target.setVolume(50); // Set volume to a reasonable default
                        }
                        event.target.playVideo();
                    },
                },
            });
        }

     
        return () => {
            if (youtubePlayer && youtubePlayer.destroy) {
                youtubePlayer.destroy();
                youtubePlayer = null;
            }
        };
    }, [activeIndex, isCurrentVideoYouTube, embedId]);

  
    useEffect(() => {
        if (!window.YT && !document.getElementById("youtube-iframe-api")) {
            const tag = document.createElement("script");
            tag.id = "youtube-iframe-api";
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
            if (isCurrentVideoYouTube && embedId && youtubeContainerRef.current) {
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
                        },
                    },
                });
            }
        };
    }, []);

   
    useEffect(() => {
        if (videoRef.current && !isCurrentVideoYouTube) {
            videoRef.current.muted = muted;
            videoRef.current.play().catch(() => { });
        }
    }, [activeIndex, muted, isCurrentVideoYouTube]);

    
    useEffect(() => {
        if (!window.YT && !document.getElementById("youtube-iframe-api")) {
            const tag = document.createElement("script");
            tag.id = "youtube-iframe-api";
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, []);

    if (!icons.length)
        return <p style={{ textAlign: "center" }}>No videos available.</p>;

    return (
        <div
            className="video-tabs-main-container" // Main container with position: relative
            style={{
                width: "95%",
                maxWidth: "1200px",
                margin: "60px auto",
                backgroundColor,
                borderRadius: "25px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
               
                fontFamily: "Inter, Arial, sans-serif",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* Tab Bar Container */}
            <div
                className="video-tabs-bar-wrapper"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                    marginBottom: "25px",
                }}
            >
                <div
                    className="video-tabs-bar"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        backgroundColor: "#e7ebfc",
                        padding: "15px 25px",
                        borderRadius: "40px",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        scrollbarWidth: "none",
                        maxWidth: "100%",
                    }}
                >
                    {icons.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            style={{
                                flexShrink: 0,
                                padding: "10px 28px",
                                border: "none",
                                borderRadius: "25px",
                                cursor: "pointer",
                                backgroundColor:
                                    index === activeIndex ? hoverTextBackground : barBoxColor,
                                color: index === activeIndex ? "#fff" : "#333",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                                fontSize: "16px",
                            }}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="video-player-responsive-area"
                style={{
                    width: "100%",
                    height: 0, 
                    position: "relative",
                    paddingBottom: "56.25%", 
                    backgroundColor: "#000",
                    borderRadius: "10px",
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
                            overflow: "hidden",
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

            {/* 🔇 Mute Button: */}
            <button
                className="mute-btn-responsive"
                onClick={toggleMute}
                style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "26px",
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
                /* Hide scrollbar for the tabs bar */
                .video-tabs-bar::-webkit-scrollbar {
                    display: none;
                }

                /* ----------------------------------------------------- */
                /* MUTE BUTTON RESPONSIVE STYLES */
                /* ----------------------------------------------------- */

                /* MOBILE (max-width: 768px) - Bottom Right, INSIDE video area */
                @media (max-width: 768px) {
                    .mute-btn-responsive {
                        /* Position relative to the *video container* */
                        position: absolute;
                        bottom: calc(30px + 15px); /* Main padding (30px) + distance from video bottom (15px) */
                        right: 45px; /* Main padding (30px) + distance from video right (15px) */
                        
                        /* NOTE: The absolute positioning must target the .video-tabs-main-container (parent) 
                           and use calculated offsets to appear inside the *video*. */

                        color: #fff; 
                        text-shadow: 0 0 5px rgba(0,0,0,0.5);
                    }
                }

                /* DESKTOP (min-width: 769px) - Top Right, OUTSIDE video area, next to tabs bar */
                @media (min-width: 769px) {
                    .mute-btn-responsive {
                        /* Position relative to the *main container* (.video-tabs-main-container) */
                        position: absolute;
                        top: 35px;    /* Aligns vertically with the tab bar (padding-top 30px + 5px offset) */
                        right: 30px;  /* Aligns with the main container's padding-right */
                        bottom: auto; /* Reset */
                        
                        color: #333; /* Reverts color to dark */
                        text-shadow: none; /* Removes shadow */
                    }
                }
                `}
            </style>
        </div>
    );
};

export default VideoTabs;



// import React, { useState, useRef, useEffect, useCallback } from "react";

// // 1. Define a global variable for the YouTube Player (optional but helpful)
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
//     const videoRef = useRef(null); // Used for local <video> element
//     const youtubeContainerRef = useRef(null); // Used for YouTube <div> container

//     const isYouTube = (url) =>
//         url?.includes("youtube.com") || url?.includes("youtu.be");

//     const currentUrl = icons[activeIndex]?.vdo || "";
//     const isCurrentVideoYouTube = isYouTube(currentUrl);

//     // Function to extract the YouTube video ID
//     const getYouTubeId = useCallback((url) => {
//         if (url.includes("youtu.be")) {
//             return url.split("youtu.be/")[1]?.split("?")[0];
//         } else if (url.includes("watch?v=")) {
//             return url.split("watch?v=")[1]?.split("&")[0];
//         }
//         return null;
//     }, []);

//     const getEmbedUrl = useCallback((url) => {
//         // For non-YouTube videos, return the direct URL
//         if (!isYouTube(url)) {
//             return url;
//         }
//         // For YouTube, we just need the ID now, but we can return the ID if needed elsewhere
//         return getYouTubeId(url);
//     }, [getYouTubeId]);

//     const embedId = getEmbedUrl(currentUrl);

//     // 2. Mute/Unmute Logic
//     const toggleMute = () => {
//         const newMutedState = !muted;
//         setMuted(newMutedState);

//         if (isCurrentVideoYouTube && youtubePlayer) {
//             // Control YouTube player via API without reloading
//             if (newMutedState) {
//                 youtubePlayer.mute();
//             } else {
//                 youtubePlayer.unMute();
//                 // You might need to set the volume explicitly, e.g., to 50
//                 youtubePlayer.setVolume(50);
//             }
//         }
//     };

//     // 3. YouTube Player Initialization and Management
//     useEffect(() => {
//         if (isCurrentVideoYouTube && embedId && window.YT) {
//             if (youtubePlayer) {
//                 // Destroy existing player if present
//                 youtubePlayer.destroy();
//                 youtubePlayer = null;
//             }

//             // Initialize the new YouTube Player
//             youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
//                 videoId: embedId,
//                 playerVars: {
//                     autoplay: 1,
//                     controls: 0,
//                     modestbranding: 1,
//                     showinfo: 0,
//                     rel: 0,
//                     iv_load_policy: 3,
//                     fs: 0,
//                     disablekb: 1,
//                     playsinline: 1,
//                     // Start muted to comply with browser autoplay policies
//                     mute: 1,
//                 },
//                 events: {
//                     onReady: (event) => {
//                         // Apply the current muted state from the component
//                         if (muted) {
//                             event.target.mute();
//                         } else {
//                             event.target.unMute();
//                             event.target.setVolume(50); // Set volume to a reasonable default
//                         }
//                         event.target.playVideo();
//                     },
//                 },
//             });
//         }

//         // Cleanup function: destroy the player when the component unmounts or video type changes
//         return () => {
//             if (youtubePlayer && youtubePlayer.destroy) {
//                 youtubePlayer.destroy();
//                 youtubePlayer = null;
//             }
//         };
//         // Re-run effect only when activeIndex changes, not when 'muted' changes
//     }, [activeIndex, isCurrentVideoYouTube, embedId]);

//     // 1️⃣ Add a global callback for YouTube API ready
//     useEffect(() => {
//         // Only load the script if it doesn't exist
//         if (!window.YT && !document.getElementById("youtube-iframe-api")) {
//             const tag = document.createElement("script");
//             tag.id = "youtube-iframe-api";
//             tag.src = "https://www.youtube.com/iframe_api";
//             const firstScriptTag = document.getElementsByTagName("script")[0];
//             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//         }

//         // Define global callback
//         window.onYouTubeIframeAPIReady = () => {
//             // Initialize first video if it is YouTube
//             if (isCurrentVideoYouTube && embedId && youtubeContainerRef.current) {
//                 youtubePlayer = new window.YT.Player(youtubeContainerRef.current, {
//                     videoId: embedId,
//                     playerVars: {
//                         autoplay: 1,
//                         controls: 0,
//                         modestbranding: 1,
//                         rel: 0,
//                         mute: 1, // start muted to allow autoplay
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

//     // 4. Local Video Mute/Unmute Logic
//     useEffect(() => {
//         if (videoRef.current && !isCurrentVideoYouTube) {
//             videoRef.current.muted = muted;
//             videoRef.current.play().catch(() => { });
//         }
//         // This effect runs whenever 'muted' or 'activeIndex' changes
//     }, [activeIndex, muted, isCurrentVideoYouTube]);

//     // 5. Global Script Loader (load the YouTube API only once)
//     useEffect(() => {
//         if (!window.YT && !document.getElementById("youtube-iframe-api")) {
//             const tag = document.createElement("script");
//             tag.id = "youtube-iframe-api";
//             tag.src = "https://www.youtube.com/iframe_api";
//             const firstScriptTag = document.getElementsByTagName("script")[0];
//             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//         }
//         // window.onYouTubeIframeAPIReady will be called automatically once the script loads
//     }, []);

//     if (!icons.length)
//         return <p style={{ textAlign: "center" }}>No videos available.</p>;

//     return (
//         <div
//             className="video-tabs-main-container" // Added class for CSS targeting
//             style={{
//                 width: "95%",
//                 maxWidth: "1200px",
//                 margin: "60px auto",
//                 backgroundColor,
//                 borderRadius: "25px",
//                 boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
//                 overflow: "hidden",
//                 fontFamily: "Inter, Arial, sans-serif",
//                 padding: "30px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 position: "relative",
//             }}
//         >
//             {/* Tab Bar Container (No longer contains the mute button) */}
//             <div
//                 className="video-tabs-bar-wrapper"
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     width: "100%",
//                     position: "relative",
//                     marginBottom: "25px",
//                 }}
//             >
//                 <div
//                     className="video-tabs-bar"
//                     style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "20px",
//                         backgroundColor: "#e7ebfc",
//                         padding: "15px 25px",
//                         borderRadius: "40px",
//                         overflowX: "auto",
//                         whiteSpace: "nowrap",
//                         scrollBehavior: "smooth",
//                         WebkitOverflowScrolling: "touch",
//                         scrollbarWidth: "none",
//                         maxWidth: "100%",
//                     }}
//                 >
//                     {icons.map((item, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setActiveIndex(index)}
//                             style={{
//                                 flexShrink: 0,
//                                 padding: "10px 28px",
//                                 border: "none",
//                                 borderRadius: "25px",
//                                 cursor: "pointer",
//                                 backgroundColor:
//                                     index === activeIndex ? hoverTextBackground : barBoxColor,
//                                 color: index === activeIndex ? "#fff" : "#333",
//                                 fontWeight: "600",
//                                 transition: "all 0.3s ease",
//                                 fontSize: "16px",
//                             }}
//                         >
//                             {item.title}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* 🎥 Video Area - IMPLEMENTING ASPECT RATIO SCALING */}
//             <div
//                 className="video-player-responsive-area" // Added class for CSS targeting
//                 style={{
//                     width: "100%",
//                     height: 0, 
//                     position: "relative",
//                     paddingBottom: "56.25%", 
//                     backgroundColor: "#000",
//                     borderRadius: "10px",
//                     overflow: "hidden",
//                 }}
//             >
//                 {isCurrentVideoYouTube ? (
//                     // YouTube Wrapper
//                     <div
//                         style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             overflow: "hidden",
//                         }}
//                     >
//                         <div
//                             ref={youtubeContainerRef}
//                             style={{ width: "100%", height: "100%" }}
//                         />
//                     </div>
//                 ) : (
//                     // Local Video Player
//                     <video
//                         ref={videoRef}
//                         key={embedId}
//                         src={embedId}
//                         autoPlay
//                         loop
//                         muted={muted}
//                         playsInline
//                         style={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                         }}
//                     />
//                 )}

//                 {/* 🔇 Mute Button (Now positioned inside the video area) */}
//                 <button
//                     className="mute-btn-responsive" // Unique class for positioning
//                     onClick={toggleMute}
//                     style={{
//                         // Removed positioning styles from inline to use CSS
//                         background: "transparent",
//                         border: "none",
//                         fontSize: "26px",
//                         cursor: "pointer",
//                         zIndex: 10,
//                         transition: "all 0.3s ease",
//                     }}
//                     title={muted ? "Unmute" : "Mute"}
//                 >
//                     {muted ? "🔇" : "🔊"}
//                 </button>
//             </div>

//             <style>
//                 {`
//                 /* Hide scrollbar for the tabs bar */
//                 .video-tabs-bar::-webkit-scrollbar {
//                     display: none;
//                 }

//                 /* ----------------------------------------------------- */
//                 /* MUTE BUTTON RESPONSIVE STYLES */
//                 /* ----------------------------------------------------- */

//                 /* MOBILE (Default) - Bottom Right, inside video area */
//                 .mute-btn-responsive {
//                     position: absolute;
//                     bottom: 15px; 
//                     right: 15px;  
//                     color: #fff; /* White for contrast on the dark video background */
//                     text-shadow: 0 0 5px rgba(0,0,0,0.5); /* Optional shadow for visibility */
//                 }

//                 /* DESKTOP (Min-width 769px) - Top Right, aligned with tabs bar */
//                 @media (min-width: 769px) {
//                     .mute-btn-responsive {
//                         /* Overrides for desktop position */
//                         position: absolute;
//                         top: -75px;   /* Pushes the button above the video area to align with the tabs bar */
//                         right: 0;     /* Aligns with the right edge of the video/tab bar */
//                         bottom: auto; /* Reset */
                        
//                         color: #333; /* Reverts color to dark for visibility on light page background */
//                         text-shadow: none; /* Removes shadow */
//                     }
//                 }
            
//                 @media (max-width: 768px) {
//                     /* Existing media query for overall component, if needed */
//                 }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default VideoTabs;

