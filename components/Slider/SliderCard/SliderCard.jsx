import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./SliderCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const SliderCard = ({ el, i }) => {
  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        <motion.div className={Style.sliderCard_box_img}>
          <Image
            src={el.background}
            className={Style.sliderCard_box_img_img}
            alt="slider profile"
            width={600}
            height={300}
            objectFit="cover"
          />
        </motion.div>
        <div className={Style.sliderCard_box_title}>
          <p>NFT VIDEO #{i + 1}</p>
          <div className={Style.sliderCard_box_title_like}>
            { <LikeProfile /> }
            <small>{i + 4} 0f 100</small>
          </div>
        </div>

        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>CURRENT PRICE</small>
            <p>{i + 2}.0 BNB</p>
          </div>

          <div className={Style.sliderCard_box_price_time}>
            <small>TIME REMAINING</small>
            <p>
              {i + 1}H : 15M : {i + 4}0s
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SliderCard;