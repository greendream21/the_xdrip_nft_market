import React from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";

const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
        <Link href="/">
          <a>
            <div className={Style.service_box_item1}>
              <div className={Style.logo}>
                <Image
                  src={images.service1}
                  alt="Connect Your Wallet"
                  width={200}
                  height={200}
                />
              </div>
              <p className={Style.service_box_item_step}>
                <span>SIGN UP/ IN AND CONNECT</span>
              </p>
              <p>CREATE YOUR ACCOUNT, LOG IN, AND CONNECT YOUR WALLET.</p>
            </div>
          </a>
        </Link>

        <Link href="#filter">
          <a>
            <div className={Style.service_box_item2}>
              <Image
                src={images.service2}
                alt="Filter & Discover"
                width={200}
                height={200}
              />
              <p className={Style.service_box_item_step}>
                <span>SEARCH AND FILTER</span>
              </p>

              <p>
                ENTER IN YOUR DESIRED FILTERS AND SEARCH OUR NFT DATABASE.
              </p>
            </div>
          </a>
        </Link>

        <Link href="#creators">
          <a>
            <div className={Style.service_box_item3}>
              <Image
                src={images.service3}
                alt="CREATORS"
                width={200}
                height={200}
              />
              <p className={Style.service_box_item_step}>
                <span>XPLORE OUR CREATORS</span>
              </p>

              <p>
                XPLORE OUR GROWING DATABASE OF VERIFIED NFT CREATORS.
              </p>
            </div>
          </a>
        </Link>

        <Link href="#category">
          <a>
            <div className={Style.service_box_item4}>
              <Image
                src={images.service4}
                alt="Categories"
                width={200}
                height={200}
              />
              <p className={Style.service_box_item_step}>
                <span>START TRADING WITH XMARKET</span>
              </p>

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
