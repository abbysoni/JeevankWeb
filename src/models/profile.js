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
    numbers,          // { core: {...}, cycles?: { personalYear? } }
    predictionText,   // auto-generated combined prediction (numbers + personal year, etc.)
    notes,            // free-form profile notes from calculator
    combinationAnalyses: [],   // your existing per-profile combination notes (if already used)
    createdAt: now,
    updatedAt: now,
    version: 1
  };
}
