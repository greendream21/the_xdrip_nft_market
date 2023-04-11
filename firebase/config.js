import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCExAxx1G94RVKHBp1KljUgg11f65ymzjg",
  authDomain: "xdrip-xmarket-moh.firebaseapp.com",
  projectId: "xdrip-xmarket-moh",
  storageBucket: "xdrip-xmarket-moh.appspot.com",
  messagingSenderId: "34185118225",
  appId: "1:34185118225:web:a3d60a85c1a439c91327b0",
  measurementId: "G-PNDKJYB0BK"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;