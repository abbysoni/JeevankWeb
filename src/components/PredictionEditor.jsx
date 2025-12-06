// src/components/PredictionEditor.jsx
import { useState, useEffect } from "react";

const CATEGORIES = [
  { key: "mulyank", label: "Mulyank" },
  { key: "bhagyank", label: "Bhagyank" },
  { key: "jeevank", label: "Jeevank" }
];

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function PredictionEditor({ templates, onSaveTemplates }) {
  const [category, setCategory] = useState("mulyank");
  const [number, setNumber] = useState(1);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = templates?.[category]?.[number] || "";
    setText(current);
  }, [templates, category, number]);

  const handleSave = () => {
    const updated = {
      ...templates,
      [category]: {
        ...(templates[category] || {}),
        [number]: text
      }
    };
    onSaveTemplates(updated);
  };

  return (
    <section className="card">
      <h2>Prediction Templates</h2>
      <p className="muted">
        Edit the default prediction text used for Mulyank, Bhagyank, and Jeevank.
        These texts appear automatically in the calculator and can still be edited per profile.
      </p>

      <div className="form-row horizontal">
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Number</label>
          <select
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          >
            {NUMBERS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <label>Template text for this number</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
      </div>

      <button type="button" onClick={handleSave}>
        Save Template
      </button>
    </section>
  );
}

export default PredictionEditor;
