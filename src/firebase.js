// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbzo3QWy9lT3f87FyXCUE62tOHVXcB2Vg",
  authDomain: "financely-397a3.firebaseapp.com",
  projectId: "financely-397a3",
  storageBucket: "financely-397a3.firebasestorage.app",
  messagingSenderId: "989024174245",
  appId: "1:989024174245:web:23b2ad09baadbedfd6cd4c",
  measurementId: "G-02R9WTYGK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };