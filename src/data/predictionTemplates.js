// src/data/predictionTemplates.js

const STORAGE_KEY = "jeevank_prediction_templates";

const defaultPredictionTemplates = {
  mulyank: {
    1: "Mulyank 1: Leadership, initiative, strong individuality.",
    2: "Mulyank 2: Cooperation, sensitivity, partnerships.",
    3: "Mulyank 3: Creativity, communication, expression.",
    4: "Mulyank 4: Stability, discipline, practical work.",
    5: "Mulyank 5: Change, freedom, travel, adaptability.",
    6: "Mulyank 6: Responsibility, family, caretaking.",
    7: "Mulyank 7: Analysis, spirituality, research, depth.",
    8: "Mulyank 8: Power, material success, management.",
    9: "Mulyank 9: Service, compassion, completion."
  },
  bhagyank: {
    1: "Bhagyank 1: Path of leadership and self-driven success.",
    2: "Bhagyank 2: Path of support roles, diplomacy, and harmony.",
    3: "Bhagyank 3: Path of teaching, arts, and public-facing roles.",
    4: "Bhagyank 4: Path of hard work, systems, and order.",
    5: "Bhagyank 5: Path of change, business, travel, and variety.",
    6: "Bhagyank 6: Path of family, responsibility, and nurturing.",
    7: "Bhagyank 7: Path of study, introspection, and inner growth.",
    8: "Bhagyank 8: Path of authority, finance, and large responsibility.",
    9: "Bhagyank 9: Path of service, healing, and completing karmic duties."
  },
  jeevank: {
    1: "Jeevank 1: Lives with directness, takes initiative in daily life.",
    2: "Jeevank 2: Lives through cooperation and emotional exchanges.",
    3: "Jeevank 3: Lives with optimism, social energy, and ideas.",
    4: "Jeevank 4: Lives in a structured, planned, and disciplined way.",
    5: "Jeevank 5: Lives dynamically with change and movement.",
    6: "Jeevank 6: Lives around responsibility, family, and care.",
    7: "Jeevank 7: Lives inwardly, reflective, prefers depth over speed.",
    8: "Jeevank 8: Lives with focus on results, status, and outcomes.",
    9: "Jeevank 9: Lives through compassion, giving, and closure."
  }
};

export function loadPredictionTemplates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPredictionTemplates;

    const parsed = JSON.parse(raw);
    // Merge with defaults to avoid missing keys
    return {
      mulyank: {
        ...defaultPredictionTemplates.mulyank,
        ...(parsed.mulyank || {})
      },
      bhagyank: {
        ...defaultPredictionTemplates.bhagyank,
        ...(parsed.bhagyank || {})
      },
      jeevank: {
        ...defaultPredictionTemplates.jeevank,
        ...(parsed.jeevank || {})
      }
    };
  } catch (e) {
    console.error("Failed to load prediction templates", e);
    return defaultPredictionTemplates;
  }
}

export function savePredictionTemplates(templates) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (e) {
    console.error("Failed to save prediction templates", e);
  }
}
