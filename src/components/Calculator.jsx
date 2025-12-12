// src/components/Calculator.jsx
import { useState } from "react";
import { calculateAllNumbers } from "../core/numerology.js";
import { createProfile } from "../models/profile.js";
import { generatePrediction } from "../core/predictions.js";
import { calculatePersonalYearAnalysis } from "../core/personalYear.js";
import { PALMISTRY_ANALYSIS_TEMPLATE } from "../templates/palmistryTemplate.js";

function getCombinationTemplate(predictionTemplates, core) {
  if (!predictionTemplates?.combinations || !core) return null;
  const key = `M${core.mulyank}-B${core.bhagyank}-J${core.jeevank}`;
  return predictionTemplates.combinations[key] || null;
}

function Calculator({ onProfileSaved, predictionTemplates }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);

  const [templatePrediction, setTemplatePrediction] = useState("");
  const [combinationPrediction, setCombinationPrediction] = useState("");
  const [personalYearResult, setPersonalYearResult] = useState(null);

  const [profileNotes, setProfileNotes] = useState("");
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const [personalYearTarget, setPersonalYearTarget] = useState(
    String(currentYear)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    if (!trimmedName || !dob) {
      setResult(null);
      setTemplatePrediction("");
      setCombinationPrediction("");
      setPersonalYearResult(null);
      setProfileNotes("");
      setError("Please enter both name and date of birth.");
      return;
    }

    const numbers = calculateAllNumbers(trimmedName, dob);
    if (!numbers || !numbers.core) {
      setResult(null);
      setTemplatePrediction("");
      setCombinationPrediction("");
      setPersonalYearResult(null);
      setProfileNotes("");
      setError("Invalid date of birth.");
      return;
    }

    const core = numbers.core;

    // 1) Number-based prediction from templates (Mulyank + Bhagyank + Jeevank)
    const singlePrediction = generatePrediction(core, predictionTemplates);
    setTemplatePrediction(singlePrediction);

    // 2) Personal Year analysis
    const pyAnalysis = calculatePersonalYearAnalysis(
      core,
      Number(personalYearTarget) || currentYear
    );
    setPersonalYearResult(pyAnalysis);

    // 3) Combination template (if defined)
    const combTemplate = getCombinationTemplate(predictionTemplates, core);
    setCombinationPrediction(combTemplate || "");

    // Attach personal year into numbers.cycles to store in profile
    const numbersWithCycles = {
      ...numbers,
      cycles: {
        ...(numbers.cycles || {}),
        personalYear: pyAnalysis || null,
      },
    };

    setResult({ numbers: numbersWithCycles, name: trimmedName, dob });
    setProfileNotes("");
  };

  const handleSaveProfile = () => {
    if (!result) return;

    const { name: profileName, dob: profileDob, numbers } = result;

    // Create a combined prediction text that captures what was shown
    const pieces = [];

    if (templatePrediction) {
      pieces.push("Number-based prediction:\n" + templatePrediction);
    }
    if (combinationPrediction) {
      pieces.push("Combination analysis:\n" + combinationPrediction);
    }
    if (personalYearResult?.prediction) {
      pieces.push(
        `Personal Year ${personalYearResult.personalYear} (${personalYearResult.year}):\n` +
          personalYearResult.prediction
      );
    }
    const combinedPredictionText = pieces.join("\n\n");

    const profile = createProfile({
      name: profileName,
      dob: profileDob,
      numbers,
      predictionText: combinedPredictionText,
      notes: profileNotes,
    });

    onProfileSaved(profile);
    alert("Profile saved.");
  };

  const core = result?.numbers?.core;

  return (
    <section className="card">
      <h2>Calculator</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="py-year">Personal Year for year</label>
          <input
            id="py-year"
            type="number"
            value={personalYearTarget}
            onChange={(e) => setPersonalYearTarget(e.target.value)}
            placeholder="e.g. 2025"
          />
        </div>

        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {core && (
        <div className="result">
          <h3>Results</h3>
          <p>
            <strong>Mulyank:</strong> {core.mulyank}
          </p>
          <p>
            <strong>Jeevank:</strong> {core.jeevank}
          </p>
          <p>
            <strong>Bhagyank:</strong> {core.bhagyank}
          </p>
          <p>
            <strong>Namank:</strong> {core.namank ?? "-"}
          </p>
          <p>
            <strong>Rashi:</strong> {core.rashi ?? "-"}
          </p>

          {/* 1) Number-based prediction */}
          {templatePrediction && (
            <>
              <h4 style={{ marginTop: "0.75rem" }}>Number-based prediction</h4>
              <p style={{ whiteSpace: "pre-line" }}>{templatePrediction}</p>
            </>
          )}

          {/* 2) Combination analysis from templates */}
          {combinationPrediction && (
            <>
              <h4 style={{ marginTop: "0.5rem" }}>Combination analysis</h4>
              <p style={{ whiteSpace: "pre-line" }}>{combinationPrediction}</p>
            </>
          )}

          {/* 3) Personal Year block with auto prediction (read-only) */}
          {personalYearResult && (
            <>
              <h4 style={{ marginTop: "0.75rem" }}>Personal Year</h4>
              <p>
                <strong>Year analysed:</strong> {personalYearResult.year}
              </p>
              <p>
                <strong>Personal Year No.:</strong>{" "}
                {personalYearResult.personalYear}
              </p>
              <p>
                <strong>Intensity:</strong> {personalYearResult.label} (
                {personalYearResult.hindiLabel})
              </p>
              <p className="muted">
                {personalYearResult.difficultyDescription}
              </p>
              {personalYearResult.prediction && (
                <p style={{ whiteSpace: "pre-line" }}>
                  <strong>Personal Year trend:</strong>{" "}
                  {personalYearResult.prediction}
                </p>
              )}
            </>
          )}

          {/* Notes field (free-form) */}
          <div className="form-row" style={{ marginTop: "0.75rem" }}>
            <label htmlFor="profile-notes">Notes for this profile</label>
            <textarea
              id="profile-notes"
              value={profileNotes}
              onChange={(e) => setProfileNotes(e.target.value)}
              rows={3}
              placeholder="Any specific information, events, remedies, or observations for this person."
            />
          </div>

          <button
            type="button"
            className="secondary"
            onClick={handleSaveProfile}
          >
            Save as Profile
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() =>
              setProfileNotes(
                (prev) =>
                  (prev ? prev + "\n\n" : "") + PALMISTRY_ANALYSIS_TEMPLATE
              )
            }
          >
            Insert Palmistry Template
          </button>
        </div>
      )}
    </section>
  );
}

export default Calculator;
