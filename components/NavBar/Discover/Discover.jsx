import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
     {
      name: "SEARCH XM",
      link: "searchPage",
    },
    {
      name: "XM CATEGORIES",
      link: "categoriesPage",
    },
    {
      name: "XM CREATORS",
      link: "author",
    },
    {
      name: "BEGIN CREATING",
      link: "createButtonsPage",
    },
    {
      name: "XNEWS",
      link: "https://www.xdrip.io/news",
    },
  ];
  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;