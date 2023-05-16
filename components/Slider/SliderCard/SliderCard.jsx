import React, { useState, useEffect } from "react";
import { MdTimer } from "react-icons/md";
import { Loader } from "../../../components/componentsindex";
import Style from "./SliderCard.module.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import images from "../../../img";
import Image from "next/image";

import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


import { motion } from 'framer-motion';

import Link from "next/link";

const mp3Image = "mp3.jpg";

const SliderCard = ({ NFTData, likes }) => {
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileTypes = async () => {
      const fileTypesObj = {};

      for (const el of NFTData) {
        try {
          const response = await fetch(el.image);
          const contentType = response.headers.get("content-type");
          fileTypesObj[el.image] = contentType;
        } catch (error) {
          console.log(error);
        }
      }

      setFileTypes(fileTypesObj);
      setLoading(false);
    };

    fetchFileTypes();
  }, [NFTData]);

  const RenderImage = ({ src }) => (
    <LazyLoadImage
      src={src}
      alt="NFT"
      width={350}
      height={300}
      effect="blur"
      className={Style.SliderCard_box_img_img}
    />
  );

  const RenderVideo = ({ src }) => (
    <LazyLoadComponent>
      <video
        src={src}
        alt="NFT"
        width={350}
        height={350}
        objectFit="cover"
        className={Style.SliderCard_box_img_img}
        controls
        preload="auto"
      />
    </LazyLoadComponent>
  );

  const RenderAudio = ({ src }) => (
    <div className={Style.SliderCard_box_audio}>
      <img
        src={mp3Image}
        alt="Default"
        width={350}
        height={255}
        objectFit="cover"
        className={Style.SliderCard_box_img_audio}
      />
      <audio
        src={src}
        controls
        className={Style.SliderCard_box_audio_controls}
      />
    </div>
  );

  const RenderDefault = () => (
    <Image
      src={images.invalidImage}
      alt="NFT"
      width={350}
      height={300}
      objectFit="cover"
      className={Style.SliderCard_box_img}
      controls
    />
  );

  const renderFilePreview = (el) => {
    const fileType = fileTypes[el.image];

    if (fileType && fileType.includes("image")) {
      return <RenderImage src={el.image} />;
    } else if (fileType && fileType.includes("video")) {
      return <RenderVideo src={el.image} />;
    } else if (fileType && fileType.includes("audio")) {
      return <RenderAudio src={el.image} />;
    } else {
      return <RenderDefault />;
    }
  };
  
  
  return (
  <motion.div className={Style.sliderCard_container}>
    {loading ? (
      <div className={Style.loading}>
        <p className={`${Style["loading-message"]} ${Style["loading-message-animate"]}`}>
          Loading NFTs...
        </p>
      </div>
   ) : (
    <div className={Style.sliderCard}>
      {NFTData.map((el, i) => (
        <motion.div className={Style.sliderCard_box} key={`${el.tokenId}-${i}`}>
          <div className={Style.sliderCard_box_img}>
            {renderFilePreview(el)}
          </div>
          <Link
                href={{ pathname: "/NFTDetails", query: el }}
                key={`${el.tokenId}-${i}`}
                >
          <div className={Style.sliderCard_box_content}>
            <div className={Style.sliderCard_box_content_box}>
            <div className={Style.sliderCard_box_title}>
                   <p>NFT NAME:</p>
                </div> 
              <div className={Style.sliderCard_box_title_name}>
                   <p>{el.name}</p>
                </div> 
                <div className={Style.sliderCard_box_token}>
                  <p>NFT MINT ID</p>
                </div>               
                <div className={Style.sliderCard_box_token}>
                  <p># {el.tokenId}</p>
                </div>
                <div className={Style.sliderCard_box_title_like}>
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

            <div className={Style.sliderCard_box_price}>              
              <div className={Style.sliderCard_box_price_box}>
                <small>CURRENT PRICE</small>
                <p>{parseFloat(el.price) * 10 ** 9} BNB</p>
              </div>
            </div>

          </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )}
</motion.div>
);
};

export default SliderCard;