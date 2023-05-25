import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";
import { Banner } from "../collectionPage/collectionIndex";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const uploadNFT = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
      <Banner/>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>CREATE A NEW ASSET</h1>
          <p>
            UPLOAD AN NFT TO YOUR EXISTING COLLECTION OR CREATE A NEW ONE.
          </p>
        </div>



        <div className={Style.uploadNFT_box_form}>
          <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
        </div>
      </div>
    </div>
  );
};

export default uploadNFT;
