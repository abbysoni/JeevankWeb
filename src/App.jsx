// src/App.jsx
import { useEffect, useState } from "react";
import "./index.css";
import Calculator from "./components/Calculator.jsx";
import ProfilesList from "./components/ProfileList.jsx";
import ProfileDetail from "./components/ProfileDetail.jsx";
import PredictionEditor from "./components/PredictionEditor.jsx";
import { loadProfiles, saveProfiles } from "./data/storage.js";
import {
  loadPredictionTemplates,
  savePredictionTemplates
} from "./data/predictionTemplates.js";
import {
  loadPredictionTemplatesFromFirestore,
  savePredictionTemplatesToFirestore
} from "./data/predictionTemplatesRemote.js";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [predictionTemplates, setPredictionTemplates] = useState(null);

  useEffect(() => {
  const loaded = loadProfiles();
  setProfiles(loaded);

    async function initTemplates() {
    const remote = await loadPredictionTemplatesFromFirestore();
    setPredictionTemplates(remote);
    // also keep local cache updated
    savePredictionTemplates(remote);
    }

  initTemplates();
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

  const handleSaveTemplates = (updatedTemplates) => {
  setPredictionTemplates(updatedTemplates);
  savePredictionTemplates(updatedTemplates);            // local cache
  savePredictionTemplatesToFirestore(updatedTemplates); // remote sync
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
        {predictionTemplates && (
          <Calculator
            onProfileSaved={handleProfileSaved}
            predictionTemplates={predictionTemplates}
          />
        )}

        <ProfilesList profiles={profiles} onSelectProfile={handleSelectProfile} />

        {selectedProfile && (
          <ProfileDetail
            profile={selectedProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
            onClose={handleCloseDetail}
          />
        )}

        {predictionTemplates && (
          <PredictionEditor
            templates={predictionTemplates}
            onSaveTemplates={handleSaveTemplates}
          />
        )}
      </main>
    </div>
  );
}

export default App;
