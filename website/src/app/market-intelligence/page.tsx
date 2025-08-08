'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ViewMarketReportModal } from '@/components/ActionModals';

export default function MarketIntelligencePage() {
  // Mock market trends data
  const marketTrends = [
    {
      id: 1,
      region: 'Austin, TX',
      priceChange: 8.5,
      rentChange: 5.2,
      capRateChange: -0.3,
      inventoryChange: 2.1,
      absorptionRate: 3.8,
      trend: 'up'
    },
    {
      id: 2,
      region: 'Dallas, TX',
      priceChange: 6.7,
      rentChange: 4.8,
      capRateChange: -0.2,
      inventoryChange: 3.5,
      absorptionRate: 4.2,
      trend: 'up'
    },
    {
      id: 3,
      region: 'Houston, TX',
      priceChange: 5.9,
      rentChange: 3.7,
      capRateChange: 0.1,
      inventoryChange: 1.8,
      absorptionRate: 3.5,
      trend: 'stable'
    }
  ];
  
  // Mock emerging markets data
  const emergingMarkets = [
    {
      id: 1,
      market: 'San Antonio, TX',
      growthScore: 85,
      affordabilityScore: 72,
      jobGrowth: 4.2,
      populationGrowth: 3.8,
      medianHomePrice: 320000,
      medianRent: 1850,
      roi: 7.2
    },
    {
      id: 2,
      market: 'Nashville, TN',
      growthScore: 82,
      affordabilityScore: 68,
      jobGrowth: 3.9,
      populationGrowth: 3.5,
      medianHomePrice: 425000,
      medianRent: 2100,
      roi: 6.8
    },
    {
      id: 3,
      market: 'Raleigh, NC',
      growthScore: 80,
      affordabilityScore: 75,
      jobGrowth: 3.7,
      populationGrowth: 3.2,
      medianHomePrice: 390000,
      medianRent: 1950,
      roi: 7.0
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A365D] mb-2">Market Intelligence</h1>
        <p className="text-gray-600">AI-powered market insights and forecasts to guide your investment decisions</p>
      </div>

      {/* Market Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>U.S. Real Estate Market Overview</CardTitle>
          <CardDescription>Updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Price Trends Chart Placeholder</p>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Inventory Levels Chart Placeholder</p>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Interest Rate Impact Chart Placeholder</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Market Summary</h3>
            <p className="text-gray-700">
              The U.S. real estate market continues to show resilience despite economic headwinds. Housing demand remains strong in growing metropolitan areas, particularly in the South and Southwest regions. Inventory constraints are gradually easing in some markets, though housing supply remains below historical averages. Interest rate fluctuations have moderated price growth, creating potential opportunities for strategic investors.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-[#1A365D] mb-1">Price Trends</h4>
                <p className="text-sm text-gray-700">National home prices increased by 5.2% year-over-year, with significant regional variations.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-[#1A365D] mb-1">Inventory Levels</h4>
                <p className="text-sm text-gray-700">Housing inventory has increased 15.3% from last year but remains 38% below pre-pandemic levels.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-[#1A365D] mb-1">Market Forecast</h4>
                <p className="text-sm text-gray-700">Our AI models predict moderate price appreciation of 3-5% nationally over the next 12 months.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Market Trends */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Current Market Trends</CardTitle>
              <CardDescription>Performance metrics for key markets</CardDescription>
            </div>
            <ViewMarketReportModal />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Price Change (YoY)</th>
                  <th className="px-4 py-3">Rent Change (YoY)</th>
                  <th className="px-4 py-3">Cap Rate</th>
                  <th className="px-4 py-3">Inventory</th>
                  <th className="px-4 py-3">Demand</th>
                  <th className="px-4 py-3">12-Month Forecast</th>
                </tr>
              </thead>
              <tbody>
                {marketTrends.map((market) => (
                  <tr key={market.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">{market.region}</td>
                    <td className="px-4 py-3 text-green-600">+{market.priceChange}%</td>
                    <td className="px-4 py-3 text-green-600">+{market.rentChange}%</td>
                    <td className="px-4 py-3">{market.capRateChange}%</td>
                    <td className="px-4 py-3">{market.inventoryChange}%</td>
                    <td className="px-4 py-3">{market.absorptionRate}%</td>
                    <td className="px-4 py-3">{market.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Emerging Markets */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI-Identified Emerging Markets</CardTitle>
          <CardDescription>Markets with high growth potential based on our proprietary AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Market</th>
                  <th className="px-4 py-3">Growth Score</th>
                  <th className="px-4 py-3">Affordability Score</th>
                  <th className="px-4 py-3">Job Growth (%)</th>
                  <th className="px-4 py-3">Population Growth (%)</th>
                  <th className="px-4 py-3">ROI (%)</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {emergingMarkets.map((market) => (
                  <tr key={market.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">{market.market}</td>
                    <td className="px-4 py-3">{market.growthScore}</td>
                    <td className="px-4 py-3">{market.affordabilityScore}</td>
                    <td className="px-4 py-3 text-green-600">+{market.jobGrowth}%</td>
                    <td className="px-4 py-3 text-green-600">+{market.populationGrowth}%</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{market.roi}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${market.roi * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm">Explore</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Economic Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
              <p className="text-gray-500">Economic Indicators Chart Placeholder</p>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm text-gray-600">Mortgage Rates (30Y):</span>
                <span className="text-sm font-medium">6.25%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm text-gray-600">Inflation Rate:</span>
                <span className="text-sm font-medium">3.2%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm text-gray-600">Unemployment:</span>
                <span className="text-sm font-medium">3.8%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm text-gray-600">GDP Growth:</span>
                <span className="text-sm font-medium">2.1%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regulatory Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="font-medium">Zoning Law Updates</h4>
                <p className="text-sm text-gray-600 mt-1">Several major cities have revised zoning laws to encourage higher density development, potentially increasing multi-family investment opportunities.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-1">
                <h4 className="font-medium">Tax Policy Changes</h4>
                <p className="text-sm text-gray-600 mt-1">Proposed changes to 1031 exchange rules could impact investment strategies. Our analysis suggests preparing alternative tax planning approaches.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="font-medium">Rental Regulations</h4>
                <p className="text-sm text-gray-600 mt-1">New tenant protection laws in several states may affect rental property operations and returns. Review our compliance guide for details.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Market Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
              <p className="text-gray-500">Prediction Model Chart Placeholder</p>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium">Short-Term (6 months)</h4>
                <p className="text-xs text-gray-600">Expect continued price moderation with regional variations. Sunbelt markets likely to outperform national averages.</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Medium-Term (1-2 years)</h4>
                <p className="text-xs text-gray-600">Housing supply constraints should ease, normalizing price growth. Rental demand expected to remain strong in urban centers.</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Long-Term (3-5 years)</h4>
                <p className="text-xs text-gray-600">Demographic shifts favor continued housing demand growth. Markets with strong job sectors in technology and healthcare projected to lead appreciation.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}