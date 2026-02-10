export interface StateTaxData {
  id: string; // State Code (e.g., AL, TX)
  name: string;
  formationFee: number;
  salesTax: string;
  incomeTax: string;
  franchiseTax: string;
}

export const stateData: Record<string, StateTaxData> = {
  AL: { id: "AL", name: "Alabama", formationFee: 200, salesTax: "4.00%", incomeTax: "2.00% - 5.00%", franchiseTax: "Business Privilege Tax" },
  AK: { id: "AK", name: "Alaska", formationFee: 250, salesTax: "0.00%", incomeTax: "None", franchiseTax: "None" },
  AZ: { id: "AZ", name: "Arizona", formationFee: 50, salesTax: "5.60%", incomeTax: "2.59% - 4.50%", franchiseTax: "None" },
  AR: { id: "AR", name: "Arkansas", formationFee: 45, salesTax: "6.50%", incomeTax: "2.00% - 5.50%", franchiseTax: "$150/year" },
  CA: { id: "CA", name: "California", formationFee: 70, salesTax: "7.25%", incomeTax: "1.00% - 13.30%", franchiseTax: "$800 min/year" },
  CO: { id: "CO", name: "Colorado", formationFee: 50, salesTax: "2.90%", incomeTax: "4.55%", franchiseTax: "None" },
  CT: { id: "CT", name: "Connecticut", formationFee: 120, salesTax: "6.35%", incomeTax: "3.00% - 6.99%", franchiseTax: "$250/year" },
  DE: { id: "DE", name: "Delaware", formationFee: 90, salesTax: "0.00%", incomeTax: "2.20% - 6.60%", franchiseTax: "$300/year" },
  FL: { id: "FL", name: "Florida", formationFee: 125, salesTax: "6.00%", incomeTax: "None", franchiseTax: "None" },
  GA: { id: "GA", name: "Georgia", formationFee: 100, salesTax: "4.00%", incomeTax: "1.00% - 5.75%", franchiseTax: "Net Worth Tax" },
  HI: { id: "HI", name: "Hawaii", formationFee: 50, salesTax: "4.00%", incomeTax: "1.40% - 11.00%", franchiseTax: "None" },
  ID: { id: "ID", name: "Idaho", formationFee: 100, salesTax: "6.00%", incomeTax: "1.125% - 6.925%", franchiseTax: "None" },
  IL: { id: "IL", name: "Illinois", formationFee: 150, salesTax: "6.25%", incomeTax: "4.95%", franchiseTax: "Replacement Tax" },
  IN: { id: "IN", name: "Indiana", formationFee: 95, salesTax: "7.00%", incomeTax: "3.23%", franchiseTax: "None" },
  IA: { id: "IA", name: "Iowa", formationFee: 50, salesTax: "6.00%", incomeTax: "0.33% - 8.53%", franchiseTax: "None" },
  KS: { id: "KS", name: "Kansas", formationFee: 160, salesTax: "6.50%", incomeTax: "3.10% - 5.70%", franchiseTax: "Annual Report Fee" },
  KY: { id: "KY", name: "Kentucky", formationFee: 40, salesTax: "6.00%", incomeTax: "5.00%", franchiseTax: "LLET" },
  LA: { id: "LA", name: "Louisiana", formationFee: 100, salesTax: "4.45%", incomeTax: "1.85% - 4.25%", franchiseTax: "None" },
  ME: { id: "ME", name: "Maine", formationFee: 175, salesTax: "5.50%", incomeTax: "5.80% - 7.15%", franchiseTax: "None" },
  MD: { id: "MD", name: "Maryland", formationFee: 100, salesTax: "6.00%", incomeTax: "2.00% - 5.75%", franchiseTax: "Personal Property Tax" },
  MA: { id: "MA", name: "Massachusetts", formationFee: 500, salesTax: "6.25%", incomeTax: "5.00%", franchiseTax: "$456 min/year" },
  MI: { id: "MI", name: "Michigan", formationFee: 50, salesTax: "6.00%", incomeTax: "4.25%", franchiseTax: "None" },
  MN: { id: "MN", name: "Minnesota", formationFee: 135, salesTax: "6.875%", incomeTax: "5.35% - 9.85%", franchiseTax: "None" },
  MS: { id: "MS", name: "Mississippi", formationFee: 50, salesTax: "7.00%", incomeTax: "3.00% - 5.00%", franchiseTax: "Franchise Tax" },
  MO: { id: "MO", name: "Missouri", formationFee: 50, salesTax: "4.225%", incomeTax: "1.50% - 5.40%", franchiseTax: "None" },
  MT: { id: "MT", name: "Montana", formationFee: 70, salesTax: "0.00%", incomeTax: "1.00% - 6.90%", franchiseTax: "None" },
  NE: { id: "NE", name: "Nebraska", formationFee: 100, salesTax: "5.50%", incomeTax: "2.46% - 6.84%", franchiseTax: "None" },
  NV: { id: "NV", name: "Nevada", formationFee: 425, salesTax: "6.85%", incomeTax: "None", franchiseTax: "Commerce Tax" },
  NH: { id: "NH", name: "New Hampshire", formationFee: 100, salesTax: "0.00%", incomeTax: "5.00% (Interest/Dividends)", franchiseTax: "Business Enterprise Tax" },
  NJ: { id: "NJ", name: "New Jersey", formationFee: 125, salesTax: "6.625%", incomeTax: "1.40% - 10.75%", franchiseTax: "$500 min/year" },
  NM: { id: "NM", name: "New Mexico", formationFee: 50, salesTax: "5.125%", incomeTax: "1.70% - 5.90%", franchiseTax: "$50 min/year" },
  NY: { id: "NY", name: "New York", formationFee: 200, salesTax: "4.00%", incomeTax: "4.00% - 10.90%", franchiseTax: "Annual Filing Fee" },
  NC: { id: "NC", name: "North Carolina", formationFee: 125, salesTax: "4.75%", incomeTax: "5.25%", franchiseTax: "$200 min/year" },
  ND: { id: "ND", name: "North Dakota", formationFee: 135, salesTax: "5.00%", incomeTax: "1.10% - 2.90%", franchiseTax: "$25/year" },
  OH: { id: "OH", name: "Ohio", formationFee: 99, salesTax: "5.75%", incomeTax: "0.00% - 3.99%", franchiseTax: "CAT" },
  OK: { id: "OK", name: "Oklahoma", formationFee: 100, salesTax: "4.50%", incomeTax: "0.25% - 5.00%", franchiseTax: "$25/year" },
  OR: { id: "OR", name: "Oregon", formationFee: 100, salesTax: "0.00%", incomeTax: "4.75% - 9.90%", franchiseTax: "None" },
  PA: { id: "PA", name: "Pennsylvania", formationFee: 125, salesTax: "6.00%", incomeTax: "3.07%", franchiseTax: "None" },
  RI: { id: "RI", name: "Rhode Island", formationFee: 150, salesTax: "7.00%", incomeTax: "3.75% - 5.99%", franchiseTax: "$400 min/year" },
  SC: { id: "SC", name: "South Carolina", formationFee: 110, salesTax: "6.00%", incomeTax: "0.00% - 7.00%", franchiseTax: "None" },
  SD: { id: "SD", name: "South Dakota", formationFee: 150, salesTax: "4.50%", incomeTax: "None", franchiseTax: "None" },
  TN: { id: "TN", name: "Tennessee", formationFee: 300, salesTax: "7.00%", incomeTax: "None", franchiseTax: "$300 min/year" },
  TX: { id: "TX", name: "Texas", formationFee: 300, salesTax: "6.25%", incomeTax: "None", franchiseTax: "Franchise Tax" },
  UT: { id: "UT", name: "Utah", formationFee: 70, salesTax: "4.85%", incomeTax: "4.95%", franchiseTax: "None" },
  VT: { id: "VT", name: "Vermont", formationFee: 125, salesTax: "6.00%", incomeTax: "3.35% - 8.75%", franchiseTax: "None" },
  VA: { id: "VA", name: "Virginia", formationFee: 100, salesTax: "5.30%", incomeTax: "2.00% - 5.75%", franchiseTax: "$50/year" },
  WA: { id: "WA", name: "Washington", formationFee: 200, salesTax: "6.50%", incomeTax: "None", franchiseTax: "B&O Tax" },
  WV: { id: "WV", name: "West Virginia", formationFee: 100, salesTax: "6.00%", incomeTax: "3.00% - 6.50%", franchiseTax: "None" },
  WI: { id: "WI", name: "Wisconsin", formationFee: 130, salesTax: "5.00%", incomeTax: "3.54% - 7.65%", franchiseTax: "None" },
  WY: { id: "WY", name: "Wyoming", formationFee: 100, salesTax: "4.00%", incomeTax: "None", franchiseTax: "$60 min/year" }
};