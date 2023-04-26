import React, { useContext } from "react";
import { NFTMarketplaceContext } from "./NFTMarketplaceContext";

const NFTsDisplay = () => {
  const { nfts } = useContext(NFTMarketplaceContext);

  return (
    <div>
      {nfts.map((nft, index) => (
        <div key={index} className="nft">
          <img src={nft.image} alt={nft.name} />
          <h2>{nft.name}</h2>
          <p>{nft.description}</p>
          <p>Price: {nft.price} ETH</p>
          {/* Add other properties or actions as required */}
        </div>
      ))}
    </div>
  );
};

export default NFTsDisplay;
