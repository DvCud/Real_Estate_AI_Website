'use client';

import React from 'react';
import SupabaseExample from '@/components/examples/SupabaseExample';

export default function SupabaseExamplePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Supabase Integration Example</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">About This Example</h2>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <p className="mb-4">
              This page demonstrates the integration of Supabase with the Real Estate AI application.
              It showcases authentication, database operations, and real-time updates.
            </p>
            
            <h3 className="mb-2 text-lg font-medium">Features Demonstrated:</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Supabase Authentication</li>
              <li>Database Operations (CRUD)</li>
              <li>User-specific Data</li>
              <li>Real-time Updates</li>
            </ul>
            
            <div className="mt-6 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
              <p className="font-medium">Getting Started:</p>
              <ol className="ml-4 mt-2 list-decimal space-y-1">
                <li>Sign in using the user icon in the navigation bar</li>
                <li>Once authenticated, you can add example properties</li>
                <li>Properties are stored in your Supabase database</li>
                <li>Try adding multiple properties to see the list update</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="mb-4 text-xl font-semibold">Live Demo</h2>
          <SupabaseExample />
        </div>
      </div>
    </div>
  );
}