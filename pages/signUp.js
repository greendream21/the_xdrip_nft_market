import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const signUp = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>SIGNUP</h1>
        <LoginAndSignUp />
        <p className={Style.login_box_para}>
          RETURNING USER? <a href="/login">LOG IN TO YOUR ACCOUNT</a>
        </p>
      </div>
    </div>
  );
};

export default signUp;