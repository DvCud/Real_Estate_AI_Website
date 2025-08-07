/**
 * Mock data for the Real Estate AI Investment Platform
 */

export const mockProperties = [
  {
    property_id: 'prop_12345',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '90210',
    },
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1850,
    financial_summary: {
      cap_rate: 0.052,
      cash_flow: 320,
      cash_on_cash_return: 0.043,
    },
    ai_score: 94,
  },
  {
    property_id: 'prop_23456',
    address: {
      street: '456 Oak Ave',
      city: 'Anytown',
      state: 'CA',
      zip: '90210',
    },
    price: 325000,
    bedrooms: 2,
    bathrooms: 1,
    square_feet: 1200,
    financial_summary: {
      cap_rate: 0.078,
      cash_flow: 450,
      cash_on_cash_return: 0.065,
    },
    ai_score: 91,
  },
  {
    property_id: 'prop_34567',
    address: {
      street: '789 Pine St',
      city: 'Anytown',
      state: 'CA',
      zip: '90210',
    },
    price: 550000,
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2400,
    financial_summary: {
      cap_rate: 0.048,
      cash_flow: 280,
      cash_on_cash_return: 0.038,
    },
    ai_score: 87,
  },
];

export const mockPropertyData = {
  property_id: 'prop_12345',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '90210',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  property_type: 'single_family',
  price: 450000,
  bedrooms: 3,
  bathrooms: 2,
  square_feet: 1850,
  year_built: 1985,
  lot_size: 0.25,
  purchase_info: {
    asking_price: 450000,
    estimated_market_value: 465000,
    estimated_rehab_cost: 15000,
    closing_costs: 4500,
    down_payment_percent: 0.2,
    loan_interest_rate: 0.0425,
    loan_term_years: 30,
    purchase_closing_date: '2023-07-15',
  },
  rental_info: {
    estimated_rent: 2600,
    other_income: 0,
    vacancy_rate: 0.05,
    management_fee_percent: 0.08,
  },
  expenses: {
    property_tax: 5400,
    insurance: 1800,
    maintenance: 2700,
    property_management: 2496,
    utilities: 0,
    hoa: 0,
    other: 0,
    capex_reserve: 1560,
  },
  ai_score: 94,
  risk_score: 2.1,
  opportunity_score: 8.7,
  cash_flow: {
    monthly_cash_flow: 320,
    annual_cash_flow: 3840,
    net_operating_income_monthly: 1437,
    net_operating_income_annual: 17244,
    debt_service_coverage_ratio: 1.28,
  },
  return_metrics: {
    cap_rate: 0.052,
    cash_on_cash_return: 0.043,
    five_year_roi: 0.412,
    annualized_roi: 0.071,
    internal_rate_of_return: 0.092,
  },
  market_data: {
    neighborhood: 'Downtown',
    average_price: 475000,
    average_rent: 2550,
    vacancy_rate: 0.04,
    price_trends: {
      one_year: 0.058,
      three_year: 0.142,
      five_year: 0.237,
    },
    rent_trends: {
      one_year: 0.042,
      three_year: 0.112,
      five_year: 0.186,
    },
    predicted_appreciation: {
      one_year: 0.045,
      three_year: 0.12,
      five_year: 0.18,
      confidence: 'high',
    }
  }
};

export type Property = typeof mockProperties[0];
export type PropertyDetail = typeof mockPropertyData;