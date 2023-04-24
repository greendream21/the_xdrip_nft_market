
import React from "react";

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, icon, classStyle }) => {
  return (
    <div className={Style.box}>
      <button
        className={`${Style.btn} ${classStyle}`}
        onClick={() => handleClick()}
      >
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;
