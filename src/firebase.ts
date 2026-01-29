import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbyPMh0Ai2FI7sosPiYX63Iw07lHcSdgc",
  authDomain: "avbfashions-c3eba.firebaseapp.com",
  projectId: "avbfashions-c3eba",
  storageBucket: "avbfashions-c3eba.firebasestorage.app",
  messagingSenderId: "517216835890",
  appId: "1:517216835890:web:fda40668459ef75b3d1f2b",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);