import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";
import heroVideo from "../../public/videos/hero-video.mp4";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
;

const HeroSection = () => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  
  const handleMuteClick = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>DISCOVER,</h1>
          <h2>COLLECT, </h2>
          <h3> & SELL NFTS </h3>
          <p>
            RAISING THE STANDARD OF XCELLENCE IN DIGITAL ASSETS, ARTWORK, AND COLLECTIVES! 
          </p>
          <Button
            btnName="BEGIN YOUR JOURNEY"
            handleClick={() => router.push("/searchPage")}
          />
        </div>
        <div className={Style.heroSection_box_right}>
          <video
            src={heroVideo}            
            loop
            autoPlay
            playsInline
            className={Style.heroSection_box_right_vid}
            muted={isMuted}
          />
          <div>
        <button onClick={handleMuteClick} className={Style.heroSection_box_right_muteBtn}>
         {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
