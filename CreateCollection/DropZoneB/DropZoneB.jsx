import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Img from "next/image";
//INTERNAL IMPORT
import Style from "./DropZoneB.module.css";
import images from "../../img";

const DropZoneB = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  category,
  setImage,
  setFileType,
  fileType,
  setPreviewMedia,
  setPreviewFileType,
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [localFileSize, setLocalFileSize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileUrl(file);
    setFileType(file.type);
    setLocalFileSize(file.size);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 250000000,
  });

  const formatFileSize = (size) => {
    if (!size) return null;
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const renderMediaPreview = () => {
    if (!fileType) {
      return null;
    }

    if (fileType.startsWith("image")) {
      return (
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
      );
    } else {
      return <div>Invalid file type</div>;
    }
  };

  return (
    <div className={Style.DropZone}>
      {!imagePreview && (
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
      )}

      {isLoading && (
        <div className={Style.loadingContainer}>
          <img
            src="/loading-spinner.gif"
            alt="Loading..."
            className={Style.loadingSpinner}
          />
          <p className={Style.loadingText}>Loading...</p>
        </div>
      )}

      {imagePreview && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            {renderMediaPreview()}           
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZoneB;
