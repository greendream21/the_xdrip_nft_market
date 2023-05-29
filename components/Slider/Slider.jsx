/* just old slider swiper code - 2 versions below this - carousel and multi-carousel
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

const Slider = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [likes, setLikes] = useState({});
   const [loading, setLoading] = useState(true);

const swiperRef = useRef(null);


const startSlide = () => {
  if (swiperRef.current && swiperRef.current.swiper) {
    swiperRef.current.swiper.autoplay.start();
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items.reverse());
        startSlide(); 
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



  const videoNFTs = nfts.filter(nft => fileTypes[nft.image] && fileTypes[nft.image].includes('video'));

  return (
    
    /*
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
          slidesPerView={2}
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
      
      /*
    </div>
    
    
  );
};

export default Slider;
*/



/* works great as is w carousel - going to try multi carousel below this*/

import React, { useState, useEffect, useContext, useRef } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const playerRef = useRef(null);
  
  
  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const player = playerRef.current?.getInternalPlayer();
    if (player) {
      if (activeIndex === playerRef.current.props.index) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [activeIndex]);
  

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
  
  useEffect(() => {
    // get a random one
    setNfts((prevNfts) => prevNfts.sort(() => Math.random() - 0.5));
  }, [nfts]);
  

 return (
    <div className={Style.sliderContainer}>
      {!loading && (
        <div className={Style.slider}>
          <div className={Style.slider_box}>
            <div className={Style.slider_box_button}></div>
          </div>
          <div className={Style.slider_box_items}>
            <Carousel 
              autoPlay={true} 
              interval={5000} 
              showThumbs={false} 
              infiniteLoop 
              useKeyboardArrows 
              onChange={handleSlideChange}
              >
              
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
