// src/components/Calculator.jsx
import { useState } from "react";
import { calculateAllNumbers } from "../core/numerology.js";
import { createProfile } from "../models/profile.js";

function Calculator({ onProfileSaved }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    if (!trimmedName || !dob) {
      setError("Please enter both name and date of birth.");
      setResult(null);
      return;
    }

    const numbers = calculateAllNumbers(trimmedName, dob);
    if (!numbers) {
      setError("Invalid date of birth.");
      setResult(null);
      return;
    }

    setResult({ numbers, name: trimmedName, dob });
  };

  const handleSaveProfile = () => {
    if (!result) return;

    const { name: profileName, dob: profileDob, numbers } = result;

    const profile = createProfile({
      name: profileName,
      dob: profileDob,
      numbers,
      predictionText: ""
    });

    onProfileSaved(profile);
    alert("Profile saved.");

    // Optional: keep result, or reset
    // setResult(null);
  };

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

        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>Results</h3>
          <p>
            <strong>Mulyank:</strong> {result.numbers.mulyank}
          </p>
          <p>
            <strong>Jeevank:</strong> {result.numbers.jeevank}
          </p>
          <p>
            <strong>Bhagyank:</strong> {result.numbers.bhagyank}
          </p>
          <p>
            <strong>Namank:</strong> {result.numbers.namank ?? "-"}
          </p>
          <p>
            <strong>Rashi:</strong> {result.numbers.rashi ?? "-"}
          </p>

          <button type="button" className="secondary" onClick={handleSaveProfile}>
            Save as Profile
          </button>
        </div>
      )}
    </section>
  );
}

export default Calculator;
