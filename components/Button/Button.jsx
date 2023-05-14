
import React from "react";


/* org code
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
*/

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, icon, classStyle }) => {
  const handleButtonClick = () => {
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <div className={Style.box}>
      <button
        className={`${Style.btn} ${classStyle}`}
        onClick={handleButtonClick}
      >
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;
