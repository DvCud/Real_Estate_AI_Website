'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ViewAnalysisModal } from '@/components/ActionModals';

export default function ReportsPage() {
  // Mock reports data
  const reports = [
    {
      id: 'rep-001',
      title: 'Q2 2023 Portfolio Performance',
      type: 'Portfolio Analysis',
      date: '2023-07-15',
      status: 'Completed',
      summary: 'Comprehensive analysis of portfolio performance for Q2 2023, including ROI metrics, cash flow analysis, and market comparison.',
    },
    {
      id: 'rep-002',
      title: 'Austin Market Opportunity Analysis',
      type: 'Market Research',
      date: '2023-08-03',
      status: 'Completed',
      summary: 'In-depth analysis of investment opportunities in the Austin real estate market, including neighborhood trends, price forecasts, and rental demand.',
    },
    {
      id: 'rep-003',
      title: 'Investment Strategy Optimization',
      type: 'Strategy',
      date: '2023-08-22',
      status: 'Completed',
      summary: 'AI-generated recommendations for optimizing your investment strategy based on your goals, risk tolerance, and market conditions.',
    },
    {
      id: 'rep-004',
      title: 'Multi-Family Property Comparative Analysis',
      type: 'Property Analysis',
      date: '2023-09-10',
      status: 'In Progress',
      summary: 'Detailed comparison of multi-family properties in your target markets, including financial projections and risk assessment.',
    },
    {
      id: 'rep-005',
      title: 'Tax Optimization Strategies',
      type: 'Financial Planning',
      date: '2023-09-18',
      status: 'Scheduled',
      summary: 'Analysis of tax optimization strategies for your real estate portfolio, including 1031 exchanges, depreciation strategies, and entity structuring.',
    },
  ];

  // Mock report templates
  const reportTemplates = [
    {
      id: 'tmpl-001',
      title: 'Portfolio Performance Analysis',
      description: 'Comprehensive analysis of your entire portfolio performance, including ROI, cash flow, appreciation, and comparison to market benchmarks.',
      estimatedTime: '15-20 minutes',
    },
    {
      id: 'tmpl-002',
      title: 'Market Opportunity Research',
      description: 'In-depth analysis of investment opportunities in specific markets, including price trends, rental demand, economic indicators, and growth forecasts.',
      estimatedTime: '20-30 minutes',
    },
    {
      id: 'tmpl-003',
      title: 'Investment Strategy Optimization',
      description: 'AI-generated recommendations for optimizing your investment strategy based on your goals, risk tolerance, and current market conditions.',
      estimatedTime: '25-35 minutes',
    },
    {
      id: 'tmpl-004',
      title: 'Property Comparative Analysis',
      description: 'Detailed comparison of properties in your target markets, including financial projections, risk assessment, and investment potential.',
      estimatedTime: '15-25 minutes',
    },
    {
      id: 'tmpl-005',
      title: 'Tax Optimization Strategies',
      description: 'Analysis of tax optimization strategies for your real estate portfolio, including 1031 exchanges, depreciation strategies, and entity structuring.',
      estimatedTime: '30-40 minutes',
    },
  ];


  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A365D] mb-2">Reports</h1>
          <p className="text-gray-600">AI-generated reports and analysis for your real estate investments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Schedule Report</Button>
          <Button variant="default">Generate New Report</Button>
        </div>
      </div>

      {/* Generate New Report */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Select a report template to generate a new analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <p className="text-xs text-gray-500">Estimated processing time: {template.estimatedTime}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Generate Report</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Access and manage your generated reports</CardDescription>
            </div>
            <Button variant="outline">View All Reports</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Report ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 font-mono text-xs">{report.id}</td>
                    <td className="px-4 py-3 font-medium">{report.title}</td>
                    <td className="px-4 py-3">{report.type}</td>
                    <td className="px-4 py-3">{report.date}</td>
                    <td className="px-4 py-3">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <ViewAnalysisModal triggerText="View" buttonVariant="outline" buttonSize="sm" modalTitle="Report Details" />
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Report Details Modal (placeholder) */}
      {/* This would be implemented with a modal component in a real application */}
      <div className="hidden">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Austin Market Opportunity Analysis</CardTitle>
                  <CardDescription>Generated on August 3, 2023</CardDescription>
                </div>
                <Button variant="ghost" size="sm">×</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Executive Summary</h3>
                  <p className="text-gray-700">
                    This report provides an in-depth analysis of investment opportunities in the Austin real estate market, including neighborhood trends, price forecasts, and rental demand. Our AI analysis indicates strong growth potential in the North and East Austin submarkets, with particularly favorable conditions for multi-family and single-family rental investments.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Price Trends Chart Placeholder</p>
                  </div>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Rental Demand Chart Placeholder</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Findings</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Austin's population growth continues to outpace the national average by 3.2x, driving strong housing demand.</li>
                    <li>Tech sector expansion is creating high-income renter demand, particularly in the urban core and northern suburbs.</li>
                    <li>Single-family home prices are projected to appreciate 6.8% annually over the next three years.</li>
                    <li>Rental rates for multi-family properties have increased 5.7% year-over-year, with vacancy rates below 4%.</li>
                    <li>East Austin neighborhoods show the highest appreciation potential due to ongoing revitalization and improved connectivity.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download PDF</Button>
              <Button>Generate Similar Report</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}