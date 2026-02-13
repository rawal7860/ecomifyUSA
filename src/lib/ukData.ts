export interface UKCountryData {
  id: string;
  name: string;
  incorporationFee: number; // In GBP
  confirmationStatementFee: number; // In GBP
  vatThreshold: string;
  currency: "GBP";
}

// Authentic data from UK Companies House
export const ukData: Record<string, UKCountryData> = {
  ENG: {
    id: "ENG",
    name: "England",
    incorporationFee: 100,
    confirmationStatementFee: 50,
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  SCT: {
    id: "SCT",
    name: "Scotland",
    incorporationFee: 100,
    confirmationStatementFee: 50,
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  WLS: {
    id: "WLS",
    name: "Wales",
    incorporationFee: 100,
    confirmationStatementFee: 50,
    vatThreshold: "£90,000",
    currency: "GBP"
  },
  NIR: {
    id: "NIR",
    name: "Northern Ireland",
    incorporationFee: 100,
    confirmationStatementFee: 50,
    vatThreshold: "£90,000",
    currency: "GBP"
  }
};

// Current GBP to USD exchange rate (update as needed)
export const GBP_TO_USD = 1.27;

export function convertGBPtoUSD(gbp: number): number {
  return Math.round(gbp * GBP_TO_USD);
}