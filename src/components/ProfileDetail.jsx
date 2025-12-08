// src/components/ProfileDetail.jsx
import { useState, useEffect } from "react";

function ProfileDetail({ profile, onUpdateProfile, onDeleteProfile, onClose }) {
  const [predictionText, setPredictionText] = useState(profile.predictionText || "");
  const [analysisText, setAnalysisText] = useState("");

  useEffect(() => {
    setPredictionText(profile.predictionText || "");
    setAnalysisText("");
  }, [profile.id]);

  const core = profile.numbers?.core || {};

  // Fallback: if older profiles still use "notes", convert them
  const analyses =
    profile.combinationAnalyses && Array.isArray(profile.combinationAnalyses)
      ? profile.combinationAnalyses
      : profile.notes && Array.isArray(profile.notes)
      ? profile.notes
      : [];

  const handleSavePrediction = () => {
    const updated = {
      ...profile,
      predictionText,
      updatedAt: new Date().toISOString()
    };
    onUpdateProfile(updated);
  };

  const handleAddAnalysis = () => {
    const trimmed = analysisText.trim();
    if (!trimmed) return;

    const newAnalysis = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      content: trimmed,
      combination: {
        mulyank: core.mulyank ?? null,
        bhagyank: core.bhagyank ?? null,
        jeevank: core.jeevank ?? null,
        namank: core.namank ?? null,
        rashi: core.rashi ?? null
      }
    };

    const updatedAnalyses = [...analyses, newAnalysis];

    const updated = {
      ...profile,
      combinationAnalyses: updatedAnalyses,
      updatedAt: new Date().toISOString()
    };

    // Optional: keep old "notes" in sync for backwards compatibility
    // updated.notes = updatedAnalyses;

    onUpdateProfile(updated);
    setAnalysisText("");
  };

  const handleDeleteAnalysis = (analysisId) => {
    const updatedAnalyses = analyses.filter((a) => a.id !== analysisId);

    const updated = {
      ...profile,
      combinationAnalyses: updatedAnalyses,
      updatedAt: new Date().toISOString()
    };

    // Optional: keep old "notes" in sync
    // updated.notes = updatedAnalyses;

    onUpdateProfile(updated);
  };

  const handleDeleteProfileClick = () => {
    const ok = window.confirm(
      `Are you sure you want to delete the profile for "${profile.name}"?`
    );
    if (!ok) return;
    onDeleteProfile(profile.id);
  };

  return (
    <section className="card">
      <div className="detail-header">
        <h2>Profile Detail</h2>
        <div className="detail-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Close
          </button>
          <button type="button" className="danger" onClick={handleDeleteProfileClick}>
            Delete Profile
          </button>
        </div>
      </div>

      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>DOB:</strong> {profile.dob}
      </p>

      <h3>Numbers</h3>
      {core ? (
        <>
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
        </>
      ) : (
        <p className="muted">No core numbers stored for this profile.</p>
      )}

      <h3>Prediction & Analysis</h3>
      <div className="form-row">
        <textarea
          value={predictionText}
          onChange={(e) => setPredictionText(e.target.value)}
          rows={6}
        />
      </div>
      <button type="button" onClick={handleSavePrediction}>
        Save Prediction
      </button>

      <h3>Combination analysis</h3>
      {analyses.length === 0 ? (
        <p className="muted">
          No combination analysis yet. Add insights about how these numbers play out.
        </p>
      ) : (
        <ul className="notes-list">
          {analyses.map((analysis) => (
            <li key={analysis.id} className="note-item">
              <div className="note-header">
                <div className="note-meta">
                  {new Date(analysis.createdAt).toLocaleString()}
                  {analysis.combination && (
                    <>
                      {" "}
                      | Comb: M{analysis.combination.mulyank ?? "-"}
                      {" / "}B{analysis.combination.bhagyank ?? "-"}
                      {" / "}J{analysis.combination.jeevank ?? "-"}
                      {" / "}N{analysis.combination.namank ?? "-"}
                    </>
                  )}
                </div>
                <button
                  type="button"
                  className="note-delete"
                  onClick={() => handleDeleteAnalysis(analysis.id)}
                >
                  Delete
                </button>
              </div>
              <div className="note-content">{analysis.content}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="form-row">
        <label>Add Combination analysis</label>
        <textarea
          value={analysisText}
          onChange={(e) => setAnalysisText(e.target.value)}
          rows={3}
          placeholder="Describe how this combination behaves, events, outcomes, patterns..."
        />
      </div>
      <button type="button" className="secondary" onClick={handleAddAnalysis}>
        Add Combination analysis
      </button>
    </section>
  );
}

export default ProfileDetail;
