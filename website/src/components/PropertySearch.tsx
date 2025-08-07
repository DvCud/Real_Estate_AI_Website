'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties } from '@/lib/mockData';

const PropertySearch: React.FC = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('ai_score');


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#1A365D]">Property Search</h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <label htmlFor="location" className="mb-1 block text-sm font-medium">
                Location
              </label>
              <select
                id="location"
                className="w-full rounded-md border border-gray-300 p-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Any Location</option>
                <option value="anytown">Anytown, CA</option>
                <option value="othertown">Othertown, CA</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="propertyType" className="mb-1 block text-sm font-medium">
                Property Type
              </label>
              <select
                id="propertyType"
                className="w-full rounded-md border border-gray-300 p-2"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Any Type</option>
                <option value="single_family">Single Family</option>
                <option value="multi_family">Multi-Family</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="priceRange" className="mb-1 block text-sm font-medium">
                Price Range
              </label>
              <select
                id="priceRange"
                className="w-full rounded-md border border-gray-300 p-2"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="0-300000">Under $300,000</option>
                <option value="300000-500000">$300,000 - $500,000</option>
                <option value="500000-750000">$500,000 - $750,000</option>
                <option value="750000-1000000">$750,000 - $1,000,000</option>
                <option value="1000000+">$1,000,000+</option>
              </select>
            </div>

            <div>
              <Button variant="default" className="w-full md:w-auto">
                Search
              </Button>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm">
              More Filters
            </Button>
            <Button 
              variant="default" 
              className="w-full md:w-auto ml-2"
              onClick={() => {
                // This would be replaced with API call in the future
                console.log('Filters applied:', { location, propertyType, priceRange, sortBy });
              }}
            >
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{mockProperties.length} Results</h2>
        <div className="flex items-center">
          <label htmlFor="sortBy" className="mr-2 text-sm font-medium">
            Sort By:
          </label>
          <select
            id="sortBy"
            className="rounded-md border border-gray-300 p-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="ai_score">AI Score</option>
            <option value="price_low">Price (Low to High)</option>
            <option value="price_high">Price (High to Low)</option>
            <option value="cap_rate">Cap Rate</option>
            <option value="cash_flow">Cash Flow</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockProperties.map((property) => (
          <PropertyCard key={property.property_id} property={property} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          {[1, 2, 3].map((page) => (
            <Button 
              key={page}
              variant={page === 1 ? "default" : "outline"} 
              size="sm" 
              className="h-8 w-8 p-0"
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm">
            Next
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default PropertySearch;