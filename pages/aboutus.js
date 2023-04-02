import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";

const aboutus = () => {
  const founderArray = [
    {
      name: "OG Brad",
      position: "FOUNDER AND CEO",
      images: images.founder1,
    },
    {
      name: "OG Matt",
      position: "CHIEF OPERATING OFFICER",
      images: images.founder2,
    },
    {
      name: "OG Jim",
      position: "CHIEF OPERATING OFFICER",
      images: images.founder3,
    },
    {
      name: "OG Amos",
      position: "CHIEF STRATEGY OFFICER",
      images: images.founder4,
    },
    {
        name: "OG Flo",
        position: "CHIEF VISUAL DEVELOPER",
        images: images.founder5,
    },
  ];

  const factsArray = [
    {
      title: "10 MILLION",
      info: "ORGANIC INTERACTIONS WITH OUR SOCIALS (as of June. 30, 2022)",
    },
    {
      title: "30K+",
      info: "THE USD VALUE OF XRP PAID OUT TO OUR SOLDIERS (as of June. 30, 2022)",
    },
    {
      title: "140+",
      info: "XDRIP SOILDERS BUILDING THE FUTURE AS A FAMILY (as of June. 30, 2022)",
    },
  ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>ABOUT US</h1>
            <p>
            We are a team of dedicated and innovative entrepreneurs with a shared passion for creating meaningful and impactful solutions. 
            Our diverse backgrounds and areas of expertise allow us to approach challenges from different angles and find creative solutions to complex problems. 
            We value collaboration, integrity, and excellence in everything we do, and we strive to bring these values to our work every day. 
            Our goal is to make a positive difference in the world by developing and delivering high-quality products and services 
            that meet the needs of our customers and contribute to the greater good.
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image src={images.hero2} />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>XDRIP ECOSYSTEM FOUNDERS</h2>
          <p>
          
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={550}
                  height={625}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>XDRIP ECOSYSTEM FACTS</h2>
          <p>
            
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_box_info}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </div>
  );
};

export default aboutus;
