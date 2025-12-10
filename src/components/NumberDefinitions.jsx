// src/components/NumberDefinitions.jsx
import { useState } from "react";

function NumberDefinitions() {
  const [showCalcInfo, setShowCalcInfo] = useState(false);
  const [showNumberInfo, setShowNumberInfo] = useState(false);

  return (
    <section className="card" style={{ marginTop: "2rem" }}>
      <h2>Calculations</h2>
      <p className="muted">
        Reference for how numbers are calculated and what each number represents.
      </p>

      {/* SECTION 1: HOW IT'S CALCULATED */}
      <div className="collapse-block">
        <div className="collapse-header">
          <h3>How it&apos;s calculated</h3>
          <button
            type="button"
            className="secondary"
            onClick={() => setShowCalcInfo((open) => !open)}
          >
            {showCalcInfo ? "Hide" : "Show"}
          </button>
        </div>

        {showCalcInfo && (
          <div className="collapse-body">
            <h4>Mulyank (Root Number)</h4>
            <p>
              <strong>Calculation:</strong> Day of birth → add digits (DD → D + D → 1–9).
            </p>
            <p>
              <strong>अर्थ:</strong> जन्मजात स्वभाव, हिम्मत, रिएक्शन और अंदर की मूल ऊर्जा दिखाता है।
            </p>

            <h4>Bhagyank (Destiny Number)</h4>
            <p>
              <strong>Calculation:</strong> Full DOB → D + D + M + M + Y + Y + Y + Y → 1–9.
            </p>
            <p>
              <strong>अर्थ:</strong> किस दिशा में जीवन जाएगा, किस तरह के अवसर और ज़िम्मेदारियाँ लिखी हैं, उसका रोडमैप।
            </p>

            <h4>Jeevank (Life Path Style)</h4>
            <p>
              <strong>Calculation:</strong> Day + Month → (D + D + M + M) → 1–9.
            </p>
            <p>
              <strong>अर्थ:</strong> रोज़मर्रा में व्यक्ति कैसे चलता है – फैसले, रिस्पॉन्स और काम करने की आदतें।
            </p>

            <h4>Namank (Name Number)</h4>
            <p>
              <strong>Calculation:</strong> Name letters → convert to numbers → add → 1–9.
            </p>
            <p>
              <strong>अर्थ:</strong> नाम की तरंग, पब्लिक इमेज और लोग आपको बाहर से कैसे देखते और रिसीव करते हैं।
            </p>

            <h4>Rashi (Emotional Tag)</h4>
            <p>
              <strong>Calculation:</strong> Simple mapping from day + month of birth.
            </p>
            <p>
              <strong>अर्थ:</strong> मूड, इमोशन और अंदर की प्रतिक्रिया का flavour – वही अंक दो लोगों में अलग असर दे सकता है।
            </p>

            <h4>Personal Year Number</h4>
            <p>
              <strong>Calculation:</strong> Mulyank (reduced day) + reduced month + Universal Year
              (sum of target year digits) → reduce to 1–9.
            </p>
            <p>
              <strong>अर्थ:</strong> यह अंक दिखाता है कि किसी खास वर्ष की ऊर्जा किस तरह काम करेगी –
              किस तरह के lessons, दबाव, endings या नए शुरूआत उस साल activate हो सकते हैं। कुछ वर्षों में
              प्रगति smooth रहती है, कुछ में karmic tests और inner growth पर ज्यादा ज़ोर रहता है।
            </p>

            <h4>Combination Analysis</h4>
            <p>
              <strong>Calculation:</strong> Read all together – Mulyank + Bhagyank + Jeevank + Namank
              (+ Rashi).
            </p>
            <p>
              <strong>अर्थ:</strong> जब वही कॉम्बिनेशन अलग-अलग लोगों में दिखता है तो घटनाओं और स्वभाव के
              पैटर्न को note करके अपना practical data-bank बनाया जाता है।
            </p>
          </div>
        )}
      </div>

      <hr />

      {/* SECTION 2: WHAT DOES NO. REPRESENT */}
      <div className="collapse-block">
        <div className="collapse-header">
          <h3>What does no. represent</h3>
          <button
            type="button"
            className="secondary"
            onClick={() => setShowNumberInfo((open) => !open)}
          >
            {showNumberInfo ? "Hide" : "Show"}
          </button>
        </div>

        {showNumberInfo && (
          <div className="collapse-body">
            <h4>Number 1 – सूर्य (Sun)</h4>
            <p>
              आत्मविश्वास, नेतृत्व, शुरुआत और पहचान का अंक। सही उपयोग पर व्यक्ति को आगे बढ़कर 
              फैसले लेने, टीम लीड करने और खुद का रास्ता बनाने की ताकत देता है। नकारात्मक होने पर 
              अहंकार, ज़िद और अकेलापन बढ़ सकता है।
            </p>

            <h4>Number 2 – चंद्रमा (Moon)</h4>
            <p>
              भावनाएँ, रिश्ते, softness और sensitivity का अंक। यह शांति, सहयोग और समझदारी से 
              काम करवाता है। imbalance होने पर confusion, डर, मूड स्विंग और overthinking बढ़ जाता है।
            </p>

            <h4>Number 3 – गुरू (Jupiter)</h4>
            <p>
              ज्ञान, क्रिएटिविटी, communication और teaching का अंक। ऐसे लोग बोलने, सिखाने और 
              गाइड करने में स्वाभाविक होते हैं। ज़्यादा बिखरने पर आलस, अधूरे काम और फ़ालतू खर्च बढ़ सकता है।
            </p>

            <h4>Number 4 – राहु (Order / System)</h4>
            <p>
              सिस्टम, अनुशासन, practical सोच और hard work का अंक। नींव बनाने, management और 
              details संभालने में मदद करता है। imbalance पर जिद, rigid सोच और life में ठहराव महसूस हो सकता है।
            </p>

            <h4>Number 5 – बुध (Mercury)</h4>
            <p>
              communication, travel, business, change और freedom का अंक। दिमाग तेज, networking 
              strong और adaptability अच्छी बनाता है। कंट्रोल न होने पर restlessness, risky decisions 
              और instability बढ़ सकती है।
            </p>

            <h4>Number 6 – शुक्र (Venus)</h4>
            <p>
              प्रेम, family, comfort, beauty और ज़िम्मेदारी का अंक। घर-गृहस्थी, relationships, counselling 
              और service में गहराई देता है। ज़्यादा लाद लेने पर over-care, control और चिंता बढ़ जाती है।
            </p>

            <h4>Number 7 – केतु (Spiritual / Research)</h4>
            <p>
              research, depth, spirituality और inner search का अंक। ये energy व्यक्ति को अंदर झाँकने, 
              truth खोजने और अकेले में grow होने की तरफ ले जाती है। imbalance पर isolation, doubt और 
              over-analysis हो सकता है।
            </p>

            <h4>Number 8 – शनि (Saturn)</h4>
            <p>
              कर्म, न्याय, responsibility, struggle और बड़े परिणामों का अंक। मेहनत, discipline और 
              सही समय पर reward या lesson देता है। गलत कर्मों पर strong setbacks, सही कर्मों पर 
              slow but solid success दिखाता है।
            </p>

            <h4>Number 9 – मंगल (Mars)</h4>
            <p>
              action, passion, courage, anger और completion का अंक। यह ज़ोरदार energy, fight back 
              spirit और दूसरों के लिए खड़े होने की ताकत देता है। imbalance पर गुस्सा, impulsive 
              behaviour और पुराने घावों से चिपके रहना बढ़ जाता है।
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NumberDefinitions;
