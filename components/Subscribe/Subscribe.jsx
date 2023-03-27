import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Subscribe.module.css";
import images from "../../img";

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>BECOME AN XDRIP SOLDIER</h2>
          <p>
            SUBSCRIBE FOR OUR XCLUSIVE CONTENT  
          </p>
          <div className={Style.subscribe_box_left_box}>
            <span>1</span>
            <small>GET PRIVATE ACCESS TO LIMITED EDITION DRIPS</small>
          </div>

          <div className={Style.subscribe_box_left_box}>
            <span>2</span>
            <small>DISCOUNT PRICING OPPORTUNITIES FOR SUBSCRIBERS</small>
          </div>

          <div className={Style.subscribe_box_left_box}>
            <span>3</span>
            <small>STAY UP TO DATE ON DEVELOPMENTS WITH THE XDRIP ECOSYSTEM</small>
          </div>

          <div className={Style.subscribe_box_left_input}>
            <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" />
            <RiSendPlaneFill className={Style.subscribe_box_left_input_icon} />
          </div>
        </div>

        <div className={Style.subscribe_box_right}>
          <Image
            src={images.update}
            alt="Stay Updated"
            height={500}
            width={850}
            className={Style.subscribe_box_rightimg}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
