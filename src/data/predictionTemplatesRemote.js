// src/data/predictionTemplatesRemote.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { loadPredictionTemplates, defaultPredictionTemplates } from "./predictionTemplates.js";

const COLLECTION = "config";
const DOC_ID = "predictionTemplates";

/**
 * Load templates from Firestore.
 * If not found or error, fall back to local defaults.
 */
export async function loadPredictionTemplatesFromFirestore() {
  try {
    const ref = doc(db, COLLECTION, DOC_ID);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const defaults = defaultPredictionTemplates;
      await setDoc(ref, defaults, { merge: true });
      return defaults;
    }

    const data = snap.data();
    // Merge with defaults to ensure all keys exist
    return {
      mulyank: {
        ...defaultPredictionTemplates.mulyank,
        ...(data.mulyank || {})
      },
      bhagyank: {
        ...defaultPredictionTemplates.bhagyank,
        ...(data.bhagyank || {})
      },
      jeevank: {
        ...defaultPredictionTemplates.jeevank,
        ...(data.jeevank || {})
      }
    };
  } catch (e) {
    console.error("Failed to load prediction templates from Firestore", e);
    // fallback to local cache or defaults
    return loadPredictionTemplates();
  }
}

/**
 * Save templates to Firestore.
 */
export async function savePredictionTemplatesToFirestore(templates) {
  try {
    const ref = doc(db, COLLECTION, DOC_ID);
    await setDoc(ref, templates, { merge: true });
  } catch (e) {
    console.error("Failed to save prediction templates to Firestore", e);
  }
}
