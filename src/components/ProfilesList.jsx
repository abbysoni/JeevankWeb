// src/components/ProfilesList.jsx
import React from "react";

function ProfilesList({ profiles, onSelect, onDelete }) {
  if (!profiles || profiles.length === 0) {
    return (
      <section className="card" style={{ marginTop: "1.25rem" }}>
        <h2>Saved Profiles</h2>
        <p className="muted">No profiles found.</p>
      </section>
    );
  }

  return (
    <section className="card" style={{ marginTop: "1.25rem" }}>
      <h2>Saved Profiles</h2>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {profiles.map((p) => (
          <li
            key={p.id}
            onClick={() => onSelect(p)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginBottom: "10px",
              cursor: "pointer"
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.name || "(No name)"}
              </div>
              <div className="muted" style={{ fontSize: "0.9rem" }}>
                DOB: {p.dob || "-"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                className="secondary"
                onClick={(e) => {
                  // prevent row click
                  e.stopPropagation();
                  onSelect(p);
                }}
              >
                Open
              </button>

              <button
                type="button"
                className="secondary"
                onClick={(e) => {
                  // prevent row click
                  e.stopPropagation();
                  const ok = window.confirm("Delete this profile?");
                  if (ok) onDelete(p.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProfilesList;
