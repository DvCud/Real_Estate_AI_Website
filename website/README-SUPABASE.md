# Supabase Integration for Real Estate AI Website

## Overview

This document provides an overview of the Supabase integration implemented in the Real Estate AI Website. Supabase is an open-source Firebase alternative that provides a PostgreSQL database, authentication, storage, and more.

## Components Implemented

### 1. Supabase Client Configuration

- **File**: `src/lib/supabase.ts`
- **Purpose**: Initializes and exports the Supabase client for use throughout the application.
- **Environment Variables**: Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 2. Authentication

- **File**: `src/lib/auth/supabaseAuth.ts`
- **Purpose**: Provides authentication functions (sign-up, sign-in, sign-out, password reset, etc.).
- **Context**: `src/lib/context/SupabaseUserContext.tsx` - React context for managing authentication state.
- **UI Component**: `src/components/SupabaseAuthDialog.tsx` - Dialog for authentication UI.

### 3. Database Services

- **File**: `src/lib/api/supabaseService.ts`
- **Purpose**: Centralizes database operations for properties, analyses, reports, and market data.
- **Integration**: Exported in `src/lib/api/services.ts` for use throughout the application.

### 4. Database Schema

- **File**: `supabase-schema.sql`
- **Purpose**: Defines the database schema for the application, including tables and Row Level Security (RLS) policies.

### 5. Navigation

- **File**: `src/components/SupabaseNavigation.tsx`
- **Purpose**: Updated navigation component that uses the Supabase authentication dialog.

## Setup Instructions

Refer to the `SUPABASE_SETUP.md` file for detailed setup instructions, including:

1. Creating a Supabase project
2. Setting up the database schema
3. Configuring environment variables
4. Setting up authentication
5. Optional storage setup

## Usage Examples

### Authentication

```tsx
import { useSupabaseUser } from '@/lib/context/SupabaseUserContext';

function MyComponent() {
  const { user, login, logout, register, isAuthenticated } = useSupabaseUser();
  
  // Use authentication functions and state
}
```

### Database Operations

```tsx
import { supabaseService } from '@/lib/api/services';

async function fetchProperties() {
  const properties = await supabaseService.getProperties();
  // Use properties data
}
```

## Migration Notes

The application currently supports both the original authentication system and the new Supabase authentication system. The layout is configured to use both providers, with the Supabase provider wrapping the original provider:

```tsx
<SupabaseUserProvider>
  <UserProvider>
    {/* Application content */}
  </UserProvider>
</SupabaseUserProvider>
```

This allows for a gradual migration from the original system to Supabase.

## Next Steps

1. Complete migration from the original authentication system to Supabase
2. Implement Supabase storage for property images and documents
3. Set up real-time subscriptions for collaborative features
4. Implement edge functions for server-side operations