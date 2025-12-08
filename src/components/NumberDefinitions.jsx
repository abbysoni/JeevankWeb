// src/components/NumberDefinitions.jsx

function NumberDefinitions() {
  return (
    <section className="card" style={{ marginTop: "2rem" }}>
      <h2>Number Guide</h2>
      <p className="muted">
        Quick reference for how each core number is calculated and what it signifies.
      </p>

      <hr />

      {/* Mulyank */}
      <h3>Mulyank (Root Number)</h3>
      <p>
        <strong>Calculation:</strong> Day of birth → add digits (DD → D + D → 1–9).
      </p>
      <p>
        <strong>अर्थ   :</strong> मूल्यांक व्यक्ति की जन्मजात ऊर्जा और स्वभाव दिखाता है। 
        यह बताता है कि अंदर से वह कैसा है – निर्णय कैसे लेता है, हिम्मत कितनी है, गुस्सा या 
        धैर्य कितना है, और किस प्रकार की परिस्थितियाँ उसे मजबूत या कमजोर महसूस कराती हैं। 
        यही संख्या जीवन के हर मोड़ पर उसके रिएक्शन और नेचर की जड़ मानी जाती है।
      </p>
      <p>
        <strong>  keywords:</strong> core nature, inner vibration, natural behaviour, instinct.
      </p>

      <hr />

      {/* Bhagyank */}
      <h3>Bhagyank (Destiny Number)</h3>
      <p>
        <strong>Calculation:</strong> Full DOB → D+D+M+M+Y+Y+Y+Y → 1–9.
      </p>
      <p>
        <strong>अर्थ   :</strong> भाग्यांक जीवन की बड़ी दिशा और स्क्रिप्ट दिखाता है। 
        यह बताता है कि किस तरह के काम, ज़िम्मेदारियाँ, मौके और चुनौतियाँ बार-बार जीवन में आती हैं। 
        किस प्रकार की सफलता, संघर्ष या जिम्मेदारी व्यक्ति की किस्मत में लिखी है, उसका संकेत 
        भाग्यांक से मिलता है।
      </p>
      <p>
        <strong>  keywords:</strong> life script, destiny path, long-term lessons, major themes.
      </p>

      <hr />

      {/* Jeevank */}
      <h3>Jeevank (Life Path Style)</h3>
      <p>
        <strong>Calculation:</strong> Day + Month → (D+D + M+M) → 1–9.
      </p>
      <p>
        <strong>अर्थ   :</strong> जीवनांक यह दिखाता है कि इंसान रोज़मर्रा के जीवन में कैसे चलता है। 
        अवसर आने पर क्या वह तुरंत कूद पड़ता है या पहले बहुत सोचता है, रिश्तों को कैसे संभालता है, 
        समस्या देखते ही भागता है या शांत दिमाग से हल खोजता है – यह सब जीवनांक के स्वभाव से जुड़ा होता है।
      </p>
      <p>
        <strong>  keywords:</strong> daily approach, style of action, decision pattern, response.
      </p>

      <hr />

      {/* Namank */}
      <h3>Namank (Name Number)</h3>
      <p>
        <strong>Calculation:</strong> Name letters → convert to numbers → add → 1–9.
      </p>
      <p>
        <strong>अर्थ   :</strong> नामांक व्यक्ति के नाम की तरंग दिखाता है – दुनिया उसे कैसे देखती है, 
        पहला इम्प्रेशन कैसा बनता है, और उसकी पब्लिक इमेज कैसी रहती है। कई बार अंदर से वह अलग होता है 
        लेकिन नामांक की वजह से बाहर की दुनिया उसे किसी और तरह से अनुभव करती है, इसी अंतर को समझना 
        सुधार और नाम सैटिंग में मदद करता है।
      </p>
      <p>
        <strong>  keywords:</strong> name vibration, public image, first impression, social field.
      </p>

      <hr />

      {/* Rashi */}
      <h3>Rashi (Emotional Flavour Tag)</h3>
      <p>
        <strong>Calculation:</strong> Simplified mapping from day + month of birth.
      </p>
      <p>
        <strong>अर्थ   :</strong> यहाँ राशि को तेज़ इमोशनल टैग की तरह प्रयोग किया जाता है, 
        जो दिखाता है कि व्यक्ति अंदर से भावनाओं को कैसे महसूस और व्यक्त करता है। वही अंक दो लोगों में 
        अलग व्यवहार दे सकता है, क्योंकि राशि का मूड, संवेदनशीलता और प्रतिक्रिया का तरीका बदल देता है।
      </p>
      <p>
        <strong>  keywords:</strong> emotional tone, mood pattern, inner reaction style.
      </p>

      <hr />

      {/* Combination Analysis */}
      <h3>Combination Analysis</h3>
      <p>
        <strong>Calculation:</strong> Read together – Mulyank + Bhagyank + Jeevank + Namank (+ Rashi).
      </p>
      <p>
        <strong>अर्थ   :</strong> कॉम्बिनेशन एनालिसिस वह जगह है जहाँ आप अपनी खुद की 
        ऑब्ज़र्वेशन लिखते हैं – जब एक ही अंक-संयोजन अलग-अलग लोगों की कुंडली में दिखता है, 
        तो जीवन की घटनाएँ, रिश्तों के पैटर्न, करियर के मोड़ और मानसिक स्वभाव में क्या समानता 
        या फर्क दिखा, उसे यहाँ नोट किया जाता है। समय के साथ यही व्यक्तिगत डेटा-बेस आपकी 
        भविष्यवाणी और गाइडेंस को और ज़्यादा सटीक बनाता है।
      </p>
      <p>
        <strong>  keywords:</strong> pattern library, tested observations, practical prediction base.
      </p>
    </section>
  );
}

export default NumberDefinitions;
