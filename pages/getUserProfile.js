import { doc, getDoc } from "firebase/firestore"; 
import { db } from "./firebaseConfig";  // import your Firebase config

export const getUserData = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such document!");
  }
};
