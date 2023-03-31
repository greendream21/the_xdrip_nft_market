import React from "react";
import { useRouter } from "next/router";

//INTERNALIMPORT
import Style from "./Video.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const Video = () => {
  const router = useRouter();
  return (
    <div className={Style.Video}>
      <div className={Style.Video_box}>
        <div className={Style.Video_box_left}>
          <h1>THE ENTERTAINMENT</h1>
          <p>FULLY EMERSE YOURSELF IN VISUAL XCELLENCE</p>

          <div className={Style.Video_box_left_btn}>
            <Button
              btnName="XDRIP FLIX"
              handleClick={() => window.open("https://www.xdrip.io")}
            />
          </div>
        </div>
        <div className={Style.Video_box_frame_right}>
            <iframe
              width="800"
              height="500"
              src="https://www.youtube.com/embed/jQG6tgMtLbk"
              title="XDRIP FLIX Video"
              className={Style.Video_box_frame_right_img}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
      </div>
    </div>
  );
};

export default Video;
