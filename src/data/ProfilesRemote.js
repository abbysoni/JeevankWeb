// src/data/profilesRemote.js
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const COLLECTION = "profiles";

export async function fetchProfilesFromFirestore() {
  try {
    const colRef = collection(db, COLLECTION);
    const snapshot = await getDocs(colRef);
    const profiles = [];
    snapshot.forEach((docSnap) => {
      profiles.push(docSnap.data());
    });
    profiles.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return profiles;
  } catch (e) {
    console.error("Failed to fetch profiles from Firestore", e);
    return [];
  }
}

export async function saveProfileToFirestore(profile) {
  try {
    const docRef = doc(db, COLLECTION, profile.id);
    await setDoc(docRef, profile, { merge: true });
  } catch (e) {
    console.error("Failed to save profile to Firestore", e);
  }
}

export async function deleteProfileFromFirestore(id) {
  try {
    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Failed to delete profile from Firestore", e);
  }
}
