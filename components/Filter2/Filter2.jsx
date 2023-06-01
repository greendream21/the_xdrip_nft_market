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
import Style from "./Filter2.module.css";
import Loader from "../Loader/Loader";
import NFTCardTwo from "../../collectionPage/NFTCardTwo/NFTCardTwo";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import images from "../../img";
import Image from "next/image";

const Filter2 = () => {
  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(true);
  const [music, setMusic] = useState(true);
  const { fetchNFTs, setError, currentAccount } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [category, setCategory] = useState("nfts");
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items.reverse());
        setNftsCopy(items);
        setSelectedCategoryData(items);
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchFileTypes = async () => {
      let fileTypesObj = {};

      const savedData = localStorage.getItem("fileTypesObj");
      if (savedData) {
        fileTypesObj = JSON.parse(savedData);
      }

      for (const el of nfts) {
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

      localStorage.setItem("fileTypesObj", JSON.stringify(fileTypesObj));

      setFileTypes(fileTypesObj);
      setLoading(false);
    };

    fetchFileTypes();
  }, [nfts]);

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
  }, [category, nfts, nftsCopy]);

  return (
    <div className={Style.filter2}>
      <div className={Style.filter2_box}>
        <div className={Style.filter2_box_left}>
          <button onClick={() => setCategory("nfts")}>ALL NFTs</button>
          <button onClick={() => setCategory("ART")}>ART</button>
          <button onClick={() => setCategory("GAMING")}>GAMING</button>
          <button onClick={() => setCategory("SPORTS")}>SPORTS</button>
          <button onClick={() => setCategory("METAVERSE")}>METAVERSE</button>
          <button onClick={() => setCategory("PHOTOGRAPHY")}>PHOTOGRAPHY</button>
        </div>

        <div className={Style.filter2_box_right}>
          <div className={Style.filter2_box_right_box} onClick={() => setFilter(!filter)}>
            <FaFilter />
            <span>FILTER</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>
      </div>

      {filter && (
        <div className={Style.filter2_box_items}>
          <div className={Style.filter2_box_items_box}>
            <div className={Style.filter2_box_items_box_item_trans}
              onClick={() => setImage(!image)}
            >
              <FaImages /> <small>IMAGES</small>
              {image ? <TiTick /> : <AiFillCloseCircle />}
            </div>
          </div>

          <div className={Style.filter2_box_items_box}>
            <div
              className={Style.filter2_box_items_box_item_trans}
              onClick={() => setVideo(!video)}
            >
              <FaVideo /> <small>VIDEOS</small>
              {video ? <TiTick /> : <AiFillCloseCircle />}
            </div>
          </div>

          <div className={Style.filter2_box_items_box}>
            <div
              className={Style.filter2_box_items_box_item_trans}
              onClick={() => setMusic(!music)}
            >
              <FaMusic /> <small>MUSIC</small>
              {music ? <TiTick /> : <AiFillCloseCircle />}
            </div>
          </div>

          <div className={Style.filter2_box_items_box}>
            <div className={Style.filter2_box_items_box_item}>
              <span>VERIFIED</span>
              <Image
                src={images.xm2}
                alt="NFT"
                width={25}
                height={25}
                objectFit="cover"
                className={Style.verified_img}
                controls
              />
            </div>
          </div>
        </div>
      )}

      <div className={Style.category_section}>
        {selectedCategoryData.length === 0 ? (
          <Loader />
        ) : (
          <NFTCardTwo
            NFTData={selectedCategoryData.filter((nft) => {
              const fileType = fileTypes[nft.image];
              if (!fileType) {
                return true;
              }
              if (
                (image && fileType.startsWith("image")) ||
                (video && fileType.startsWith("video")) ||
                (music && fileType.startsWith("audio"))
              ) {
                return true;
              }
              return false;
            })}
          />
        )}
      </div>
    </div>
  );
};

export default Filter2;
