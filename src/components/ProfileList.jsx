// src/components/ProfilesList.jsx
import { useState, useMemo } from "react";

function ProfilesList({ profiles, onSelectProfile }) {
  const [search, setSearch] = useState("");

  const filteredProfiles = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return profiles;

    return profiles.filter((profile) => {
      const name = (profile.name || "").toLowerCase();
      const dob = (profile.dob || "").toLowerCase();

      const nums = [
        profile.numbers?.mulyank,
        profile.numbers?.bhagyank,
        profile.numbers?.jeevank
      ]
        .filter((n) => n !== null && n !== undefined)
        .join(" ");

      const numsStr = String(nums).toLowerCase();

      return (
        name.includes(term) ||
        dob.includes(term) ||
        numsStr.includes(term)
      );
    });
  }, [search, profiles]);

  return (
    <section className="card">
      <h2>Saved Profiles</h2>

      <div className="search-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, DOB, or number (e.g. 5)"
        />
      </div>

      {profiles.length === 0 ? (
        <p className="muted">
          No profiles saved yet. Calculate and save a profile to see it here.
        </p>
      ) : filteredProfiles.length === 0 ? (
        <p className="muted">No profiles match this search.</p>
      ) : (
        <ul className="profiles-list">
          {filteredProfiles.map((profile) => (
            <li
              key={profile.id}
              className="profile-item clickable"
              onClick={() => onSelectProfile(profile.id)}
            >
              <div className="profile-item-title">{profile.name}</div>
              <div className="profile-item-meta">
                DOB: {profile.dob} | Mulyank: {profile.numbers.mulyank} | Bhagyank:{" "}
                {profile.numbers.bhagyank}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProfilesList;
