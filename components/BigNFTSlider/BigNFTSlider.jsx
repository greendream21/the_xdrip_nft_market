import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillRocket, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";

const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(0);

  const sliderData = [
    {
      title: "COMMON MEDAL",
      id: 1,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: ".25 BNB",
      like: 369,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 14,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
    {
      title: "UNCOMMON MEDAL",
      id: 2,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: ".50 BNB",
      like: 369,
      image: images.user1,
      nftImage: images.nft_image_2,
      time: {
        days: 14,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
    {
      title: "RARE MEDAL",
      id: 3,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: ".75 BNB",
      like: 369,
      image: images.user1,
      nftImage: images.nft_image_3,
      time: {
        days: 14,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
    {
      title: "EPIC MEDAL",
      id: 4,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: "1.0 BNB",
      like: 369,
      image: images.user1,
      nftImage: images.nft_image_4,
      time: {
        days: 14,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
    {
        title: "LEGENDARY MEDAL",
        id: 5,
        name: "XDRIP OFFICIAL",
        collection: "MEDALS OF HONOR",
        price: "1.5 BNB",
        like: 369,
        image: images.user1,
        nftImage: images.nft_image_5,
        time: {
          days: 14,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
      },
  ];

  //-------INC
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);

  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>CREATOR</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillRocket
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>COLLECTION</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>CURRENT PRICE</small>
              <p>
                {sliderData[idNumber].price} <span>$589</span>
              </p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>AUCTION ENDING IN</span>
            </p>

            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.days}</p>
                <span>DAYS</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.hours}</p>
                <span>HOURS</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>MINUTES</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>SECONDS</span>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_button}>
              <Button btnName="FORGE" handleClick={() => {}} />
              <Button btnName="VIEW" handleClick={() => {}} />
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={sliderData[idNumber].nftImage}
              alt="NFT IMAGE"
              className={Style.bigNFTSlider_box_right_box_img}
            />

            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;