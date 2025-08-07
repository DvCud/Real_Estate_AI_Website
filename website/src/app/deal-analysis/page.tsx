'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnalyzeDealModal } from '@/components/ActionModals';

export default function DealAnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A365D] mb-2">Deal Analysis</h1>
        <p className="text-gray-600">Analyze potential real estate investments with our AI-powered tools</p>
      </div>

      {/* Property Information Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>Enter the details of the property you want to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="address">
                  Property Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="123 Main St, Austin, TX 78701"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="property-type">
                  Property Type
                </label>
                <select
                  id="property-type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select property type</option>
                  <option value="single-family">Single Family</option>
                  <option value="multi-family">Multi-Family</option>
                  <option value="condo">Condo/Townhouse</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="purchase-price">
                  Purchase Price ($)
                </label>
                <input
                  id="purchase-price"
                  type="number"
                  placeholder="450000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="down-payment">
                  Down Payment (%)
                </label>
                <input
                  id="down-payment"
                  type="number"
                  placeholder="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="interest-rate">
                  Interest Rate (%)
                </label>
                <input
                  id="interest-rate"
                  type="number"
                  step="0.01"
                  placeholder="6.25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="loan-term">
                  Loan Term (years)
                </label>
                <select
                  id="loan-term"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="30">30 years</option>
                  <option value="20">20 years</option>
                  <option value="15">15 years</option>
                  <option value="10">10 years</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="closing-costs">
                  Closing Costs ($)
                </label>
                <input
                  id="closing-costs"
                  type="number"
                  placeholder="5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="renovation-costs">
                  Renovation Costs ($)
                </label>
                <input
                  id="renovation-costs"
                  type="number"
                  placeholder="15000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="monthly-rent">
                  Expected Monthly Rent ($)
                </label>
                <input
                  id="monthly-rent"
                  type="number"
                  placeholder="2500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="vacancy-rate">
                  Vacancy Rate (%)
                </label>
                <input
                  id="vacancy-rate"
                  type="number"
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="property-management">
                  Property Management (%)
                </label>
                <input
                  id="property-management"
                  type="number"
                  placeholder="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="property-tax">
                  Annual Property Tax ($)
                </label>
                <input
                  id="property-tax"
                  type="number"
                  placeholder="5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="insurance">
                  Annual Insurance ($)
                </label>
                <input
                  id="insurance"
                  type="number"
                  placeholder="1200"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="maintenance">
                  Annual Maintenance (%)
                </label>
                <input
                  id="maintenance"
                  type="number"
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="appreciation-rate">
                  Expected Annual Appreciation (%)
                </label>
                <input
                  id="appreciation-rate"
                  type="number"
                  step="0.1"
                  placeholder="3.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="holding-period">
                  Expected Holding Period (years)
                </label>
                <input
                  id="holding-period"
                  type="number"
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">Reset</Button>
              <AnalyzeDealModal />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1A365D] mb-4">Analysis Results</h2>
        <p className="text-gray-600 mb-6">Based on the information provided, here's our comprehensive analysis of this investment opportunity.</p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Cash on Cash Return</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">7.2%</p>
              <p className="text-sm text-gray-600">Market avg: 5.8%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Cap Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">5.4%</p>
              <p className="text-sm text-gray-600">Market avg: 4.9%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Monthly Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$412</p>
              <p className="text-sm text-gray-600">Annual: $4,944</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total ROI (5 years)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">42.8%</p>
              <p className="text-sm text-gray-600">Annualized: 8.6%</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Financial Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                <p className="text-gray-500">Cash Flow Chart Placeholder</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Monthly Income</span>
                  <span className="text-sm">$2,500</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Vacancy Loss (5%)</span>
                  <span className="text-sm">-$125</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Mortgage Payment</span>
                  <span className="text-sm">-$1,642</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Property Tax</span>
                  <span className="text-sm">-$417</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Insurance</span>
                  <span className="text-sm">-$100</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Property Management (8%)</span>
                  <span className="text-sm">-$200</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Maintenance Reserve</span>
                  <span className="text-sm">-$104</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-sm font-bold">Monthly Cash Flow</span>
                  <span className="text-sm font-bold text-green-600">$412</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Return on Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                <p className="text-gray-500">ROI Chart Placeholder</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Down Payment</span>
                  <span className="text-sm">$90,000</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Closing Costs</span>
                  <span className="text-sm">$5,000</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Renovation Costs</span>
                  <span className="text-sm">$15,000</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Total Investment</span>
                  <span className="text-sm font-medium">$110,000</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">Annual Cash Flow</span>
                  <span className="text-sm text-green-600">$4,944</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-medium">5-Year Appreciation</span>
                  <span className="text-sm text-green-600">$82,974</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-sm font-bold">Total 5-Year Return</span>
                  <span className="text-sm font-bold text-green-600">$107,694 (42.8%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Investment Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-[#1A365D]">82</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Investment Score</h3>
                <p className="text-sm text-gray-600">This property scores in the top 25% of similar investments in this market</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="font-medium">Strengths</h4>
                <ul className="text-sm text-gray-600 mt-1 list-disc pl-5 space-y-1">
                  <li>Cash flow positive from day one with above-market returns</li>
                  <li>Located in a neighborhood with strong appreciation history (6.2% annually over the past 5 years)</li>
                  <li>Property taxes are lower than comparable properties in the area</li>
                  <li>High rental demand area with low vacancy rates (2.1% market average)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-1">
                <h4 className="font-medium">Considerations</h4>
                <ul className="text-sm text-gray-600 mt-1 list-disc pl-5 space-y-1">
                  <li>Property age may require increased maintenance costs in years 3-5</li>
                  <li>Interest rate is slightly above current market rates - refinancing could improve returns</li>
                  <li>New development planned nearby could temporarily impact property values</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="font-medium">Optimization Recommendations</h4>
                <ul className="text-sm text-gray-600 mt-1 list-disc pl-5 space-y-1">
                  <li>Consider negotiating purchase price down by 3-5% based on comparable sales data</li>
                  <li>Explore 15-year mortgage options - higher payment but significantly improved equity position</li>
                  <li>Renovation focus on kitchen and bathrooms could increase rental income by estimated 8-10%</li>
                  <li>Property qualifies for accelerated depreciation strategy, potentially improving tax benefits</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline">Save Analysis</Button>
              <Button>Generate Detailed Report</Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Market Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Market Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">Metric</th>
                    <th className="px-4 py-3">This Property</th>
                    <th className="px-4 py-3">Market Average</th>
                    <th className="px-4 py-3">Comparison</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Purchase Price</td>
                    <td className="px-4 py-3">$450,000</td>
                    <td className="px-4 py-3">$475,000</td>
                    <td className="px-4 py-3 text-green-600">5.3% below market</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Price per Sq Ft</td>
                    <td className="px-4 py-3">$225</td>
                    <td className="px-4 py-3">$238</td>
                    <td className="px-4 py-3 text-green-600">5.5% below market</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Rent</td>
                    <td className="px-4 py-3">$2,500</td>
                    <td className="px-4 py-3">$2,400</td>
                    <td className="px-4 py-3 text-green-600">4.2% above market</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Cap Rate</td>
                    <td className="px-4 py-3">5.4%</td>
                    <td className="px-4 py-3">4.9%</td>
                    <td className="px-4 py-3 text-green-600">10.2% above market</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Cash on Cash Return</td>
                    <td className="px-4 py-3">7.2%</td>
                    <td className="px-4 py-3">5.8%</td>
                    <td className="px-4 py-3 text-green-600">24.1% above market</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Price to Rent Ratio</td>
                    <td className="px-4 py-3">15.0</td>
                    <td className="px-4 py-3">16.5</td>
                    <td className="px-4 py-3 text-green-600">9.1% better than market</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Projected Appreciation</td>
                    <td className="px-4 py-3">3.5%</td>
                    <td className="px-4 py-3">3.2%</td>
                    <td className="px-4 py-3 text-green-600">9.4% above market</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}