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
                        <span>DRIP 1</span>
                    </p>
                    <h3>CONNECT YOUR WALLET</h3>
                    <p>
                        CONNECT YOUR WALLET USING THE "CONNECT WALLET" BUTTON IN THE HEADER.
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
                        <span>DRIP 2</span>
                    </p>
                    <h3>FILTER & SEARCH</h3>
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
                        <span>DRIP 3</span>
                    </p>
                    <h3>DISCOVER</h3>
                    <p>
                        DISCOVER THE NFT THAT FITS YOUR WANTS, NEEDS, AND XPECTATIONS.
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
                        <span>DRIP 4</span>
                    </p>
                    <h3>START TRADING WITH X-MARKET</h3>
                    <p>
                        BEGIN YOUR NFT TRADING JOURNEY WITH THE SUPPORT OF THE XDRIP FAMILY.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Service;