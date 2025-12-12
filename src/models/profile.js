// src/models/profile.js

export function createProfile({ name, dob, numbers, predictionText = "", notes = "" }) {
  const now = new Date().toISOString();

  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : "profile-" + Date.now() + "-" + Math.random().toString(16).slice(2);

  return {
    id,
    name,
    dob,
    numbers,
    predictionText,
    notes,

    // NEW: "Want to know more?" expandable data
    more: {
      palmImages: [], // array of { id, dataUrl, addedAt }
      palmNotes: ""   // long text
    },

    combinationAnalyses: [],
    createdAt: now,
    updatedAt: now,
    version: 1
  };
}
