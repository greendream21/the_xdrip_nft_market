import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useAddress } from "@thirdweb-dev/react";
import mohABI from "./mohABI"

const BSC_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'; 

const NFTWallet = () => {
  const address = useAddress();
  const [nfts, setNfts] = useState([]);

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
          const response = await fetch(tokenURI);
          const metadata = await response.json();
          return { tokenId, metadata };
        })
      );

      setNfts(fetchedNfts);
    };

    fetchNFTs();
  }, [address]);
  

  const renderMedia = (url) => {
  if (!url) {
    return <p>No media found</p>;
  }

  const fileExtension = url.split('.').pop().toLowerCase();

  if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
    return <video src={url} alt="video" width="150" controls />;
  } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
    return <audio src={url} controls />;
  } else {
    return <img src={url} alt="NFT" width="150" />;
  }
};
  
  
  

   return (
    <div>
      <h1>My Medal</h1>
      {address ? (
        <div>
          {nfts.map(({ tokenId, metadata }) => (
  <div key={tokenId}>
    <h2>{metadata.name}</h2>
    {renderMedia(metadata.animation_url)}
    <p>Token ID: {tokenId}</p>
    <p>Description: {metadata.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Please connect your wallet using WalletConnect</p>
      )}
    </div>
  );
};

export default NFTWallet;