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

    const [isLoading, setIsLoading] = useState(false);

    const uploadToIPFS = async (file) => {
        const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
        const client = new NFTStorage({ token: apiKey });

        try {
            console.log("Uploading to nft.storage...");
            const content = await client.storeBlob(
                new Blob([file], { type: file.type })
            );

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
                        <label htmlFor="name">CHOOSE A CATEGORY</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">SELECT A CATEGORY FOR YOUR NFT</option>
                            {categoryArry.map((el, i) => (
                                <option key={i} value={el.category}>
                                    {el.category}
                                </option>
                            ))}
                        </select>
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
                <DropZoneB
                    title="LOGO IMAGE*"
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

                <DropZoneB
                    title="FEATURED IMAGE"
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
                <DropZoneB
                    title="BANNER IMAGE"
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
                <div className={Style.upload_box_btn}>
                    <Button
                        btnName="CREATE YOUR NEW COLLECTION"
                        handleClick={togglePreview}
                        classStyle={Style.upload_box_btn_style}
                    />
                </div>
            </div>

        </div>
    );
};

export default CreateCollection;
