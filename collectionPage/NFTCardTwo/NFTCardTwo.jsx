import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdTimer } from "react-icons/md";
import Link from "next/link";
import { Loader } from "../../components/componentsindex";

import Style from "./NFTCardTwo.module.css";

const mp3Image = "mp3.jpg";

const NFTCardTwo = ({ NFTData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("nftLikes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const likeNFT = (tokenId) => {
    setLikes((prevState) => {
      const newLikes = { ...prevState };
      if (!newLikes[tokenId]) {
        newLikes[tokenId] = { count: 0, liked: false };
      }
      newLikes[tokenId].liked = !newLikes[tokenId].liked;
      if (newLikes[tokenId].liked) {
        newLikes[tokenId].count++;
      } else {
        newLikes[tokenId].count--;
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
    } else if (fileType && fileType.includes("audio")) {
      return (
        <div className={Style.NFTCardTwo_box_audio}>
          <img
            src={mp3Image}
            alt="Default"
            width={350}
            height={300}
            objectFit="cover"
            className={Style.NFTCardTwo_box_img_img}
          />
          <audio
            src={el.image}
            controls
            className={Style.NFTCardTwo_box_audio_controls}
          />
        </div>
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
      <div><Loader /></div>
    ) : (
      <>    
      <div className={Style.NFTCardTwo}>
        {currentItems.map((el, i) => (
          <Link
            href={{ pathname: "/NFTDetails", query: el }}
            key={`${el.tokenId}-${i}`}
          >
                <div className={Style.NFTCardTwo_box}>
                  <div className={Style.NFTCardTwo_box_like}>
                    <div className={Style.NFTCardTwo_box_like_box}>
                      <div className={Style.NFTCardTwo_box_like_box_box}>
                        <div
                          className={Style.NFTCardTwo_box_like_box_box_icon}
                        />
                        <p onClick={() => likeNFT(el.tokenId)}>
                          {likes[el.tokenId] && likes[el.tokenId].liked ? (
                            <AiFillHeart />
                          ) : (
                            <AiOutlineHeart />
                          )}
                          <span>
                            {likes[el.tokenId] ? likes[el.tokenId].count : 0}
                          </span>
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
                    <small> # {el.tokenId}</small>
                  </div>

                  <div className={Style.NFTCardTwo_box_price}>
                    <div className={Style.NFTCardTwo_box_price_box}>
                      <small>CURRENT PRICE</small>
                      <p>{parseFloat(el.price) * 10 ** 9} BNB</p>
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
