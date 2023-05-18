import React, { useState, useEffect, useContext } from "react";
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
import Style from "./Filter3.module.css";
import Loader from "../Loader/Loader";
import NFTCard from "../NFTCard/NFTCard";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Filter = () => {
  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(true);
  const [music, setMusic] = useState(true);
  const { fetchNFTs, setError, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);
  const [category, setCategory] = useState("nfts");
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items);
        setSelectedCategoryData(shuffleArray(items).slice(0, displayCount));
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
  const updateSelectedCategoryData = () => {
    let filteredNFTs = [];
    switch (category) {
      case "nfts":
        filteredNFTs = shuffleArray(nfts);
        break;
      case "ART":
        filteredNFTs = shuffleArray(nfts.filter((nft) => nft.category === "ART"));
        break;
      case "GAMING":
        filteredNFTs = shuffleArray(nfts.filter((nft) => nft.category === "GAMING"));
        break;
      case "SPORTS":
        filteredNFTs = shuffleArray(nfts.filter((nft) => nft.category === "SPORTS"));
        break;
      case "METAVERSE":
        filteredNFTs = shuffleArray(nfts.filter((nft) => nft.category === "METAVERSE"));
        break;
      case "PHOTOGRAPHY":
        filteredNFTs = shuffleArray(nfts.filter((nft) => nft.category === "PHOTOGRAPHY"));
        break;
      default:
        filteredNFTs = shuffleArray(nfts);
    }
    setSelectedCategoryData(filteredNFTs.slice(0, displayCount));
  };

  updateSelectedCategoryData();
}, [category, nfts, displayCount]);

const handleNext = () => {
  const nextIndex = currentPage + 1;
  setSelectedCategoryData(nfts.slice(nextIndex * displayCount, (nextIndex + 1) * displayCount));
  setCurrentPage(nextIndex);
};

const handlePrev = () => {
  const prevIndex = currentPage - 1;
  setSelectedCategoryData(nfts.slice(prevIndex * displayCount, (prevIndex + 1) * displayCount));
  setCurrentPage(prevIndex);
};

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

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <button onClick={() => setCategory("nfts")}>ALL NFTs</button>
          <button onClick={() => setCategory("ART")}>ART</button>
          <button onClick={() => setCategory("GAMING")}>GAMING</button>
          <button onClick={() => setCategory("SPORTS")}>SPORTS</button>
          <button onClick={() => setCategory("METAVERSE")}>METAVERSE</button>
          <button onClick={() => setCategory("PHOTOGRAPHY")}>
            PHOTOGRAPHY
          </button>
        </div>
        <div className={Style.filter_box_right}>
          <div className={Style.filter_box_right_box} onClick={openFilter}>
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
              onClick={openImage}
            >
              <FaImages /> <small>IMAGES</small>
              {image ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>
          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={openVideo}
            >
              <FaVideo /> <small>VIDEOS</small>
              {video ? <AiFillCloseCircle /> : <TiTick />}
            </div>
          </div>
          <div className={Style.filter_box_items_box}>
            <div
              className={Style.filter_box_items_box_item_trans}
              onClick={openMusic}
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
        {selectedCategoryData.length === 0 ? (
          <Loader />
        ) : (
          <>
            {/*
            <NFTCard NFTData={selectedCategoryData} />
            */}
            
            <NFTCard NFTData={selectedCategoryData} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            
            <div>
              {currentPage > 0 && (
                <button onClick={handlePrev}>Previous</button>
              )}
              {selectedCategoryData.length === displayCount && (
                <button onClick={handleNext}>Next</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
