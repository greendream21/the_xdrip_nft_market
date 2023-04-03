import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "COLLECTION",
      link: "collection",
    },
    {
      name: "SEARCH",
      link: "searchPage",
    },
    {
      name: "CREATOR PROFILE",
      link: "author",
    },
    {
      name: "NFT DETAILS",
      link: "NFTDetails",
    },
    {
      name: "PROFILE SETTINGS",
      link: "account",
    },
    {
      name: "UPLOAD NFT",
      link: "uploadNFT",
    },
    {
      name: "NEWS",
      link: "https://www.xdrip.io/news",
    },
  ];
  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;