// src/core/predictions.js

export function generatePrediction(numbers, templates) {
  if (!numbers || !templates) return "";

  const parts = [];

  const m = numbers.mulyank;
  const b = numbers.bhagyank;
  const j = numbers.jeevank;

  const mText = templates.mulyank?.[m];
  const bText = templates.bhagyank?.[b];
  const jText = templates.jeevank?.[j];

  if (mText) {
    parts.push(`Mulyank (${m}): ${mText}`);
  }
  if (bText) {
    parts.push(`Bhagyank (${b}): ${bText}`);
  }
  if (jText) {
    parts.push(`Jeevank (${j}): ${jText}`);
  }

  return parts.join("\n\n");
}
