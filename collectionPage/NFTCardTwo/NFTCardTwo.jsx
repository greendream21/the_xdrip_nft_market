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

//import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; Can use hearts insetad of stars
import Link from "next/link";

const NFTCardTwo = ({ NFTData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(() => {
  if (typeof window !== 'undefined') {
    const savedLikes = localStorage.getItem("nftLikes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  }
  return {};
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

    if (typeof window !== 'undefined') {
      localStorage.setItem("nftLikes", JSON.stringify(newLikes));
    }
    
    return newLikes;
  });
};


/* works fine - Slow AF  */

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


/*
useEffect(() => {
  const fetchFileTypes = async () => {
    let fileTypesObj = {};

    const savedData = localStorage.getItem('fileTypesObj');
    if (savedData) {
      fileTypesObj = JSON.parse(savedData);
    } else {

      for (const el of NFTData) {
        try {
          const response = await fetch(el.image);
          const contentType = response.headers.get("content-type");
          fileTypesObj[el.image] = contentType;
        } catch (error) {
          console.log(error);
        }
      }

      localStorage.setItem('fileTypesObj', JSON.stringify(fileTypesObj));
    }

    setFileTypes(fileTypesObj);
    setLoading(false);
  };

  fetchFileTypes();
}, [NFTData]);
*/

/*
  const RenderImage = ({ src }) => (
  <LazyLoadImage
    src={src}
    alt="NFT"
    width={350}
    height={300}
    effect="blur"
    className={Style.NFTCardTwo_box_img_img}
  />
);

const RenderVideo = ({ src }) => (
  <LazyLoadComponent>
    <ReactPlayer
      src={src}
      alt="NFT"
      width={350}
      height={300}
      objectFit="cover"
      className={Style.NFTCardTwo_box_img_img}
      controls
    />
  </LazyLoadComponent>
);

const RenderAudio = ({ src }) => (
  <div className={Style.NFTCardTwo_box_audio}>
    <Image
      src={images.audio_image}
      alt="Default"
      width={350}
      height={255}
      objectFit="cover"
      className={Style.NFTCardTwo_box_img_audio}
    />
    <audio
      src={src}
      controls
      className={Style.NFTCardTwo_box_audio_controls}
    />
  </div>
);
*/
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


/*
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
*/



/*
useEffect(() => {
  const fetchFileTypes = async () => {
    const fileTypesObj = {};
    
    for (const el of NFTData.slice(0, 4)) {
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

    // Fetch the rest of the items in the background
    for (const el of NFTData.slice(4)) {
      try {
        const response = await fetch(el.image);
        const contentType = response.headers.get("content-type");
        fileTypesObj[el.image] = contentType;
      } catch (error) {
        console.log(error);
      }
    }

    setFileTypes(fileTypesObj);
  };

  fetchFileTypes();
}, [NFTData, currentPage]);
*/

/*
const renderFilePreview = (el) => {
const fileType = fileTypes[el.image];

if (fileType && fileType.includes("image")) {
  return <RenderImage src={el.image} />;
} else if (fileType && fileType.includes("video")) {
  return <RenderVideo src={el.image} />;
} else if (fileType && fileType.includes("audio")) {
  return <RenderAudio src={el.image} />;
} else {
  return <RenderDefault />;
}

};
*/


/* works for all - stil loading all nfts before display*/
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
        <div className={Style.NFTCardTwo_box_audio}>
          <Image
            src={images.audio_image}
            alt="Default"
            width={350}
            height={255}
            objectFit="cover"
            className={Style.NFTCardTwo_box_img_audio}
          />
          <audio
            src={src}
            controls
            className={Style.NFTCardTwo_box_audio_controls}
          />
        </div>
      ) : (
        <ReactPlayer 
          url={src}
          controls
          width='350px'
          height='300px'
          className={Style.NFTCardTwo_box_img_img}
        />
      )}
    </LazyLoadComponent>
  );
};


const renderFilePreview = (el) => {
  const fileType = fileTypes[el.image];

  if (fileType) {
    return <RenderMedia src={el.image} />;
  } else {
    return <RenderDefault />;
  }
};


  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  
  const currentItems = NFTData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={Style.NFTCardTwo_container}>
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
          <div className={Style.NFTCardTwo}>
            {currentItems.map((el, i) => (
              <Link
                href={{ pathname: "/NFTDetails", query: el }}
                key={`${el.tokenId}-${i}`}
              >
                <div className={Style.NFTCardTwo_box}>
                  <div className={Style.NFTCardTwo_box_img}>
                    {renderFilePreview(el)}
                  </div>
                  <div className={Style.NFTCardTwo_box_info}>
                    <div className={Style.NFTCardTwo_box_info_left}>
                      <p>{el.name}</p>
                    </div>
                   
                  </div>
                    <div className={Style.NFTCardTwo_box_tokenid}>
                    <small> # {el.tokenId}</small>
                    </div>

                  <div className={Style.NFTCardTwo_box_price}>
                    <div className={Style.likesContainer}>
                      <div className={Style.NFTCardTwo_box_like_box}></div>
                    </div>
                    <div className={Style.NFTCardTwo_box_price_box}>
                      <small>CURRENT PRICE</small>
                      <p>{parseFloat(el.price) * 10 ** 9} BNB</p>
                    </div>
                    <p className={Style.NFTCardTwo_box_price_stock}>
                      {/* future auciton functionality 
                    <MdTimer /> <span>{i + 1} HOURS LEFT</span>
                    */}

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
/*comments go here*/
