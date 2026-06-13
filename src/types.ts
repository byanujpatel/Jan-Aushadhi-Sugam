export interface PrescribedMedicine {
  brandName: string;
  strength: string;
  frequency?: string;
  quantity?: string;
}

export interface GenericDetails {
  brandName: string;
  strength: string;
  chemicalSalt: string;
  janAushadhiName: string;
  brandedPriceEstimate: number; // in INR
  janAushadhiPriceEstimate: number; // in INR
  savingsPercentage: number;
  inventoryStatus: "Available" | "Low Stock" | "Check Nearby";
  indications: string;
  dosageAdvice: string;
  searchSources?: { title: string; url: string }[];
}

export interface MatchResult {
  medicines: {
    prescribed: PrescribedMedicine;
    matchedGeneric?: GenericDetails;
    status: "matched" | "not_found" | "error";
    errorMsg?: string;
  }[];
  totalSavingsEstimate: {
    brandedTotal: number;
    janAushadhiTotal: number;
    pctSaved: number;
  };
}

export interface PharmacyStore {
  name: string;
  address: string;
  distance?: string; // approximate distance
  phone?: string;
  mapsUrl?: string;
}
