/**
 * Market Service
 * Handles API requests related to market intelligence and analytics
 */

import { apiClient } from './index';

// Market data types
export interface MarketTrend {
  id: number;
  city: string;
  priceChange: number;
  rentChange: number;
  capRate: number;
  inventory: string;
  demand: string;
  forecast: string;
}

export interface EmergingMarket {
  id: number;
  city: string;
  growthPotential: string;
  affordability: string;
  jobGrowth: number;
  population: number;
  aiScore: number;
}

export interface MarketDetail {
  city: string;
  state: string;
  population: number;
  median_home_price: number;
  median_rent: number;
  price_to_rent_ratio: number;
  price_trends: {
    one_month: number;
    three_month: number;
    one_year: number;
    five_year: number;
  };
  rent_trends: {
    one_month: number;
    three_month: number;
    one_year: number;
    five_year: number;
  };
  economic_indicators: {
    unemployment_rate: number;
    job_growth: number;
    income_growth: number;
    population_growth: number;
  };
  forecast: {
    price_appreciation: number;
    rent_growth: number;
    vacancy_rate: number;
    confidence: string;
  };
}

// Response types
interface MarketTrendsResponse {
  data: {
    market_trends: MarketTrend[];
  };
}

interface EmergingMarketsResponse {
  data: {
    emerging_markets: EmergingMarket[];
  };
}

interface MarketDetailResponse {
  data: MarketDetail;
}

/**
 * Market Service for handling market intelligence API requests
 */
export const marketService = {
  /**
   * Get current market trends for key markets
   */
  async getMarketTrends(): Promise<MarketTrendsResponse> {
    try {
      return await apiClient.get<MarketTrendsResponse>('/markets/trends');
    } catch (error) {
      console.error('Error fetching market trends:', error);
      // Fallback to empty data in case of error
      return {
        data: {
          market_trends: [],
        },
      };
    }
  },

  /**
   * Get emerging markets with high growth potential
   */
  async getEmergingMarkets(): Promise<EmergingMarketsResponse> {
    try {
      return await apiClient.get<EmergingMarketsResponse>('/markets/emerging');
    } catch (error) {
      console.error('Error fetching emerging markets:', error);
      // Fallback to empty data in case of error
      return {
        data: {
          emerging_markets: [],
        },
      };
    }
  },

  /**
   * Get detailed information about a specific market
   */
  async getMarketDetail(city: string, state: string): Promise<MarketDetailResponse> {
    try {
      return await apiClient.get<MarketDetailResponse>('/markets/detail', {
        params: { city, state },
      });
    } catch (error) {
      console.error(`Error fetching market detail for ${city}, ${state}:`, error);
      // Return empty data in case of error
      return {
        data: {} as MarketDetail,
      };
    }
  },

  /**
   * Get market comparison data for multiple markets
   */
  async compareMarkets(markets: string[]): Promise<any> {
    try {
      return await apiClient.get<any>('/markets/compare', {
        params: { markets: markets.join(',') },
      });
    } catch (error) {
      console.error('Error comparing markets:', error);
      // Return empty data in case of error
      return { data: {} };
    }
  },

  /**
   * Get market forecast for a specific timeframe
   */
  async getMarketForecast(city: string, state: string, timeframe: string = '1year'): Promise<any> {
    try {
      return await apiClient.get<any>('/markets/forecast', {
        params: { city, state, timeframe },
      });
    } catch (error) {
      console.error(`Error fetching market forecast for ${city}, ${state}:`, error);
      // Return empty data in case of error
      return { data: {} };
    }
  },
};