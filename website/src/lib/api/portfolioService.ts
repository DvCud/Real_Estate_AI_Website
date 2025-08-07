/**
 * Portfolio Service
 * Handles API requests related to user portfolios
 */

import { apiClient } from './index';

// Portfolio types
export interface Portfolio {
  portfolio_id: string;
  name: string;
  total_value: number;
  total_properties: number;
  cash_flow: number;
  cap_rate: number;
  cash_on_cash: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProperty {
  id: number;
  property_id: string;
  address: string;
  purchase_price: number;
  current_value: number;
  monthly_rent: number;
  cap_rate: number;
  cash_flow: number;
  appreciation: number;
}

export interface PortfolioDetail extends Portfolio {
  properties: PortfolioProperty[];
}

// Response types
interface PortfolioListResponse {
  data: {
    portfolios: Portfolio[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
    };
  };
}

interface PortfolioDetailResponse {
  data: PortfolioDetail;
}

/**
 * Portfolio Service for handling portfolio-related API requests
 */
export const portfolioService = {
  /**
   * Get a list of user portfolios
   */
  async getPortfolios(params: { limit?: number; offset?: number } = {}): Promise<PortfolioListResponse> {
    try {
      return await apiClient.get<PortfolioListResponse>('/portfolios', { params });
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      // Fallback to empty data in case of error
      return {
        data: {
          portfolios: [],
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
   * Get detailed information about a specific portfolio
   */
  async getPortfolioDetail(portfolioId: string): Promise<PortfolioDetailResponse> {
    try {
      return await apiClient.get<PortfolioDetailResponse>(`/portfolios/${portfolioId}`);
    } catch (error) {
      console.error(`Error fetching portfolio detail for ${portfolioId}:`, error);
      // Return empty data in case of error
      return {
        data: {
          portfolio_id: '',
          name: '',
          total_value: 0,
          total_properties: 0,
          cash_flow: 0,
          cap_rate: 0,
          cash_on_cash: 0,
          created_at: '',
          updated_at: '',
          properties: [],
        },
      };
    }
  },

  /**
   * Create a new portfolio
   */
  async createPortfolio(portfolioData: { name: string }): Promise<any> {
    try {
      return await apiClient.post<any>('/portfolios', portfolioData);
    } catch (error) {
      console.error('Error creating portfolio:', error);
      throw error;
    }
  },

  /**
   * Add a property to a portfolio
   */
  async addPropertyToPortfolio(portfolioId: string, propertyId: string): Promise<any> {
    try {
      return await apiClient.post<any>(`/portfolios/${portfolioId}/properties`, { property_id: propertyId });
    } catch (error) {
      console.error(`Error adding property ${propertyId} to portfolio ${portfolioId}:`, error);
      throw error;
    }
  },

  /**
   * Remove a property from a portfolio
   */
  async removePropertyFromPortfolio(portfolioId: string, propertyId: string): Promise<any> {
    try {
      return await apiClient.delete<any>(`/portfolios/${portfolioId}/properties/${propertyId}`);
    } catch (error) {
      console.error(`Error removing property ${propertyId} from portfolio ${portfolioId}:`, error);
      throw error;
    }
  },

  /**
   * Get portfolio performance metrics
   */
  async getPortfolioPerformance(portfolioId: string, timeframe: string = 'all'): Promise<any> {
    try {
      return await apiClient.get<any>(`/portfolios/${portfolioId}/performance`, { params: { timeframe } });
    } catch (error) {
      console.error(`Error fetching portfolio performance for ${portfolioId}:`, error);
      // Return empty data in case of error
      return { data: {} };
    }
  },
};