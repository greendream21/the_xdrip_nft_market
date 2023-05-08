import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader, Title } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";


import { NFTCardTwo, Banner,  } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const videoCategory = () => {
    const { fetchNFTs, setError, currentAccount } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);
  
    useEffect(() => {
      try {
        if (currentAccount) {
          fetchNFTs().then((items) => {
            setNfts(items.reverse());
            setNftsCopy(items);
          });
        }
      } catch (error) {
        setError("Please reload the browser", error);
      }
    }, []);
  
    const onHandleSearch = (value) => {
      const filteredNFTS = nftsCopy.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
  
      if (filteredNFTS.length === 0) {
        setNfts(nftsCopy);
      } else {
        setNfts(filteredNFTS);
      }
    };
  
    const onClearSearch = () => {
      fetchNFTs().then((items) => {
        setNfts(items.reverse());
      });
    };
  
    const videoNFTs = nfts.filter((nft) => nft.category === 'VIDEOS');
  
    console.log(nfts); // Move this line to where you are rendering the NFTs
  
    return (
      <div className={Style.searchPage}>
        <Banner bannerImage={images.creatorbackground2} />
        <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
        <Title heading="XMARKET'S VIDEO CATEGORY" paragraph="XCELLENT VIDEO NFTS" />
        {videoNFTs.length === 0 ? <Loader /> : <NFTCardTwo NFTData={videoNFTs} />}
      </div>
    );
  };
  
  export default videoCategory;
  