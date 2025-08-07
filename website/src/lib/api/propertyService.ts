/**
 * Property Service
 * Handles API requests related to properties and property analysis
 */

import { apiClient } from './index';
import { Property, PropertyDetail } from '../mockData';

// Response types
interface PropertyListResponse {
  data: {
    properties: Property[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
    };
  };
}

interface PropertyDetailResponse {
  data: PropertyDetail;
}

// Search parameters interface
export interface PropertySearchParams {
  location?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  min_bathrooms?: number;
  min_square_feet?: number;
  sort_by?: string;
  limit?: number;
  offset?: number;
}

/**
 * Property Service for handling property-related API requests
 */
export const propertyService = {
  /**
   * Get a list of properties based on search criteria
   */
  async getProperties(params: PropertySearchParams = {}): Promise<PropertyListResponse> {
    try {
      return await apiClient.get<PropertyListResponse>('/properties', { params });
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to mock data in case of error
      return {
        data: {
          properties: [], // Return empty array by default
          pagination: {
            total: 0,
            limit: 10,
            offset: 0,
          },
        },
      };
    }
  },

  /**
   * Get detailed information about a specific property
   */
  async getPropertyDetail(propertyId: string): Promise<PropertyDetailResponse> {
    try {
      return await apiClient.get<PropertyDetailResponse>(`/properties/${propertyId}`);
    } catch (error) {
      console.error(`Error fetching property detail for ${propertyId}:`, error);
      // Fallback to mock data in case of error
      return {
        data: {} as PropertyDetail, // Return empty object by default
      };
    }
  },

  /**
   * Get property analysis data
   */
  async getPropertyAnalysis(propertyId: string): Promise<any> {
    try {
      return await apiClient.get<any>(`/properties/${propertyId}/analysis`);
    } catch (error) {
      console.error(`Error fetching property analysis for ${propertyId}:`, error);
      // Return empty object by default
      return { data: {} };
    }
  },

  /**
   * Submit a property for analysis
   */
  async analyzeProperty(propertyData: any): Promise<any> {
    try {
      return await apiClient.post<any>('/properties/analyze', propertyData);
    } catch (error) {
      console.error('Error analyzing property:', error);
      throw error;
    }
  },
};