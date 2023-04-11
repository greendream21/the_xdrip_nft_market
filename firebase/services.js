import firebaseApp from "./config";
import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firestore = getFirestore();
const storage = getStorage();

export const addUser = async (username, email, walletAddress, profilePicture) => {
  const userRef = collection(firestore, "users");
  const newUser = {
    username,
    email,
    walletAddress,
    profilePictureUrl: ""
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