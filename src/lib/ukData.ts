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
// Keys match the country codes/names from the TopoJSON
export const ukData: Record<string, UKCountryData> = {
  "ENGLAND": {
    id: "ENG",
    name: "England",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    corporationTax: "19-25%",
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  "SCOTLAND": {
    id: "SCT",
    name: "Scotland",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    corporationTax: "19-25%",
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  "WALES": {
    id: "WLS",
    name: "Wales",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    corporationTax: "19-25%",
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  "NORTHERN IRELAND": {
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