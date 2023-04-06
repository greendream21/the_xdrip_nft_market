import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "@thirdweb-dev/react";

import styles from "./Profile.module.css";

const Profile = ({
  currentAccount,
  closeMenu,
  isWalletConnected,
  disconnectWallet,
  setIsProfileMenuOpen,
  setProfileImageSrc,
}) => {
  const { account, library } = useWeb3React();

  const handleDisconnect = () => {
    disconnectWallet();
    setIsProfileMenuOpen(false); // close the profile menu
    if (closeMenu) closeMenu(); // close the parent menu if it exists
    setProfileImageSrc("/default-user.png"); // Set the default image when wallet disconnects
  };
  const [balance, setBalance] = React.useState("0");

  React.useEffect(() => {
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

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profileContainer}>
          <div className={styles.profileBox}>
            <div className={styles.profileItems}>
              <div className={styles.profileItem} onClick={closeMenu}>
                <FaUserAlt />
                <p>{isWalletConnected ? "My Profile" : "Login"}</p>
              </div>
              <div className={styles.profileItem}>
                <FaRegImage />
                <p>My Collections</p>
              </div>
              <div className={styles.profileItem}>
                <FaUserEdit />
                <p>Edit Profile</p>
              </div>
              <div className={styles.profileItem}>
                <MdHelpCenter />
                <p>Help Center</p>
              </div>
              {isWalletConnected && (
                <div className={styles.profileItem} onClick={handleDisconnect}>
                  <TbDownloadOff />
                  <p>Disconnect Wallet</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.profileUpgrade}>
            {isWalletConnected && (
              <div>{/* Render wallet information */}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;