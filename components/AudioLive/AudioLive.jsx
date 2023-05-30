import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const audioNFTs = nfts.filter(
    (nft) => fileTypes[nft.image] && fileTypes[nft.image].includes('audio')
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
    <div className={Style.audioLiveContainer}>
      {!loading && (
        <div className={Style.audioLive}>
          <div className={Style.audioLive_box}>
            <div className={Style.audioLive_box_button}></div>
          </div>
          <div>
            <Slider {...settings}>
              {audioNFTs.map((nft) => (
                <div key={nft.tokenId}>
                  <AudioCard NFTData={[nft]} likes={likes} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioSlider;

/*import React, { useState, useEffect, useContext } from "react";
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
            <Carousel autoPlay showThumbs={false} infiniteLoop useKeyboardArrows >
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
*/