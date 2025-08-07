'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SaveAnalysisModal } from '@/components/ActionModals';
import { mockPropertyData } from '@/lib/mockData';

interface PropertyAnalysisProps {
  property_id?: string;
}

// This data is now imported from mockData.ts
// const propertyAnalysisData = {
//   capex_reserve: 1560,
//   total_monthly_expenses: 1163,
//   cash_flow: {
//     net_operating_income_monthly: 1437,
//     net_operating_income_annual: 17244,
//     monthly_cash_flow: 320,
//     annual_cash_flow: 3840,
//     debt_service_coverage_ratio: 1.28,
//   },
//   return_metrics: {
//     cap_rate: 0.052,
//     cash_on_cash_return: 0.043,
//     five_year_roi: 0.412,
//     annualized_roi: 0.071,
//     internal_rate_of_return: 0.092,
//   },
//   market_data: {
//     neighborhood: 'Downtown',
//     average_price: 475000,
//     average_rent: 2550,
//     vacancy_rate: 0.04,
//     price_trends: {
//       one_year: 0.058,
//       three_year: 0.142,
//       five_year: 0.237,
//     },
//     rent_trends: {
//       one_year: 0.042,
//       three_year: 0.112,
//       five_year: 0.186,
//     },
//     predicted_appreciation: {
//       one_year: 0.045,
//       three_year: 0.12,
//       five_year: 0.18,
//       confidence: 'high',
//     },
//   },
//   ai_score: 94,
//   risk_score: 2.1,
//   opportunity_score: 8.7,
// };

