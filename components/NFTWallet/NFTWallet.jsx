import React from "react";

//INTERNAL IMPORT
import Style from "./NFTWallet.module.css";
import images from "../../img";
import videos from "../../public/videos";
import { NFTWalletCard } from "./NFTWalletCard/NFTWalletCard";
import { Banner } from "../../collectionPage/collectionIndex";
import { Slider, Brand } from "../../components/componentsindex";
import { MyNFTDataContext } from "../../Context/MyNFTDataContext";

const NFTWallet = () => {
  return (
    <MyNFTDataContext>
      {({ nfts }) => (
        <div className={Style.ntf_wallet}>
          <Banner bannerVideo={videos.bannerVideo} />
          <NFTWalletCard nfts={nfts} />
          <Slider />
          <Brand />
        </div>
      )}
    </MyNFTDataContext>
  );
};

export default NFTWallet;