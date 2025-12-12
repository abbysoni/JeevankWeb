// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA4D9yM4OsBttITJvm0u5q1PAiuB_RlYCk",
  authDomain: "jeevankweb-195ed.firebaseapp.com",
  projectId: "jeevankweb-195ed",
  storageBucket: "jeevankweb-195ed.firebasestorage.app",
  messagingSenderId: "853447692850",
  appId: "1:853447692850:web:8c7b8d8a133d1b7048a22b",
  measurementId: "G-3789GDXQWJ"
};

// ✅ Export app so other modules (Storage) can reuse it
export const app = initializeApp(firebaseConfig);

// ✅ Export Firestore db
export const db = getFirestore(app);

// ✅ Analytics: make it safe (doesn't break builds/environments)
(async () => {
  try {
    const supported = await isSupported();
    if (supported) getAnalytics(app);
  } catch {
    // ignore analytics errors
  }
})();
