import React from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


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
          <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, ]}
        spaceBetween={1}
        slidesPerView={1}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
                
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <iframe
                width="888"
                height="500"
                src="https://www.youtube.com/embed/m-6Hq-vRMc4"
                title="XDRIP FLIX Video 1"
                className={Style.Video_box_frame_right_img}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; "
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                width="888"
                height="500"
                src="https://www.youtube.com/embed/Xz1qGaAkEOw"
                title="XDRIP FLIX Video 2"
                className={Style.Video_box_frame_right_img}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
              <iframe
                width="888"
                height="500"
                src="https://www.youtube.com/embed/HB99xtMd60Y"
                title="XDRIP FLIX Video 3"
                className={Style.Video_box_frame_right_img}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
            <iframe
               width="888"
                height="500"
                src="https://www.youtube.com/embed/e_Yr4s7fTTA"
                title="XDRIP FLIX Video 3"
                className={Style.Video_box_frame_right_img}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
            <iframe
                width="888"
                height="500"
                src="https://www.youtube.com/embed/t7psdW_7fZI" 
                title="XDRIP FLIX Video 3"
                className={Style.Video_box_frame_right_img}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </SwiperSlide>
            <SwiperSlide>
            <iframe
                width="888"
                height="500"
                src="https://www.youtube.com/embed/jQG6tgMtLbk"
                title="XDRIP FLIX Video 3"
                className={Style.Video_box_frame_right_img}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </SwiperSlide>
          </Swiper>
        </div>

      </div>
    </div>
  );
};


export default Video;