const PropertyAnalysis: React.FC<PropertyAnalysisProps> = ({ property_id }) => {
  // In a real implementation, we would fetch the property data based on the property_id
  // For now, we'll use mock data
  const property = mockPropertyData;
    
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A365D]">{property.address.street}</h1>
          <p className="text-lg text-gray-600">
            {property.address.city}, {property.address.state} {property.address.zip}
          </p>
        </div>
        <div className="mt-4 flex space-x-4 md:mt-0">
          <SaveAnalysisModal buttonVariant="outline" />
          <Button variant="default">Add to Portfolio</Button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI Investment Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="relative h-16 w-16 rounded-full bg-gray-100">
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#1A365D ${property.ai_score}%, transparent 0)`,
                  }}
                >
                  <div className="h-12 w-12 rounded-full bg-white"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{property.ai_score}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Investment Quality</p>
                <p className="text-lg font-semibold text-[#1A365D]">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="relative h-16 w-16 rounded-full bg-gray-100">
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#38A169 ${(10 - property.risk_score) * 10}%, transparent 0)`,
                  }}
                >
                  <div className="h-12 w-12 rounded-full bg-white"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{property.risk_score.toFixed(1)}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Risk Level</p>
                <p className="text-lg font-semibold text-[#38A169]">Low</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Opportunity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="relative h-16 w-16 rounded-full bg-gray-100">
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#D69E2E ${property.opportunity_score * 10}%, transparent 0)`,
                  }}
                >
                  <div className="h-12 w-12 rounded-full bg-white"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{property.opportunity_score.toFixed(1)}</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Growth Potential</p>
                <p className="text-lg font-semibold text-[#D69E2E]">High</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Purchase Price</p>
                <p className="text-lg font-semibold">{formatCurrency(property.price)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
                <p className="text-lg font-semibold">{formatCurrency(property.rental_info.estimated_rent)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Expenses</p>
                <p className="text-lg font-semibold">{formatCurrency((property.expenses.property_tax + property.expenses.insurance + property.expenses.maintenance + property.expenses.property_management + property.expenses.utilities + property.expenses.hoa + property.expenses.other) / 12)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Cash Flow</p>
                <p className="text-lg font-semibold text-[#38A169]">{formatCurrency(property.cash_flow.monthly_cash_flow)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cap Rate</p>
                <p className="text-lg font-semibold">{formatPercent(property.return_metrics.cap_rate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cash on Cash Return</p>
                <p className="text-lg font-semibold">{formatPercent(property.return_metrics.cash_on_cash_return)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Neighborhood</p>
                <p className="text-lg font-semibold">{property.market_data.neighborhood}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Price</p>
                <p className="text-lg font-semibold">{formatCurrency(property.market_data.average_price)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Rent</p>
                <p className="text-lg font-semibold">{formatCurrency(property.market_data.average_rent)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Vacancy Rate</p>
                <p className="text-lg font-semibold">{formatPercent(property.market_data.vacancy_rate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">1-Year Appreciation</p>
                <p className="text-lg font-semibold">{formatPercent(property.market_data.price_trends.one_year)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Predicted 5-Year</p>
                <p className="text-lg font-semibold">{formatPercent(property.market_data.predicted_appreciation.five_year)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Income</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Rental Income</span>
                    <span>{formatCurrency(property.rental_info.estimated_rent)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Income</span>
                    <span>{formatCurrency(property.rental_info.other_income)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vacancy Loss</span>
                    <span className="text-[#E53E3E]">
                      -{formatCurrency(property.rental_info.estimated_rent * property.rental_info.vacancy_rate)}/mo
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="font-semibold">Effective Income</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        property.rental_info.estimated_rent +
                          property.rental_info.other_income -
                          property.rental_info.estimated_rent * property.rental_info.vacancy_rate
                      )}/mo
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Expenses</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Property Tax</span>
                    <span>{formatCurrency(property.expenses.property_tax / 12)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance</span>
                    <span>{formatCurrency(property.expenses.insurance / 12)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance</span>
                    <span>{formatCurrency(property.expenses.maintenance / 12)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Management</span>
                    <span>{formatCurrency(property.expenses.property_management / 12)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CapEx Reserve</span>
                    <span>{formatCurrency(property.expenses.capex_reserve / 12)}/mo</span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="font-semibold">Total Expenses</span>
                    <span className="font-semibold">{formatCurrency((property.expenses.property_tax + property.expenses.insurance + property.expenses.maintenance + property.expenses.property_management + property.expenses.utilities + property.expenses.hoa + property.expenses.other + property.expenses.capex_reserve) / 12)}/mo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-gray-100 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Net Operating Income</p>
                  <p className="text-lg font-semibold">{formatCurrency(property.cash_flow.net_operating_income_monthly)}/mo</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mortgage Payment</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(property.cash_flow.net_operating_income_monthly - property.cash_flow.monthly_cash_flow)}/mo
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Cash Flow</p>
                  <p className="text-lg font-semibold text-[#38A169]">
                    {formatCurrency(property.cash_flow.monthly_cash_flow)}/mo
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Return on Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Cap Rate</p>
                <p className="text-2xl font-semibold">{formatPercent(property.return_metrics.cap_rate)}</p>
                <p className="text-xs text-gray-500">vs. {formatPercent(0.045)} Market Average</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cash on Cash Return</p>
                <p className="text-2xl font-semibold">{formatPercent(property.return_metrics.cash_on_cash_return)}</p>
                <p className="text-xs text-gray-500">vs. {formatPercent(0.035)} Market Average</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">5-Year ROI</p>
                <p className="text-2xl font-semibold">{formatPercent(property.return_metrics.five_year_roi)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">IRR (Internal Rate of Return)</p>
                <p className="text-2xl font-semibold">{formatPercent(property.return_metrics.internal_rate_of_return)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-[#38A169] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Strong cash flow potential</p>
                  <p className="text-sm text-gray-600">
                    This property's cash flow is 15% above neighborhood average, indicating strong rental demand.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-[#38A169] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Favorable market trends</p>
                  <p className="text-sm text-gray-600">
                    The Downtown neighborhood has shown consistent appreciation over the past 5 years, with strong
                    predicted growth.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-[#D69E2E] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Consider property upgrades</p>
                  <p className="text-sm text-gray-600">
                    Minor kitchen and bathroom upgrades could increase rental income by an estimated 8-10%.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-[#6B46C1] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Refinance opportunity</p>
                  <p className="text-sm text-gray-600">
                    Current interest rates are 0.5% lower than your mortgage rate. Refinancing could save approximately
                    $150/month.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparable Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-16 w-16 flex-shrink-0 bg-gray-200"></div>
                <div className="ml-4">
                  <p className="font-medium">125 Oak St</p>
                  <p className="text-sm text-gray-600">Anytown, CA 90210</p>
                  <div className="mt-1 flex items-center space-x-4 text-sm">
                    <span>{formatCurrency(465000)}</span>
                    <span>3 bed, 2 bath</span>
                    <span>1920 sqft</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-16 w-16 flex-shrink-0 bg-gray-200"></div>
                <div className="ml-4">
                  <p className="font-medium">221 Pine Ave</p>
                  <p className="text-sm text-gray-600">Anytown, CA 90210</p>
                  <div className="mt-1 flex items-center space-x-4 text-sm">
                    <span>{formatCurrency(442000)}</span>
                    <span>3 bed, 2 bath</span>
                    <span>1780 sqft</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-16 w-16 flex-shrink-0 bg-gray-200"></div>
                <div className="ml-4">
                  <p className="font-medium">334 Maple Dr</p>
                  <p className="text-sm text-gray-600">Anytown, CA 90210</p>
                  <div className="mt-1 flex items-center space-x-4 text-sm">
                    <span>{formatCurrency(478000)}</span>
                    <span>4 bed, 2 bath</span>
                    <span>2100 sqft</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Comparables
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyAnalysis;