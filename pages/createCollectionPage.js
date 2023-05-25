import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { CreateCollection } from "../CreateCollection/createCollectionIndex";
import { Banner } from "../collectionPage/collectionIndex";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const createCollectionPage = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
      <Banner/>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>CREATE A NEW COLLECTION</h1>
          <p>
            YOUR FIRST STEP IN DISPLAYING YOUR CREATIONS.
          </p>
        </div>



        <div className={Style.uploadNFT_box_form}>
          <CreateCollection />
        </div>
      </div>
    </div>
  );
};

export default createCollectionPage;
