// src/components/NumberDefinitions.jsx

function NumberDefinitions() {
  return (
    <section className="card" style={{ marginTop: "2rem" }}>
      <h2>Numerology Number Guide</h2>
      <p className="muted">
        This guide explains how the main numbers in this app are calculated and how they
        influence personality, life path and real-life results in career, money,
        relationships, health and spirituality.
      </p>

      <hr />

      <h3>Mulyank (Root Number)</h3>
      <p>
        <strong>How it is calculated:</strong> Add the digits of the birth day (DD → D + D)
        until you get a single digit, keeping special master numbers like 11 or 22
        separate if you work with them.
      </p>
      <p>
        <strong>What it shows:</strong> Inborn nature and basic vibration of the person.
        Shows natural behaviour, core strengths, instinctive reactions and what kind of
        situations energise or drain the native.
      </p>

      <hr />

      <h3>Bhagyank (Destiny Number)</h3>
      <p>
        <strong>How it is calculated:</strong> Add all digits of the full date of birth
        (D + D + M + M + Y + Y + Y + Y) and reduce to a single digit (or keep 11/22 if
        used as special numbers).
      </p>
      <p>
        <strong>What it shows:</strong> Direction of life, long-term script and major
        themes written by destiny. Indicates the type of work, responsibility and public
        role that repeatedly appears across the years.
      </p>

      <hr />

      <h3>Jeevank (Life Path Style)</h3>
      <p>
        <strong>How it is calculated:</strong> Add the digits of the birth day and month
        together (D + D + M + M) and reduce to a single digit.
      </p>
      <p>
        <strong>What it shows:</strong> Day-to-day way of walking through life. Shows how
        a person approaches opportunities, challenges, relationships and decisions in
        practical life.
      </p>

      <hr />

      <h3>Namank (Name Number)</h3>
      <p>
        <strong>How it is calculated:</strong> Each letter of the name is mapped to a
        number using a numerology chart. All letter values are added and reduced to a
        single digit.
      </p>
      <p>
        <strong>What it shows:</strong> Outer image, name vibration and how the world
        responds to the person. Often used in name corrections, signatures, brands and
        business names to support the core numbers.
      </p>

      <hr />

      <h3>Rashi (Moon–Flavour Tag)</h3>
      <p>
        <strong>How it is calculated:</strong> In this app a simplified assignment is
        made from day and month of birth to give a quick emotional tag. It is not a full
        Vedic horoscope but a fast-moving indicator used with numbers.
      </p>
      <p>
        <strong>What it shows:</strong> Emotional tone, mood patterns and how the native
        processes feelings. Helps refine predictions when the same number combination
        behaves differently for different people.
      </p>

      <hr />

      <h3>Combination Analysis</h3>
      <p>
        <strong>What it is:</strong> Practical notes recorded by the practitioner when a
        certain combination of Mulyank, Bhagyank, Jeevank, Namank and Rashi appears in
        real life.
      </p>
      <p>
        <strong>How to use it:</strong> When you see the same combination repeating in
        different charts, you can compare events and personality traits and build your
        own library of tested observations. Over time this becomes a powerful reference
        for predictions, remedies and counselling.
      </p>

      <p className="muted" style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
        Future versions of this app will expand this guide to include additional
        numerology tools such as soul-level numbers and yearly or monthly cycles.
      </p>
    </section>
  );
}

export default NumberDefinitions;
