import React from 'react';
import Style from './Banner.module.css';

const Banner = ({ bannerVideo }) => {
  return (
    <div className={Style.banner}>
      <video src={bannerVideo} width="100%" height="100%" loop muted autoPlay playsInline />
    </div>
  );
};

export default Banner;
