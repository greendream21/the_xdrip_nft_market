import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";


import { getUserProfile } from "../../firebase/services";

import Img from "next/image";

import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

import Style from "./AuthorProfileCard.module.css";

import { Button } from "../../components/componentsindex.js";

const AuthorProfileCard = ({ currentAccount }) => {
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const address = useAddress(); 

   useEffect(() => {
    const fetchUserData = async () => {
      if (address) { 
        const userData = await getUserProfile(address); 
        setUser(userData);
      }
    }
    
    fetchUserData();
  }, [address]); 
  

  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = () => {
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };

 
  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          {user && (
            <Img
              src={user.profilePictureUrl}
              className={Style.AuthorProfileCard_box_img_img}
              alt="User Profile"
              width={220}
              height={220}
            />
          )}
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          {user && (
            <>
              <h2>
                {user.username}{" "}
                <span>
                  <MdVerified />
                </span>{" "}
              </h2>

              <div className={Style.AuthorProfileCard_box_info_address}>
                <input type="text" value={user.walletAddress} id="myInput" />
                <FiCopy
                  onClick={() => copyAddress()}
                  className={Style.AuthorProfileCard_box_info_address_icon}
                />
              </div>

              <p>
                Email: {user.email} <br/>
                Is Creator: {user.isCreator ? 'Yes' : 'No'} <br/>
                Creator Page: {user.creatorPage} <br/>
                NFTs Listed: {user.nftsListed.length} <br/>
                NFTs Sold: {user.nftsSold.length} <br/>
              </p>

              <div className={Style.AuthorProfileCard_box_info_social}>
                <a href="#">
                  <TiSocialFacebook />
                </a>
                <a href="#">
                  <TiSocialInstagram />
                </a>
                <a href="#">
                  <TiSocialYoutube />
                </a>
              </div>
            </>
          )}
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
          <Button btnName="Follow" handleClick={() => {}} />
          <MdCloudUpload
            onClick={() => openShare()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                FACEBOOK
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                INSTAGRAM
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                YOUTUBE
              </p>
            </div>
          )}

          <BsThreeDots
            onClick={() => openReport()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {report && (
            <p className={Style.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{" "}
                REPORT ABUSE
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;