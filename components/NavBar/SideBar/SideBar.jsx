import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import {
  FaFacebookF,
  FaTikTok,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";
import { Router } from "next/router";

const SideBar = ({ setOpenSideMenu }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const router = useRouter();

  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "COLLECTION",
      link: "collection",
    },
    {
      name: "SEARCH",
      link: "search",
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
      name: "ACCOUNT SETTINGS",
      link: "account",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "CONNECT WALLET",
      link: "connectWallet",
    },
    {
      name: "NEWS",
      link: "news",
    },
  ];
  //------HELP CENTER
  const helpCenter = [
    {
      name: "ABOUT",
      link: "about",
    },
    {
      name: "CONTACT US",
      link: "contactus",
    },
    {
      name: "SIGN UP",
      link: "signUp",
    },
    {
      name: "LOGIN",
      link: "login",
    },
    {
      name: "SUBSCRIPTION",
      link: "subscription",
    },
  ];

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image src={images.logo} alt="logo" width={150} height={45} />
        <p>
          Discover Xcellent articles on all topics reguarding NFT's. Write
          your own stories and share them as well.
        </p>
        <div className={Style.sideBar_social}>
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaTikTok />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>DISCOVER</p>
            <FaArrowDown />
          </div>

          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <FaArrowDown />
          </div>

          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={Style.sideBar_button}>
        {currentAccount == "" ? (
          <Button btnName="CONNECT WALLET" handleClick={() => connectWallet()} />
        ) : (
          <Button
            btnName="CREATE"
            handleClick={() => router.push("/uploadNFT")}
          />
        )}

        <Button btnName="CONNECT WALLET" handleClick={() => {}} />
      </div>
    </div>
  );
};

export default SideBar;