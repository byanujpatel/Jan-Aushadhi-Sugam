export interface GenericMedicine {
  brandName: string;
  strength: string;
  chemicalSalt: string;
  janAushadhiName: string;
  brandedPrice: number;
  janAushadhiPrice: number;
  savingsPercentage: number;
  indications: string;
  dosageAdvice: string;
}

export const COMMON_GENERICS_DB: GenericMedicine[] = [
  {
    brandName: "Augmentin",
    strength: "625 Duo",
    chemicalSalt: "Amoxicillin 500mg + Clavulanic Acid 125mg",
    janAushadhiName: "Amoxicillin & Potassium Clavulanate IP 625mg",
    brandedPrice: 201,
    janAushadhiPrice: 60,
    savingsPercentage: 70,
    indications: "Bacterial infections in air passages, lungs, throat, and teeth.",
    dosageAdvice: "Take after meals. Do not skip doses; complete full antibiotic course."
  },
  {
    brandName: "Dolo",
    strength: "650mg",
    chemicalSalt: "Paracetamol 650mg",
    janAushadhiName: "Paracetamol Tablets IP 650mg",
    brandedPrice: 33,
    janAushadhiPrice: 11,
    savingsPercentage: 67,
    indications: "Reduces fever, mild-to-moderate body aches, cold discomforts.",
    dosageAdvice: "Take strictly as required. Keep a 4 to 6-hour gap. Do not exceed 4 tablets daily."
  },
  {
    brandName: "Pantocid",
    strength: "40mg",
    chemicalSalt: "Pantoprazole 40mg",
    janAushadhiName: "Pantoprazole Gastro-resistant Tablets IP 40mg",
    brandedPrice: 155,
    janAushadhiPrice: 28,
    savingsPercentage: 82,
    indications: "Acidity, heartburn, gastroesophageal reflux disease (GERD), and stomach ulcers.",
    dosageAdvice: "Best taken on an empty stomach 30 minutes before breakfast."
  },
  {
    brandName: "Crocin",
    strength: "500mg",
    chemicalSalt: "Paracetamol 500mg",
    janAushadhiName: "Paracetamol Tablets IP 500mg",
    brandedPrice: 25,
    janAushadhiPrice: 8,
    savingsPercentage: 68,
    indications: "General fever reducer, body aches, headaches and teething pain.",
    dosageAdvice: "Consume with water after eating. Do not double dose."
  },
  {
    brandName: "Montek-LC",
    strength: "10mg",
    chemicalSalt: "Montelukast 10mg + Levocetirizine 5mg",
    janAushadhiName: "Montelukast Sodium & Levocetirizine Hydrochloride Tablets",
    brandedPrice: 235,
    janAushadhiPrice: 48,
    savingsPercentage: 80,
    indications: "Allergies, chronic runny nose, sneezing, asthmatic congestion, and skin itching.",
    dosageAdvice: "Take daily at bedtime as it may induce mild drowsiness."
  },
  {
    brandName: "Pan-D",
    strength: "Standard",
    chemicalSalt: "Pantoprazole 40mg + Domperidone 30mg",
    janAushadhiName: "Pantoprazole Sodium & Domperidone SR Capsules",
    brandedPrice: 210,
    janAushadhiPrice: 45,
    savingsPercentage: 79,
    indications: "Severe gastric acidity, gastrointestinal bloating, acid reflux, and nausea.",
    dosageAdvice: "Swallow whole on an empty stomach in the morning. Do not chew."
  },
  {
    brandName: "Glycomet",
    strength: "500mg",
    chemicalSalt: "Metformin Hydrochloride 500mg",
    janAushadhiName: "Metformin Hydrochloride SR Tablets IP 500mg",
    brandedPrice: 65,
    janAushadhiPrice: 16,
    savingsPercentage: 75,
    indications: "Type-2 Diabetes Mellitus blood sugar regulation.",
    dosageAdvice: "Take with regular meals to minimize initial digestive system discomfort."
  },
  {
    brandName: "Becosules",
    strength: "Capsule",
    chemicalSalt: "Vitamin B-Complex with Vitamin C",
    janAushadhiName: "Vitamin B-Complex & Vitamin C Capsules",
    brandedPrice: 55,
    janAushadhiPrice: 15,
    savingsPercentage: 72,
    indications: "Mouth ulcers, physical weakness, safe dietary vitamin deficiency recovery.",
    dosageAdvice: "Take one capsule daily at lunchtime."
  },
  {
    brandName: "Lipitor",
    strength: "10mg",
    chemicalSalt: "Atorvastatin 10mg",
    janAushadhiName: "Atorvastatin Tablets IP 10mg",
    brandedPrice: 140,
    janAushadhiPrice: 25,
    savingsPercentage: 82,
    indications: "Controls high blood cholesterol and safeguards against heart attacks.",
    dosageAdvice: "Take exactly once daily at night. Restrict consuming high-saturated fat diets."
  },
  {
    brandName: "Ultracet",
    strength: "Standard",
    chemicalSalt: "Tramadol 37.5mg + Paracetamol 325mg",
    janAushadhiName: "Tramadol Hydrochloride & Paracetamol Tablets",
    brandedPrice: 240,
    janAushadhiPrice: 55,
    savingsPercentage: 77,
    indications: "Acute physical post-operative or chronic musculoskeletal back/joint pain.",
    dosageAdvice: "Strictly take under medical supervision. May induce slow reflexes or drowsiness."
  },
  {
    brandName: "Atarax",
    strength: "25mg",
    chemicalSalt: "Hydroxyzine Hydrochloride 25mg",
    janAushadhiName: "Hydroxyzine Hydrochloride Tablets IP 25mg",
    brandedPrice: 90,
    janAushadhiPrice: 22,
    savingsPercentage: 75,
    indications: "Control severe skin itchiness, hives, allergic rashes, and anxiety tension.",
    dosageAdvice: "Use as recommended. Avoid driving as it causes drowsiness."
  },
  {
    brandName: "Calpol",
    strength: "500mg",
    chemicalSalt: "Paracetamol 500mg",
    janAushadhiName: "Paracetamol Tablets IP 500mg",
    brandedPrice: 22,
    janAushadhiPrice: 8,
    savingsPercentage: 63,
    indications: "Fever management and safe mild muscular pains reliever.",
    dosageAdvice: "Administer only when needed. Maintain safe intervals of 4 hours."
  },
  {
    brandName: "Voveran",
    strength: "50mg",
    chemicalSalt: "Diclofenac Sodium 50mg",
    janAushadhiName: "Diclofenac Sodium Tablets IP 50mg",
    brandedPrice: 110,
    janAushadhiPrice: 18,
    savingsPercentage: 83,
    indications: "Reduces severe muscular inflammation, arthritis joints stiffness, and sprains.",
    dosageAdvice: "Consume only after food to shield internal stomach lining from acidity."
  },
  {
    brandName: "Amlokind",
    strength: "5mg",
    chemicalSalt: "Amlodipine 5mg",
    janAushadhiName: "Amlodipine Tablets IP 5mg",
    brandedPrice: 28,
    janAushadhiPrice: 6,
    savingsPercentage: 78,
    indications: "High blood pressure (Hypertension) management and chest pain control.",
    dosageAdvice: "Take everyday at fixed hours to preserve uniform arterial pressure."
  }
];

// Helper to look up medicines locally when offline or in low-data mode
export function localMatchMedicine(brandQuery: string): GenericMedicine | null {
  if (!brandQuery) return null;
  const q = brandQuery.toLowerCase().trim();
  
  // Try exact brand name matching
  let found = COMMON_GENERICS_DB.find(m => m.brandName.toLowerCase() === q);
  if (found) return found;

  // Try substring matching
  found = COMMON_GENERICS_DB.find(m => q.includes(m.brandName.toLowerCase()) || m.brandName.toLowerCase().includes(q));
  return found || null;
}
