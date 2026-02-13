export interface UKCountryData {
  id: string;
  name: string;
  formationFee: number; // Renamed from incorporationFee to match component
  confirmationStatementFee: number; // In GBP
  annualConfirmationFee: number; // Added to match UKMap usage
  corporationTax: string; // Added to match UKMap usage
  vatThreshold: string;
  currency: "GBP";
}

// Authentic data from UK Companies House
// Keys match the lowercase name from TopoJSON for direct lookup
export const ukData: Record<string, UKCountryData> = {
  "england": {
    id: "ENG",
    name: "England",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    corporationTax: "19-25%",
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  "scotland": {
    id: "SCT",
    name: "Scotland",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    corporationTax: "19-25%",
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  "wales": {
    id: "WLS",
    name: "Wales",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    corporationTax: "19-25%",
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  "northern ireland": {
    id: "NIR",
    name: "Northern Ireland",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    corporationTax: "19-25%",
    vatThreshold: "£90,000",
    currency: "GBP"
  }
};

// Current GBP to USD exchange rate (update as needed)
export const GBP_TO_USD = 1.27;

export function convertGBPtoUSD(gbp: number): number {
  return Math.round(gbp * GBP_TO_USD);
}