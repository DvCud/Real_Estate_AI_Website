'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties } from '@/lib/mockData';
import { 
  ViewAllOpportunitiesModal, 
  ViewDetailsModal, 
  ViewMarketReportModal, 
  ViewAllActivityModal 
} from '@/components/ActionModals';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#1A365D]">Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Investment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#1A365D]">$24.5M</p>
            <p className="text-sm text-gray-500">Total Portfolio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Properties Under Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#1A365D]">42</p>
            <p className="text-sm text-gray-500">Active Analyses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Deal Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-12 w-full rounded-md bg-gray-100">
              <div
                className="h-full rounded-md bg-[#2C7A7B]"
                style={{ width: '65%' }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>Sourcing</span>
              <span>Analysis</span>
              <span>Offer</span>
              <span>Closing</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Investment Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockProperties.map((property) => (
                  <PropertyCard key={property.property_id} property={property} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <ViewAllOpportunitiesModal />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 h-48 w-full rounded-md bg-gray-100"></div>
            <div className="mb-2">
              <p className="text-2xl font-bold text-[#D69E2E]">12.4% YTD Return</p>
              <p className="text-sm text-gray-500">vs 8.7% Benchmark</p>
            </div>
            <ViewDetailsModal className="w-full" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 h-40 w-full rounded-md bg-gray-100"></div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-[#D69E2E]">•</span>
                <span>Cap rates trending down in Downtown district</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#D69E2E]">•</span>
                <span>Rental demand increasing in North Side</span>
              </li>
            </ul>
            <div className="mt-4">
              <ViewMarketReportModal className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-[#2C7A7B]"></div>
                  <div>
                    <p className="font-medium">Property analysis completed</p>
                    <p className="text-sm text-gray-500">123 Main St - 2 hours ago</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-[#2C7A7B]"></div>
                  <div>
                    <p className="font-medium">New opportunity identified</p>
                    <p className="text-sm text-gray-500">456 Oak Ave - 5 hours ago</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-[#2C7A7B]"></div>
                  <div>
                    <p className="font-medium">Deal scored and ranked</p>
                    <p className="text-sm text-gray-500">789 Pine St - Yesterday</p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <ViewAllActivityModal className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;