import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";

const Form = () => {
  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="DESIRED USERNAME"
              className={Style.Form_box_input_userName}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">EMAIL</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input type="text" placeholder="YOUR EMAIL ADDRESS*" />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">DESCRIPTION</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="XPLAIN TO US WHAT MAKES YOU.....YOU"
            ></textarea>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="website">WEBSITE</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input type="text" placeholder="website" />
            </div>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">FACEBOOK</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaFacebookF />
                </div>
                <input type="text" placeholder="http://facebook" />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Twitter">TWITTER</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaTwitter />
                </div>
                <input type="text" placeholder="http://twitter" />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Instragram">INSTAGRAM</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaInstagram />
                </div>
                <input type="text" placeholder="http://instagram" />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">WALLET ADDRESS</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8"
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button
              btnName="UPDATE PROFILE INFORMATION"
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;