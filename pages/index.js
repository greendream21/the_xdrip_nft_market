import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";

//IMPORTING CONTRCT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
     if (currentAccount) {
    fetchNFTs().then((items) => {
      console.log(nfts);
      setNfts(items.reverse());
      setNftsCopy(items);
    });
     }
  }, []);

  //CREATOR LIST

  const creators = getTopCreators(nfts);
  console.log(creators);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading="AUDIO COLLECTIONS"
        paragraph="XCELLENT CREATIONS DESIGNED TO TEASE YOUR EAR HOLES."
      />
      <AudioLive />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

      <Slider />
      <Collection />
      <Title
        heading="XMARKET FEATURED NFTS"
        paragraph="THE MOST XCELLENT NFTS FEATURED JUST FOR YOU."
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}

      <Title
        heading="XPLORE BY CATEGORY"
        paragraph="CATEGORIES READY FOR YOU TO XPLORE."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
