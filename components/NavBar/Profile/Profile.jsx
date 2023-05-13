import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "@thirdweb-dev/react";

import styles from "./Profile.module.css";
import LoginAndSignUp from "../../../loginAndSignUp/LoginAndSignUp.jsx";

const Profile = ({
  currentAccount,
  closeMenu,
  isWalletConnected,
  disconnectWallet,
  setIsProfileMenuOpen,
  setProfileImageSrc,
  isLoginAndSignUpOpen,
  setIsLoginAndSignUpOpen,
}) => {

  const { account, library } = useWeb3React();

  const handleProfilePictureChange = async (file) => {
    try {
      const url = await uploadProfilePicture(file);
      setProfileImageSrc(url);
      setMessage("Profile picture uploaded successfully!");

      // Update user's profile picture in the Firebase database
      await updateUser(currentAccount, { profilePicture: url });
    } catch (error) {
      console.log(error);
      setMessage("Failed to upload profile picture!");
    }
  };

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
      {isLoginAndSignUpOpen && (
        <LoginAndSignUp
          currentAccount={currentAccount}
          setProfileImageSrc={setProfileImageSrc} // pass the function as a prop
        />
      )}
      <div className={styles.profile}>
        <div className={styles.profileContainer}>
          <div className={styles.profileBox}>
            <div className={styles.profileItems}>
              <div className={styles.profileItem}>

                <Link href="/loginandsignup">
                  <a onClick={() => setIsProfileMenuOpen(false)}>
                    <FaUserAlt />
                    <p>{isWalletConnected ? 'My Profile' : 'Login'}</p>
                  </a>
                </Link>
              </div>
              <div className={styles.profileItem}>
                {isWalletConnected ? (
                  <Link href="/walletNFTs">
                    <a onClick={() => setIsProfileMenuOpen(false)}>
                      <FaRegImage />
                      <p>My Wallet</p>
                    </a>
                  </Link>
                ) : (
                  <a>
                    <FaRegImage />
                    <p>My Wallet</p>
                  </a>
                )}
              </div>


              <div className={styles.profileItem}>
              <Link href="/account">
                  <a onClick={() => setIsProfileMenuOpen(false)}>
                <FaUserEdit />
                <p>Edit Profile</p>
                </a>
                </Link>
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