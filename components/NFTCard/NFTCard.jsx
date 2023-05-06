import React, { useState, useEffect } from "react";
import Img from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";
import BigNumber from "bignumber.js";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import { LikeProfile } from "../../components/componentsindex";

const NFTCard = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  //  const [fileType, setFileType] = useState(null);

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
    const getFileType = async () => {
      try {
        const response = await fetch(NFTData[0].image);
        const blob = await response.blob();
        setFileType(blob.type);
      } catch (error) {
        console.log(error);
      }
    };
    getFileType();
  }, [NFTData]);




  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = NFTData.slice(indexOfFirstItem, indexOfLastItem);


  const renderFilePreview = (el) => {
    const [fileType, setFileType] = useState(null);
  
    useEffect(() => {
      const getFileType = async () => {
        try {
          const response = await fetch(el.image);
          const contentType = response.headers.get("content-type");
          setFileType(contentType);
        } catch (error) {
          console.log(error);
        }
      };
      getFileType();
    }, [el.image]);
  
    if (fileType && fileType.includes("image")) {
      return (
        <img
          src={el.image}
          alt="NFT"
          width={350}
          height={300}
          objectFit="cover"
          className={Style.NFTCard_box_img_img}
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
          className={Style.NFTCard_box_img_vid}
          
        />
      );
    } else {
      return <div>Invalid file type</div>;
    }
  };

  

  return (
    <div className={Style.NFTCard_container}>
      <div className={Style.NFTCard}>
        {currentItems.map((el, i) => (
          <Link
            href={{ pathname: "/NFT-details", query: el }}
            key={`${el.tokenId}-${i}`}
          >
            <div className={Style.NFTCard_box}>
              <div className={Style.NFTCard_box_like}>
                <div className={Style.NFTCard_box_like_box}>
                  <div className={Style.NFTCard_box_like_box_box}>
                    <div className={Style.NFTCard_box_like_box_box_icon} />
                    <p onClick={() => likeNFT()}>
                      {like ? <AiOutlineHeart /> : <AiFillHeart />}
                      <span>{likeInc + 1}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className={Style.NFTCard_box_img}>
              {renderFilePreview(el)}
              </div>
              <div className={Style.NFTCard_box_info}>
                <div className={Style.NFTCard_box_info_left}>
                  <p>{el.name}</p>
                </div>

                <small> # {i + 1}</small>
              </div>

              <div className={Style.NFTCard_box_price}>
                <div className={Style.NFTCard_box_price_box}>
                  <small>CURRENT PRICE</small>
                                  {/*}
                <p>{new BigNumber(el.price).dividedBy(new BigNumber(10).pow(18)).toString()} BNB</p>
                */}
                <p>{parseFloat(el.price) * 10**9} BNB</p>
                </div>
                <p className={Style.NFTCard_box_price_stock}>
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


    </div >
  );
};

export default NFTCard;
