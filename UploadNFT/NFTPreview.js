import React, { useEffect } from "react";
import Style from "./NFTPreview.module.css";

const NFTPreview = ({
  show,
  onClose,
  mediaPreview,
  fileType,
  name,
  category,
  royalties,
  price,
  fileSize,
  properties,
  website,
  description,
  editions,
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

  const renderMediaPreview = () => {
    if (!fileType) {
      return null;
    }

    if (fileType.startsWith("image")) {
      return (
        <img
          src={mediaPreview}
          alt="Preview"
          className={Style.preview_media}
        />
      );
    } else if (fileType.startsWith("video")) {
      return (
        <video
          src={mediaPreview}
          controls
          className={Style.preview_media}
        />
      );
    } else if (fileType.startsWith("audio")) {
      return (
        <>
          <img
            src="/mp3.jpg"
            alt="mp3 preview"
            style={{
              maxWidth: "400px",
              maxHeight: "400px",
              width: "auto",
              height: "auto",
            }}
            className={Style.preview_media}
          />
          <audio
            src={mediaPreview}
            controls
            className={Style.preview_media}
          />
        </>
      );
    } else {
      return <div>Invalid file type</div>;
    }
  };

  return (
    <div className={Style.overlay} onClick={handleClickOutside}>
      <div className={Style.popup}>
        <span className={Style.close} onClick={onClose}>&times;</span>
        <div className={Style.preview_content}>
          {renderMediaPreview()}
          <h2 className={Style.preview_name}>{name}</h2>
          <p className={Style.preview_category}>Category: {category}</p>
          <p className={Style.preview_editions}>Editions: {editions}</p>
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
