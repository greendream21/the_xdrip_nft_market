import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState('"');
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async () => {
    try {
      await createSale(tokenURI, price, true, id);
      router.push("/author");
    } catch (error) {
      console.log("Error while resell", error);
    }
  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>RESELL YOUR ART, SET YOUR PRICE</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="NAME">PRICE</label>
          <input
            type="NUMBER"
            min={1}
            placeholder="RESELL PRICE"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} />
          )}
        </div>

        <div className={Style.reSellToken_box_btn}>
          <Button btnName="RESELL NFT" handleClick={() => resell()} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
