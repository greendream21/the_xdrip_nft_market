import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Style from "./SliderCard.module.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";


import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

//import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; Can use hearts insetad of stars
import Link from "next/link";

const mp3Image = "mp3.jpg";

const SliderCard = ({ NFTData }) => {
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("nftLikes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const likeNFT = (tokenId, ratingValue) => {
    setLikes((prevState) => {
      const newLikes = { ...prevState };
      if (!newLikes[tokenId]) {
        newLikes[tokenId] = { count: 0, liked: false, rating: 0 };
      }
      newLikes[tokenId].liked = !newLikes[tokenId].liked;
      if (newLikes[tokenId].liked) {
        newLikes[tokenId].count++;
        newLikes[tokenId].rating = ratingValue;
      } else {
        newLikes[tokenId].count--;
        newLikes[tokenId].rating = 0;
      }
      localStorage.setItem("nftLikes", JSON.stringify(newLikes));
      return newLikes;
    });
  };

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

  const renderFilePreview = (el) => {
    const fileType = fileTypes[el.image];

    if (fileType && fileType.includes("video")) {
        return (
        <LazyLoadComponent>
          <video
            src={el.image}
            alt="NFT"
            width={400}
            height={300}
            objectFit="cover"
            className={Style.sliderCard_box_img_img}
            controls
          />
        </LazyLoadComponent>
      );

    }
  }

  return (
    <motion.div className={Style.SliderCard_container}>
      {loading ? (
        <div className={Style.loading}>
          <p className={`${Style["loading-message"]} ${Style["loading-message-animate"]}`}>
            Loading NFTs...
          </p>
        </div>
      ) : (
        <div className={Style.sliderCard}>
          {NFTData.map((el, i) => (
            <div className={Style.sliderCard_box} key={`${el.tokenId}-${i}`}>
              <motion.div className={Style.sliderCard_box_img}>
                {renderFilePreview(el)}
                </motion.div>
              <div className={Style.sliderCard_box_title}>
                <p>{el.name}</p>
                <div className={Style.sliderCard_box_title_like}>
                  { /* LikeProfile component here */ }
                  <small># {el.tokenId}</small>
                </div>
              </div>
              <div className={Style.sliderCard_box_price}>
                <div className={Style.sliderCard_box_price_box}>
                  <small>CURRENT PRICE</small>
                  <p>{parseFloat(el.price) * 10 ** 9} BNB</p>
                </div>

                <div className={Style.sliderCard_box_price_time}>
                  <small>TIME REMAINING</small>
                  <p>
                    {i + 1}H : 15M : {i + 4}0s
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
   </motion.div>
  );
          };  
    export default SliderCard;