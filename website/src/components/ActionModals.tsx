'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/Dialog';

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ActionModalProps = {
  triggerText: string;
  modalTitle: string;
  modalDescription?: string;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  buttonClassName?: string;
  children?: React.ReactNode;
};

export const ActionModal: React.FC<ActionModalProps> = ({
  triggerText,
  modalTitle,
  modalDescription,
  buttonVariant = 'outline',
  buttonSize = 'default',
  buttonClassName,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={buttonClassName}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          {modalDescription && <DialogDescription>{modalDescription}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">
          {children || (
            <div className="text-center py-8">
              <p className="text-gray-500">Content for this feature is being developed.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Pre-configured modal components for specific actions
export const ViewAnalysisModal: React.FC<{ className?: string }> = ({ className }) => (
  <ActionModal 
    triggerText="View Analysis" 
    modalTitle="Property Analysis"
    modalDescription="Comprehensive analysis of this property's investment potential"
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Financial Overview</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Cash on Cash Return</p>
            <p className="text-xl font-bold text-[#1A365D]">8.2%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Cap Rate</p>
            <p className="text-xl font-bold text-[#1A365D]">6.5%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">IRR (5-Year)</p>
            <p className="text-xl font-bold text-[#1A365D]">14.7%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Cash Flow (Monthly)</p>
            <p className="text-xl font-bold text-[#1A365D]">$1,250</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Risk Assessment</h3>
        <div className="bg-gray-50 p-3 rounded mt-2">
          <div className="flex justify-between items-center">
            <span>Overall Risk</span>
            <span className="text-[#38A169] font-medium">Low</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-[#38A169] h-2.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
          <ul className="mt-3 space-y-1 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-600">Market Volatility</span>
              <span className="text-[#38A169]">Low</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Vacancy Risk</span>
              <span className="text-[#38A169]">Low</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Maintenance Costs</span>
              <span className="text-[#D69E2E]">Medium</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ActionModal>
);

export const ViewAllOpportunitiesModal: React.FC<{ className?: string }> = ({ className }) => (
  <ActionModal 
    triggerText="View All Opportunities" 
    modalTitle="Investment Opportunities"
    modalDescription="Explore all available investment opportunities in your target markets"
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Cap Rate</th>
              <th className="px-4 py-3">AI Score</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Riverside Apartments', location: 'Austin, TX', price: '$2,450,000', capRate: '6.8%', aiScore: 92 },
              { id: 2, name: 'Highland Office Park', location: 'Dallas, TX', price: '$5,750,000', capRate: '7.2%', aiScore: 88 },
              { id: 3, name: 'Sunset Retail Center', location: 'Houston, TX', price: '$3,200,000', capRate: '6.5%', aiScore: 85 },
              { id: 4, name: 'Oakwood Townhomes', location: 'San Antonio, TX', price: '$1,850,000', capRate: '7.5%', aiScore: 90 },
              { id: 5, name: 'Metro Business Center', location: 'Austin, TX', price: '$4,100,000', capRate: '6.9%', aiScore: 87 },
            ].map((property) => (
              <tr key={property.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3 font-medium">{property.name}</td>
                <td className="px-4 py-3">{property.location}</td>
                <td className="px-4 py-3">{property.price}</td>
                <td className="px-4 py-3">{property.capRate}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{property.aiScore}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${property.aiScore >= 90 ? 'bg-[#38A169]' : 'bg-[#2C7A7B]'}`} 
                        style={{ width: `${property.aiScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </ActionModal>
);

export const ViewDetailsModal: React.FC<{ className?: string }> = ({ className }) => (
  <ActionModal 
    triggerText="View Details" 
    modalTitle="Portfolio Details"
    modalDescription="Comprehensive overview of your investment portfolio"
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Portfolio Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-xl font-bold text-[#1A365D]">$8.45M</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Monthly Income</p>
            <p className="text-xl font-bold text-[#1A365D]">$42,500</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">YTD Return</p>
            <p className="text-xl font-bold text-[#1A365D]">12.4%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Properties</p>
            <p className="text-xl font-bold text-[#1A365D]">7</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Asset Allocation</h3>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded mt-2">
          <p className="text-gray-500">Asset Allocation Chart Placeholder</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Performance History</h3>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded mt-2">
          <p className="text-gray-500">Performance Chart Placeholder</p>
        </div>
      </div>
    </div>
  </ActionModal>
);

export const ViewAllActivityModal: React.FC<{ className?: string }> = ({ className }) => (
  <ActionModal 
    triggerText="View All Activity" 
    modalTitle="Recent Activity"
    modalDescription="Track all recent actions and updates on your investments"
    buttonClassName={className}
  >
    <div className="space-y-4">
      <ul className="space-y-4">
        {[
          { id: 1, action: 'Property analysis completed', target: '123 Main St', time: '2 hours ago', status: 'completed' },
          { id: 2, action: 'Market report generated', target: 'Austin, TX', time: '5 hours ago', status: 'completed' },
          { id: 3, action: 'Deal analysis started', target: '456 Oak Ave', time: 'Yesterday', status: 'in-progress' },
          { id: 4, action: 'Portfolio optimization', target: 'All properties', time: 'Yesterday', status: 'completed' },
          { id: 5, action: 'New opportunity identified', target: '789 Pine Blvd', time: '2 days ago', status: 'new' },
          { id: 6, action: 'Cash flow analysis updated', target: 'Riverside Apartments', time: '3 days ago', status: 'completed' },
          { id: 7, action: 'Tax optimization report', target: 'Portfolio', time: '1 week ago', status: 'completed' },
          { id: 8, action: 'Rental market analysis', target: 'Dallas, TX', time: '1 week ago', status: 'completed' },
        ].map((activity) => (
          <li key={activity.id}>
            <div className="flex items-start">
              <div 
                className={`mr-3 mt-1 h-2 w-2 rounded-full ${activity.status === 'completed' ? 'bg-[#38A169]' : 
                  activity.status === 'in-progress' ? 'bg-[#2C7A7B]' : 'bg-[#D69E2E]'}`}
              ></div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.target} - {activity.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </ActionModal>
);

export const ViewMarketReportModal: React.FC<{ className?: string }> = ({ className }) => (
  <ActionModal 
    triggerText="View Market Report" 
    modalTitle="Market Intelligence Report"
    modalDescription="In-depth analysis of current market conditions and trends"
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Market Overview</h3>
        <div className="bg-gray-50 p-4 rounded mt-2">
          <p className="text-sm text-gray-700">
            The real estate market in your target regions continues to show strong growth potential, with particularly 
            favorable conditions in Austin and Dallas. Cap rates are trending downward in premium locations, indicating 
            increasing property values and investor competition. Rental demand remains strong, especially in urban centers 
            and near major employment hubs.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Avg. Price Change (YoY)</p>
            <p className="text-xl font-bold text-[#1A365D]">+7.2%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Avg. Rent Change (YoY)</p>
            <p className="text-xl font-bold text-[#1A365D]">+4.8%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Avg. Cap Rate</p>
            <p className="text-xl font-bold text-[#1A365D]">5.9%</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Market Trends</h3>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded mt-2">
          <p className="text-gray-500">Market Trends Chart Placeholder</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Emerging Opportunities</h3>
        <ul className="mt-2 space-y-2">
          <li className="bg-gray-50 p-3 rounded">
            <p className="font-medium">San Antonio, TX</p>
            <p className="text-sm text-gray-600">Strong job growth and affordability driving increased demand</p>
          </li>
          <li className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Nashville, TN</p>
            <p className="text-sm text-gray-600">Expanding tech sector creating rental demand in urban core</p>
          </li>
          <li className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Raleigh, NC</p>
            <p className="text-sm text-gray-600">Research triangle driving steady appreciation and low vacancy</p>
          </li>
        </ul>
      </div>
    </div>
  </ActionModal>
);

export const SaveAnalysisModal: React.FC<{ className?: string, triggerText?: string, buttonVariant?: ButtonVariant, buttonSize?: ButtonSize }> = ({ 
  className, 
  triggerText = "Save Analysis", 
  buttonVariant = "outline", 
  buttonSize = "default" 
}) => (
  <ActionModal 
    triggerText={triggerText} 
    modalTitle="Save Analysis"
    modalDescription="Save your current analysis for future reference"
    buttonVariant={buttonVariant}
    buttonSize={buttonSize}
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Analysis Details</h3>
        <div className="mt-2 space-y-4">
          <div>
            <label htmlFor="analysis-name" className="block text-sm font-medium text-gray-700">Analysis Name</label>
            <input 
              type="text" 
              id="analysis-name" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
              placeholder="Enter a name for this analysis"
            />
          </div>
          <div>
            <label htmlFor="analysis-description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea 
              id="analysis-description" 
              rows={3} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
              placeholder="Add notes or description"
            />
          </div>
          <div>
            <label htmlFor="analysis-tags" className="block text-sm font-medium text-gray-700">Tags (Optional)</label>
            <input 
              type="text" 
              id="analysis-tags" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
              placeholder="e.g., residential, austin, rental"
            />
          </div>
          <div className="flex justify-end">
            <Button>Save Analysis</Button>
          </div>
        </div>
      </div>
    </div>
  </ActionModal>
);

export const GenerateDetailedReportModal: React.FC<{ className?: string, triggerText?: string, buttonVariant?: ButtonVariant, buttonSize?: ButtonSize }> = ({ 
  className, 
  triggerText = "Generate Detailed Report", 
  buttonVariant = "default", 
  buttonSize = "default" 
}) => (
  <ActionModal 
    triggerText={triggerText} 
    modalTitle="Generate Detailed Report"
    modalDescription="Create a comprehensive analysis report for this property"
    buttonVariant={buttonVariant}
    buttonSize={buttonSize}
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Report Options</h3>
        <div className="mt-2 space-y-4">
          <div>
            <label htmlFor="report-name" className="block text-sm font-medium text-gray-700">Report Name</label>
            <input 
              type="text" 
              id="report-name" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
              placeholder="Enter a name for this report"
            />
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Report Sections</p>
            <div className="space-y-2">
              {[
                { id: 'financial', label: 'Financial Analysis' },
                { id: 'market', label: 'Market Comparison' },
                { id: 'risk', label: 'Risk Assessment' },
                { id: 'optimization', label: 'Optimization Recommendations' },
                { id: 'projections', label: 'Cash Flow Projections' },
              ].map((section) => (
                <div key={section.id} className="flex items-center">
                  <input 
                    id={`section-${section.id}`} 
                    name={`section-${section.id}`} 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    defaultChecked 
                  />
                  <label htmlFor={`section-${section.id}`} className="ml-2 block text-sm text-gray-700">
                    {section.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Report Format</p>
            <div className="flex space-x-4">
              {[
                { id: 'pdf', label: 'PDF' },
                { id: 'excel', label: 'Excel' },
              ].map((format) => (
                <div key={format.id} className="flex items-center">
                  <input 
                    id={`format-${format.id}`} 
                    name="report-format" 
                    type="radio" 
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" 
                    defaultChecked={format.id === 'pdf'} 
                  />
                  <label htmlFor={`format-${format.id}`} className="ml-2 block text-sm text-gray-700">
                    {format.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Generate Report</Button>
          </div>
        </div>
      </div>
    </div>
  </ActionModal>
);

export const ScheduleReportModal: React.FC<{ className?: string, triggerText?: string, buttonVariant?: ButtonVariant, buttonSize?: ButtonSize }> = ({ 
  className, 
  triggerText = "Schedule Report", 
  buttonVariant = "outline", 
  buttonSize = "default" 
}) => (
  <ActionModal 
    triggerText={triggerText} 
    modalTitle="Schedule Report"
    modalDescription="Set up automated report generation on a schedule"
    buttonVariant={buttonVariant}
    buttonSize={buttonSize}
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Report Schedule</h3>
        <div className="mt-2 space-y-4">
          <div>
            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Report Type</label>
            <select 
              id="report-type" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option>Portfolio Performance</option>
              <option>Market Intelligence</option>
              <option>Investment Opportunities</option>
              <option>Cash Flow Analysis</option>
              <option>Tax Optimization</option>
            </select>
          </div>
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
            <select 
              id="frequency" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annually</option>
            </select>
          </div>
          <div>
            <label htmlFor="delivery-method" className="block text-sm font-medium text-gray-700">Delivery Method</label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center">
                <input 
                  id="delivery-email" 
                  name="delivery-method" 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  defaultChecked 
                />
                <label htmlFor="delivery-email" className="ml-2 block text-sm text-gray-700">
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  id="delivery-dashboard" 
                  name="delivery-method" 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  defaultChecked 
                />
                <label htmlFor="delivery-dashboard" className="ml-2 block text-sm text-gray-700">
                  Dashboard
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Schedule Report</Button>
          </div>
        </div>
      </div>
    </div>
  </ActionModal>
);

export const GenerateNewReportModal: React.FC<{ className?: string, triggerText?: string, buttonVariant?: ButtonVariant, buttonSize?: ButtonSize }> = ({ 
  className, 
  triggerText = "Generate New Report", 
  buttonVariant = "default", 
  buttonSize = "default" 
}) => (
  <ActionModal 
    triggerText={triggerText} 
    modalTitle="Generate New Report"
    modalDescription="Create a new AI-powered analysis report"
    buttonVariant={buttonVariant}
    buttonSize={buttonSize}
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Select Report Type</h3>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'portfolio', title: 'Portfolio Performance', description: 'Comprehensive analysis of your entire investment portfolio', time: '5-10 minutes' },
            { id: 'market', title: 'Market Intelligence', description: 'In-depth market analysis for your target regions', time: '7-12 minutes' },
            { id: 'opportunities', title: 'Investment Opportunities', description: 'AI-curated list of potential investment properties', time: '8-15 minutes' },
            { id: 'cashflow', title: 'Cash Flow Analysis', description: 'Detailed cash flow projections for your properties', time: '4-8 minutes' },
          ].map((report) => (
            <div key={report.id} className="border rounded-lg p-4 hover:border-blue-500 hover:shadow-sm cursor-pointer">
              <h4 className="font-medium">{report.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
              <p className="text-xs text-gray-500 mt-2">Estimated time: {report.time}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Generate Selected Report</Button>
      </div>
    </div>
  </ActionModal>
);

export const GenerateReportModal: React.FC<{ className?: string, triggerText?: string, buttonVariant?: ButtonVariant, buttonSize?: ButtonSize }> = ({ 
  className, 
  triggerText = "Generate Report", 
  buttonVariant = "default", 
  buttonSize = "default" 
}) => (
  <ActionModal 
    triggerText={triggerText} 
    modalTitle="Generate Report"
    modalDescription="Create a new report from this template"
    buttonVariant={buttonVariant}
    buttonSize={buttonSize}
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Report Configuration</h3>
        <div className="mt-2 space-y-4">
          <div>
            <label htmlFor="report-name" className="block text-sm font-medium text-gray-700">Report Name</label>
            <input 
              type="text" 
              id="report-name" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
              placeholder="Enter a name for this report"
            />
          </div>
          <div>
            <label htmlFor="report-scope" className="block text-sm font-medium text-gray-700">Report Scope</label>
            <select 
              id="report-scope" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option>All Properties</option>
              <option>Residential Only</option>
              <option>Commercial Only</option>
              <option>Custom Selection</option>
            </select>
          </div>
          <div>
            <label htmlFor="time-period" className="block text-sm font-medium text-gray-700">Time Period</label>
            <select 
              id="time-period" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
              <option>Last 12 Months</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button>Generate Report</Button>
          </div>
        </div>
      </div>
    </div>
  </ActionModal>
);

export const ViewAllReportsModal: React.FC<{ className?: string, triggerText?: string, buttonVariant?: ButtonVariant, buttonSize?: ButtonSize }> = ({ 
  className, 
  triggerText = "View All Reports", 
  buttonVariant = "outline", 
  buttonSize = "default" 
}) => (
  <ActionModal 
    triggerText={triggerText} 
    modalTitle="All Reports"
    modalDescription="Browse and manage all your generated reports"
    buttonVariant={buttonVariant}
    buttonSize={buttonSize}
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <input 
            type="text" 
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
            placeholder="Search reports..."
          />
        </div>
        <div>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option>All Types</option>
            <option>Portfolio Performance</option>
            <option>Market Intelligence</option>
            <option>Investment Opportunities</option>
            <option>Cash Flow Analysis</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Report Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date Generated</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Q2 Portfolio Performance', type: 'Portfolio', date: '2023-07-15', status: 'Completed' },
              { id: 2, name: 'Austin Market Analysis', type: 'Market Intelligence', date: '2023-07-10', status: 'Completed' },
              { id: 3, name: 'Investment Opportunities - Dallas', type: 'Opportunities', date: '2023-07-05', status: 'Completed' },
              { id: 4, name: 'Cash Flow Projections - Residential', type: 'Cash Flow', date: '2023-07-01', status: 'Completed' },
              { id: 5, name: 'Tax Optimization Strategy', type: 'Tax', date: '2023-06-28', status: 'Completed' },
              { id: 6, name: 'Nashville Market Trends', type: 'Market Intelligence', date: '2023-06-25', status: 'Completed' },
              { id: 7, name: 'Q1 Portfolio Performance', type: 'Portfolio', date: '2023-04-10', status: 'Completed' },
              { id: 8, name: 'Commercial Properties Analysis', type: 'Cash Flow', date: '2023-03-22', status: 'Completed' },
            ].map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{report.name}</td>
                <td className="px-4 py-3">{report.type}</td>
                <td className="px-4 py-3">{report.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {report.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </ActionModal>
);

export const DownloadReportModal: React.FC<{ className?: string, triggerText?: string, buttonVariant?: ButtonVariant, buttonSize?: ButtonSize }> = ({ 
  className, 
  triggerText = "Download", 
  buttonVariant = "outline", 
  buttonSize = "sm" 
}) => (
  <ActionModal 
    triggerText={triggerText} 
    modalTitle="Download Report"
    modalDescription="Select format and options for downloading"
    buttonVariant={buttonVariant}
    buttonSize={buttonSize}
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Download Options</h3>
        <div className="mt-2 space-y-4">
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">File Format</p>
            <div className="flex space-x-4">
              {[
                { id: 'pdf', label: 'PDF Document' },
                { id: 'excel', label: 'Excel Spreadsheet' },
                { id: 'csv', label: 'CSV Data File' },
              ].map((format) => (
                <div key={format.id} className="flex items-center">
                  <input 
                    id={`format-${format.id}`} 
                    name="file-format" 
                    type="radio" 
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" 
                    defaultChecked={format.id === 'pdf'} 
                  />
                  <label htmlFor={`format-${format.id}`} className="ml-2 block text-sm text-gray-700">
                    {format.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Include</p>
            <div className="space-y-2">
              {[
                { id: 'charts', label: 'Charts and Graphs' },
                { id: 'tables', label: 'Data Tables' },
                { id: 'analysis', label: 'Written Analysis' },
                { id: 'recommendations', label: 'Recommendations' },
              ].map((item) => (
                <div key={item.id} className="flex items-center">
                  <input 
                    id={`include-${item.id}`} 
                    name={`include-${item.id}`} 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    defaultChecked 
                  />
                  <label htmlFor={`include-${item.id}`} className="ml-2 block text-sm text-gray-700">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Download Report</Button>
          </div>
        </div>
      </div>
    </div>
  </ActionModal>
);

export const AnalyzeDealModal: React.FC<{ className?: string }> = ({ className }) => (
  <ActionModal 
    triggerText="Analyze Deal" 
    modalTitle="Deal Analysis Results"
    modalDescription="AI-powered analysis of your investment opportunity"
    buttonVariant="default"
    buttonSize="default"
    buttonClassName={className}
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Investment Summary</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Purchase Price</p>
            <p className="text-xl font-bold text-[#1A365D]">$750,000</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Estimated ARV</p>
            <p className="text-xl font-bold text-[#1A365D]">$850,000</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Renovation Budget</p>
            <p className="text-xl font-bold text-[#1A365D]">$50,000</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Holding Period</p>
            <p className="text-xl font-bold text-[#1A365D]">5 years</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Financial Analysis</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Cash on Cash Return</p>
            <p className="text-xl font-bold text-[#1A365D]">7.2%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Cap Rate</p>
            <p className="text-xl font-bold text-[#1A365D]">5.8%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">IRR (5-Year)</p>
            <p className="text-xl font-bold text-[#1A365D]">13.5%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Cash Flow (Monthly)</p>
            <p className="text-xl font-bold text-[#1A365D]">$950</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">AI Recommendation</h3>
        <div className="bg-gray-50 p-4 rounded mt-2">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-[#38A169] flex items-center justify-center mr-2">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-medium">Strong Buy</span>
          </div>
          <p className="text-sm text-gray-700">
            This property presents a strong investment opportunity with above-average returns for the market. 
            The location shows positive growth indicators, and the property has potential for value-add improvements. 
            Cash flow projections are stable, and the risk assessment indicates minimal downside potential.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Market Comparison</h3>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded mt-2">
          <p className="text-gray-500">Market Comparison Chart Placeholder</p>
        </div>
      </div>
    </div>
  </ActionModal>
);