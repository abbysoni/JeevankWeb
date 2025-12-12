import { useEffect, useState } from "react";

import Calculator from "./components/Calculator.jsx";
import ProfilesList from "./components/ProfilesList.jsx";
import ProfileDetail from "./components/ProfileDetail.jsx";
import PredictionEditor from "./components/PredictionEditor.jsx";
import NumberDefinitions from "./components/NumberDefinitions.jsx";
import PalmistryReport from "./components/PalmistryReport.jsx";

import { fetchProfilesFirestore, createProfileFirestore, updateProfileFirestore, deleteProfileFirestore } from "./firebase/profilesApi.js";
import { loadPredictionTemplates } from "./data/predictionTemplates.js";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);

  const [predictionTemplates, setPredictionTemplates] = useState(loadPredictionTemplates());
  const [loadingProfiles, setLoadingProfiles] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProfilesFirestore();
        setProfiles(data);
      } finally {
        setLoadingProfiles(false);
      }
    })();
  }, []);

  const handleSaveProfile = async (profile) => {
    const saved = await createProfileFirestore(profile);
    setProfiles((p) => [...p, saved]);
    return saved;
  };

  const handleUpdateProfile = async (profile) => {
    await updateProfileFirestore(profile.id, profile);
    setProfiles((p) => p.map((x) => (x.id === profile.id ? profile : x)));
    setActiveProfile(profile);
  };

  const handleDeleteProfile = async (id) => {
    await deleteProfileFirestore(id);
    setProfiles((p) => p.filter((x) => x.id !== id));
    if (activeProfile?.id === id) setActiveProfile(null);
  };

  return (
    <main className="container">
      <Calculator
        onProfileSaved={handleSaveProfile}
        predictionTemplates={predictionTemplates}
      />

      <section style={{ marginTop: "1rem" }}>
        {loadingProfiles ? (
          <div className="card">Loading profiles…</div>
        ) : (
          <ProfilesList profiles={profiles} onSelect={setActiveProfile} onDelete={handleDeleteProfile} />
        )}
      </section>

      {activeProfile && (
        <section style={{ marginTop: "1rem" }}>
          <ProfileDetail profile={activeProfile} onUpdateProfile={handleUpdateProfile} />
        </section>
      )}

      <PredictionEditor
        templates={predictionTemplates}
        onSaveTemplates={setPredictionTemplates}
      />

      {/* ✅ Restored bottom sections */}
      <NumberDefinitions />
      <PalmistryReport />
    </main>
  );
}

export default App;
