import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { NFTStorage } from "nft.storage";

//INTERNAL IMPORT
import Style from "./CreateCollection.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZoneB } from "./createCollectionIndex.js";



const CreateCollection = ({ }) => {

    const [active, setActive] = useState(0);
    const [collectionName, setCollectionName] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");

    const [fileSize, setFileSize] = useState("");
    const [category, setCategory] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCollection, setSelectedCollection] = useState("");
    const [newCollectionName, setNewCollectionName] = useState("");
    const [editions, setEditions] = useState([]);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [fileType, setFileType] = useState(null);

    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscord] = useState("");

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    //const router = useRouter();

   

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={Style.CreateCollection}>

            <div className={Style.right_box}>
                <div className={Style.upload_details_title}>
                    <h2>COLLECTION DETAILS + SOCIALS</h2>
                </div>
                <div className={Style.upload_box}>
                    <div className={formStyle.Form_box_input}>
                        <label htmlFor="nft">NEW COLLECTION'S NAME</label>
                        <input
                            type="text"
                            placeholder="ENTER COLLECTION NAME"
                            className={formStyle.Form_box_input_userName}
                            onChange={(e) => setCollectionName(e.target.value)}
                        />
                    </div>
                    <div className={formStyle.Form_box_input}>
                        <label htmlFor="website">YOUR COLLECTIONS WEBSITE</label>
                        <div className={formStyle.Form_box_input_box}>


                            <input
                                type="text"
                                placeholder="ENTER YOUR COLLECTIONS WEBSITE"
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>

                        <p className={Style.upload_box_input_para}>
                            A link to this URL will be included on the collections.
                        </p>
                    </div>


                    <div className={formStyle.Form_box_input}>
                        <label htmlFor="facebook">FACEBOOK</label>
                        <div className={formStyle.Form_box_input_box}>
                            <input
                                type="text"
                                placeholder="ENTER YOUR FACEBOOK LINK"
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={formStyle.Form_box_input}>
                        <label htmlFor="twitter">TWITTER</label>
                        <div className={formStyle.Form_box_input_box}>
                            <input
                                type="text"
                                placeholder="ENTER YOUR TWITTER LINK"
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={formStyle.Form_box_input}>
                        <label htmlFor="instagram">INSTAGRAM</label>
                        <div className={formStyle.Form_box_input_box}>
                            <input
                                type="text"
                                placeholder="ENTER YOUR INSTAGRAM LINK"
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={formStyle.Form_box_input}>
                        <label htmlFor="discord">DISCORD</label>
                        <div className={formStyle.Form_box_input_box}>
                            <input
                                type="text"
                                placeholder="ENTER YOUR DISCORD LINK"
                                onChange={(e) => setDiscord(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={formStyle.Form_box_input}>
                        <label htmlFor="description">DESCRIBE YOUR COLLECTION</label>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="6"
                            placeholder="TELL US ABOUT YOUR NFT AND WHAT MAKES IT XCELLENT"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <p>
                            This description will be displayed on the collections page. Markdown syntex is supported.             </p>
                    </div>

                </div>
            </div>
            <div className={Style.upload_dropzone}>
                <div className={Style.upload_dropzone_title}>
                    <h2> LOGO + FEATURED + BANNER IMAGES</h2>
                </div>
                <div className={Style.dropzone_container}>
                    <div className={Style.dropzone_item}>
                        <h3>LOGO IMAGE*</h3>
                    </div>
                    <DropZoneB
                        heading="THIS IMAGE WILL BE USED FOR DISPLAY PURPOSES."
                        subHeading="RECOMMENDED SIZE: 350 x 350"
                        name={collectionName}
                        description={description}
                        category={category}
                        website={website}
                        setImage={setImage}
                        setImagePreview={setImagePreview}
                        imagePreview={imagePreview}
                        fileSize={fileSize}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setFileType={setFileType}
                        fileType={fileType}


                    />
                </div>
                <div className={Style.dropzone_container}>
                    <div className={Style.dropzone_item}>
                        <h3>FEATURED IMAGE</h3>
                    </div>
                    <div className={Style.dropzone}>
                        <DropZoneB
                            heading="THIS IMAGE WILL BE USED IN XMARKET FEATURED SPACES"
                            subHeading="RECOMMENDED SIZE: 600 x 600 "
                            name={collectionName}
                            description={description}
                            category={category}
                            website={website}
                            setImage={setImage}
                            setImagePreview={setImagePreview}
                            imagePreview={imagePreview}
                            fileSize={fileSize}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setFileType={setFileType}
                            fileType={fileType}


                        />
                    </div>
                </div>

                <div className={Style.dropzone_container}>
                    <div className={Style.dropzone_item}>
                        <h3>BANNER IMAGE</h3>
                    </div>
                    <div className={Style.dropzone}>
                        <DropZoneB
                            heading="THIS IMAGE WILL APPEAR AT THE TOP OF YOUR COLLECTION PAGE"
                            subHeading="RECOMMENDED SIZE: 1400 x 350"
                            name={collectionName}
                            description={description}
                            category={category}
                            website={website}
                            setImage={setImage}
                            setImagePreview={setImagePreview}
                            imagePreview={imagePreview}
                            fileSize={fileSize}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setFileType={setFileType}
                            fileType={fileType}


                        />
                    </div>
                </div>
                <div className={Style.upload_box_btn}>
                    <Button
                        btnName="CREATE YOUR NEW COLLECTION"
                        handleClick={() => {
                            togglePreview();
                            saveCollectionDetails();
                        }}
                        classStyle={Style.upload_box_btn_style}
                    />

                </div>
            </div>

        </div>
    );
};

export default CreateCollection;
