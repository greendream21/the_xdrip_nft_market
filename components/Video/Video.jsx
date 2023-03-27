import React from "react";
import ReactPlayer from 'react-player';

//INTERNALIMPORT
import Style from "./Video.module.css";
import images from "../../img";

const Video = () => {
  return (
    <div className={Style.Video}>
      <div className={Style.Video_box}>
        <h1>
          <span>🎬</span> OUR VIDEOS
        </h1>
        <p>
          CHECK OUT OUR MOST RECENT VIDEOS.
        </p>

        <div className={Style.Video_box_frame}>
          <div className={Style.Video_box_frame_right}></div>
          <div className={Style.Video_box_frame_left}>
            <ReactPlayer
              url='https://youtu.be/jQG6tgMtLbk'
              width={1420}
              height={750}
              style={{objectFit:"cover"}}
              className={Style.Video_box_frame_left_img}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

