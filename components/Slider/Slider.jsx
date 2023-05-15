import React, { useState, useEffect, useRef, useContext } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// INTERNAL IMPORT
import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Slider = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*if (currentAccount) {*/
        const items = await fetchNFTs();
        setNfts([items.reverse()]);
        setNftsCopy(items);
        setSelectedCategoryData(items);
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
  
  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <div className={Style.slider_box_button}></div>
        </div>
        <Swiper className={Style.slider_box_items} ref={dragSlider}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={100}
          slidesPerView={2}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
        {nfts.map((nft, el, i) => (
          <SwiperSlide key={i+1}>
            <SliderCard NFTData={nft} i={i} el={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
