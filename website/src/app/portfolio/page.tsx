'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function PortfolioPage() {
  // Mock portfolio data
  const portfolioData = {
    totalValue: 2450000,
    totalProperties: 5,
    cashFlow: 8750,
    capRate: 0.0428,
    cashOnCash: 0.0675,
    properties: [
      {
        id: 'prop-001',
        address: '123 Main St, Austin, TX 78701',
        type: 'Single Family',
        purchasePrice: 450000,
        currentValue: 520000,
        equity: 120000,
        monthlyRent: 2800,
        monthlyCashFlow: 1200,
        capRate: 0.0453,
        cashOnCash: 0.072,
        roi: 0.156,
        appreciation: 15.6,
        img: '/property1.jpg'
      },
      {
        id: 'prop-002',
        address: '456 Oak Ave, Austin, TX 78704',
        type: 'Duplex',
        purchasePrice: 650000,
        currentValue: 710000,
        equity: 160000,
        monthlyRent: 4200,
        monthlyCashFlow: 2100,
        capRate: 0.0438,
        cashOnCash: 0.0695,
        roi: 0.142,
        appreciation: 9.2,
        img: '/property2.jpg'
      },
      {
        id: 'prop-003',
        address: '789 Pine Ln, Austin, TX 78745',
        type: 'Single Family',
        purchasePrice: 380000,
        currentValue: 420000,
        equity: 90000,
        monthlyRent: 2400,
        monthlyCashFlow: 950,
        capRate: 0.0421,
        cashOnCash: 0.0635,
        roi: 0.128,
        appreciation: 10.5,
        img: '/property3.jpg'
      },
      {
        id: 'prop-004',
        address: '101 River Rd, Austin, TX 78703',
        type: 'Condo',
        purchasePrice: 320000,
        currentValue: 350000,
        equity: 70000,
        monthlyRent: 1950,
        monthlyCashFlow: 750,
        capRate: 0.0398,
        cashOnCash: 0.0612,
        roi: 0.119,
        appreciation: 9.4,
        img: '/property4.jpg'
      },
      {
        id: 'prop-005',
        address: '222 Lake Dr, Austin, TX 78746',
        type: 'Single Family',
        purchasePrice: 580000,
        currentValue: 650000,
        equity: 150000,
        monthlyRent: 3500,
        monthlyCashFlow: 1750,
        capRate: 0.0432,
        cashOnCash: 0.0685,
        roi: 0.138,
        appreciation: 12.1,
        img: '/property5.jpg'
      }
    ]
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A365D] mb-2">My Investment Portfolio</h1>
        <p className="text-gray-600">Manage and analyze your real estate investments</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
            <p className="text-sm text-green-600">+12.4% from purchase</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Monthly Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${portfolioData.cashFlow.toLocaleString()}</p>
            <p className="text-sm text-green-600">+3.2% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Cap Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{(portfolioData.capRate * 100).toFixed(2)}%</p>
            <p className="text-sm text-gray-600">Market avg: 4.8%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Cash-on-Cash Return</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{(portfolioData.cashOnCash * 100).toFixed(2)}%</p>
            <p className="text-sm text-green-600">Above target: 7.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Properties Table */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Properties ({portfolioData.totalProperties})</CardTitle>
            <Button>Add Property</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Purchase Price</th>
                  <th className="px-4 py-3">Current Value</th>
                  <th className="px-4 py-3">Monthly Rent</th>
                  <th className="px-4 py-3">Cap Rate</th>
                  <th className="px-4 py-3">Cash Flow</th>
                  <th className="px-4 py-3">Appreciation</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.properties.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">{property.address}</td>
                    <td className="px-4 py-3">${property.purchasePrice.toLocaleString()}</td>
                    <td className="px-4 py-3">${property.currentValue.toLocaleString()}</td>
                    <td className="px-4 py-3">${property.monthlyRent.toLocaleString()}</td>
                    <td className="px-4 py-3">{(property.capRate * 100).toFixed(2)}%</td>
                    <td className="px-4 py-3">${property.monthlyCashFlow.toLocaleString()}</td>
                    <td className="px-4 py-3 text-green-600">+{property.appreciation}%</td>
                    <td className="px-4 py-3">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Diversification Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Diversification Chart Placeholder</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Your portfolio is primarily concentrated in residential properties in Texas. Consider diversifying into:</p>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                <li>Commercial properties</li>
                <li>Different geographic regions</li>
                <li>Multi-family units</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Performance Chart Placeholder</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Return:</span>
                <span className="text-sm font-medium">18.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Annualized Return:</span>
                <span className="text-sm font-medium">7.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Risk-Adjusted Return:</span>
                <span className="text-sm font-medium">6.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Benchmark Comparison:</span>
                <span className="text-sm font-medium text-green-600">+2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}