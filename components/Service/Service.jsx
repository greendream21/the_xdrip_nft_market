import React from "react";
import Image from "next/image";


//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";
const Service = () => {
    return (
        <div className={Style.service}>
            <div className={Style.service_box}>
                <div className={Style.service_box_item}>
                    <Image
                        src={images.service1}
                        alt="Connect Your Wallet"
                        width={200}
                        height={200}
                    />
                    <p className={Style.service_box_item_step}>
                        <span>SIGN UP/ IN AND CONNECT</span>
                    </p>
                    
                    <p>
                        CREATE YOUR ACCOUNT, LOG IN, AND CONNECT YOUR WALLET.
                    </p>
                </div>
                <div className={Style.service_box_item}>
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
                <div className={Style.service_box_item}>
                    <Image
                        src={images.service3}
                        alt="Connect Wallet"
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
                <div className={Style.service_box_item}>
                    <Image
                        src={images.service4}
                        alt="Filter & Discover"
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
            </div>
        </div>
    );
};

export default Service;