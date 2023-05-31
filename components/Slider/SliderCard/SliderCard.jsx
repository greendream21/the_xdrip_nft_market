import React, { useState, useEffect, useRef } from "react";
import { MdTimer } from "react-icons/md";
import { Loader } from "../../../components/componentsindex";
import Style from "./SliderCard.module.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import images from "../../../img";
import Image from "next/image";
import ReactPlayer from 'react-player';
import { Button } from "../../componentsindex";

import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { motion } from 'framer-motion';

import Link from "next/link";

const SliderCard = ({ NFTData, likes }) => {
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const [isVisible, setIsVisible] = useState(true);

  const playerRefs = useRef([]);
  const playerRef = useRef(null);



  const handleSlideChange = (isVisible) => {
    setIsVisible(isVisible);
  };

  useEffect(() => {
    if (isVisible) {

      playerRef.current?.seekTo(0); // Reset the video to the beginning
      playerRef.current?.getInternalPlayer()?.playVideo();
    } else {

      playerRef.current?.getInternalPlayer()?.pauseVideo();
    }
  }, [isVisible]);




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
      width={350}
      height={300}
      objectFit="cover"
      className={Style.sliderCard_box_img_img}
      controls
    />
  );


  const RenderMedia = ({ src }) => {
    const fileType = fileTypes[src];

    const isImage = fileType && fileType.startsWith("image");
    const isAudio = fileType && fileType.startsWith("audio");

    const handleButtonClick = (el) => {
      // Perform any necessary logic
      // For example, you can navigate to the "/NFTDetails" page with the query parameters
      const url = `/NFTDetails?tokenId=${el.tokenId}&index=${i}`;
      // Use your preferred method for navigation (e.g., React Router, window.location, etc.)
      // Here's an example using React Router:
      router.push(url);
    };

    return (
      <LazyLoadComponent>
        {isImage ? (
          <LazyLoadImage
            src={src}
            alt="NFT"
            width={350}
            height={300}
            effect="blur"
            className={Style.sliderCard_box_img_img}
          />
        ) : isAudio ? (
          <div className={Style.sliderCard_box_audio}>
            <Image
              src={images.audio_image2}
              alt="Default"
              width={450}
              height={450}
              objectFit="cover"
              className={Style.sliderCard_box_img_audio}
            />
            <audio
              src={src}
              controls
              className={Style.sliderCard_box_audio_controls}
            />
          </div>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={src}
            muted
            loop
            controls
            playing={isVisible}
            width='759.9px'
            height='525px'
            onPlay={() => handleSlideChange(true)}
            onPause={() => handleSlideChange(false)}
            onEnded={() => handleSlideChange(false)}
            className={Style.sliderCard_box_img_img}
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

              <div className={Style.sliderCard_box_content}>
                <div className={Style.sliderCard_box_content_box}>
                  <div className={Style.sliderCard_box_title}>
                    <p>VIDEO NAME:</p>
                  </div>
                  <div className={Style.sliderCard_box_title_name}>
                    <p>{el.name}</p>
                  </div>
                  <div className={Style.sliderCard_box_token_title}>
                    <p>CONTRACT MINT ID</p>
                  </div>
                  <div className={Style.sliderCard_box_token}>
                    <p># {el.tokenId}</p>
                  </div>
                  <div className={Style.sliderCard_box_token_title}>
                    <p>XMARKET RATING</p>
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
                 
                  <div className={Style.sliderCard_box_price_box_btn_btn}>
                    <Link href={{ pathname: "/NFTDetails", query: el }} key={`${el.tokenId}-${i}`}>
                    <button className={Style.detailsButton}>DETAILS</button>
                    </Link>
                  </div>
                  
                </div>

              </div>

            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SliderCard;