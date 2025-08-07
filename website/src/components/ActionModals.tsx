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

type ActionModalProps = {
  triggerText: string;
  modalTitle: string;
  modalDescription?: string;
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'danger';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  buttonClassName?: string;
  children?: React.ReactNode;
};

export const ActionModal: React.FC<ActionModalProps> = ({
  triggerText,
  modalTitle,
  modalDescription,
  buttonVariant = 'outline',
  buttonSize = 'sm',
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