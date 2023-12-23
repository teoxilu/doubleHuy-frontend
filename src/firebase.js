import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCT5nPmf7rhM-6OBA1FuOyEGs6rlgI7UbU",
  authDomain: "ecomshoes-3d4cb.firebaseapp.com",
  projectId: "ecomshoes-3d4cb",
  storageBucket: "ecomshoes-3d4cb.appspot.com",
  messagingSenderId: "929100337561",
  appId: "1:929100337561:web:1ff7f5c21c3ca1df620308",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
