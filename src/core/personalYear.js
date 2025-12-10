// src/core/personalYear.js

// Helper: reduce any number to a single digit (1–9)
function reduceToSingleDigit(n) {
  n = Math.abs(Number(n) || 0);
  while (n > 9) {
    let sum = 0;
    for (const ch of String(n)) {
      sum += Number(ch) || 0;
    }
    n = sum;
  }
  return n;
}

// Base difficulty per Personal Year
// 0 = easy, 1 = mildly challenging, 2 = hard, clamped to 3 after moolank/destiny adjustments
const BASE_DIFFICULTY = {
  1: 0,
  2: 1,
  3: 0,
  4: 1,
  5: 1,
  6: 1,
  7: 2,
  8: 2,
  9: 2
};

// Personal year sensitivity by Moolank (Mulyank)
const MOOLANK_BAD_YEARS = {
  1: [6, 9],
  2: [4, 7, 8],
  3: [5, 7],
  4: [3, 8],
  5: [2, 6],
  6: [5, 7, 9],
  7: [2, 6, 8, 9],
  8: [2, 3, 5],
  9: [2, 7, 9]
};

// Personal year sensitivity by Destiny (Bhagyank)
const DESTINY_BAD_YEARS = {
  1: [2, 7],
  2: [4, 7, 8],
  3: [5, 7],
  4: [5, 8],
  5: [2, 6],
  6: [5, 7, 9],
  7: [2, 6, 8, 9],
  8: [2, 5],
  9: [7, 9]
};

// Difficulty labels
const DIFFICULTY_LABELS = {
  0: {
    label: "Easy / Supportive Year",
    hindi: "सहायक और हल्का वर्ष",
    description:
      "ऊर्जा अपेक्षाकृत हल्की और सपोर्टिव रहती है। सामान्य प्रगति, कम टकराव और बेहतर फ्लो देखने को मिलता है।"
  },
  1: {
    label: "Mixed / Mildly Challenging Year",
    hindi: "मिश्रित, हल्की चुनौतियों वाला वर्ष",
    description:
      "काफी चीज़ें सामान्य रहती हैं, लेकिन कुछ क्षेत्रों में भावनात्मक या प्रैक्टिकल दबाव महसूस हो सकता है। संतुलित फैसले महत्वपूर्ण हैं।"
  },
  2: {
    label: "Hard / High-Learning Year",
    hindi: "कठिन, सीखों से भरा वर्ष",
    description:
      "स्थितियाँ व्यक्ति को grow होने के लिए push करती हैं। मेहनत, patience और acceptance से गहरी सीखें और maturity आती है।"
  },
  3: {
    label: "Very Hard / Karmic Test Year",
    hindi: "बहुत कठिन, कर्मिक परीक्षा वाला वर्ष",
    description:
      "यह समय karmic tests और heavy situations ला सकता है। पुराने पैटर्न और decisions की परीक्षा होती है, इसलिए calm mind और सही कर्म बहुत ज़रूरी हैं।"
  }
};

// Personal Year specific predictions (what that year tends to bring)
const PERSONAL_YEAR_PREDICTIONS = {
  1: "नया चक्र शुरू होने का वर्ष। नई शुरुआत, नए मौके और direction बदलने के अवसर मिलते हैं। पुराने बोझ छोड़कर fresh action लेने का समय होता है। छोटे-छोटे डर तोड़ने पर बड़ा फायदा दिख सकता है।",
  2: "भावनात्मक और relationship-केंद्रित वर्ष। decisions धीरे और सोच-समझकर लेने चाहिए। partnerships, collaborations और family matters पर ध्यान देना पड़ता है। inner balance बनाए रखना key होता है।",
  3: "expression, creativity और social life बढ़ाने वाला वर्ष। सीखने, सिखाने, लिखने, बोलने और presentation से growth मिलती है। overconfidence या time-waste से बचना ज़रूरी है।",
  4: "काम, discipline और foundation मजबूत करने का वर्ष। projects को structure देने, systems बनाने और मेहनत से stability लाने पर focus रहता है। shortcuts उल्टा असर कर सकते हैं।",
  5: "change, travel, experiments और risk का वर्ष। कई direction से offers और movement आ सकता है। फालतू impulsive decision से बचकर planned change अपनाना सबसे अच्छा रहता है।",
  6: "घर, परिवार, responsibility और relationships की परीक्षा वाला वर्ष। commitments, marriage, home, health और duty पर ज्यादा ध्यान देना पड़ता है। दूसरों की care और self-care के बीच balance ज़रूरी है।",
  7: "inner work, research, spirituality और self-analysis का वर्ष। outer world की बजाय inner world में movement ज़्यादा रहता है। अकेलापन नहीं, बल्कि सच में खुद को समझने का मौका मानना बेहतर रहता है।",
  8: "कर्म, money, authority और परिणामों का वर्ष। past decisions का return strongly दिख सकता है। सही approach पर reward और गलत पर strong lesson मिलता है। financial discipline और integrity critical हैं।",
  9: "completion, release और endings का वर्ष। पुरानी चीज़ें, रिश्ते, patterns और काम जो अब काम के नहीं हैं, naturally खत्म हो सकते हैं। letting go और forgiveness से अगला चक्र हल्का शुरू होता है।"
};

/**
 * Calculate personal year and difficulty score from "core" numbers.
 * core must contain:
 *   mulyank (Moolank)
 *   bhagyank (Destiny)
 *   rawDay
 *   rawMonth
 */
export function calculatePersonalYearAnalysis(core, targetYear) {
  if (!core || !core.rawDay || !core.rawMonth || !targetYear) return null;

  const yearNum = Number(targetYear);
  if (!yearNum || !Number.isFinite(yearNum)) return null;

  const moolank = Number(core.mulyank);
  const destiny = Number(core.bhagyank);
  if (!moolank || !destiny) return null;

  const dDigit = moolank; // already reduced
  const mDigit = reduceToSingleDigit(core.rawMonth);
  const universalYear = reduceToSingleDigit(yearNum);

  const personalYear = reduceToSingleDigit(dDigit + mDigit + universalYear);

  let base = BASE_DIFFICULTY[personalYear] ?? 0;
  let score = base;

  const badForMoolank = MOOLANK_BAD_YEARS[moolank] || [];
  const badForDestiny = DESTINY_BAD_YEARS[destiny] || [];

  if (badForMoolank.includes(personalYear)) score += 1;
  if (badForDestiny.includes(personalYear)) score += 1;

  if (score < 0) score = 0;
  if (score > 3) score = 3;

  const difficultyMeta = DIFFICULTY_LABELS[score];
  const prediction = PERSONAL_YEAR_PREDICTIONS[personalYear];

  return {
    year: yearNum,
    personalYear,
    score,
    label: difficultyMeta.label,
    hindiLabel: difficultyMeta.hindi,
    difficultyDescription: difficultyMeta.description,
    prediction // main Personal Year prediction text
  };
}
