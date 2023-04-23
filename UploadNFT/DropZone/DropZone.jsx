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
  category,
  properties,
  uploadToIPFS,
  setImage,
  
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  

  const ipfsToHttp = (ipfsUrl) => {
    return ipfsUrl.replace("ipfs://", "https://dweb.link/ipfs/");
  };

  const onDrop = useCallback(async (acceptedFile) => {
    console.log(acceptedFile);
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
    setImagePreview(URL.createObjectURL(acceptedFile[0])); // update imagePreview
    console.log(url);
  }, [setImage, setImagePreview, uploadToIPFS]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

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

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image
              src={ipfsToHttp(fileUrl)}
              alt="nft image"
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
            />

{imagePreview && (
  <div className={Style.DropZone_box_input_img}>
    <img
      src={imagePreview}
      alt="nft preview"
      style={{ maxWidth: "100%", maxHeight: "400px", width: "auto", height: "auto" }}
      className={Style.DropZone_box_input_img_img}
    />
  </div>
)}



            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p>
                  <samp>NFT Name:</samp>
                  {name || ""}
                </p>
                <p>
                  <samp>Website:</samp>
                  {website || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description</span>
                  {description || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties</span>
                  {royalties || ""}
                </p>
                <p>
                  <span>FileSize</span>
                  {fileSize || ""}
                </p>
                <p>
                  <span>Properties</span>
                  {properties || ""}
                </p>
                <p>
                  <span>Category</span>
                  {category || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}

      
    </div>
  );
};

export default DropZone;
