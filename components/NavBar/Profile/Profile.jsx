import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useDisconnect } from "@thirdweb-dev/react";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = () => {
  const disconnect = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className={Style.profile}>
      {/* ... */}
      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/myprofile" }}>MY PROFILE</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/my-items" }}>MY ITEMS</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/edit-profile" }}>EDIT PROFILE</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/help" }}>HELP</Link>
            </p>
          </div>
          <div
            className={Style.profile_menu_one_item}
            onClick={handleDisconnect}
            role="button"
            tabIndex={0}
          >
            <TbDownload />
            <p>DISCONNECT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;