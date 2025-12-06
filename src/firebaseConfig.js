// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4D9yM4OsBttITJvm0u5q1PAiuB_RlYCk",
  authDomain: "jeevankweb-195ed.firebaseapp.com",
  projectId: "jeevankweb-195ed",
  storageBucket: "jeevankweb-195ed.firebasestorage.app",
  messagingSenderId: "853447692850",
  appId: "1:853447692850:web:8c7b8d8a133d1b7048a22b",
  measurementId: "G-3789GDXQWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);