// src/models/profile.js

export function createProfile({ name, dob, numbers, predictionText = "" }) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name,
    dob,
    numbers,
    predictionText,
    notes: [],         // will be used later
    createdAt: now,
    updatedAt: now
  };
}
