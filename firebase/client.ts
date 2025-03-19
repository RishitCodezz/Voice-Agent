// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHYxKxhwRLTN-tJXlWtawfvws2AaW8wCU",
  authDomain: "assisting-dfbb8.firebaseapp.com",
  projectId: "assisting-dfbb8",
  storageBucket: "assisting-dfbb8.firebasestorage.app",
  messagingSenderId: "108630929807",
  appId: "1:108630929807:web:fded25f70093c5981f9bfa",
  measurementId: "G-PHGE7C9JG1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
