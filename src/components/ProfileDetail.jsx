// src/components/ProfileDetail.jsx
import { useEffect, useState } from "react";
import { uploadPalmImage } from "../firebase/storage.js";
import { PALMISTRY_ANALYSIS_TEMPLATE } from "../templates/palmistryTemplate.js";

function ProfileDetail({ profile, onUpdateProfile, onDeleteProfile, onClose }) {
  const [predictionText, setPredictionText] = useState(
    profile.predictionText || ""
  );
  const [analysisText, setAnalysisText] = useState("");
  // const [showMore, setShowMore] = useState(false);
  const [showPalm, setShowPalm] = useState(false);
  const [palmNotes, setPalmNotes] = useState(profile.more?.palmNotes || "");
  const [palmImages, setPalmImages] = useState(profile.more?.palmImages || []);
  const [uploadingPalm, setUploadingPalm] = useState(false);

  useEffect(() => {
    setPredictionText(profile.predictionText || "");
    setAnalysisText("");
  }, [profile.id]);

  useEffect(() => {
    setShowPalm(false);
    setPalmNotes(profile.more?.palmNotes || "");
    setPalmImages(profile.more?.palmImages || []);
  }, [profile.id]);

  const core = profile.numbers?.core || {};
  const personalYear = profile.numbers?.cycles?.personalYear || null;

  const [notesText, setNotesText] = useState(profile.notes || "");
  useEffect(() => {
    setPredictionText(profile.predictionText || "");
    setAnalysisText("");
    setNotesText(profile.notes || "");
  }, [profile.id]);

  const handleSaveNotes = () => {
    const updated = {
      ...profile,
      notes: notesText,
      updatedAt: new Date().toISOString(),
    };
    onUpdateProfile(updated);
  };

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
      updatedAt: new Date().toISOString(),
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
        rashi: core.rashi ?? null,
      },
    };

    const updatedAnalyses = [...analyses, newAnalysis];

    const updated = {
      ...profile,
      combinationAnalyses: updatedAnalyses,
      updatedAt: new Date().toISOString(),
    };

    // Optional: keep old "notes" in sync for backwards compatibility
    // updated.notes = updatedAnalyses;

    onUpdateProfile(updated);
    setAnalysisText("");
  };

  const handlePalmUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadingPalm(true);
    try {
      const now = new Date().toISOString();
      const uploaded = [];

      for (const file of files) {
        const imageId =
          (crypto.randomUUID && crypto.randomUUID()) ||
          "img-" + Date.now() + "-" + Math.random().toString(16).slice(2);

        const url = await uploadPalmImage({
          profileId: profile.id,
          file,
          imageId,
        });

        uploaded.push({ id: imageId, url, createdAt: now });
      }

      const updatedImages = [...palmImages, ...uploaded];
      setPalmImages(updatedImages);

      const updatedProfile = {
        ...profile,
        more: {
          ...(profile.more || {}),
          palmImages: updatedImages,
          palmNotes,
        },
        updatedAt: new Date().toISOString(),
      };

      onUpdateProfile(updatedProfile);
      e.target.value = "";
    } catch (err) {
      console.error(err);
      alert("Palm photo upload failed.");
    } finally {
      setUploadingPalm(false);
    }
  };

  const handleDeleteAnalysis = (analysisId) => {
    const updatedAnalyses = analyses.filter((a) => a.id !== analysisId);

    const updated = {
      ...profile,
      combinationAnalyses: updatedAnalyses,
      updatedAt: new Date().toISOString(),
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

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAddPalmImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);

    try {
      const now = new Date().toISOString();
      const uploaded = [];

      for (const file of files) {
        const imageId =
          (crypto.randomUUID && crypto.randomUUID()) ||
          "img-" + Date.now() + "-" + Math.random().toString(16).slice(2);

        const url = await uploadPalmImage({
          profileId: profile.id,
          file,
          imageId,
        });

        uploaded.push({
          id: imageId,
          url,
          createdAt: now,
        });
      }

      const updatedImages = [...palmImages, ...uploaded];
      setPalmImages(updatedImages);

      const updatedProfile = {
        ...profile,
        more: {
          palmImages: updatedImages,
          palmNotes,
        },
        updatedAt: new Date().toISOString(),
      };

      onUpdateProfile(updatedProfile);
      e.target.value = "";
    } catch (err) {
      console.error(err);
      alert("Failed to upload palm image.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePalmImage = (id) => {
    const updatedImages = palmImages.filter((x) => x.id !== id);
    setPalmImages(updatedImages);

    const updatedProfile = {
      ...profile,
      more: {
        ...(profile.more || {}),
        palmImages: updatedImages,
        palmNotes,
      },
      updatedAt: new Date().toISOString(),
    };
    onUpdateProfile(updatedProfile);
  };

  const handleSavePalmNotes = () => {
    const updatedProfile = {
      ...profile,
      more: {
        ...(profile.more || {}),
        palmImages,
        palmNotes,
      },
      updatedAt: new Date().toISOString(),
    };
    onUpdateProfile(updatedProfile);
    alert("Palm notes saved.");
  };

  return (
    <section className="card">
      <div className="detail-header">
        <h2>Profile Detail</h2>
        <div className="detail-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="danger"
            onClick={handleDeleteProfileClick}
          >
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
          {/* <p>
            <strong>Rashi:</strong> {core.rashi ?? "-"}
          </p> */}

          {personalYear && (
            <>
              <h4 style={{ marginTop: "0.5rem" }}>Personal Year snapshot</h4>
              <p>
                <strong>Year:</strong> {personalYear.year}
              </p>
              <p>
                <strong>Personal Year No.:</strong> {personalYear.personalYear}
              </p>
              <p>
                <strong>Intensity:</strong> {personalYear.label} (
                {personalYear.hindiLabel})
              </p>
            </>
          )}
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
          No combination analysis yet. Add insights about how these numbers play
          out.
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

      <h3>Notes</h3>
      <div className="form-row">
        <textarea
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
          rows={3}
          placeholder="Profile-specific notes, events, timing, or guidance."
        />
      </div>
      <button type="button" className="secondary" onClick={handleSaveNotes}>
        Save Notes
      </button>

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
      <hr style={{ margin: "1.25rem 0" }} />

      <div className="collapse-block">
        <div className="collapse-header">
          <h3 style={{ margin: 0 }}>Palm Analysis</h3>
          <button
            type="button"
            className="secondary"
            onClick={() => setShowPalm((v) => !v)}
          >
            {showPalm ? "Close" : "Want Palm analysis"}
          </button>
        </div>

        {showPalm && (
          <div className="collapse-body" style={{ marginTop: "0.75rem" }}>
            <h4>Palm Photos</h4>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploadingPalm}
              onChange={handlePalmUpload}
            />
            {uploadingPalm && <p className="muted">Uploading…</p>}

            {palmImages.length > 0 && (
              <div
                style={{
                  marginTop: "0.75rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: "10px",
                }}
              >
                {palmImages.map((img) => (
                  <div key={img.id} className="card" style={{ padding: "8px" }}>
                    <img
                      src={img.url}
                      alt="Palm"
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <button
                      type="button"
                      className="secondary"
                      style={{ marginTop: "6px", width: "100%" }}
                      onClick={() => handleRemovePalmImage(img.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <hr style={{ margin: "1rem 0" }} />

            <div className="collapse-header" style={{ gap: "10px" }}>
              <h4 style={{ margin: 0 }}>Palmistry Notes</h4>
              <button
                type="button"
                className="secondary"
                onClick={handleAnalyzePalm}
              >
                Analyze
              </button>
            </div>

            <textarea
              value={palmNotes}
              onChange={(e) => setPalmNotes(e.target.value)}
              rows={8}
              placeholder="Palmistry notes will appear here..."
              style={{ marginTop: "8px" }}
            />

            <button
              type="button"
              className="secondary"
              style={{ marginTop: "8px" }}
              onClick={handleSavePalmNotes}
            >
              Save Palm Notes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfileDetail;
