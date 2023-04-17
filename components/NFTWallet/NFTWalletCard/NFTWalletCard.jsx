import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./NFTWalletCard.module.css";
import { MyNFTDataContext } from "../../../Context/MyNFTDataContext";

const NFTWalletCard = ({ renderMedia }) => {
  const { nfts } = useContext(MyNFTDataContext);

  const [flippedCards, setFlippedCards] = useState(Array(nfts.length).fill(false));

  const handleClick = (i) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[i] = !newFlippedCards[i];
    setFlippedCards(newFlippedCards);
  };

  const isImage = (url) => {
    const extensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const match = url.match(/\.([a-z]+)(?:[?#]|$)/i);
    return extensions.includes(match && match[1]);
  };

  return (
    <div className={Style.NFTWalletCard}>
      {nfts.map(({ tokenId, metadata }, i) => (
        <div
          className={`${Style.NFTWalletCard_box} ${flippedCards[i] ? Style.flipped : ""}`}
          key={i + 1}
          onClick={() => handleClick(i)}
        >
          <div className={Style.NFTWalletCard_box_front}>
            <div className={Style.NFTWalletCard_box_img}>
              {isImage(metadata.animation_url) ? (
                <Image
                  src={metadata.image_url}
                  alt={metadata.name}
                  width={300}
                  height={300}
                  style={{ objectFit: "cover" }}
                  className={Style.NFTWalletCard_box_img_img}
                />
              ) : (
                <video
                  src={metadata.animation_url}
                  alt={metadata.name}
                  autoPlay={true}
                  controls={true}
                  muted={true}
                  width={300}
                  loop={true}
                  height={300}
                  controlsList="nodownload"
                  style={{ objectFit: "cover" }}
                  className={Style.NFTWalletCard_box_img_vid}
                />
              )}
            </div>

            <div className={Style.NFTWalletCard_box_info}>
              <button className={Style.NFTWalletCard_button}>
                <h3>{metadata.name ? metadata.name : "NO DATA AVAILABLE"}</h3>
                <small>ID: {tokenId ? tokenId : "NO DATA AVAILABLE"}</small>
                <p>NFT DETAILS ON BACK OF CARD</p>
              </button>
            </div>
          </div>

          <div className={Style.NFTWalletCard_box_back}>
            <h3>COLLECTION</h3>
            <p>{metadata.collection ? metadata.collection : "NO DATA AVAILABLE"}</p>

            <h3>CREATION DATE</h3>
            <p>{metadata.creation ? metadata.creation : "NO DATA AVAILABLE"}</p>

            <h3>CONTRACT</h3>
            <p>{metadata.contract ? metadata.contract : "NO DATA AVAILABLE"}</p>

            <h3>DESCRIPTION</h3>
            <p>{metadata.description ? metadata.description : "NO DATA AVAILABLE"}</p>
          </div>
          </div>
     
      ))}
    </div>
  );
};

export default NFTWalletCard;
