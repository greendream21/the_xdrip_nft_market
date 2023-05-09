import React, { useState, useContext, useEffect } from "react";

import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaWallet,
  FaMusic,
  FaVideo,
  FaImages,
  FaUserAlt,
} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Filter.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Loader from "../Loader/Loader";
import NFTCardTwo from "../../collectionPage/NFTCardTwo/NFTCardTwo";
import NFTCard from "../NFTCard/NFTCard";

const Filter = () => {
  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(true);
  const [music, setMusic] = useState(true);

  //FUNCTION SECTION
  const openFilter = () => {
    setFilter(!filter);
  };

  const openImage = () => {
    setImage(!image);
  };

  const openVideo = () => {
    setVideo(!video);
  };

  const openMusic = () => {
    setMusic(!music);
  };

  const { fetchNFTs, setError, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    try {
      if (currentAccount) {
        fetchNFTs().then((items) => {
          setNfts(items.reverse());
          setNftsCopy(items);
        });
      }
    } catch (error) {
      setError("Please reload the browser", error);
    }
  }, []);

  const [category, setCategory] = useState("nfts");
  const [selectedCategoryData, setSelectedCategoryData] = useState(nfts);

  useEffect(() => {
    switch (category) {
      case "nfts":
        setSelectedCategoryData(nftsCopy);
        break;
      case "ART":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "ART"));
        break;
      case "GAMING":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "GAMING"));
        break;
      case "SPORTS":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "SPORTS"));
        break;
      case "METAVERSE":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "METAVERSE"));
        break;
      case "PHOTOGRAPHY":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "PHOTOGRAPHY"));
        break;
      default:
        setSelectedCategoryData(nftsCopy);
    }
  }, [category]);

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <button onClick={() => setCategory("nfts")}>ALL NFTs</button>
          <button onClick={() => setCategory("ART")}>ART</button>
          <button onClick={() => setCategory("GAMING")}>GAMING</button>
          <button onClick={() => setCategory("SPORTS")}>SPORTS</button>
          <button onClick={() => setCategory("METAVERSE")}>METAVERSE</button>
          <button onClick={() => setCategory("PHOTOGRAPHY")}>PHOTOGRAPHY</button>
        </div>

        <div className={Style.filter_box_right}>
          <div className={Style.filter_box_right_box} onClick={() => openFilter()}>
            <FaFilter />
            <span>FILTER</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>
      </div>

      {filter && (
        <div className={Style.filter_box_items}>
          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaWallet /> <span>.01 BNB - 10 BNB</span>
              <AiFillCloseCircle />
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={() => openImage()}
            >
              <FaImages /> <small>IMAGES</small>
              {image ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={() => openVideo()}
            >
              <FaVideo /> <small>VIDEOS</small>
              {video ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={() => openMusic()}
            >
              <FaMusic /> <small>MUSIC</small>
              {music ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>

          <div className={Style.filter_box_items_box}>
            <div className={Style.filter_box_items_box_item}>
              <FaUserAlt /> <span>VERIFIED</span>
              <MdVerified />
            </div>
          </div>
        </div>
      )}

      <div className={Style.category_section}>
        {category === "nfts" ? (
          selectedCategoryData.length === 0 ? (
            <Loader />
          ) : (
            <NFTCard NFTData={selectedCategoryData} />
          )
        ) : (
          selectedCategoryData.length === 0 ? (
            <p>NO {category} NFT'S CURRENTLY AVAILABLE</p>
          ) : (
            <NFTCard NFTData={selectedCategoryData} />
          )
        )}
      </div>
    </div>
  );
};

export default Filter;


