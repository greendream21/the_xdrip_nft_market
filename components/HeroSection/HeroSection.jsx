import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import heroVideo from "../../public/videos/hero-video.mp4";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const HeroSection = () => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
  };

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  
  useEffect(() => {
    const options = {
      rootMargin: "-100px",
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play();
          }
        } else {
          setIsVisible(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, options);
  
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  


  return (
    <div className={Style.heroSection}>
      <video
        ref={videoRef}
        src={heroVideo}
        className={Style.video_background}
        autoPlay
        loop
        muted={isMuted}
      />

      <div className={Style.mute_button} onClick={handleMuteClick}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </div>

      <div className={Style.pause_button} onClick={handlePauseClick}>
        {isPaused ? <FaPlay /> : <FaPause />}
      </div>

      {isVisible && (
        <div className={Style.heroSection_content}>
          <div className={Style.heroSection_text}>
            <h1>DISCOVER, COLLECT, & SELL NFTS</h1>
            <p>RAISING THE STANDARD OF XCELLENCE IN DIGITAL ASSETS, ARTWORK, AND COLLECTIVES!</p>
            <Button btnName="BEGIN YOUR JOURNEY" handleClick={() => router.push("/searchPage")} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
