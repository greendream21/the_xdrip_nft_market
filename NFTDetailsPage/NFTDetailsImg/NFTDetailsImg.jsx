import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";

const NFTDetailsImg = ({ nft }) => {
  const [information, setInformation] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);

  const openInformation = () => {
    if (!information) {
      setInformation(true);
    } else {
      setInformation(false);
    }
  };

  const openDetails = () => {
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };


  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
            <div className={Style.NFTDetailsImg_box_NFT_img}>
            <img
              src={nft.image}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={800}
              height={800}
              objectFit="cover"
            />
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openInformation()}
        >
          <p>Owner Information</p>
          {information ? <FaArrowUp /> : <FaArrowDown />}
        </div>

        {information && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.owner}</p>
          </div>
        )}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <FaArrowUp /> : <FaArrowDown  />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685KB)</small>
            <p>
              <small>CONTRACT ADDRESS</small>
              <br></br>
              {nft.contract}
            </p>
            <p>
              <small>SELLER ROYALTIES</small>
              &nbsp; &nbsp; {nft.royalties}
            </p>
            <p>
              <small>TOKEN ID</small>
              &nbsp; &nbsp; {nft.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;