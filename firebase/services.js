import firebaseApp from "./config";
import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = getFirestore();
const storage = getStorage();
//const db = firebase.firestore();

export const addUser = async (username, email, walletAddress, profilePicture) => {
  const userRef = collection(firestore, "users");
  const newUser = {
    email,
    username,
    walletAddress,
    profilePictureUrl: "",
    isCreator: false,
    creatorPage: "",
    nftsListed: [],
    nftsSold: [],
  };

  try {
    const { id } = await addDoc(userRef, newUser);
    const profilePictureRef = ref(storage, `users/${id}/profilePicture`);
    await uploadBytes(profilePictureRef, profilePicture);
    const profilePictureUrl = await getDownloadURL(profilePictureRef);
    await updateDoc(doc(userRef, id), { profilePictureUrl });
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};

export const addNft = async (userId, tokenURI) => {
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const nft = {
        tokenURI,
        likes: 0,
      };
      userData.nftsListed.push(nft);
      await updateDoc(userRef, { nftsListed: userData.nftsListed });
    } else {
      console.error("User does not exist");
    }
  } catch (error) {
    console.error("Error adding NFT: ", error);
  }
};

export const updateNftLikes = async (userId, nftIndex, likes) => {
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      if (nftIndex >= 0 && nftIndex < userData.nftsListed.length) {
        userData.nftsListed[nftIndex].likes = likes;
        await updateDoc(userRef, { nftsListed: userData.nftsListed });
      } else {
        console.error("Invalid NFT index");
      }
    } else {
      console.error("User does not exist");
    }
  } catch (error) {
    console.error("Error updating NFT likes: ", error);
  }
};




export const getUser = async (userId) => {
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const { username, email, walletAddress, profilePictureUrl } = userData;
      return { id: userSnapshot.id, username, email, walletAddress, profilePictureUrl };
    } else {
      console.error("User does not exist");
    }
  } catch (error) {
    console.error("Error getting user: ", error);
  }
};

export const updateUser = async (userId, updates) => {
  const userRef = doc(firestore, "users", userId);

  try {
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};

const updateUserProfilePicture = async (userId, profilePictureUrl) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    profilePictureUrl: profilePictureUrl,
  });
};


export const getUserProfile = async (walletAddress) => {
  const firestore = getFirestore();
  const q = query(collection(firestore, "users"), 
    where("walletAddress", "==", walletAddress));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    let userProfile = null;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userProfile = {id: doc.id, ...doc.data()};
    });
    return userProfile;
  } else {
    console.error("No user found with the given wallet address");
    return null;
  }
};