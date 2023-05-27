import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/categoryPage.module.css";
import { Slider, Brand, Category, Title } from "../components/componentsindex";
import { Banner } from "../collectionPage/collectionIndex";


//SMART CONTRACT IMPORT


const categoryPage = () => {
 



   return (
    <div className={Style.categoryPage}>
      <Banner />
      <Title
        heading="XMARKET'S CATEGORIES"
      />
      <Category/>
      <Slider />
      <Brand />
    </div>
  );
};

export default categoryPage;