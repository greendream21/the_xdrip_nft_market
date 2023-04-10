import React, { useState } from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

//INTERNAL IMPORT
import Style from "../styles/contactus.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

const contactus = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can make an API call to send the form data to a server
    console.log({ name, email, message });
    // Clear the form inputs after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        <h1>CONTACT XMARKET</h1>
        <div className={Style.contactus_box_box}>
          <div className={Style.contactus_box_box_left}>
            <div className={Style.contactus_box_box_left_item}>
              <h3>XDRIP EMAIL</h3>
              <p>contact@xdrip.io</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>XDRIP SOCIALS</h3>
              <a href="#">
                <TiSocialFacebook />
              </a>
              <a href="#">
                <TiSocialLinkedin />
              </a>
              <a href="#">
                <TiSocialInstagram />
              </a>
              <a href="#">
                <TiSocialYoutube />
              </a>
              <a href="#">
                <TiSocialTwitter />
              </a>
            </div>
          </div>
          <div className={Style.contactus_box_box_right}>
            <form onSubmit={handleSubmit}>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="YOUR FULL NAME"
                  className={formStyle.Form_box_input_userName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input
                    type="text"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="description">MESSAGE</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="LET US KNOW HOW WE MAY HELP YOU"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <Button
                btnName="SEND MESSAGE"
                handleClick={() => {}}
                classStyle={Style.button}
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus;