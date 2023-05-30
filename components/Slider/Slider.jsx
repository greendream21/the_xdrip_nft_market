import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const VideoSlider = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items.reverse());
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFileTypes = async () => {
      let fileTypesObj = {};

      const savedData = localStorage.getItem('fileTypesObj');
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

      localStorage.setItem('fileTypesObj', JSON.stringify(fileTypesObj));

      setFileTypes(fileTypesObj);
      setLoading(false);
    };

    fetchFileTypes();
  }, [nfts]);

  const videoNFTs = nfts.filter(
    (nft) => fileTypes[nft.image] && fileTypes[nft.image].includes('video')
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: true,
    useKeyboardArrows: true,
    accessibility: true,
    fade: false,
    rows: 1,
    swipe: true,
    
   
  };


  return (
    <div className={Style.sliderContainer}>
      {!loading && (
        <div className={Style.slider}>
          <div className={Style.slider_box}>
            <div className={Style.slider_box_button}></div>
          </div>
          <div>
            <Slider {...settings}>
              {videoNFTs.map((nft) => (
                <div key={nft.tokenId}>
                  <SliderCard NFTData={[nft]} likes={likes} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSlider;




/* 

import React, { useState, useEffect, useContext } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const VideoSlider = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items.reverse());
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  const fetchFileTypes = async () => {
    let fileTypesObj = {};

    const savedData = localStorage.getItem('fileTypesObj');
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

    localStorage.setItem('fileTypesObj', JSON.stringify(fileTypesObj));

    setFileTypes(fileTypesObj);
    setLoading(false);
  };

  fetchFileTypes();
}, [nfts]);

 

  const videoNFTs = nfts.filter(
    (nft) => fileTypes[nft.image] && fileTypes[nft.image].includes('video')
  );

 return (
    <div className={Style.sliderContainer}>
      {!loading && (
        <div className={Style.slider}>
          <div className={Style.slider_box}>
            <div className={Style.slider_box_button}></div>
          </div>
          <div className={Style.slider_box_items}>
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
              {videoNFTs.map((nft) => (
                <div key={nft.tokenId}>
                  <SliderCard NFTData={[nft]} likes={likes} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSlider;
*/