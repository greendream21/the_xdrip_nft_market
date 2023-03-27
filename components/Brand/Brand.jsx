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
          { <Image 
           src={images.logo} 
           alt="brand logo" 
           width={280}
           height={70}
           /> 
          }
          
          <h1>GENERATE PASSIVE INCOME WITH XDRIP</h1>
          <p>RAISING THE STANDARD OF XCELLENCE ONE DRIP AT A TIME</p>

          <div className={Style.Brand_box_left_btn}>
            <Button
              btnName="CREATE"
              handleClick={() => router.push("/uploadNFT")}
            />
            <Button
              btnName="DISCOVER"
              handleClick={() => router.push("/searchPage")}
            />
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image src={images.earn} alt="brand logo" width={800} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Brand;