import React, { useState, useEffect, useRef, useContext } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Slider = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [likes, setLikes] = useState({});

//SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


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

  const [width, setWidth] = useState(0);
  const dragSlider = useRef();



  useEffect(() => {
    setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
  });

  const handleScroll = (direction) => {
    const { current } = dragSlider;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction == "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };
  
  
  
  useEffect(() => {
  const fetchFileTypes = async () => {
    const fileTypesObj = {};

    for (const el of nfts) {
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
}, [nfts]);


 const videoNFTs = nfts.filter(nft => fileTypes[nft.image] && fileTypes[nft.image].includes('video'));

  return (
    <div className={Style.sliderContainer}>
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <div className={Style.slider_box_button}></div>
      </div>
      <Swiper
        ref={dragSlider}
        className={Style.slider_box_items}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={2}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
  {videoNFTs.map((nft) => (
    <SwiperSlide key={nft.tokenId}>
      <SliderCard NFTData={[nft]} likes={likes} />
    </SwiperSlide>
  ))}
</Swiper>
    </div>
    </div>
  );
};

export default Slider;
