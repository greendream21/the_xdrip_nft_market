import React from 'react';
import  NFTWallet  from '../components/NFTWallet/NFTWallet';
import MyNFTData from '../Context/MyNFTDataContext';

const MyNFTsPage = () => {
  return (
    <MyNFTData>
      <NFTWallet />
    </MyNFTData>
  );
};

export default MyNFTsPage;