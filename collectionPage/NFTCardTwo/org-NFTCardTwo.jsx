import React, { useState, useEffect } from "react";
import Style from "./NFTCardTwo.module.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import images from "../../img";
import Image from "next/image";
import ReactPlayer from 'react-player';

import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Link from "next/link";

const ITEMS_PER_FETCH = 4;

const NFTCardTwo = ({ NFTData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("nftLikes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const [lastFetchedIndex, setLastFetchedIndex] = useState(0);

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

  const fetchFileTypes = async () => {
    setLoading(true);
    const fileTypesObj = { ...fileTypes };
    const NFTsToFetch = NFTData.slice(
      lastFetchedIndex,
      lastFetchedIndex + ITEMS_PER_FETCH
    );

    for (const el of NFTsToFetch) {
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
    setLastFetchedIndex(lastFetchedIndex + ITEMS_PER_FETCH);
  };

  useEffect(() => {
    fetchFileTypes();
  }, [NFTData]);

  const RenderDefault = () => (
    <Image
      src={images.invalidImage}
      alt="NFT"
      width={350}
      height={300}
      objectFit="cover"
      className={Style.NFTCardTwo_box_img_img}
      controls
    />
  );

  const RenderMedia = ({ src }) => {
    const isImage = fileTypes[src] && fileTypes[src].startsWith("image");
    const isAudio = fileTypes[src] && fileTypes[src].startsWith("audio");

    return (
      <LazyLoadComponent>
        {isImage ? (
          <LazyLoadImage
            src={src}
            alt="NFT"
            width={350}
            height={300}
            effect="blur"
            className={Style.NFTCardTwo_box_img_img}
          />
        ) : isAudio ? (
          <div className={Style.NFTCardTwo_box_img_music}>
            <Image
              src={images.musicNFT}
              alt="NFT"
              width={350}
              height={300}
              objectFit="cover"
              className={Style.NFTCardTwo_box_img_img}
            />
            <audio controls src={src} className={Style.NFTCardTwo_box_img_audio}>
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <ReactPlayer
            url={src}
            className={Style.NFTCardTwo_box_img_video}
            width="100%"
            height="100%"
            controls
          />
        )}
      </LazyLoadComponent>
    );
  };

  return (
    <div className={Style.NFTCardTwo}>
      {NFTData.map((el, i) => (
        <div key={i} className={Style.NFTCardTwo_box}>
          <div className={Style.NFTCardTwo_box_img}>
            {fileTypes[el.image] ? (
              <RenderMedia src={el.image} />
            ) : (
              <RenderDefault />
            )}
          </div>
          <Link href={`/NFTDetail/${el.tokenId}`}>
            <a>
              <h2 className={Style.NFTCardTwo_box_title}>{el.name}</h2>
            </a>
          </Link>
          <Rating
            initialRating={
              likes[el.tokenId] && likes[el.tokenId].liked
                ? likes[el.tokenId].rating
                : 0
            }
            onClick={(rate) => likeNFT(el.tokenId, rate)}
            emptySymbol={<FaRegStar color="var(--yellow)" />}
            fullSymbol={<FaStar color="var(--yellow)" />}
          />
        </div>
      ))}
      <button onClick={fetchFileTypes} disabled={lastFetchedIndex >= NFTData.length}>
        Load more
      </button>
    </div>
  );
};

export default NFTCardTwo;
