import React, { useContext } from "react";
import Style from "./NFTWallet.module.css";
import images from "../../img";
import videos from "../../public/videos";
import { Banner } from "../../collectionPage/collectionIndex";
import { Slider, Brand } from "../../components/componentsindex";
import NFTWalletCard from "./NFTWalletCard/NFTWalletCard";

import MyNFTData, { MyNFTDataContext } from '../../Context/MyNFTDataContext';



const NFTWallet = () => {
  const { nfts } = useContext(MyNFTDataContext);

  const renderMedia = (url) => {
    if (!url) {
      return <p>No media found</p>;
    }

    const fileExtension = url.split('.').pop().toLowerCase();

    if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
      return <video src={url} alt="video" width="150" controls />;
    } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
      return <audio src={url} controls />;
    } else {
      return <img src={url} alt="NFT" width="150" />;
    }
  };

  return (
    <div className={Style.ntf_wallet}>
      <Banner bannerVideo={videos.bannerVideo} />
      <NFTWalletCard nfts={nfts} renderMedia={renderMedia} />
      <Slider />
      <Brand />
    </div>
  );
};

export default NFTWallet;