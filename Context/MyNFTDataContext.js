import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import { useAddress } from "@thirdweb-dev/react";
import mohABI from "./mohABI";

export const MyNFTDataContext = createContext();

const MyNFTData = ({ children }) => {
  const address = useAddress();
  const [nfts, setNfts] = useState([]);
  const BSC_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

  useEffect(() => {
    if (!address) return;

    const fetchNFTs = async () => {
      const web3 = new Web3(BSC_RPC_URL);
      const ERC721_ABI = mohABI;
      const NFT_CONTRACT_ADDRESS = "0x9264115fb1b2ae47199ff529608bcbf8770c83fd";
      const nftContract = new web3.eth.Contract(ERC721_ABI, NFT_CONTRACT_ADDRESS);

      const tokenCount = await nftContract.methods.balanceOf(address).call();
      const nftPromises = [];

      for (let i = 0; i < tokenCount; i++) {
        const tokenIdPromise = nftContract.methods.tokenOfOwnerByIndex(address, i).call();
        nftPromises.push(tokenIdPromise);
      }

      const tokenIds = await Promise.all(nftPromises);
      const fetchedNfts = await Promise.all(
        tokenIds.map(async (tokenId) => {
          const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
          const proxyUrl = 'https://api.allorigins.win/raw?url=';
          const response = await fetch(proxyUrl + tokenURI);

          const metadata = await response.json();
          console.log(metadata); //  log metadata in console
          const mediaUrl = metadata.animation_url || metadata.image;
          return { tokenId, metadata, mediaUrl };
        })
      );

      setNfts(fetchedNfts);
    };

    fetchNFTs();
  }, [address]);

  const renderMedia = ( mediaUrl, metadata ) => {
    if (!metadata || !metadata.animation_url) {
      return <p>No media found</p>;
    }
  
    const fileExtension = metadata.animation_url.split('.').pop().toLowerCase();
  
    if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
      return <video src={metadata.animation_url} alt="video" width="300" controls autoplay muted loop/>;
    } else if (['gif'].includes(fileExtension)) {
      return <img src={metadata.animation_url} playsinline autoplay alt="NFT animation" />;
    } else {
      return <p>Unsupported file type: {fileExtension}</p>;
    }
  };

  return (
    <MyNFTDataContext.Provider value={{ nfts, renderMedia }}>
      {children}
    </MyNFTDataContext.Provider>
  );
};

export default MyNFTData;
