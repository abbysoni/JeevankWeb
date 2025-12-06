// src/components/ProfileDetail.jsx
import { useState, useEffect } from "react";

function ProfileDetail({ profile, onUpdateProfile, onDeleteProfile, onClose }) {
  const [predictionText, setPredictionText] = useState(profile.predictionText || "");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setPredictionText(profile.predictionText || "");
    setNoteText("");
  }, [profile.id]);

  const handleSavePrediction = () => {
    const updated = {
      ...profile,
      predictionText,
      updatedAt: new Date().toISOString()
    };
    onUpdateProfile(updated);
  };

  const handleAddNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) return;

    const newNote = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      content: trimmed
    };

    const updated = {
      ...profile,
      notes: [...(profile.notes || []), newNote],
      updatedAt: new Date().toISOString()
    };

    onUpdateProfile(updated);
    setNoteText("");
  };

  const handleDelete = () => {
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
          <button type="button" className="danger" onClick={handleDelete}>
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
      <p>
        <strong>Mulyank:</strong> {profile.numbers.mulyank}
      </p>
      <p>
        <strong>Jeevank:</strong> {profile.numbers.jeevank}
      </p>
      <p>
        <strong>Bhagyank:</strong> {profile.numbers.bhagyank}
      </p>
      <p>
        <strong>Namank:</strong> {profile.numbers.namank ?? "-"}
      </p>
      <p>
        <strong>Rashi:</strong> {profile.numbers.rashi ?? "-"}
      </p>

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

      <h3>Notes</h3>
      {(!profile.notes || profile.notes.length === 0) ? (
        <p className="muted">No notes yet. Add observations, events, or outcomes here.</p>
      ) : (
        <ul className="notes-list">
          {profile.notes.map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-meta">
                {new Date(note.createdAt).toLocaleString()}
              </div>
              <div className="note-content">{note.content}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="form-row">
        <label>Add Note</label>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={3}
          placeholder="Log events, patterns, prediction outcomes..."
        />
      </div>
      <button type="button" className="secondary" onClick={handleAddNote}>
        Add Note
      </button>
    </section>
  );
}

export default ProfileDetail;
