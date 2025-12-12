import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const COL = "profiles";

export async function createProfileFirestore(profile) {
  const ref = await addDoc(collection(db, "profiles"), profile);
  return { id: ref.id, ...profile };
}


export async function fetchProfilesFirestore() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateProfileFirestore(id, updates) {
  await updateDoc(doc(db, COL, id), {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

export async function deleteProfileFirestore(id) {
  await deleteDoc(doc(db, COL, id));
}
