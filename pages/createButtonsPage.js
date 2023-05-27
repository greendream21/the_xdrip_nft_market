import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/categoryPage.module.css";
import { Slider, Brand, CreateButtons, Title } from "../components/componentsindex";
import { Banner } from "../collectionPage/collectionIndex";


//SMART CONTRACT IMPORT


const createButtonsPage = () => {
 



   return (
    <div className={Style.categoryPage}>
      <Banner />
  
      <CreateButtons/>
      
      <Brand />
    </div>
  );
};

export default createButtonsPage;