import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    {
      images: images.category_art,
      name: "ART",
      path: "/artCategory",
    },
    {
      images: images.category_gaming,
      name: "GAMING",
      path: "/gamingCategory",
    },
    {
      images: images.category_metaverse,
      name: "METAVERSE",
      path: "/metaverseCategory",
    },
    {
      images: images.category_music,
      name: "MUSIC",
      path: "/musicCategory",
    },
    {
      images: images.category_photography,
      name: "PHOTOGRAPHY",
      path: "/photographyCategory",
    },
    {
      images: images.category_sports,
      name: "SPORTS",
      path: "/sportsCategory",
    },
    {
      images: images.category_videos,
      name: "VIDEOS",
      path: "/videoCategory",
    },
    {
      images: images.category_favorites,
      name: "COLLECTIBLES",
      path: "/collectiblesCategory",
    },
  ];

  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={i + 1}>
            <Link href={el.path} passHref>
              <a className={Style.category_link}>
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
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;