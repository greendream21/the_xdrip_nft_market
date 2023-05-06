import React, { useEffect } from "react";
import Style from "./NFTPreview.module.css";

const NFTPreview = ({
  show,
  onClose,
  imagePreview,
  name,
  category,
  royalties,
  price,
  fileSize,
  properties,
  website,
  description,
}) => {
  if (!show) {
    return null;
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isVideo = /\.(mp4|webm)$/i.test(imagePreview);

  return (
    <div className={Style.overlay} onClick={handleClickOutside}>
      <div className={Style.popup}>
        <span className={Style.close} onClick={onClose}>&times;</span>
        <div className={Style.preview_content}>
          {imagePreview && isVideo ? (
            <video
              src={imagePreview}
              controls
              className={Style.preview_image}
            />
          ) : (
            <img
              src={imagePreview}
              alt="Preview"
              className={Style.preview_image}
            />
          )}
          <h2 className={Style.preview_name}>{name}</h2>
          <p className={Style.preview_category}>Category: {category}</p>
          <p className={Style.preview_royalties}>Royalties: {royalties}%</p>
          <p className={Style.preview_price}>Price: {price} BNB</p>
          <p className={Style.preview_fileSize}>File Size: {fileSize} MB</p>
          <p className={Style.preview_properties}>Properties: {properties}</p>
          <p className={Style.preview_website}>Website: {website}</p>
          <p className={Style.preview_description}>Description: {description}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTPreview;