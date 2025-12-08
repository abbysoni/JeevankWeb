// src/App.jsx
import { useEffect, useState } from "react";
import "./index.css";

import Calculator from "./components/Calculator.jsx";
import ProfilesList from "./components/ProfileList.jsx";
import ProfileDetail from "./components/ProfileDetail.jsx";
import PredictionEditor from "./components/PredictionEditor.jsx";
import NumberDefinitions from "./components/NumberDefinitions.jsx";

import {
  loadPredictionTemplates,
  savePredictionTemplates
} from "./data/predictionTemplates.js";

import {
  loadPredictionTemplatesFromFirestore,
  savePredictionTemplatesToFirestore
} from "./data/predictionTemplatesRemote.js";

import {
  fetchProfilesFromFirestore,
  saveProfileToFirestore,
  deleteProfileFromFirestore
} from "./data/profilesRemote.js";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [predictionTemplates, setPredictionTemplates] = useState(null);

  useEffect(() => {
    async function init() {
      // 1) Profiles: Firestore is the single source of truth
      const remoteProfiles = await fetchProfilesFromFirestore();
      setProfiles(remoteProfiles);

      // 2) Prediction templates: Firestore + local cache
      const templates = await loadPredictionTemplatesFromFirestore();
      setPredictionTemplates(templates);
      savePredictionTemplates(templates);
    }

    init();
  }, []);

  const handleProfileSaved = (profile) => {
    setProfiles((prev) => {
      const updated = [...prev, profile];
      // Firestore persistence
      saveProfileToFirestore(profile);
      return updated;
    });
  };

  const handleSelectProfile = (id) => {
    setSelectedProfileId(id);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfiles((prev) => {
      const updated = prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p));
      saveProfileToFirestore(updatedProfile);
      return updated;
    });
  };

  const handleDeleteProfile = (id) => {
    setProfiles((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      deleteProfileFromFirestore(id);
      return updated;
    });
    setSelectedProfileId(null);
  };

  const handleCloseDetail = () => {
    setSelectedProfileId(null);
  };

  const handleSaveTemplates = (updatedTemplates) => {
    setPredictionTemplates(updatedTemplates);
    savePredictionTemplates(updatedTemplates);             // local cache
    savePredictionTemplatesToFirestore(updatedTemplates);  // Firestore
  };

  const selectedProfile =
    selectedProfileId && profiles.find((p) => p.id === selectedProfileId);

  return (
    <div className="app-container">
      <header>
        <h1>JeevankWeb</h1>
        <p>Numerology notebook for Mulyank, Bhagyank, Jeevank and combination analysis.</p>
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
        <NumberDefinitions/>
      </main>
    </div>
  );
}

export default App;
