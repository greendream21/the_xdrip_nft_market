import React, { useState, useEffect } from "react";
import { MdTimer } from "react-icons/md";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import Style from "./AudioCard.module.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import images from "../../../img";
import Image from "next/image";


import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


import { motion } from 'framer-motion';

import Link from "next/link";

const AudioCard = ({ NFTData, likes }) => {
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [play, setPlay] = useState(false);
  
  useEffect(() => {
  const fetchFileTypes = async () => {
    let fileTypesObj = {};

    const savedData = localStorage.getItem('fileTypesObj');
    if (savedData) {
      fileTypesObj = JSON.parse(savedData);
    }

    for (const el of NFTData) {
      if (!fileTypesObj[el.image]) {
        try {
          const response = await fetch(el.image);
          const contentType = response.headers.get("content-type");
          fileTypesObj[el.image] = contentType;
        } catch (error) {
          console.log(error);
        }
      }
    }

    localStorage.setItem('fileTypesObj', JSON.stringify(fileTypesObj));

    setFileTypes(fileTypesObj);
    setLoading(false);
  };

  fetchFileTypes();
}, [NFTData]);

  

  const RenderDefault = () => (
  <Image
    src={images.invalidImage}
    alt="NFT"
    width={450}
    height={450}
    objectFit="cover"
    className={Style.audioCard_box_img_img}
    controls
  />
);

const RenderMedia = ({ src }) => {
  const fileType = fileTypes[src];
  
  const isImage = fileType && fileType.startsWith("image");
  const isAudio = fileType && fileType.startsWith("audio");
  
  return (
    <LazyLoadComponent>
      {isImage ? (
        <LazyLoadImage
          src={src}
          alt="NFT"
          width={450}
          height={450}
          effect="blur"
          className={Style.NFTCardTwo_box_img_img}
        />
      ) : isAudio ? (
        <div className={Style.audioCard_box_audio}>
          <Image
            src={images.audio_image2}
            alt="Default"
            width={760}
            height={450}
            objectFit="cover"
            className={Style.audioCard_box_img_audio}
          />
          <audio
            src={src}
            controls
            className={Style.audioCard_box_audio_controls}
          />
        </div>
      ) : (
        <ReactPlayer 
          url={src}
          controls
          playing={isVisible}
          width='650px'
          height='450px'
          className={Style.audioCard_box_img_img}
        />
      )}
    </LazyLoadComponent>
  );
};

const renderFilePreview = (el) => {
  const fileType = fileTypes[el.image];

  return fileType ? <RenderMedia src={el.image} /> : <RenderDefault />;
};
 
  return (
  <motion.div className={Style.audioCard_container}>

    <div className={Style.audioCard}>
      {NFTData.map((el, i) => (
        <motion.div className={Style.audioCard_box} key={`${el.tokenId}-${i}`}>
          <div className={Style.audioCard_box_img}>
            {renderFilePreview(el)}
          </div>
          <div className={Style.audioCard_box_content}>
            <div className={Style.audioCard_box_content_box}>
            <div className={Style.audioCard_box_title}>
                   <p>NFT NAME:</p>
                </div> 
              <div className={Style.audioCard_box_title_name}>
                   <p>{el.name}</p>
                </div> 
                <div className={Style.audioCard_box_token_title}>
                  <p>NFT MINT ID</p>
                </div>               
                <div className={Style.audioCard_box_token}>
                  <p># {el.tokenId}</p>
                </div>
                <div className={Style.audioCard_box_token_title}>
                  <p>NFT RATING</p>
                </div>    
                <div className={Style.audioCard_box_title_like}>
                <Rating
                  emptySymbol={<FaRegStar style={{ marginRight: "5px" }} />}
                  fullSymbol={<FaStar style={{ marginRight: "5px" }} />}
                  onClick={(value) => likeNFT(el.tokenId, value)}
                  initialRating={likes[el.tokenId] ? likes[el.tokenId].rating : 0}
                />
                <div className={Style.likesNumber}>
                  <span>{likes[el.tokenId] ? likes[el.tokenId].count : 0}</span>
                </div>                
              </div>              
            </div>

            <div className={Style.audioCard_box_price}>              
              <div className={Style.audioCard_box_price_box}>
                <small>CURRENT PRICE</small>
                <p>{parseFloat(el.price) * 10 ** 9} BNB</p>
              </div>

              <div className={Style.audioCard_box_price_box_btn_btn}>
                    <Link href={{ pathname: "/NFTDetails", query: el }} key={`${el.tokenId}-${i}`}>
                    <button className={Style.detailsButton}>DETAILS</button>
                    </Link>
                  </div>
              
            </div>

          </div>
         
        </motion.div>
      ))}
    </div>
</motion.div>
);
};


export default AudioCard;