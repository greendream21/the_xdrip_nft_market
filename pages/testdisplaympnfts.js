import React, { useEffect, useContext } from 'react';
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const DisplayNFTs = () => {
  const {
    nfts,
    fetchNFTs,
  } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div>
      {nfts && nfts.length > 0 ? (
        nfts.map((nft) => (
          <div key={nft.tokenId}>
            <img src={nft.image} alt={nft.name} width="200" />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
            <p>Price: {nft.price} ETH</p>
          </div>
        ))
      ) : (
        <p>No NFTs found.</p>
      )}
    </div>
  );
};

export default DisplayNFTs;
