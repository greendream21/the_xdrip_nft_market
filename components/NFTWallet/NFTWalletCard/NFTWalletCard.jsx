import React from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./NFTWalletCard.module.css";
import { MyNFTDataContext } from "../../../Context/MyNFTDataContext";

const NFTWalletCard = () => {
  return (
    <MyNFTDataContext.Provider>
      {({ nfts }) => (
        <div className={Style.NFTWalletCard}>
          {nfts.map(({ tokenId, metadata }, i) => (
            <Link
              href={{ pathname: "/NFT-details", query: { tokenId } }}
              key={i + 1}
            >
              <div className={Style.NFTWalletCard_box} key={i + 1}>
                <div className={Style.NFTWalletCard_box_like}>
                  <div className={Style.NFTWalletCard_box_like_box}>
                    <div className={Style.NFTWalletCard_box_like_box_box}></div>
                  </div>
                </div>

                <div className={Style.NFTWalletCard_box_img}>
                  <Image
                    src={metadata.image}
                    alt={metadata.name}
                    width={500}
                    height={500}
                    style={{ objectFit: "cover" }}
                    className={Style.NFTWalletCard_box_img_img}
                  />
                </div>

                <div className={Style.NFTWalletCard_box_info}>
                  <small>Token ID: {tokenId}</small>
                </div>

                <div className={Style.NFTWalletCard_box_price}>
                  <div className={Style.NFTWalletCard_box_price_box}>
                    <small>CURRENT PRICE</small>
                    <p>{metadata.price} BNB</p>
                  </div>
                  <p className={Style.NFTWalletCard_box_price_stock}>
                    <span>{metadata.description}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </MyNFTDataContext.Provider>
  );
};

export default NFTWalletCard;
