import React from "react";
import Style from "./Banner.module.css";
import ReactPlayer from "react-player";


const Banner = ({ bannerVideo }) => {
  return (
    <div className={Style.banner}>
      <ReactPlayer
        url={bannerVideo}
        width="100%"
        height="100%"
        loop
        muted
        playing
        playsinline
      />
    </div>
  );
};

export default Banner;