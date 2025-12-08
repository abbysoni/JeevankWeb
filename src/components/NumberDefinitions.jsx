// src/components/NumberDefinitions.jsx

function NumberDefinitions() {
  return (
    <section className="card" style={{ marginTop: "2rem" }}>
      <h2>Numerology Number Guide</h2>
      <p className="muted">
        This section explains how each core number in JeevankWeb is calculated and what it
        represents in Indian numerology.
      </p>

      <hr />

      <h3>Mulyank (Root Number)</h3>
      <p><strong>How it is calculated:</strong> Sum of the birth day digits (DD → D + D).  
      Reduce to a single digit unless it is 11 or 22.</p>
      <p><strong>Meaning:</strong> Represents your inborn nature, core personality layer, natural instincts, and inner behaviour.</p>

      <hr />

      <h3>Bhagyank (Destiny Number)</h3>
      <p><strong>How it is calculated:</strong> Sum of all digits in DOB (D+D+M+M+Y+Y+Y+Y).  
      Reduce to a single digit unless 11 or 22.</p>
      <p><strong>Meaning:</strong> Represents life direction, destiny, karmic journey, and overall purpose in life.</p>

      <hr />

      <h3>Jeevank (Life Path Number)</h3>
      <p><strong>How it is calculated:</strong> Sum of day + month digits (D+D + M+M).  
      Reduce to a single digit unless 11 or 22.</p>
      <p><strong>Meaning:</strong> Represents how you walk through life—your approach, style, strengths, and lessons.</p>

      <hr />

      <h3>Namank (Name Number)</h3>
      <p><strong>How it is calculated:</strong> Each letter is assigned a number based on Chaldean numerology →  
      Sum all letters → Reduce to a single digit.</p>
      <p><strong>Meaning:</strong> Represents the vibration your name produces.  
      Shows how others perceive you, social identity, public behaviour, and external personality.</p>

      <hr />

      <h3>Rashi (Moon Sign)</h3>
      <p><strong>How it is calculated:</strong> Based on day and month of birth (simplified method for quick reference).  
      Note: This is not full astrological Rashi but a numerology-based classification.</p>
      <p><strong>Meaning:</strong> Adds emotional flavour and indicates internal motivations, moods, and reactions.</p>

      <hr />

      <h3>Combination Analysis</h3>
      <p><strong>What it means:</strong> This refers to patterns observed by numerologists when certain 
      Mulyank–Bhagyank–Jeevank–Namank combinations repeat across people.</p>
      <p>
        Examples:  
        • Mulyank 1 + Bhagyank 8 combination → leadership with Saturn influence  
        • Mulyank 7 + Jeevank 2 → spiritual, intuitive, emotionally sensitive  
      </p>
      <p><strong>Purpose:</strong> The “Combination Analysis” section helps you store real-life observations for these number combinations and use them for predictions.</p>

      <hr />

      <p className="muted" style={{ fontSize: "0.9rem" }}>
        This guide will expand automatically as Version 2 (Ātma Aṅk, Prakṛiti Aṅk) and Version 3 
        (Personal Year, Month, Day cycles) are introduced.
      </p>
    </section>
  );
}

export default NumberDefinitions;
