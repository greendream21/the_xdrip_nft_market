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
          <h1>DISCOVER, COLLECT, AND SELL NFTS </h1>
          <p>
            RAISING THE STANDARD OF XCELLENCE IN DIGITAL ASSETS, ARTWORK, AND COLLECTIVES! 
          </p>
          <Button
            btnName="START YOUR JOURNEY"
            handleClick={() => router.push("/searchPage")}
          />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
