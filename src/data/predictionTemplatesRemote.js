// src/data/predictionTemplatesRemote.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { loadPredictionTemplates as loadLocalDefaults } from "./predictionTemplates.js";

// Single document location (for single user use)
const COLLECTION = "config";
const DOC_ID = "predictionTemplates";

export async function loadPredictionTemplatesFromFirestore() {
  try {
    const ref = doc(db, COLLECTION, DOC_ID);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // If nothing in Firestore, fallback to local defaults (and optionally write them once)
      const defaults = loadLocalDefaults();
      // Optionally push defaults to Firestore:
      await setDoc(ref, defaults, { merge: true });
      return defaults;
    }

    const data = snap.data();
    // You can add merge with local defaults if desired
    return data;
  } catch (e) {
    console.error("Failed to load prediction templates from Firestore", e);
    // fallback to local defaults
    return loadLocalDefaults();
  }
}

export async function savePredictionTemplatesToFirestore(templates) {
  try {
    const ref = doc(db, COLLECTION, DOC_ID);
    await setDoc(ref, templates, { merge: true });
  } catch (e) {
    console.error("Failed to save prediction templates to Firestore", e);
  }
}
