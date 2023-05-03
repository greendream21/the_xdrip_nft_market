
import React, { useEffect, useState, useContext } from "react";
//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);


useEffect(() => {
  fetchNFTs().then((items) => setNfts(items.reverse()));
}, []);

// adding comments 

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      fetchNFTs().then((items) => setNfts(items.reverse()));
    } else {
      setNfts(filteredNFTS);
    }
    console.log("NFTData received:", filteredNFTS);
  };

  const onClearSearch = () => {
  fetchNFTs().then((items) => {
    setNfts(items.reverse());
  });
};



  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {nfts.length > 0 ? (
        <NFTCardTwo NFTData={nfts} />
      ) : (
        <div className={Style.loader}>
          <Loader />
        </div>
      )}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
