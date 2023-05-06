
import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/router";
import { NFTStorage } from "nft.storage";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "./uploadNFTIndex.js";

import NFTPreview from "./NFTPreview"

const UloadNFT = ({ createNFT }) => {
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const router = useRouter();

  const categoryArry = [
    {
      image: images.category_art,
      category: "ART",
    },
    {
      image: images.category_gaming,
      category: "GAMING",
    },
    {
      image: images.category_metaverse,
      category: "METAVERSE",
    },
    {
      image: images.category_music,
      category: "MUSIC",
    },
    {
      image: images.category_photography,
      category: "PHOTOGRAPHY",
    },
    {
      image: images.category_videos,
      category: "VIDEOS",
    },
    {
      image: images.category_sports,
      category: "SPORTS",
    },
  ];
  
  // this process is logged for visibility in console 
  
  const uploadToIPFS = async (file) => {
  const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: apiKey });

  try {
    console.log("Uploading to nft.storage...");
    const content = await client.storeBlob(new Blob([file], { type: file.type }));
    
    console.log("Upload complete, content:", content);
    console.log("Content CID:", content);
    
    const ipfsMediaUrl = `https://${content}.ipfs.nftstorage.link`;

    console.log("Generated IPFS Media URL:", ipfsMediaUrl);
    if (ipfsMediaUrl.includes("undefined")) {
      console.error("Error: IPFS URL contains 'undefined'");
    } else {
      setImage(ipfsMediaUrl);
      setImagePreview(URL.createObjectURL(file)); // set image preview
      return ipfsMediaUrl;
    }
  } catch (error) {
    console.error("Error uploading Media to nft.storage:", error);
  }
};  



/*
  const uploadToIPFS = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
    const client = new NFTStorage({ token: apiKey });

    try {
      const metadata = await client.store({
        name: file.name,
        description:
          "Your NFT description - need to pull this from the formdata",
        image: new File([file], file.name, { type: file.type }),
      });

      setImage(metadata.url);
      setImagePreview(URL.createObjectURL(file)); // set image preview
      return metadata.url;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }
  };
*/
  
  
  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="SIMPLY DRAG AND DROP YOUR FILE HERE OR"
        subHeading="BROWSE FOR A FILE ON YOUR DEVICE"
        name={name}
        price={price}
        description={description}
        category={category}
        website={website}
        royalties={royalties}
        properties={properties}               
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        fileSize={fileSize}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">NFT NAME</label>
          <input
            type="text"
            placeholder="ENTER NFT NAME"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">WEBSITE</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="text"
              placeholder="ENTER YOUR WEBSITE"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            WE WILL INCLUDE A LINK TO THIS URL ON THIS ITEM'S DETAILS PAGE,
            ENSURING USERS CAN ACCESS MORE INFORMATION ABOUT YOU AND YOUR NFT.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">DESCRIPTION</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="TELL US ABOUT YOUR NFT AND WHAT MAKES IT XCELLENT"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            WE WILL INCLUDE THIS DESCRIPTION ON YOUR NFT CARD, INSIDE THE ITEM'S
            DETAIL PAGE. MARKDOWN SYNTAX IS SUPPORTED AS WELL.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">CHOOSE COLLECTION</label>
          <p className={Style.upload_box_input_para}>
            CHOOSE AN EXISTING COLLECTION OR CREATE A NEW ONE
          </p>

          <div className={Style.upload_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active == i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (setActive(i + 1), setCategory(el.category))}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background image"
                      width={50}
                      height={50}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>{el.category} </p>
              </div>
            ))}
          </div>
        </div>

        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Royalties">ROYALTIES</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
          
          <div className={formStyle.Form_box_input}>
            <label htmlFor="size">FILE SIZE</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="MB"
                onChange={(e) => setFileSize(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Properties">NFT PROPERTIES</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Properties"
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">PRICE</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
  type="text"
  placeholder="Price in BNB"
  value={price}
  onChange={(e) => {
    const value = e.target.value;
    // Only allow numeric and decimal point characters
    const newValue = value.replace(/[^0-9.]/g, "");
    // Ensure that there is only one decimal point
    const decimalIndex = newValue.indexOf(".");
    if (decimalIndex !== -1) {
      const decimalCount = newValue.slice(decimalIndex + 1).length;
      if (decimalCount > 3) {
        return;
      }
    }
    setPrice(newValue);
  }}
/>
            </div>
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="UPLOAD YOUR NFT"
            handleClick={async () =>
              createNFT(
                name,
                price,
                description,
                category,
                website,
                royalties,
                properties,
                image,
                fileSize
                               
              )
            }
            classStyle={Style.upload_box_btn_style}
          />
          <Button
            btnName="PREVIEW YOUR NFT"
            handleClick={togglePreview}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
        
          <NFTPreview
        show={showPreview}
        onClose={togglePreview}
        imagePreview={imagePreview}
        name={name}
        category={category}
        royalties={royalties}
        price={price}
        fileSize={fileSize}
        properties={properties}
        website={website}
        description={description}
      />
        
        
      </div>
    </div>
  );
};

export default UloadNFT;