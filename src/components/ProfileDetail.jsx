import { useEffect, useMemo, useState } from "react";
import { uploadPalmImage } from "../firebase/storage.js";

function ProfileDetail({ profile, onUpdateProfile }) {
  // ----------------------------
  // 1) Null-safe reads (critical)
  // ----------------------------
  const safeProfile = profile || {};
  const safeId = safeProfile.id || "";
  const safeName = safeProfile.name || "(No name)";
  const safeDob = safeProfile.dob || "-";

  const safeNumbers = safeProfile.numbers || {};
  const safeCore = safeNumbers.core || {};
  const safeCycles = safeNumbers.cycles || {};
  const safePersonalYear = safeCycles.personalYear || null;

  const safePredictionText = safeProfile.predictionText || ""; // if you store combined predictions
  const safeNotesFromDb = safeProfile.notes || "";

  const safePalm = safeProfile.palm || {};
  const safePalmNotesFromDb = safePalm.notes || "";
  const safePalmImagesFromDb = Array.isArray(safePalm.images) ? safePalm.images : [];

  // ----------------------------
  // 2) Local editable state
  // ----------------------------
  const [notes, setNotes] = useState("");
  const [showPalm, setShowPalm] = useState(false);

  const [palmNotes, setPalmNotes] = useState("");
  const [palmImages, setPalmImages] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ----------------------------
  // 3) Hydrate state on profile change
  // ----------------------------
  useEffect(() => {
    setNotes(safeNotesFromDb);
    setPalmNotes(safePalmNotesFromDb);
    setPalmImages(safePalmImagesFromDb);
    setShowPalm(false);
  }, [safeId]); // only when switching profiles

  // ----------------------------
  // 4) Helper: persist updates
  // ----------------------------
  const persistProfile = async (updates) => {
    setSaving(true);
    try {
      const merged = {
        ...safeProfile,
        ...updates,
        // keep schema stable
        numbers: updates?.numbers ?? safeProfile.numbers ?? {},
        notes: updates?.notes ?? notes,
        palm: updates?.palm ?? { images: palmImages, notes: palmNotes }
      };
      await onUpdateProfile(merged);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    await persistProfile({ notes });
  };

  const handleSavePalmNotes = async () => {
    await persistProfile({
      palm: {
        images: palmImages,
        notes: palmNotes
      }
    });
  };

  // ----------------------------
  // 5) Palm uploads (Storage -> URL -> Firestore)
  // ----------------------------
  const handlePalmUpload = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length || !safeId) return;

    setUploading(true);
    try {
      const uploaded = [];

      for (const file of files) {
        const id =
          (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) ||
          "img-" + Date.now() + "-" + Math.random().toString(16).slice(2);

        const url = await uploadPalmImage({
          profileId: safeId,
          file,
          imageId: id
        });

        uploaded.push({ id, url });
      }

      const nextImages = [...palmImages, ...uploaded];
      setPalmImages(nextImages);

      // Persist immediately so it is available across devices
      await persistProfile({
        palm: {
          images: nextImages,
          notes: palmNotes
        }
      });
    } catch (err) {
      console.error("Palm upload failed:", err);
      alert("Palm photo upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePalmImage = async (imageId) => {
    const nextImages = palmImages.filter((x) => x.id !== imageId);
    setPalmImages(nextImages);
    await persistProfile({
      palm: { images: nextImages, notes: palmNotes }
    });
  };

  // ----------------------------
  // 6) Render helpers
  // ----------------------------
  const hasCoreNumbers =
    safeCore && (safeCore.mulyank || safeCore.bhagyank || safeCore.jeevank);

  return (
    <section className="card" style={{ marginTop: "1rem" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>{safeName}</h2>
      <p className="muted" style={{ marginTop: 0 }}>
        DOB: {safeDob}
      </p>

      {/* ----------------------------
          Numbers (saved data)
         ---------------------------- */}
      <h3>Numbers</h3>
      {hasCoreNumbers ? (
        <>
          <p>
            <strong>Mulyank:</strong> {safeCore.mulyank ?? "-"}
          </p>
          <p>
            <strong>Bhagyank:</strong> {safeCore.bhagyank ?? "-"}
          </p>
          <p>
            <strong>Jeevank:</strong> {safeCore.jeevank ?? "-"}
          </p>
          <p>
            <strong>Namank:</strong> {safeCore.namank ?? "-"}
          </p>
          <p>
            <strong>Rashi:</strong> {safeCore.rashi ?? "-"}
          </p>

          {safePersonalYear && (
            <>
              <h4 style={{ marginTop: "0.75rem" }}>Personal Year (Saved)</h4>
              <p>
                <strong>Year:</strong> {safePersonalYear.year ?? "-"}
              </p>
              <p>
                <strong>Personal Year No.:</strong>{" "}
                {safePersonalYear.personalYear ?? "-"}
              </p>
              <p>
                <strong>Intensity:</strong>{" "}
                {safePersonalYear.label
                  ? `${safePersonalYear.label} (${safePersonalYear.hindiLabel || ""})`
                  : "-"}
              </p>
              {safePersonalYear.prediction && (
                <p style={{ whiteSpace: "pre-line" }}>
                  <strong>Trend:</strong> {safePersonalYear.prediction}
                </p>
              )}
            </>
          )}
        </>
      ) : (
        <p className="muted">No numbers saved for this profile.</p>
      )}

      {/* ----------------------------
          Predictions (saved data)
         ---------------------------- */}
      <h3 style={{ marginTop: "1rem" }}>Predictions</h3>
      {safePredictionText ? (
        <p style={{ whiteSpace: "pre-line" }}>{safePredictionText}</p>
      ) : (
        <p className="muted">No saved predictions for this profile.</p>
      )}

      {/* ----------------------------
          Notes (editable)
         ---------------------------- */}
      <h3 style={{ marginTop: "1rem" }}>Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        placeholder="Profile notes..."
      />
      <button type="button" className="secondary" disabled={saving} onClick={handleSaveNotes}>
        {saving ? "Saving..." : "Save Notes"}
      </button>

      <hr style={{ margin: "1.25rem 0" }} />

      {/* ----------------------------
          Palm analysis (collapsible)
         ---------------------------- */}
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
              disabled={uploading}
              onChange={(e) => handlePalmUpload(e.target.files)}
            />
            {uploading && <p className="muted">Uploading…</p>}

            {palmImages.length > 0 ? (
              <div
                style={{
                  marginTop: "0.75rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: "10px"
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
                        borderRadius: "8px"
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
            ) : (
              <p className="muted" style={{ marginTop: "0.5rem" }}>
                No palm photos uploaded yet.
              </p>
            )}

            <hr style={{ margin: "1rem 0" }} />

            <h4>Palm Notes</h4>
            <textarea
              value={palmNotes}
              onChange={(e) => setPalmNotes(e.target.value)}
              rows={6}
              placeholder="Palmistry notes..."
            />
            <button
              type="button"
              className="secondary"
              disabled={saving}
              onClick={handleSavePalmNotes}
              style={{ marginTop: "8px" }}
            >
              {saving ? "Saving..." : "Save Palm Notes"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfileDetail;
