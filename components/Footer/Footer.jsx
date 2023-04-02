import React from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaTiktok,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

import { RiSendPlaneFill } from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo"  />
          <p>
          OFFERING AN XCELLENT AVENUE FOR BUYING, SELLING, AND DISCOVERING XCLUSIVE DIGITAL ART.
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTiktok />
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

        <div className={Style.footer_box_discover}>
          <h3>XPLORE XM</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>HELP CENTER</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>SUBSCRIBE</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="ENTER YOUR EMAIL" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              JOIN OUR GROWING XMARKET COMMUNITY TODAY! 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;