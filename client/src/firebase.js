// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-7a1ab.firebaseapp.com",
  projectId: "mern-estate-7a1ab",
  storageBucket: "mern-estate-7a1ab.appspot.com",
  messagingSenderId: "458493057040",
  appId: "1:458493057040:web:4bef21d55818d8f1dc9295"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);