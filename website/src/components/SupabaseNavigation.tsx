'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SupabaseAuthDialog } from '@/components/SupabaseAuthDialog';

const SupabaseNavigation: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-[#1A365D]">Real Estate AI</span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-gray-700 hover:text-[#1A365D]">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/property-search" className="text-gray-700 hover:text-[#1A365D]">
                Property Search
              </Link>
            </li>
            <li>
              <Link href="/deal-analysis" className="text-gray-700 hover:text-[#1A365D]">
                Deal Analysis
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-gray-700 hover:text-[#1A365D]">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/market-intelligence" className="text-gray-700 hover:text-[#1A365D]">
                Market Intelligence
              </Link>
            </li>
            <li>
              <Link href="/reports" className="text-gray-700 hover:text-[#1A365D]">
                Reports
              </Link>
            </li>
            <li>
              <Link href="/supabase-example" className="text-gray-700 hover:text-[#1A365D]">
                Supabase Demo
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </Button>

          <div className="hidden md:block">
            <SupabaseAuthDialog />
          </div>

          <button className="block md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SupabaseNavigation;