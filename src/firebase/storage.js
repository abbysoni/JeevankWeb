// src/firebase/storage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig.js";

export const storage = getStorage(app);

export async function uploadPalmImage({ profileId, file, imageId }) {
  const storageRef = ref(storage, `profiles/${profileId}/palms/${imageId}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
