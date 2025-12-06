// src/models/profile.js

export function createProfile({ name, dob, numbers, predictionText = "" }) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name,
    dob,
    // numbers is expected to already be in { core: { ... } } form
    numbers,
    predictionText,
    notes: [],
    createdAt: now,
    updatedAt: now,
    version: 1 // optional, can bump later when you add V2/V3 features
  };
}
