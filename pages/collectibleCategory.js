import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader, Title } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";


import { NFTCardTwo, Banner,  } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const collectibleCategory = () => {
  const { fetchNFTs, setError, currentAccount } = useContext(
    NFTMarketplaceContext
  );
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

  const collectibleNFTs = nfts.filter((nft) => nft.category === 'COLLECTIBLE');

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Title
        heading="XMARKET'S COLLECTIBLE CATEGORY"
        paragraph="XCELLENT COLLECTIBLE NFTS"
      />
      {collectibleNFTs.length === 0 ? <Loader /> : <NFTCardTwo NFTData={collectibleNFTs} />}
    </div>
  );
};

export default collectibleCategory;
