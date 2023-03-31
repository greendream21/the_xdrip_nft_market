import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const Brand = () => {
  const router = useRouter();
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          {<Image
            src={images.logo}
            alt="brand logo"
            width={280}
            height={70}
          />
          }

          <h1>THE ECOSYSTEM </h1>
          <p>GENERATE PASSIVE INCOME WITH XDRIP</p>

          <div className={Style.Brand_box_left_btn}>
            <Button
              btnName="WEBSITE"
              handleClick={() => window.open("https://www.xdrip.io")}
            />
            <Button
              btnName="COMMUNITY"
              handleClick={() => window.open("https://t.me/The_XdRiP_Official")}
            />
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image
            src={images.earn}
            alt="brand logo"
            width={800}
            height={500}
            className={Style.Brand_box_right_img}
          />
        </div>
      </div>
    </div>
  );
};

export default Brand;