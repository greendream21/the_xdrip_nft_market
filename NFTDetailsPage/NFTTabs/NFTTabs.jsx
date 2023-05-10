import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";

const NFTTabs = ({ dataTab, icon }) => {
  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((el, i) => (
        <div className={Style.NFTTabs_box} key={i + 1}>
          <Image
            src={el.image}
            alt="profile image"
            width={40}
            height={40}
            className={Style.NFTTabs_box_img}
          />
          <div className={Style.NFTTabs_box_info}>
            <span>
              Offer OF $589 By <span>OG BRAD</span>
              {icon}
            </span>

            <small>Jun 29 - 4:12 PM</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
