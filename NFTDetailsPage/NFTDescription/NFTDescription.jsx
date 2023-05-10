import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTTabs } from "../NFTDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = ({ nft }) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const router = useRouter();

  const closeSocialsButtons = () => {
    setSocial(false);
    setNFTMenu(false);
  };

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "PURCHASE HISTORY") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "PROVANANCE") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };

  const handleMouseEnter = () => {
    setIsMenuHovered(true);
    clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    setIsMenuHovered(false);
    const newTimeoutId = setTimeout(() => {
      closeSocialsButtons();
    }, 70);
    setTimeoutId(newTimeoutId);
  };

  //SMART CONTRACT DATA
  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>XDRIP WORLDS</p>
          <div className={Style.NFTDescription_box_share_box}  
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()} 
              
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> FACEBOOK
                </a>
                <a href="#">
                  <TiSocialInstagram /> INSTAGRAM
                </a>
                <a href="#">
                  <TiSocialTwitter /> TWITTER
                </a>
                <a href="#">
                  <TiSocialYoutube /> YOUTUBE
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >
                <a href="#">
                  <BiDollar /> CHANGE PRICE
                </a>
                <a href="#">
                  <BiTransferAlt /> TRANSFER
                </a>
                <a href="#">
                  <MdReportProblem /> REPORT ABUSE
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> DELETE ITEM
                </a>
              </div>
            )}
          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {nft.name} #{nft.tokenId}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>CREATOR</small> <br />
                {/* <Link href={{ pathname: "/author", query: `${nft.seller}` }}> */}
                <Link href={{ pathname: "/author" }}>
                  <span>
                    XDIP OFFICIAL <MdVerified />
                  </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={el.image}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>COLLECTION</small> <br />
                <span>
                  MEDALS OF HONOR <MdVerified />
                </span>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdTimer /> <span>AUCTION ENDING IN:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>12</p>
                <span>DAYS</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>3</p>
                <span>HOURS</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>45</p>
                <span>MINS</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>9</p>
                <span>SECS</span>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>CURRENT PRICE</small>
                <p>
                  {nft.price} BNB <span>( ≈ $221.22)</span>
                </p>
              </div>

              <span>[96 AVALAIBLE]</span>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount == nft.seller?.toLowerCase() ? (
                <p>YOU CAN'T BUY YOUR OWN NFT</p>
              ) : currentAccount == nft.owner?.toLowerCase() ? (
                <Button
                  icon={<FaWallet />}
                  btnName="LIST ON MARKETPLACE"
                  handleClick={() =>
                    router.push(
                      `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}&price=${nft.price}`
                    )
                  }
                  classStyle={Style.button}
                />
              ) : (
                <Button
                  icon={<FaWallet />}
                  btnName="BUY NFT"
                  handleClick={() => buyNFT(nft)}
                  classStyle={Style.button}
                />
              )}

              <Button
                icon={<FaPercentage />}
                btnName="MAKE OFFER"
                handleClick={() => {}}
                classStyle={Style.button}
              />
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>PURCHASE HISTORY</button>
              <button onClick={(e) => openTabs(e)}>PROVANANCE</button>
              <button onClick={() => openOwmer()}>OWNER</button>
            </div>

            {history && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={historyArray} />
              </div>
            )}
            {provanance && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon={<MdVerified />} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
