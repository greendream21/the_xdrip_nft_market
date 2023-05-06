import React, { useState, useEffect } from "react";
import Img from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";
import BigNumber from "bignumber.js";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../components/componentsindex";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);
  
  
  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
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

    if (fileType && fileType.includes("image")) {
      return (
        <img
          src={el.image}
          alt="NFT"
          width={350}
          height={300}
          objectFit="cover"
          className={Style.NFTCardTwo_box_img_img}
        />
      );
    } else if (fileType && fileType.includes("video")) {
      return (
        <video
          src={el.image}
          alt="NFT"
          width={350}
          height={300}
          objectFit="cover"
          className={Style.NFTCardTwo_box_img_img}
          controls
        />
      );
    } else {
      return <div>Invalid file type</div>;
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = NFTData.slice(indexOfFirstItem, indexOfLastItem);


  return (
  <div className={Style.NFTCardTwo_container}>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <>
        <div className={Style.NFTCardTwo}>
          {currentItems.map((el, i) => (
            <Link
              href={{ pathname: "/NFT-details", query: el }}
              key={`${el.tokenId}-${i}`}
            >
              <div className={Style.NFTCardTwo_box}>
                <div className={Style.NFTCardTwo_box_like}>
                  <div className={Style.NFTCardTwo_box_like_box}>
                    <div className={Style.NFTCardTwo_box_like_box_box}>
                      <div className={Style.NFTCardTwo_box_like_box_box_icon} />
                      <p onClick={() => likeNFT()}>
                        {like ? <AiOutlineHeart /> : <AiFillHeart />}
                        <span>{likeInc + 1}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className={Style.NFTCardTwo_box_img}>
                  {renderFilePreview(el)}
                </div>
                <div className={Style.NFTCardTwo_box_info}>
                  <div className={Style.NFTCardTwo_box_info_left}>
                    <p>{el.name}</p>
                  </div>
                  <small> # {i + 1}</small>
                </div>

                <div className={Style.NFTCardTwo_box_price}>
                  <div className={Style.NFTCardTwo_box_price_box}>
                    <small>CURRENT PRICE</small>
                    <p>{parseFloat(el.price) * 10**9} BNB</p>
                  </div>
                  <p className={Style.NFTCardTwo_box_price_stock}>
                    <MdTimer /> <span>{i + 1} HOURS LEFT</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className={Style.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from(
            { length: Math.ceil(NFTData.length / ITEMS_PER_PAGE) },
            (_, i) => (
              <button
                key={`page-${i}`}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? Style.active : ""}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            disabled={
              currentPage === Math.ceil(NFTData.length / ITEMS_PER_PAGE)
            }
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </>
    )}
  </div>
);
};

export default NFTCardTwo;