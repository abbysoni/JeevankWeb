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
      // 1) Load profiles from Firestore
      const remoteProfiles = await fetchProfilesFromFirestore();

      if (remoteProfiles.length > 0) {
        setProfiles(remoteProfiles);
        saveProfiles(remoteProfiles); // keep local cache in sync
      } else {
        // Firestore empty: try localStorage as migration source
        const local = loadProfiles();
        setProfiles(local);

        // Optional: push local profiles up to Firestore once
        for (const p of local) {
          // This will work best if local data already uses numbers.core;
          // otherwise, you may want to re-create/re-save them from Calculator.
          saveProfileToFirestore(p);
        }
      }

      // 2) Load prediction templates from Firestore (with local fallback)
      const templates = await loadPredictionTemplatesFromFirestore();
      setPredictionTemplates(templates);
      savePredictionTemplates(templates); // local cache
    }

    init();
  }, []);

  const handleProfileSaved = (profile) => {
    setProfiles((prev) => {
      const updated = [...prev, profile];
      saveProfiles(updated);            // local cache
      saveProfileToFirestore(profile);  // remote
      return updated;
    });
  };

  const handleSelectProfile = (id) => {
    setSelectedProfileId(id);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfiles((prev) => {
      const updated = prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p));
      saveProfiles(updated);                 // local cache
      saveProfileToFirestore(updatedProfile); // remote
      return updated;
    });
  };

  const handleDeleteProfile = (id) => {
    setProfiles((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveProfiles(updated);           // local cache
      deleteProfileFromFirestore(id);  // remote
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
    savePredictionTemplatesToFirestore(updatedTemplates);  // remote
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
