import React from "react";

//INTERNAL IMPORT
import Style from "../styles/subscription.module.css";
import images from "../img";
import Subscription from "../Subscription/Subscription";
const subscription = () => {
  const subscriptionArray = [
    {
      plan: "LEVEL 1",
      price: "FREE",
      popular: "",
      service: [
        "AUTOMATED REPORTING", 
        "SPEEDY PROCESSING TIMES", 
        "CUSTOMIZATIONS",
        "EASE OF USE",
      ],
      info: "Raising The Standard Of Xcellence One Drip At A Time.",
    },
    {
      plan: "LEVEL 2",
      price: "$9/mo",
      popular: "",
      service: [
        "AUTOMATED REPORTING", 
        "SPEEDY PROCESSING TIMES", 
        "CUSTOMIZATIONS",
        "EASE OF USE",
      ],
      info: "Raising The Standard Of Xcellence One Drip At A Time.",
    },
    {
      plan: "LEVEL 3",
      price: "$18/mo",
      popular: "POPULAR",
      service: [
        "EVERYTHING IN COMMON",
        "100 BUILDS",
        "PROGRESS REPORTS",
        "PREMIUM SUPPORT",
      ],

      info: "Raising The Standard Of Xcellence One Drip At A Time.",
    },
    {
      plan: "LEVEL 4",
      price: "$35/mo",
      popular: "",
      service: [
        "EVERYTHING IN EPIC",
        "UNLIMITED BUILDS",
        "ADVANCED ANALYTICS",
        "ADVERTISING DISCOUNTS",
      ],

      info: "Raising The Standard Of Xcellence One Drip At A Time.",
    },
  ];
  return (
    <div className={Style.Subscription}>
      <div className={Style.Subscription_box}>
        <div className={Style.Subscription_box_info}>
          <h1>CREATOR PACKAGES</h1>
          <p>PRICING TO FIT THE BUDGET OF ANY SIZE</p>
        </div>

        <div className={Style.Subscription_box_box}>
          {subscriptionArray.map((el, i) => (
            <Subscription key={i + 1} i={1} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default subscription;