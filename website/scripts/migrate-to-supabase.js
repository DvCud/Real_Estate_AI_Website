/**
 * Supabase Migration Script
 * 
 * This script helps migrate data from the existing system to Supabase.
 * It reads data from the existing API and inserts it into Supabase tables.
 * 
 * Usage:
 * 1. Set up environment variables in .env.local
 * 2. Run: node scripts/migrate-to-supabase.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');
const readline = require('readline');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL and key must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
let API_TOKEN = '';

// Helper function to prompt for user input
const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

// Helper function to make authenticated API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    throw error;
  }
}

// Login to get API token
async function login() {
  const email = await prompt('Enter your email: ');
  const password = await prompt('Enter your password: ');

  try {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    API_TOKEN = response.data.access_token;
    console.log('Login successful!');
    return response.data.user;
  } catch (error) {
    console.error('Login failed:', error.message);
    process.exit(1);
  }
}

// Migrate users
async function migrateUsers(currentUser) {
  console.log('\nMigrating user data...');
  
  try {
    // Check if user already exists in Supabase
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', currentUser.email)
      .single();

    if (existingUser) {
      console.log(`User ${currentUser.email} already exists in Supabase.`);
      return;
    }

    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: currentUser.email,
      password: await prompt('Create a new password for Supabase: '),
      email_confirm: true,
      user_metadata: {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name
      }
    });

    if (authError) throw authError;

    // Create profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authUser.id,
        email: currentUser.email,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        role: currentUser.role || 'user',
        created_at: new Date().toISOString()
      });

    if (profileError) throw profileError;

    console.log(`User ${currentUser.email} migrated successfully.`);
  } catch (error) {
    console.error('Error migrating user:', error.message);
  }
}

// Migrate properties
async function migrateProperties(userId) {
  console.log('\nMigrating properties...');
  
  try {
    // Fetch properties from existing API
    const properties = await apiRequest('/properties');
    console.log(`Found ${properties.length} properties to migrate.`);

    // Insert properties into Supabase
    for (const property of properties) {
      // Check if property already exists
      const { data: existingProperty } = await supabase
        .from('properties')
        .select('id')
        .eq('original_id', property.id)
        .single();

      if (existingProperty) {
        console.log(`Property ${property.address} already exists, skipping.`);
        continue;
      }

      // Insert property
      const { error } = await supabase
        .from('properties')
        .insert({
          user_id: userId,
          original_id: property.id,
          address: property.address,
          city: property.city,
          state: property.state,
          zip_code: property.zip_code,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          square_feet: property.square_feet,
          year_built: property.year_built,
          property_type: property.property_type,
          status: property.status,
          description: property.description,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error(`Error migrating property ${property.address}:`, error.message);
      } else {
        console.log(`Property ${property.address} migrated successfully.`);
      }
    }
  } catch (error) {
    console.error('Error migrating properties:', error.message);
  }
}

// Migrate analyses
async function migrateAnalyses(userId) {
  console.log('\nMigrating analyses...');
  
  try {
    // Fetch analyses from existing API
    const analyses = await apiRequest('/analyses');
    console.log(`Found ${analyses.length} analyses to migrate.`);

    // Get property mappings
    const { data: properties } = await supabase
      .from('properties')
      .select('id, original_id');

    const propertyMap = properties.reduce((map, prop) => {
      map[prop.original_id] = prop.id;
      return map;
    }, {});

    // Insert analyses into Supabase
    for (const analysis of analyses) {
      // Check if analysis already exists
      const { data: existingAnalysis } = await supabase
        .from('analyses')
        .select('id')
        .eq('original_id', analysis.id)
        .single();

      if (existingAnalysis) {
        console.log(`Analysis ${analysis.id} already exists, skipping.`);
        continue;
      }

      // Map to new property ID
      const propertyId = propertyMap[analysis.property_id];
      if (!propertyId) {
        console.log(`Property ID ${analysis.property_id} not found, skipping analysis.`);
        continue;
      }

      // Insert analysis
      const { error } = await supabase
        .from('analyses')
        .insert({
          user_id: userId,
          property_id: propertyId,
          original_id: analysis.id,
          purchase_price: analysis.purchase_price,
          rental_income: analysis.rental_income,
          expenses: analysis.expenses,
          cash_flow: analysis.cash_flow,
          cap_rate: analysis.cap_rate,
          roi: analysis.roi,
          analysis_date: analysis.analysis_date || new Date().toISOString(),
          notes: analysis.notes,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error(`Error migrating analysis ${analysis.id}:`, error.message);
      } else {
        console.log(`Analysis ${analysis.id} migrated successfully.`);
      }
    }
  } catch (error) {
    console.error('Error migrating analyses:', error.message);
  }
}

// Main migration function
async function migrateData() {
  try {
    console.log('Starting migration to Supabase...');
    
    // Login to get current user and token
    const currentUser = await login();
    
    // Confirm migration
    const confirm = await prompt('\nThis will migrate your data to Supabase. Continue? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('Migration cancelled.');
      process.exit(0);
    }
    
    // Get Supabase user ID
    const { data: supabaseUser } = await supabase.auth
      .signInWithPassword({
        email: currentUser.email,
        password: await prompt('Enter your Supabase password: ')
      });
    
    if (!supabaseUser) {
      // Migrate user if not exists
      await migrateUsers(currentUser);
      
      // Try login again
      const { data: newUser } = await supabase.auth
        .signInWithPassword({
          email: currentUser.email,
          password: await prompt('Enter your Supabase password again: ')
        });
        
      if (!newUser) {
        throw new Error('Failed to authenticate with Supabase after user migration');
      }
      
      await migrateProperties(newUser.user.id);
      await migrateAnalyses(newUser.user.id);
    } else {
      await migrateProperties(supabaseUser.user.id);
      await migrateAnalyses(supabaseUser.user.id);
    }
    
    console.log('\nMigration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
  } finally {
    rl.close();
  }
}

// Run migration
migrateData();