// src/models/profile.js

export function createProfile({ name, dob, numbers, predictionText = "" }) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name,
    dob,
    numbers, // { core: { ... } } – we already adjusted this
    predictionText,
    combinationAnalyses: [],   // renamed from notes
    createdAt: now,
    updatedAt: now,
    version: 1
  };
}
