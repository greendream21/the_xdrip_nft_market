import React, { useRef, useEffect } from 'react';
import Style from './Banner.module.css';
//import banner1 from "../../public/videos/banner-left.mp4";
import banner2 from "../../public/videos/banner-center.mp4";
import banner3 from "../../public/videos/banner-right.mp4";
import Link from "next/link";
import Image from "next/image";
import image from "../../img";

const Banner = () => {
  //const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  useEffect(() => {
    //videoRef1.current.play();
    videoRef2.current.play();
    videoRef3.current.play();
  }, []);

  function handleClick(url) {
    window.location.href = url;
  };

  return (
    <div className={Style.banner}>
      <div className={Style.banner_container}>
        <div className={Style.banner_advert_1}>
        
          <Image 
          src={image.banner_1}
          className={Style.banner_advert_img1}
           width="600px"
           height= "125px"             
           onClick={() => handleClick('https://www.xdrip.io')} />
           
        </div>
        <div className={Style.banner_advert_2}>
        <Link href="/">
          <video 
          ref={videoRef2}
          src={banner2} 
          className={Style.banner_advert_vid2}
          width="100%" 
          height="100%" 
          loop 
          muted
          onClick={() => handleClick('/')} />
          </Link>
        </div>
        <div className={Style.banner_advert_3}>
          <video 
          ref={videoRef3}
          src={banner3} 
          className={Style.banner_advert_vid3}
          width="100%" 
          height="100%" 
          loop
          muted
          onClick={() => handleClick('https://www.youtube.com/channel/UCql_clMpK5GYxXUREIGfnRw')} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
