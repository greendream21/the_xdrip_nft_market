

/*
import React, { useState, useEffect, useRef, useContext } from "react";
//import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);



import Style from "./AudioLive.module.css";
import AudioCard from "../../components/AudioLive/AudioCard/AudioCard";
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

  const audioNFTs = nfts.filter(nft => fileTypes[nft.image] && fileTypes[nft.image].includes('audio'));

  return (
    <div className={Style.audioLiveContainer}>
      <div className={Style.audioLive}>
        <div className={Style.audioLive_box}>
          <div className={Style.audioLive_box_button}></div>
        </div>
        <Swiper className={Style.audioLive_box_items}
          ref={dragSlider}
          
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          
          autoplay={{ delay: 5000 }}
          spaceBetween={0}
          slidesPerView={2}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {audioNFTs.map((nft) => (
            <SwiperSlide key={nft.tokenId}>
              <AudioCard NFTData={[nft]} likes={likes} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;

*/
import React, { useState, useEffect, useContext } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import Style from "./AudioLive.module.css";
import AudioCard from "../../components/AudioLive/AudioCard/AudioCard";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const AudioSlider = () => {
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





  const audioNFTs = nfts.filter(
    (nft) => fileTypes[nft.image] && fileTypes[nft.image].includes('audio')
  );
  
  
  

 return (
    <div className={Style.audioLiveContainer}>
      {!loading && (
        <div className={Style.audioLive}>
          <div className={Style.audioLive_box}>
            <div className={Style.audioLive_box_button}></div>
          </div>
          <div>
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
              {audioNFTs.map((nft) => (
                <div key={nft.tokenId}>
                  <AudioCard NFTData={[nft]} likes={likes} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioSlider;