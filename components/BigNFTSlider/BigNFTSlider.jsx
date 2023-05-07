import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillRocket, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import videos from "../../public/videos"
import Button from "../Button/Button";


import { ethers } from "ethers";
import mohCA_ABI from "../../Context/mohCA_ABI.json";
const MohAddress = mohCA_ABI.address;
const MohABI = mohCA_ABI.abi;
import ipfsHashes from "../../Context/ipfsHashes";

const fetchMohContract = (signerOrProvider) =>
  new ethers.Contract(MohAddress, MohABI, signerOrProvider);

const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(0);

  
  const sliderData = [
    {
      title: "COMMON",
      id: 1,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: "0.25 BNB",
      like: 1,
      image: images.user1,
      nftVideo: videos.common,
      description:"Common Medal, forged in the fires of battle, this medal represents the courage and determination of the XdRiP warrior.",
      ipfsHash: ipfsHashes.find((hash) => hash.title === "COMMON").url,
      inventory: {
        forged: 0,
        available: 100,
       },
    },
    {
      title: "UNCOMMON",
      id: 2,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: "0.50 BNB",
      like: 369,
      image: images.user1,
      nftVideo: videos.uncommon,
      description:"Uncommon Medal, crafted by the most skilled, this medal is a symbol of the exceptional strength and valor possessed by those who rise above the rest.",
      ipfsHash: ipfsHashes.find((hash) => hash.title === "UNCOMMON").url,
      inventory: {
        forged: 0,
        available: 80,
       },
    },
    {
      title: "RARE ",
      id: 3,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: "0.75 BNB",
      like: 1,
      image: images.user1,
      nftVideo: videos.rare,
      description:"Rare Medal, forged from rare and precious metals, this medal is a testament to the elite few who have demonstrated unparalleled bravery and honor.",
      ipfsHash: ipfsHashes.find((hash) => hash.title === "RARE").url,
      inventory: {
        forged: 0,
        available: 60,
       },
    },
    {
      title: "EPIC ",
      id: 4,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: "1.0 BNB",
      like: 1,
      image: images.user1,
      nftVideo: videos.epic,
      description:"Epic Medal, wrought with mystical powers, this medal is a sign of the legendary feats accomplished by only the most heroic and mighty of warriors.",
      ipfsHash: ipfsHashes.find((hash) => hash.title === "EPIC").url,
      inventory: {
        forged: 0,
        available: 40,
       },
    },
    {
      title: "LEGENDARY ",
      id: 5,
      name: "XDRIP OFFICIAL",
      collection: "MEDALS OF HONOR",
      price: "1.5 BNB",
      like: 1,
      image: images.user1,
      nftVideo: videos.legendary,
      description:"Legendary Medal, forged by the XdRiP Gods, this medal is a symbol of the ultimate achievement in battle, an honor bestowed only upon the greatest of heroes. ",
      ipfsHash: ipfsHashes.find((hash) => hash.title === "LEGENDARY").url,
      inventory: {
        forged: 0,
        available: 40,
       },
    },
  ];

  //-------INC
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);

  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);


const mint = async (medalType, ipfsHash) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = fetchMohContract(signer);

    let mintFunction;
    switch (medalType) {
      case "COMMON":
        mintFunction = contract.mintCommon;
        break;
      case "UNCOMMON":
        mintFunction = contract.mintUncommon;
        break;
      case "RARE":
        mintFunction = contract.mintRare;
        break;
      case "EPIC":
        mintFunction = contract.mintEpic;
        break;
      case "LEGENDARY":
        mintFunction = contract.mintLegendary;
        break;
      default:
        throw new Error("Invalid medal type");
    }

    const price = ethers.utils.parseUnits(sliderData[idNumber].price.split(" ")[0], "ether");
    const transaction = await mintFunction(ipfsHash, { value: price, gasLimit: 500000 });
    await transaction.wait();
    alert("Your Medal Of Honor was minted successfully!");
  } catch (error) {
    console.error("Error minting medal:", error);
    alert("Minting failed. Please check console for details.");
  }
};






  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>CREATOR</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <Image
                src={images.xm2}
                alt="Logo"
                width={50}
                height={50}

                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>COLLECTION</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>CURRENT PRICE</small>
              <p>
                {sliderData[idNumber].price} 
              </p>
            </div>

            <div className={Style.bigNFTSlider_box_left_origin}> 
                <h3>ORIGIN:</h3>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
            {sliderData[idNumber].description}
            </p>

            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].inventory.forged}</p>
                <span>TOTAL FORGED</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].inventory.available}</p>
                <span>TOTAL AVAILABLE</span>
              </div>

            </div>

            <div className={Style.bigNFTSlider_box_left_button}>
              <Button
  btnName="FORGE YOUR MEDAL"
  handleClick={() => mint(sliderData[idNumber].title, sliderData[idNumber].ipfsHash)}
/>
              <Button btnName="DETAILS" handleClick={() => { }} />
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <video
              src={sliderData[idNumber].nftVideo}
              width="100%"
              height="100%"
              loop
              muted
              autoPlay
              preload="auto"
              playsInline
              alt="NFT VIDEO"
              transition="transform 0.5s cubic-bezier(0.42, 0, 0.58, 1)"
              className={Style.bigNFTSlider_box_right_box_img}
              controlsList="nodownload noplaybackspeed "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!document.fullscreenElement) {
                  e.target.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }}
            />

            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;