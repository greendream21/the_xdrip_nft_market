import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import MOHDetailsPage from "../MOHDetailsPage/MOHDetailsPage";
import Style from "../styles/MOHDetails.module.css";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const MOHDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div className={Style.NFTDetails}>
      <MOHDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};


export default MOHDetails;
