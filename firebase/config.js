import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa5SOYRl7CobTS3NOx-R8U7lwenNLX8jg",
  authDomain: "xdrip-moh-market-2.firebaseapp.com",
  projectId: "xdrip-moh-market-2",
  storageBucket: "xdrip-moh-market-2.appspot.com",
  messagingSenderId: "159713867052",
  appId: "1:159713867052:web:b570707ead4a224a38a889",
  measurementId: "G-B8NSN298M6"
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;