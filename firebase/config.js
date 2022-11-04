import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8aetb_TKBY0duZA0UiqpGhyjg4rUj4JQ",
  authDomain: "colocourse-0.firebaseapp.com",
  projectId: "colocourse-0",
  storageBucket: "colocourse-0.appspot.com",
  messagingSenderId: "428680542828",
  appId: "1:428680542828:web:65f8b5a039fb605e4d3649"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };