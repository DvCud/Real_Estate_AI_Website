/**
 * Mock API Server
 * This file provides a mock implementation of the API for development purposes
 * It intercepts API requests and returns mock data
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockProperties, mockPropertyData } from '../mockData';

// Create a new instance of the mock adapter
const createMockServer = (axiosInstance: any) => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

  // Mock authentication endpoints
  mock.onPost('/auth/login').reply(200, {
    data: {
      access_token: 'mock-token-12345',
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        user_id: 'user_12345',
        email: 'demo@example.com',
        first_name: 'Demo',
        last_name: 'User',
        role: 'investor',
        created_at: '2023-01-01T00:00:00Z',
      },
    },
  });

  mock.onPost('/auth/register').reply(200, {
    data: {
      access_token: 'mock-token-12345',
      user: {
        user_id: 'user_12345',
        email: 'demo@example.com',
        first_name: 'Demo',
        last_name: 'User',
        role: 'investor',
        created_at: '2023-01-01T00:00:00Z',
      },
    },
  });

  mock.onPost('/auth/logout').reply(200, { data: { message: 'Logged out successfully' } });

  mock.onGet('/auth/user').reply(200, {
    data: {
      user: {
        user_id: 'user_12345',
        email: 'demo@example.com',
        first_name: 'Demo',
        last_name: 'User',
        role: 'investor',
        created_at: '2023-01-01T00:00:00Z',
      },
    },
  });

  // Mock property endpoints
  mock.onGet('/properties').reply((config) => {
    // Parse query parameters
    const params = new URLSearchParams(config.url?.split('?')[1]);
    const location = params.get('location');
    const propertyType = params.get('property_type');
    const minPrice = params.get('min_price');
    const maxPrice = params.get('max_price');
    const sortBy = params.get('sort_by') || 'ai_score';

    // Filter properties based on query parameters
    let filteredProperties = [...mockProperties];

    if (location) {
      filteredProperties = filteredProperties.filter(
        (p) => p.address.city.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (propertyType) {
      // In a real implementation, we would filter by property type
      // For now, we'll just return all properties
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price <= Number(maxPrice));
    }

    // Sort properties
    if (sortBy === 'price_asc') {
      filteredProperties.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filteredProperties.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'ai_score') {
      filteredProperties.sort((a, b) => b.ai_score - a.ai_score);
    }

    return [
      200,
      {
        data: {
          properties: filteredProperties,
          pagination: {
            total: filteredProperties.length,
            limit: 10,
            offset: 0,
          },
        },
      },
    ];
  });

  // Mock property detail endpoint
  mock.onGet(/\/properties\/prop_\d+$/).reply((config) => {
    const propertyId = config.url?.split('/').pop();
    
    // In a real implementation, we would fetch the property by ID
    // For now, we'll just return the mock property data
    return [
      200,
      {
        data: { ...mockPropertyData, property_id: propertyId },
      },
    ];
  });

  // Mock property analysis endpoint
  mock.onGet(/\/properties\/prop_\d+\/analysis$/).reply(200, {
    data: {
      analysis: {
        financial_metrics: {
          cap_rate: 0.052,
          cash_on_cash_return: 0.043,
          five_year_roi: 0.412,
          internal_rate_of_return: 0.092,
        },
        risk_assessment: {
          overall_risk_score: 2.1,
          vacancy_risk: 'low',
          market_volatility: 'medium',
          property_condition: 'good',
        },
        opportunity_score: 8.7,
        ai_recommendations: [
          'Consider negotiating the purchase price down by 3-5% based on comparable sales in the area.',
          'The property shows strong rental income potential with a projected 5% annual increase in rents.',
          'Allocate an additional $5,000 for minor kitchen upgrades to increase rental appeal.',
          'The neighborhood is showing early signs of gentrification, suggesting good appreciation potential.',
        ],
      },
    },
  });

  // Mock portfolio endpoints
  mock.onGet('/portfolios').reply(200, {
    data: {
      portfolios: [
        {
          portfolio_id: 'portfolio_12345',
          name: 'Primary Investment Portfolio',
          total_value: 2750000,
          total_properties: 5,
          cash_flow: 12500,
          cap_rate: 5.45,
          cash_on_cash: 8.2,
          created_at: '2023-01-15T00:00:00Z',
          updated_at: '2023-09-01T00:00:00Z',
        },
      ],
      pagination: {
        total: 1,
        limit: 10,
        offset: 0,
      },
    },
  });

  // Mock portfolio detail endpoint
  mock.onGet(/\/portfolios\/portfolio_\d+$/).reply(200, {
    data: {
      portfolio_id: 'portfolio_12345',
      name: 'Primary Investment Portfolio',
      total_value: 2750000,
      total_properties: 5,
      cash_flow: 12500,
      cap_rate: 5.45,
      cash_on_cash: 8.2,
      created_at: '2023-01-15T00:00:00Z',
      updated_at: '2023-09-01T00:00:00Z',
      properties: [
        {
          id: 1,
          property_id: 'prop_12345',
          address: '123 Main St, Austin, TX',
          purchase_price: 450000,
          current_value: 520000,
          monthly_rent: 2800,
          cap_rate: 5.6,
          cash_flow: 850,
          appreciation: 15.5,
        },
        {
          id: 2,
          property_id: 'prop_23456',
          address: '456 Oak Ave, Dallas, TX',
          purchase_price: 380000,
          current_value: 410000,
          monthly_rent: 2200,
          cap_rate: 5.8,
          cash_flow: 720,
          appreciation: 7.9,
        },
        {
          id: 3,
          property_id: 'prop_34567',
          address: '789 Pine Rd, Houston, TX',
          purchase_price: 620000,
          current_value: 680000,
          monthly_rent: 3500,
          cap_rate: 5.2,
          cash_flow: 1100,
          appreciation: 9.7,
        },
        {
          id: 4,
          property_id: 'prop_45678',
          address: '101 Cedar Ln, San Antonio, TX',
          purchase_price: 520000,
          current_value: 590000,
          monthly_rent: 3100,
          cap_rate: 5.3,
          cash_flow: 950,
          appreciation: 13.5,
        },
        {
          id: 5,
          property_id: 'prop_56789',
          address: '202 Elm Blvd, Fort Worth, TX',
          purchase_price: 480000,
          current_value: 550000,
          monthly_rent: 2900,
          cap_rate: 5.4,
          cash_flow: 880,
          appreciation: 14.6,
        },
      ],
    },
  });

  // Mock market intelligence endpoints
  mock.onGet('/markets/trends').reply(200, {
    data: {
      market_trends: [
        { id: 1, city: 'Austin, TX', priceChange: 8.2, rentChange: 5.7, capRate: 4.8, inventory: 'Low', demand: 'High', forecast: 'Strong growth' },
        { id: 2, city: 'Dallas, TX', priceChange: 6.5, rentChange: 4.9, capRate: 5.1, inventory: 'Medium', demand: 'High', forecast: 'Steady growth' },
        { id: 3, city: 'Houston, TX', priceChange: 5.8, rentChange: 4.2, capRate: 5.3, inventory: 'Medium', demand: 'Medium', forecast: 'Moderate growth' },
        { id: 4, city: 'San Antonio, TX', priceChange: 7.1, rentChange: 4.5, capRate: 5.0, inventory: 'Low', demand: 'Medium', forecast: 'Steady growth' },
        { id: 5, city: 'Fort Worth, TX', priceChange: 6.8, rentChange: 4.7, capRate: 5.2, inventory: 'Low', demand: 'High', forecast: 'Strong growth' },
      ],
    },
  });

  mock.onGet('/markets/emerging').reply(200, {
    data: {
      emerging_markets: [
        { id: 1, city: 'Boise, ID', growthPotential: 'Very High', affordability: 'Medium', jobGrowth: 9.2, population: 7.8, aiScore: 92 },
        { id: 2, city: 'Raleigh, NC', growthPotential: 'High', affordability: 'Medium', jobGrowth: 7.5, population: 6.4, aiScore: 88 },
        { id: 3, city: 'Nashville, TN', growthPotential: 'High', affordability: 'Medium-Low', jobGrowth: 8.1, population: 6.9, aiScore: 86 },
        { id: 4, city: 'Columbus, OH', growthPotential: 'Medium-High', affordability: 'High', jobGrowth: 6.2, population: 4.8, aiScore: 84 },
        { id: 5, city: 'Tampa, FL', growthPotential: 'High', affordability: 'Medium', jobGrowth: 7.8, population: 6.2, aiScore: 83 },
      ],
    },
  });

  // Mock reports endpoints
  mock.onGet('/reports').reply(200, {
    data: {
      reports: [
        {
          report_id: 'report_12345',
          report_type: 'property',
          property_id: 'prop_12345',
          name: '123 Main St Investment Report',
          format: 'pdf',
          download_url: 'https://storage.realestate-ai-platform.com/reports/report_12345.pdf',
          created_at: '2023-05-20T18:00:00Z',
        },
        {
          report_id: 'report_23456',
          report_type: 'portfolio',
          portfolio_id: 'portfolio_12345',
          name: 'Primary Investment Portfolio Report',
          format: 'pdf',
          download_url: 'https://storage.realestate-ai-platform.com/reports/report_23456.pdf',
          created_at: '2023-05-19T14:30:00Z',
        },
        {
          report_id: 'report_34567',
          report_type: 'market',
          location: 'Anytown, CA',
          name: 'Anytown Market Analysis',
          format: 'pdf',
          download_url: 'https://storage.realestate-ai-platform.com/reports/report_34567.pdf',
          created_at: '2023-05-18T10:15:00Z',
        },
      ],
      pagination: {
        total: 3,
        limit: 20,
        offset: 0,
      },
    },
  });

  return mock;
};

export default createMockServer;