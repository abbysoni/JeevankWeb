// src/data/predictionTemplates.js

const STORAGE_KEY = "jeevank_prediction_templates";

export const defaultPredictionTemplates = {
  mulyank: {
    1: "Strong will, initiative and a natural urge to lead. Lesson: balance confidence with humility. हिंदी उद्धरण: “साहस वही है जो रास्ते बना देता है।”",
    2: "Soft, intuitive and harmony-seeking. Learns through relationships and emotional balance. हिंदी उद्धरण: “कोमलता कमजोरी नहीं, एक शक्ति है।”",
    3: "Expressive, creative and communicative. Needs focus to avoid scattering energy. हिंदी उद्धरण: “खुशियाँ बांटोगे तो और बढ़ेंगी।”",
    4: "Practical, disciplined and system-loving. Builds long-term stability. हिंदी उद्धरण: “परिश्रम कभी व्यर्थ नहीं जाता।”",
    5: "Dynamic, freedom-loving and curious. Must control impulsiveness. हिंदी उद्धरण: “परिवर्तन ही जीवन का नियम है — इसे अपनाओ।”",
    6: "Caring, responsible and family-oriented. Must avoid over-sacrifice. हिंदी उद्धरण: “जिस हृदय में करुणा है, वही वास्तव में शक्तिशाली है।”",
    7: "Deep, analytical and spiritual. Needs solitude and clarity. हिंदी उद्धरण: “सच्चाई की खोज ही वास्तविक शक्ति है।”",
    8: "Ambitious, disciplined and karmic. Learns big lessons around power and responsibility. हिंदी उद्धरण: “कर्म ही आपकी असली पहचान बनाता है।”",
    9: "Compassionate, idealistic and humanitarian. Needs to learn detachment. हिंदी उद्धरण: “जिसे त्यागना आता है, उसी के पास सबसे अधिक होता है।”"
  },

  bhagyank: {
    1: "Destiny pushes towards leadership and independence. हिंदी उद्धरण: “आत्मविश्वास ही सफलता की पहली सीढ़ी है।”",
    2: "Destiny brings cooperation, partnerships and emotional lessons. हिंदी उद्धरण: “संबंध ही जीवन की असली पूँजी हैं।”",
    3: "Destiny supports expression, teaching and upliftment. हिंदी उद्धरण: “ज्ञान बांटने से बढ़ता है।”",
    4: "Destiny shapes a life of discipline and structured growth. हिंदी उद्धरण: “धीमी चाल भी मंज़िल तक पहुँचा देती है, बस निरंतर रहो।”",
    5: "Destiny opens doors through change and adaptability. हिंदी उद्धरण: “नए रास्ते उन्हीं को मिलते हैं जो चलना जानते हैं।”",
    6: "Destiny revolves around duty, nurturing and responsibility. हिंदी उद्धरण: “सेवा ही सबसे बड़ा धर्म है।”",
    7: "Destiny demands inner growth and spiritual insight. हिंदी उद्धरण: “मन की शांति ही सबसे बड़ा धन है।”",
    8: "Destiny brings karmic tests around power, money and authority. हिंदी उद्धरण: “भाग्य नहीं, कर्म दिशा बदलते हैं।”",
    9: "Destiny moves toward service, completion and emotional maturity. हिंदी उद्धरण: “देने वाला ही सच्चा विजेता होता है।”"
  },

  jeevank: {
    1: "Walks through life with courage and decisiveness. हिंदी उद्धरण: “जो निर्णय लेता है, वही आगे बढ़ता है।”",
    2: "Lives through cooperation and emotional exchange. हिंदी उद्धरण: “मधुरता हर दरवाज़ा खोल देती है।”",
    3: "Moves with positivity, creativity and communication. हिंदी उद्धरण: “मुस्कान सबसे सुंदर आभूषण है।”",
    4: "Lives in a structured and planned manner. हिंदी उद्धरण: “अनुशासन ही सफलता की कुंजी है।”",
    5: "Lives dynamically with change and exploration. हिंदी उद्धरण: “स्वतंत्रता वही जिसे दिशा पता हो।”",
    6: "Lives around care, duty and relationship balance. हिंदी उद्धरण: “घर वही जहाँ दिल को सुकून मिले।”",
    7: "Lives with introspection and inner search. हिंदी उद्धरण: “अंतर में झाँको, उत्तर वहीं मिलेगा।”",
    8: "Lives with focus on goals and achievements. हिंदी उद्धरण: “सपने वही पूरे होते हैं जिनके लिए जागा जाता है।”",
    9: "Lives through compassion, emotion and service. हिंदी उद्धरण: “दया ही मानवता का सबसे बड़ा गुण है।”"
  }
};


export function loadPredictionTemplates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPredictionTemplates;

    const parsed = JSON.parse(raw);
    return {
      mulyank: {
        ...defaultPredictionTemplates.mulyank,
        ...(parsed.mulyank || {})
      },
      bhagyank: {
        ...defaultPredictionTemplates.bhagyank,
        ...(parsed.bhagyank || {})
      },
      jeevank: {
        ...defaultPredictionTemplates.jeevank,
        ...(parsed.jeevank || {})
      }
    };
  } catch (e) {
    console.error("Failed to load prediction templates (local)", e);
    return defaultPredictionTemplates;
  }
}

export function savePredictionTemplates(templates) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (e) {
    console.error("Failed to save prediction templates (local)", e);
  }
}
