import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import Link from "next/link";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useDisconnect } from "@thirdweb-dev/react";

import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Error } from "../componentsindex";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // new state for profile menu items
  const disconnectWallet = useDisconnect();
  const router = useRouter();
  const { account, library } = useWeb3React();
  const [profileImageSrc, setProfileImageSrc] = useState("/default-user.png");

  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );
  const isWalletConnected = Boolean(currentAccount);

const closeNotificationMenu = () => {
  setNotification(false);
};


useEffect(() => {
  if (isWalletConnected) {
    setProfileImageSrc("/pfp.jpg");
  } else {
    setProfileImageSrc("/default-user.png");
  }
}, [isWalletConnected]);

  useEffect(() => {
    if (account && library) {
      library
        .getBalance(account)
        .then((balance) => {
          setBalance(library.utils.fromWei(balance));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [account, library]);

  const closeNavbarButtons = () => {
    setDiscover(false);
    setHelp(false);
    setNotification(false);
    setProfile(false);
  };

  const closeProfileMenu = () => {
    setProfile(false);
    setIsProfileMenuOpen(false);
  };
  
  

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText === "XPLORE XM") {
      setDiscover((discover) => !discover);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText === "Help Center") {
      setDiscover(false);
      setHelp((help) => !help);
      setNotification(false);
      setProfile(false);
    } else {
      closeNavbarButtons();
    }
  };

  const handleMouseEnter = () => {
    setIsMenuHovered(true);
    clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    setIsMenuHovered(false);
    const newTimeoutId = setTimeout(() => {
      closeNavbarButtons();
    }, 50);
    setTimeoutId(newTimeoutId);
  };

  const openNotification = () => {
    if (!notification) {
      closeNavbarButtons();
      setNotification(true);
    } else {
      setNotification((notification) => !notification);
    }
  };

  const openProfile = () => {
    if (!isProfileMenuOpen) {
      closeNavbarButtons();
      setProfile(true);
      setIsProfileMenuOpen(true);
    } else {
      setProfile(false);
      setIsProfileMenuOpen(false);
    }
  
   if (currentAccount && !isWalletConnected) {
    setIsWalletConnected(true);
  }
};

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      closeNavbarButtons();
      setOpenSideMenu(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [timeoutId, setTimeoutId]);


const handleConnectWallet = () => {
  // connect wallet logic here
  setIsWalletConnected(true);
  setShowWalletInfo(true);
  setProfileImageSrc("/pfp.jpg"); // Set the custom image when wallet connects
};


const [isNavbarDocked, setIsNavbarDocked] = useState(true);

useEffect(() => {
  const handleScroll = () => {
    setIsNavbarDocked(window.scrollY < 100);
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  

return (
  <div className={`${Style.navbar} ${isNavbarDocked ? "" : Style["navbar-undocked"]}`}>
    <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <Link href="/">
            <a>
              <div className={Style.logo}>
                <Image src={images.logo} alt="NFT MARKET PLACE" />
              </div>
            </a>
          </Link>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="XPLORE NFTs" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div
            className={Style.navbar_container_right_discover}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* DISCOVER MENU */}
            <p onClick={(e) => openMenu(e)}>XPLORE XM</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div
  className={Style.navbar_container_right_help}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <p onClick={(e) => openMenu(e)}>Help Center</p>
  {help && (
    <div className={Style.navbar_container_right_help_box}>
      <HelpCenter />
    </div>
  )}
</div>

         {/* NOTIFICATION */}
<div
  className={Style.navbar_container_right_notify}
  onMouseLeave={closeNotificationMenu}
>
  <MdNotifications
    className={Style.notify}
    onClick={() => openNotification()}
  />
  {notification && (
    <div
      className={Style.notification_menu}
      onMouseLeave={closeNotificationMenu}
    >
      <Notification />
    </div>
  )}
</div>


          
<div className={Style.box_box_right}>
  <ConnectWallet
    className={Style.box_box_right_btn}
    btnTitle={isWalletConnected ? "XDISCONNECTED" : "XCONNECT"}
    colorMode="dark"
    onConnect={handleConnectWallet}
    disableDisconnect 
  />
</div>

          {/* USER PROFILE */}
          <div className={Style.navbar_container_right_profile_box}>
            <div
              className={Style.navbar_container_right_profile}
              onClick={() => openProfile()}
            >
              <Image
                src={profileImageSrc}
                alt="Profile"
                width={40}
                height={40}
                className={Style.navbar_container_right_profile}
              />
            </div>
            {isProfileMenuOpen && (
              <div className={Style.profile_menu}
              onMouseLeave={closeProfileMenu}
              >
                <div className={Style.profileMenuContainer}>
                  <Profile
                    currentAccount={currentAccount}
                    isWalletConnected={isWalletConnected}
                    disconnectWallet={disconnectWallet}
                    closeMenu={openProfile}
                    setIsProfileMenuOpen={setIsProfileMenuOpen}
                    showWalletInfo={showWalletInfo} 
                    setProfileImageSrc={setProfileImageSrc} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* MENU BUTTON */}
      <div className={Style.navbar_container_right_menuBtn}>
        <CgMenuRight className={Style.menuIcon} onClick={() => openSideBar()} />
      </div>

      {/* SIDEBAR COMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}
    </div>
  );
};

export default NavBar;
