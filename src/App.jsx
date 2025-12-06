// src/App.jsx
import { useEffect, useState } from "react";
import "./index.css";
import Calculator from "./components/Calculator.jsx";
import ProfilesList from "./components/ProfileList.jsx";
import { loadProfiles, saveProfiles } from "./data/storage.js";

function App() {
  const [profiles, setProfiles] = useState([]);

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

  return (
    <div className="app-container">
      <header>
        <h1>JeevankWeb</h1>
        <p>Numerology notebook for Mulyank, Bhagyank, Jeevank and saved profiles.</p>
      </header>

      <main>
        <Calculator onProfileSaved={handleProfileSaved} />
        <ProfilesList profiles={profiles} />
      </main>
    </div>
  );
}

export default App;
