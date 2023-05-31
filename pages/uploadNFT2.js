import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex2";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext2";

const uploadNFT = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
          <p>
            UPLOAD AN NFT TO YOUR EXISTING COLLECTION OR CREATE A NEW ONE.
          </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>IMAGE, VIDEO, AUDIO, OR 3D MODEL</h2>
          <p>
            SUPPORTED FILE TYPES: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, Max size: 250 MB
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
