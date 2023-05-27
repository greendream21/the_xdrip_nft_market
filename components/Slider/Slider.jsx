
/*
import React, { useState, useEffect, useRef, useContext } from "react";
//import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const VideoSlider = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [likes, setLikes] = useState({});
   const [loading, setLoading] = useState(true);

const swiperRef = useRef(null);


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
  if (dragSlider.current) {
    setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
  }
}, []);

  const handleScroll = (direction) => {
    const { current } = dragSlider;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction == "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };
  
  
/*
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
*/
/*
useEffect(() => {
  const fetchFileTypes = async () => {
    let fileTypesObj = {};

    const savedData = localStorage.getItem('fileTypesObj');
    if (savedData) {
      fileTypesObj = JSON.parse(savedData);
    } else {

      for (const el of nfts) {
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
    if (swiperRef.current) {
    setTimeout(() => {
      swiperRef.current.swiper.autoplay.start();
    }, 1000);
  }
}, [nfts]);


  useEffect(() => {
    if (dragSlider.current) {
      const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

      const handleScroll = (direction) => {
        const current = dragSlider.current;
        if (direction === "left") {
          current.scrollLeft -= scrollAmount;
        } else {
          current.scrollLeft += scrollAmount;
        }
      };

      const intervalId = setInterval(() => {
        handleScroll("right");
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dragSlider]);



  const videoNFTs = nfts.filter(nft => fileTypes[nft.image] && fileTypes[nft.image].includes('video'));

  return (
    <div className={Style.sliderContainer}>
      <div className={Style.slider}>
        <div className={Style.slider_box}>
          <div className={Style.slider_box_button}></div>
        </div>
        <Swiper
          ref={swiperRef}
          className={Style.slider_box_items}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{ delay: 4000 }}
          
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          
        >
          {videoNFTs.map((nft) => (
            <SwiperSlide key={nft.tokenId} ref={dragSlider}>
              <SliderCard NFTData={[nft]} likes={likes} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default VideoSlider;
*/


import React, { useState, useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const VideoSlider = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const dragSlider = useRef(null);

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
      } else {
        for (const el of nfts) {
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
  }, [nfts]);

  useEffect(() => {
    if (dragSlider.current) {
      const swiperInstance = dragSlider.current.swiper;
      swiperInstance.autoplay.start();
    }
  }, [nfts]);

  const videoNFTs = nfts.filter(
    (nft) => fileTypes[nft.image] && fileTypes[nft.image].includes('video')
  );

  return (
    <div className={Style.sliderContainer}>
      <div className={Style.slider}>
        <div className={Style.slider_box}>
          <div className={Style.slider_box_button}></div>
        </div>
        <div className={Style.slider_box_items}>
          <Swiper
            ref={dragSlider}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            autoplay={{ delay: 5000 }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            navigation={true}
            
            /*
            pagination={{ clickable: true }}
            */
            
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            onBeforeInit={(swiper) => {
              swiper.autoplay.stop(); 
            }}
            onInit={(swiper) => {
              swiper.autoplay.start();
            }}
          >
            {videoNFTs.map((nft) => (
              <SwiperSlide key={nft.tokenId}>
                <SliderCard NFTData={[nft]} likes={likes} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;