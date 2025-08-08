# Supabase Integration Setup Guide

This guide will help you set up Supabase for the Real Estate AI Investment Platform.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Log in to your Supabase account
2. Click on "New Project"
3. Enter a name for your project
4. Set a secure database password
5. Choose a region closest to your users
6. Click "Create new project"

## Step 2: Set Up Database Schema

1. In your Supabase project dashboard, navigate to the SQL Editor
2. Copy the contents of the `supabase-schema.sql` file from this project
3. Paste the SQL into the editor and run the queries to create all necessary tables and policies

## Step 3: Configure Environment Variables

1. In your Supabase project dashboard, go to Settings > API
2. Copy your project URL and anon/public key
3. Update the `.env.local` file in your project with these values:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Step 4: Enable Authentication

1. In your Supabase project dashboard, go to Authentication > Settings
2. Configure the authentication providers you want to use (Email, Google, GitHub, etc.)
3. For email authentication, you can enable "Confirm email" for added security

## Step 5: Storage Setup (Optional)

If you need to store files like property images:

1. In your Supabase project dashboard, go to Storage
2. Create a new bucket called "properties"
3. Set the bucket's privacy setting to "Private"
4. Create appropriate storage policies

## Using Supabase in the Application

The application is already set up to use Supabase for:

1. **Authentication**: Using the `SupabaseUserContext` for user management
2. **Database Operations**: Using the `supabaseService` for CRUD operations

### Authentication Example

```typescript
import { useSupabaseUser } from '@/lib/context/SupabaseUserContext';

function LoginComponent() {
  const { login } = useSupabaseUser();
  
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Redirect or show success message
    } catch (error) {
      // Handle error
    }
  };
  
  // Component JSX
}
```

### Database Operations Example

```typescript
import { supabaseService } from '@/lib/api/services';

async function fetchProperties() {
  try {
    const properties = await supabaseService.getProperties();
    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}
```

## Migrating from Mock Data

To migrate from the mock data to Supabase:

1. Modify the existing API services to use Supabase instead of mock data
2. Update components to handle real-time data and authentication states
3. Test thoroughly to ensure all functionality works with Supabase

## Troubleshooting

- **Authentication Issues**: Check your Supabase project settings and ensure the correct URL and API keys are being used
- **Database Errors**: Verify your table schema matches what the application expects
- **CORS Errors**: Make sure your Supabase project allows requests from your application's domain

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)