export interface UKCountryData {
  id: string;
  name: string;
  formationFee: number; // GBP
  confirmationStatementFee: number; // GBP
  annualConfirmationFee: number; // GBP
  serviceFee: number; // USD
  annualFee: string; // Display string (e.g. "£50/yr")
  corporationTax: string;
  vatThreshold: string;
  currency: "GBP";
}

// Authentic data from UK Companies House
export const ukData: Record<string, UKCountryData> = {
  "ENGLAND": {
    id: "ENG",
    name: "England",
    formationFee: 100,
    confirmationStatementFee: 50,
    annualConfirmationFee: 50,
    serviceFee: 150,
    annualFee: "£50/yr",
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
    serviceFee: 150,
    annualFee: "£50/yr",
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
    serviceFee: 150,
    annualFee: "£50/yr",
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
    serviceFee: 150,
    annualFee: "£50/yr",
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