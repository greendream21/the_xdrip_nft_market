import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  royalties,
  fileSize,
  setFileSize,
  properties,
  price,
  uploadToIPFS,
  category,
  setImage,
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [localFileSize, setLocalFileSize] = useState(null);

  const ipfsToHttp = (ipfsUrl) => {
    return ipfsUrl.replace("ipfs://", "https://dweb.link/ipfs/");
  };



  const onDrop = useCallback(
  async (acceptedFile) => {
    console.log(acceptedFile);
    const file = acceptedFile[0];
    setLocalFileSize(file.size); // Call the setFileSize prop
    const url = await uploadToIPFS(file);
    setFileUrl(url);
    setImage(url);
    setImagePreview(URL.createObjectURL(file)); // update imagePreview
    console.log(url);
  },
  [setImage, setImagePreview, uploadToIPFS, setFileSize]
);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  
  
  const handleInputValue = (input) => {
  if (typeof input === "string" && input.endsWith("%")) {
    return parseFloat(input.slice(0, -1)) / 100;
  } else {
    return parseFloat(input);
  }
};

const formatFileSize = (size) => {
  if (!size) return null;
  if (size < 1024) return `${size} bytes`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};
  
  

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={images.upload}
              alt="upload"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {imagePreview && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <img
              src={imagePreview}
              alt="nft preview"
              style={{
                maxWidth: "400px",
                maxHeight: "400px",
                width: "auto",
                height: "auto",
              }}
              className={Style.DropZone_box_input_img_img}
            />

            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p>NFT Name : {name || ""}</p>
                <p>CATEGORY : {category || ""}</p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>Royalties : {royalties ? handleInputValue(royalties) : ""}</p>
                <p>Price : {price ? handleInputValue(price) : ""}</p>
                <p>FileSize : {formatFileSize(localFileSize)}</p>
                <p>Properties : {properties || ""}</p>
                <p>Website : {website || ""}</p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>Description : {description || ""}</p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
