// src/components/PalmistryReport.jsx
import { useState } from "react";

function PalmistryReport() {
  const [open, setOpen] = useState(false);

  const report = `
FULL PALMISTRY REPORT
Methodology, Systematic Approach & Interpretive Framework

1. FOUNDATIONAL METHOD: HOW A READER BEGINS

Step 1 — Identify the Dominant Hand
- Dominant hand: Current life, conscious actions, how a person uses their abilities.
- Non-dominant hand: Inborn traits, subconscious tendencies, potential path.

Step 2 — Evaluate Hand Structure
Includes:
1) Hand shape
2) Finger length & proportion
3) Thumb strength
4) Hand flexibility
5) Palm texture and skin quality

Step 3 — Assess Major Lines
1) Life Line
2) Head Line
3) Heart Line
4) Fate Line (if present)

Step 4 — Assess Minor Lines
Sun Line, Mercury Line, Marriage Lines, Girdle of Venus, Via Lascivia, Travel Lines, etc.

Step 5 — Study Mounts
Mounts reveal emotional temperament, strengths, and behavioral patterns.

Step 6 — Synthesize
Combine all features, observe repeated themes, and form a coherent psychological profile and directional life analysis—not predictions.

2. HAND SHAPES & ELEMENTAL TYPES

Fire Hands (Square palm, short fingers)
- Energetic, expressive, leadership-oriented, spontaneous.
- Risks: impatience, burnout.

Earth Hands (Square palm, short fingers + thick skin)
- Practical, grounded, dependable, physically strong.
- Risks: resistance to change.

Air Hands (Rectangular palm, long fingers)
- Intellectual, communicative, analytical.
- Risks: anxiety, overthinking.

Water Hands (Rectangular palm, long fingers + soft skin)
- Emotional, intuitive, artistic, sensitive.
- Risks: mood swings, boundaries.

Interpretive Notes:
Hand type sets the baseline personality. All other features refine or contradict this baseline.

3. MAJOR LINES IN DETAIL

LIFE LINE
Note: does not predict death. It reflects vitality, physical energy, grounding, lifestyle stability.
- Long, deep: Strong constitution, steady direction.
- Short but deep: Efficient energy; not short life.
- Chained start: Sensitive childhood; early fluctuations.
- Breaks: Major transitions; transformative.
- Distant from thumb: Independence; restless spirit.

HEAD LINE
Thinking style, decision-making, intellectual strengths.
- Straight: logical, practical thinker.
- Curved: creative, intuitive reasoning.
- Steep into Luna: imagination; visionary.
Marks:
- Fork (Writer’s Fork): multiple perspectives.
- Breaks: mindset shifts; pivots; transformation.

HEART LINE
Emotional processing, attachment style, relational needs.
- Long, curved: open-hearted.
- Straight + short: reserved; analytical.
- Fork at end: balanced emotion + logic.
- Starts under Saturn: cautious love; fear of vulnerability.

FATE LINE (if present)
Career direction, life structure, purpose.
- From Moon: public/creativity/travel influence.
- From Life Line: self-made; internal drive.
- From wrist: early clarity.
- Absent: flexible, self-guided path.

4. THE MOUNTS & WHAT THEY REVEAL

Jupiter: leadership, ambition, ethics, confidence
Saturn: responsibility, realism, introspection
Apollo (Sun): creativity, charisma, recognition, aesthetics
Mercury: communication, business, adaptability
Venus: love, sensuality, warmth, vitality
Moon (Luna): imagination, emotions, spirituality
Mars (Inner/Outer): discipline + courage

Logic:
Overdeveloped = excess trait
Underdeveloped = undeveloped potential
Balanced = well-rounded

5. FINGERS, THUMB & PROPORTIONS

Long fingers: detail-oriented, patient, analytical
Short fingers: fast-thinking, big-picture, action-driven

Tips:
Pointed: intuitive
Round: adaptable
Square: organized
Spatulate: inventive

Thumb (major indicator of willpower)
- Long, flexible: will + adaptability
- Short, stiff: stubbornness
- Large lower phalange: strong desires/motivation
- Large upper phalange: reason-driven actions

6. MINOR LINES & SPECIAL MARKINGS

Sun Line: talent, recognition
Mercury Line: health, communication, business
Marriage lines: approach to intimacy (not number of marriages)
Girdle of Venus: emotional intensity/sensitivity
Via Lascivia: escapist tendencies
Travel Lines: movement/relocation
Squares/Stars/Crosses:
- Square: protection
- Star: sudden gain/disruption (context matters)
- Cross: conflict/learning

7. HAND TEXTURE, FLEXIBILITY & SKIN

Texture:
Soft: sensitive
Medium: balanced
Coarse: resilient

Flexibility:
Flexible: adaptable
Stiff: traditional

Temperature:
Warm: expressive
Cold: cautious energy exchange

8. SYNTHESIS: HOW A COMPLETE ANALYSIS IS MADE

Example:
Air hand + steep head curve + large Moon mount
→ Analytical baseline + strong imagination; creative conceptual thinker.

Strong Jupiter & Venus + deep Heart + thick Life
→ Warm charismatic leader; emotionally engaged and grounded.

Moon-origin Fate + strong Sun line
→ Career shaped by public interaction, creativity, guidance/communication.

9. REDDIT-SPECIFIC INSIGHTS (COMMON PATTERNS)
- Avoid deterministic claims; focus on tendencies/potential.
- Analyze contradictions (inner conflict).
- Compare both hands.
- Emotional themes often dominate readings (relationships, growth, trauma).

10. COMPLETE FRAMEWORK (ORDER)
1) Element type baseline
2) Mounts temperament
3) Major lines (mind/emotion/vitality/career)
4) Minor lines (nuance)
5) Structure (thumb/fingers/flexibility)
6) Blend into cohesive narrative
`.trim();

  return (
    <section className="card" style={{ marginTop: "1.5rem" }}>
      <div className="collapse-header">
        <h2 style={{ margin: 0 }}>Palmistry Report</h2>
        <button
          type="button"
          className="secondary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open && (
        <div className="collapse-body" style={{ marginTop: "0.75rem" }}>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{report}</pre>
        </div>
      )}
    </section>
  );
}

export default PalmistryReport;
