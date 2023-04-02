import React from "react";
import { useRouter } from "next/router";
import Image from 'next/image';


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
          <h2>THE XCAPISM</h2>
          <p>FULLY EMERSE YOURSELF IN VISUAL XCELLENCE</p>

          <div className={Style.Video_box_left_box}>
            <span>                
              <Image
                src={images.bullet_1}
                alt="Logo"
                width={50}
                height={50}
                /></span>
            <small>XCLUSIVE CONTENT THAT YOU WONT FIND ANYWHERE ELSE</small>
          </div>

          <div className={Style.Video_box_left_box}>
            <span>
            <Image
                src={images.bullet_1}
                alt="Logo"
                width={50}
                height={50}
                />
            </span>
            <small>VIDEOS THAT ARE BOTH ENGAGING AND ENTERTAINING</small>
          </div>

          <div className={Style.Video_box_left_box}>
            <span>
            <Image
                src={images.bullet_1}
                alt="Logo"
                width={50}
                height={50}
                />
            </span>
            <small>INTERACTIVE AND COMMUNITY DRIVEN CONTENT </small>
          </div>

          <div className={Style.Video_box_left_btn}>
            <Button
              btnName="XCAPE TO XDRIPIA"
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
