import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    {
      images: images.category_art,
      name: "ART",
    },
    {
      images: images.category_favorites,
      name: "FAVORITES",
    },
    {
      images: images.category_gaming,
      name: "GAMING",
    },
    {
      images: images.category_metaverse,
      name: "METAVERSE",
    },
    {
      images: images.category_music,
      name: "MUSIC",
    },
    {
      images: images.category_photography,
      name: "PHOTOGRAPHY",
    },
    {
      images: images.category_sports,
      name: "SPORTS",
    },
    {
      images: images.category_videos,
      name: "VIDEOS",
    },
  ];
  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={i + 1}>
            <Image
              src={el.images}
              className={Style.category_box_img}
              alt="Category Image"
              width={350}
              height={190}
              
            />

            <div className={Style.category_box_title}>
              <span>
                <Image
                src={images.xm}
                alt="Logo"
                width={50}
                height={50}
                />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>{el.name}</h4>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
