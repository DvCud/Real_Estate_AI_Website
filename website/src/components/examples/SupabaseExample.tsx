'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSupabaseUser } from '@/lib/context/SupabaseUserContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

type Property = {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  created_at: string;
};

export default function SupabaseExample() {
  const { user, isAuthenticated } = useSupabaseUser();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);

        // Only fetch if user is authenticated
        if (!isAuthenticated) {
          setProperties([]);
          return;
        }

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setProperties(data || []);
      } catch (err: any) {
        console.error('Error fetching properties:', err);
        setError(err.message || 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [isAuthenticated]);

  async function addDummyProperty() {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const newProperty = {
        user_id: user.id,
        address: `${Math.floor(Math.random() * 1000)} Main St`,
        city: 'Example City',
        state: 'CA',
        zip_code: '90210',
        price: Math.floor(Math.random() * 1000000) + 200000,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        square_feet: Math.floor(Math.random() * 2000) + 800,
        year_built: 2000 + Math.floor(Math.random() * 23),
        property_type: 'Single Family',
        status: 'For Sale'
      };
      
      const { error } = await supabase
        .from('properties')
        .insert(newProperty);
        
      if (error) throw error;
      
      // Refresh the list
      const { data, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (fetchError) throw fetchError;
      setProperties(data || []);
      
    } catch (err: any) {
      console.error('Error adding property:', err);
      setError(err.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supabase Example</CardTitle>
          <CardDescription>Sign in to view and manage properties</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You need to be signed in to use this feature.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Example</CardTitle>
        <CardDescription>Demonstrating Supabase integration</CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <Button onClick={addDummyProperty} disabled={loading}>
            {loading ? 'Loading...' : 'Add Example Property'}
          </Button>
        </div>
        
        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Properties</h3>
            <div className="divide-y divide-gray-200">
              {properties.map((property) => (
                <div key={property.id} className="py-3">
                  <h4 className="font-medium">{property.address}</h4>
                  <p className="text-sm text-gray-500">
                    ${property.price.toLocaleString()} · {property.bedrooms} bd · {property.bathrooms} ba · {property.square_feet} sqft
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No properties found. Add one to get started.</p>
        )}
      </CardContent>
      
      <CardFooter className="text-sm text-gray-500">
        Data is stored in your Supabase database.
      </CardFooter>
    </Card>
  );
}