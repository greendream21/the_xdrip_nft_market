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
import { Router } from "next/router";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";



const SideBar = ({ setOpenSideMenu }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const router = useRouter();

  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
     name: "SEARCH XM",
     link: "searchPage",
   },
   {
     name: "XM CATEGORIES",
     link: "categoriesPage",
   },
   {
     name: "XM CREATORS",
     link: "author",
   },
   {
     name: "BEGIN CREATING",
     link: "createButtonsPage",
   },
   {
     name: "XNEWS",
     link: "https://www.xdrip.io/news",
   },
 ];
  //------HELP CENTER
  const helpCenter = [
    {
      name: "ABOUT US",
      link: "aboutus",
    },
    {
      name: "CONTACT US",
      link: "contactus",
    },
    {
      name: "FAQS",
      link: "faqs",
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
        <a href="https://www.facebook.com/TheXdripOfficial/">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/@xdripofficial?lang=en">
              <FaTiktok />
            </a>
            <a href="https://twitter.com/XDRIP__">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/channel/UCql_clMpK5GYxXUREIGfnRw">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/thexdripofficial/">
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
            <p>XPLORE XM</p>
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
      <ConnectWallet
    className={Style.box_box_right_btn}
    btnTitle={isWalletConnected ? "XDISCONNECTED" : "XCONNECT"}
    colorMode="dark"
    onConnect={handleConnectWallet}
    disableDisconnect 
  />
      </div>
    </div>
  );
};

export default SideBar;