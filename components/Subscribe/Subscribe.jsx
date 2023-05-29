import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Image from "next/image";
import { Button } from "../componentsindex";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Subscribe.module.css";
import images from "../../img";

const Subscribe = () => {

  const router = useRouter();

  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>BECOME A CREATOR</h2>
          <p>
            SUBSCRIBE FOR XCLUSIVE ACCESS  
          </p>
          <div className={Style.subscribe_box_left_box}>
            <span>                
              <Image
                src={images.bullet_6}
                alt="Logo"
                width={70}
                height={70}
                /></span>
            <small>GET PRIVATE ACCESS TO LIMITED EDITION DRIPS</small>
          </div>

          <div className={Style.subscribe_box_left_box}>
            <span>
            <Image
                src={images.bullet_6}
                alt="Logo"
                width={70}
                height={70}
                />
            </span>
            <small>DISCOUNT PRICING OPPORTUNITIES FOR SUBSCRIBERS</small>
          </div>

          <div className={Style.subscribe_box_left_box}>
            <span>
            <Image
                src={images.bullet_6}
                alt="Logo"
                width={70}
                height={70}
                />
            </span>
            <small>STAY UP TO DATE ON DEVELOPMENTS WITH THE XDRIP ECOSYSTEM</small>
          </div>

          <div className={Style.subscribe_box_left_btn}>
          <Button
            btnName="BEGIN CREATING"
            handleClick={() => router.push("/createButtonsPage")}
          />
          </div>
        </div>

        <div className={Style.subscribe_box_right}>
          <Image
            src={images.update}
            alt="Stay Updated"
            height={500}
            width={850}
            className={Style.subscribe_box_right_img}
            
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
