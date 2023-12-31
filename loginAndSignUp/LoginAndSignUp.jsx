import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAddress } from "@thirdweb-dev/react";

//INTERNALIMPORT
import Style from "./newloginAndSignUp.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addUser, getUser, updateUser } from "../firebase/services";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { signInWithPopup, TwitterAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const LoginAndSignUp = ({ currentAccount, setProfileImageSrc }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [activeBtn, setActiveBtn] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isCreator, setIsCreator] = useState(false); // State for the creator selection

  const handleCreatorChange = (event) => {
    setIsCreator(event.target.checked);
  };

  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  // Set walletAddress state if currentAccount is passed in as a prop
  useEffect(() => {
    if (currentAccount) {
      setWalletAddress(currentAccount);
    }
  }, [currentAccount]);

  const handleSignInWithTwitter = async () => {
    const auth = getAuth();
    const provider = new TwitterAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      setWalletAddress(user.walletAddress);
      setMessage("User signed in successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleSignInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      setWalletAddress(user.walletAddress);
      setMessage("User signed in successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleSignInWithFacebook = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      setWalletAddress(user.walletAddress);
      setMessage("User signed in successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };
  
  
  
/*
  const handleSubmit = async (e) => {
  e.preventDefault();
  const auth = getAuth();
  try {
    // Sign up new users
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await addUser(username, email, walletAddress, null); // Assuming profilePicture is not provided in this form

    if (profileImage) {
      // Upload the profile image to Firebase Storage
      const storage = getStorage();
      const fileRef = ref(storage, `profileImages/${profileImage.name}`);
      await uploadBytes(fileRef, profileImage);
      const imageUrl = await getDownloadURL(fileRef);

      // Update the user's profile picture in the Firebase Firestore database
      await updateUser(user.uid, {
        profilePicture: imageUrl,
      });

      setProfileImageSrc(URL.createObjectURL(profileImage)); // update the profile picture in the Profile component
    }

    setMessage("User added successfully!");
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};
*/

/* works!
const handleSubmit = async (e) => {
  e.preventDefault();
  const auth = getAuth();
  try {
    // Sign up new users
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await addUser(username, email, walletAddress, profileImage);

    setMessage("User added successfully!");
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};
*/

const handleSubmit = async (e) => {

  
  e.preventDefault();
  const auth = getAuth();
  try {
    // Sign up new users
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await addUser(username, email, walletAddress, profileImage);

    if (profileImage) {
      
      const storage = getStorage();
      const fileRef = ref(storage, `profileImages/${profileImage.name}`);
      await uploadBytes(fileRef, profileImage);
      const imageUrl = await getDownloadURL(fileRef);

      await updateUser(user.uid, {
        profilePictureUrl: imageUrl,
      });

      }

    setMessage("User added successfully!");
    //setProfileImageSrc(imageUrl); 
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};



  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };


  const socialImage = [
    {
      social: images.twitter,
      name: "CONTINUE WITH TWITTER",
    },
    {
      social: images.google,
      name: "CONTINUE WITH GOOGLE",
    },
    {
      social: images.facebook,
      name: "CONTINUE WITH FACEBOOK",
    },
  ];

  return (
    <div className={Style.user}>
      <div className={Style.user_box}>        
        <div className={Style.form_box}>
          <form onSubmit={handleSubmit} className={Style.user_box_input}>
            <div className={Style.user_box_input_box}>
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={Style.user_box_input_box}>
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={Style.user_box_input_box}>
              <label htmlFor="walletAddress">WALLET ADDRESS</label>
              <input
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>

            <div className={Style.user_box_input_box}>
              <label
                htmlFor="password"
                className={Style.user_box_input_box_label}
              >
                <p>Password</p>
                <p>
                  <a href="#">Forgot password ?</a>
                </p>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={Style.user_box_input_box}>
              <label htmlFor="profilePicture">PROFILE PICTURE</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>

            <div className={Style.new_user_box_input_creator}>
            <label htmlFor="creator">BECOME A CREATOR?</label>
            <input
            type="checkbox"
            id="creator"
            checked={isCreator}
            onChange={handleCreatorChange}
            />
          </div>


            {message && <div className={Style.message}>{message}</div>}
            <div className={Style.continue_button_box}>
              <Button btnName="SUBMIT FORM" classStyle={Style.continue_button} />
            
            </div>
          </form>          
        </div>
        <p className={Style.user_box_or}>OR</p>
        <div className={Style.user_box_social}>          
        {socialImage.map((el, i) => (
            <div  
              key={i}
              onClick={() => {
                if (el.name === "CONTINUE WITH TWITTER") {
                  handleSignInWithTwitter();
                } else if (el.name === "CONTINUE WITH GOOGLE") {
                  handleSignInWithGoogle();
                } else if (el.name === "CONTINUE WITH FACEBOOK") {
                  handleSignInWithFacebook();
                }
              }}
              className={`${Style.user_box_social_item} ${activeBtn === i + 1 ? Style.active : ""
                }`}
            >
              <Image
                src={el.social}
                alt={el.name}
                width={30}
                height={30}
                className={Style.user_box_social_item_img}
              />
              <p>
                <span>{el.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignUp;