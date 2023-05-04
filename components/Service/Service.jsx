import React from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";
import videos from "../../public/videos"

const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
        <Link href="/">
          <a>
            <div className={Style.service_box_item1}>
            <video width="250" height="250" autoPlay loop muted>
            <source src={videos.coin1} type="video/mp4" />
          </video>
              <h1 className={Style.service_box_item_step}>
                <span>SIGN UP/ IN AND CONNECT</span>
              </h1>
              <p>CREATE YOUR ACCOUNT, LOG IN, AND CONNECT YOUR WALLET.</p>
            </div>
          </a>
        </Link>

        <Link href="#filter">
          <a>
            <div className={Style.service_box_item2}>
            <video width="250" height="250" autoPlay loop muted>
            <source src={videos.coin2} type="video/mp4" />
          </video>
              <h1 className={Style.service_box_item_step}>
                <span>SEARCH AND FILTER</span>
              </h1>

              <p>
                ENTER IN YOUR DESIRED FILTERS AND SEARCH OUR NFT DATABASE.
              </p>
            </div>
          </a>
        </Link>

        <Link href="#creators">
          <a>
            <div className={Style.service_box_item3}>
            <video width="250" height="250" autoPlay loop muted>
            <source src={videos.coin3} type="video/mp4" />
          </video>
              <h1 className={Style.service_box_item_step}>
                <span>XPLORE OUR CREATORS</span>
              </h1>

              <p>
                XPLORE OUR GROWING DATABASE OF VERIFIED NFT CREATORS.
              </p>
            </div>
          </a>
        </Link>

        <Link href="#category">
          <a>
            <div className={Style.service_box_item4}>
            <video width="250" height="250" autoPlay loop muted>
            <source src={videos.coin5} type="video/mp4" />
          </video>
              <h1 className={Style.service_box_item_step}>
                <span>START TRADING WITH XMARKET</span>
              </h1>

              <p>
                BEGIN YOUR TRADING XPERIENCE WITH THE XMARKET FAMILY.
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Service;
