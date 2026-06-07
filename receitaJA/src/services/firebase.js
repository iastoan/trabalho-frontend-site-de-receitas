import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgWvgcavamH_RJhz1v8v_7Biry7ATL3UM",
  authDomain: "receita-ja-d77bd.firebaseapp.com",
  projectId: "receita-ja-d77bd",
  storageBucket: "receita-ja-d77bd.firebasestorage.app",
  messagingSenderId: "223211426925",
  appId: "1:223211426925:web:513077bd16117eeff49b64"
};

const app = initializeApp(firebaseConfig);

//  Auth
export const auth = getAuth(app);

//  Firestore (ESSENCIAL)
export const db = getFirestore(app);