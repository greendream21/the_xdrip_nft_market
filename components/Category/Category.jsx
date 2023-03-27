import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    {
      images: images.creatorbackground1,
      name: "DIGITAL ART",
    },
    {
      images: images.creatorbackground2,
      name: "COLLECTABLES",
    },
    {
      images: images.creatorbackground3,
      name: "GAMING ART",
    },
    {
      images: images.creatorbackground4,
      name: "SPORTS",
    },
    {
      images: images.creatorbackground5,
      name: "ANIMAL ART",
    },
    {
      images: images.creatorbackground6,
      name: "REAL ESTATE",
    },
    {
      images: images.creatorbackground7,
      name: "PHOTOGRAPHY",
    },
    {
      images: images.creatorbackground8,
      name: "FASION",
    },
    {
      images: images.creatorbackground9,
      name: "MEMES",
    },
    {
      images: images.creatorbackground10,
      name: "TIME LIFE ART",
    },
    {
      images: images.creatorbackground11,
      name: "FAVORITES",
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
              height={150}
              objectFit="cover"
            />

            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>{el.name}</h4>
                <small>{i + 1}100 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
