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

//import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; Can use hearts insetad of stars
import Link from "next/link";

const mp3Image = "mp3.jpg";

const SliderCard = ({ nfts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    const fetchFileTypes = async () => {
      const fileTypesObj = {};

      for (const el of nfts) {
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
  }, [nfts]);

  const renderFilePreview = (el) => {
    const fileType = fileTypes[el.image];

    if (fileType && fileType.includes("image")) {
      return (
  <LazyLoadImage
    src={el.image}
    alt="NFT"
    width={350}
    height={300}
    effect="blur"
    className={Style.SliderCard_box_img_img}
  />
);
    } else if (fileType && fileType.includes("video")) {
      return (
  <LazyLoadComponent>
    <video
      src={el.image}
      alt="NFT"
      width={350}
      height={300}
      objectFit="cover"
      className={Style.SliderCard_box_img_img}
      controls
    />
  </LazyLoadComponent>
      );
    } else if (fileType && fileType.includes("audio")) {
      return (
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
            src={el.image}
            controls
            className={Style.SliderCard_box_audio_controls}
          />
        </div>
      );
    } else {
      return (
         <Image
          src={images.invalidImage}
          alt="NFT"
          width={350}
          height={300}
          objectFit="cover"
          className={Style.SliderCard_box_img_img}
          controls
        />
     
      );
    }
  };

  return (
    <div className={Style.SliderCard_container}>
      {loading ? (
        <div className={Style.loading}>
          <p
            className={`${Style["loading-message"]} ${Style["loading-message-animate"]}`}
          >
            Loading NFTs...
          </p>
        </div>
      ) : (
        <>
          <div className={Style.SliderCard}>
            {currentItems.map((el, i) => (
              <Link
                href={{ pathname: "/NFTDetails", query: el }}
                key={`${el.tokenId}-${i}`}
              >
                <div className={Style.SliderCard_box}>
                  <div className={Style.SliderCard_box_img}>
                    {renderFilePreview(el)}
                  </div>
                  <div className={Style.SliderCard_box_info}>
                    <div className={Style.SliderCard_box_info_left}>
                      <p>{el.name}</p>
                    </div>
                   
                  </div>
                    <div className={Style.SliderCard_box_tokenid}>
                    <small> # {el.tokenId}</small>
                    </div>

                  <div className={Style.SliderCard_box_price}>
                    <div className={Style.likesContainer}>
                      <div className={Style.SliderCard_box_like_box}></div>
                    </div>
                    <div className={Style.SliderCard_box_price_box}>
                      <small>CURRENT PRICE</small>
                      <p>{parseFloat(el.price) * 10 ** 9} BNB</p>
                    </div>
                    <p className={Style.SliderCard_box_price_stock}>
                      <Rating
                        emptySymbol={
                          <FaRegStar style={{ marginRight: "5px" }} />
                        }
                        fullSymbol={<FaStar style={{ marginRight: "5px" }} />}
                        onClick={(value) => likeNFT(el.tokenId, value)}
                        initialRating={
                          likes[el.tokenId] ? likes[el.tokenId].rating : 0
                        }
                      />

                      <div className={Style.likesNumber}>
                        <span>
                          {likes[el.tokenId] ? likes[el.tokenId].count : 0}
                        </span>
                      </div>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SliderCard;
