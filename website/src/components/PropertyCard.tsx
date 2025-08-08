'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ViewAnalysisModal } from '@/components/ActionModals';

interface PropertyCardProps {
  property: {
    property_id: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    price: number;
    bedrooms: number;
    bathrooms: number;
    square_feet: number;
    financial_summary: {
      cap_rate: number;
      cash_flow: number;
      cash_on_cash_return: number;
    };
    ai_score: number;
    image_url?: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
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
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-gray-200">
        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.address.street}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
            Property Image
          </div>
        )}
        <div className="absolute right-2 top-2 rounded-full bg-[#1A365D] px-2 py-1 text-xs font-semibold text-white">
          AI Score: {property.ai_score}
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {property.address.street}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {property.address.city}, {property.address.state} {property.address.zip}
        </p>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Price</p>
            <p className="font-semibold">{formatCurrency(property.price)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cap Rate</p>
            <p className="font-semibold">{formatPercent(property.financial_summary.cap_rate)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cash Flow</p>
            <p className="font-semibold">{formatCurrency(property.financial_summary.cash_flow)}/mo</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">CoC Return</p>
            <p className="font-semibold">{formatPercent(property.financial_summary.cash_on_cash_return)}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.square_feet.toLocaleString()} sqft</span>
        </div>
      </CardContent>

      <CardFooter>
        <ViewAnalysisModal className="w-full" />
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;