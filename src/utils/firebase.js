// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-f6384.firebaseapp.com",
  projectId: "blog-f6384",
  storageBucket: "blog-f6384.appspot.com",
  messagingSenderId: "749432988349",
  appId: "1:749432988349:web:e2b6106119a7e14e858dd4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
