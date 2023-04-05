import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";




const HeroSection = () => {
 
  const router = useRouter();
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>DISCOVER,</h1>
          <h2>COLLECT, AND</h2>
          <h3>SELL NFTS </h3>
          <p>
            RAISING THE STANDARD OF XCELLENCE IN DIGITAL ASSETS, ARTWORK, AND COLLECTIVES! 
          </p>
          <Button
            btnName="BEGIN XPLORING"
            handleClick={() => router.push("/searchPage")}
          />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero4}
            alt="Hero section"
            width={650}
            height={650}
            className={Style.heroSection_box_right_img}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
