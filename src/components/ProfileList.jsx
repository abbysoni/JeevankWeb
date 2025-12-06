// src/components/ProfilesList.jsx

function ProfilesList({ profiles, onSelectProfile }) {
  return (
    <section className="card">
      <h2>Saved Profiles</h2>

      {profiles.length === 0 ? (
        <p className="muted">
          No profiles saved yet. Calculate and save a profile to see it here.
        </p>
      ) : (
        <ul className="profiles-list">
          {profiles.map((profile) => (
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
