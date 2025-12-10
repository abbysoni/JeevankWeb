// src/components/PredictionEditor.jsx
import { useEffect, useState } from "react";

function PredictionEditor({ templates, onSaveTemplates }) {
  const [localTemplates, setLocalTemplates] = useState(templates);

  const [selectedType, setSelectedType] = useState("mulyank");
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [singleText, setSingleText] = useState("");

  useEffect(() => {
    setLocalTemplates(templates);
  }, [templates]);

  useEffect(() => {
    const t = localTemplates?.[selectedType] || {};
    setSingleText(t[selectedNumber] || "");
  }, [selectedType, selectedNumber, localTemplates]);

  const handleSaveSingle = () => {
    setLocalTemplates((prev) => {
      const updated = {
        ...prev,
        [selectedType]: {
          ...(prev?.[selectedType] || {}),
          [selectedNumber]: singleText
        }
      };
      onSaveTemplates(updated);
      return updated;
    });
  };

  const combinations = localTemplates?.combinations || {};

  return (
    <section className="card" style={{ marginTop: "1.5rem" }}>
      <h2>Prediction Templates</h2>
      <p className="muted">
        Edit default predictions for Mulyank, Bhagyank and Jeevank. Combination analysis
        templates are shown below for reference (edit in a later version).
      </p>

      {/* Single-number templates */}
      <div className="form-row">
        <label>Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="mulyank">Mulyank</option>
          <option value="bhagyank">Bhagyank</option>
          <option value="jeevank">Jeevank</option>
        </select>
      </div>

      <div className="form-row">
        <label>Number</label>
        <select
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(Number(e.target.value))}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Template text</label>
        <textarea
          value={singleText}
          onChange={(e) => setSingleText(e.target.value)}
          rows={5}
        />
      </div>

      <button type="button" onClick={handleSaveSingle}>
        Save Number Template
      </button>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* Combination analysis templates (read-only for now) */}
      <h3>Combination Analysis Templates (Preview)</h3>
      <p className="muted">
        These templates are applied automatically when a matching Mulyank–Bhagyank–Jeevank
        combination appears. Editing will be added in Version 2.
      </p>

      {Object.keys(combinations).length === 0 ? (
        <p className="muted">No combination templates defined yet.</p>
      ) : (
        <ul className="notes-list">
          {Object.keys(combinations).map((key) => (
            <li key={key} className="note-item">
              <div className="note-header">
                <div className="note-meta">{key}</div>
              </div>
              <div className="note-content">
                {combinations[key].length > 160
                  ? combinations[key].slice(0, 160) + "..."
                  : combinations[key]}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PredictionEditor;
