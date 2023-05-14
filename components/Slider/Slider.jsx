import React, { useState, useEffect, useRef, useContext } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

//INTERNAL IMPORT
import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Slider = () => {
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

  

  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <div className={Style.slider_box_button}></div>
      </div>
     
        <Swiper
          className={Style.slider_box_items}
          ref={dragSlider}
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
          
            <SwiperSlide >
              <SliderCard />
            </SwiperSlide>
        </Swiper>   
    </div>
  );
};

export default Slider;
