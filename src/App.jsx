// src/App.jsx
import { useEffect, useState } from "react";
import "./index.css";
import Calculator from "./components/Calculator.jsx";
import ProfilesList from "./components/ProfileList.jsx";
import ProfileDetail from "./components/ProfileDetail.jsx";
import { loadProfiles, saveProfiles } from "./data/storage.js";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  useEffect(() => {
    const loaded = loadProfiles();
    setProfiles(loaded);
  }, []);

  const handleProfileSaved = (profile) => {
    setProfiles((prev) => {
      const updated = [...prev, profile];
      saveProfiles(updated);
      return updated;
    });
  };

  const handleSelectProfile = (id) => {
    setSelectedProfileId(id);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfiles((prev) => {
      const updated = prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p));
      saveProfiles(updated);
      return updated;
    });
  };

  const handleDeleteProfile = (id) => {
    setProfiles((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveProfiles(updated);
      return updated;
    });
    setSelectedProfileId(null);
  };

  const handleCloseDetail = () => {
    setSelectedProfileId(null);
  };

  const selectedProfile =
    selectedProfileId && profiles.find((p) => p.id === selectedProfileId);

  return (
    <div className="app-container">
      <header>
        <h1>JeevankWeb</h1>
        <p>Numerology notebook for Mulyank, Bhagyank, Jeevank and saved profiles.</p>
      </header>

      <main>
        <Calculator onProfileSaved={handleProfileSaved} />
        <ProfilesList profiles={profiles} onSelectProfile={handleSelectProfile} />
        {selectedProfile && (
          <ProfileDetail
            profile={selectedProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
            onClose={handleCloseDetail}
          />
        )}
      </main>
    </div>
  );
}

export default App;
