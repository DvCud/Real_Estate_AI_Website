/**
 * Report Service
 * Handles API requests related to report generation and retrieval
 */

import { apiClient } from './index';

// Report types
export interface Report {
  report_id: string;
  report_type: 'property' | 'portfolio' | 'market';
  name: string;
  format: 'pdf' | 'csv' | 'xlsx';
  download_url: string;
  created_at: string;
  property_id?: string;
  portfolio_id?: string;
  location?: string;
}

// Response types
interface ReportListResponse {
  data: {
    reports: Report[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
    };
  };
}

interface ReportDetailResponse {
  data: Report;
}

/**
 * Report Service for handling report-related API requests
 */
export const reportService = {
  /**
   * Get a list of reports
   */
  async getReports(params: { 
    report_type?: string; 
    limit?: number; 
    offset?: number 
  } = {}): Promise<ReportListResponse> {
    try {
      return await apiClient.get<ReportListResponse>('/reports', { params });
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Fallback to empty data in case of error
      return {
        data: {
          reports: [],
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
   * Get detailed information about a specific report
   */
  async getReportDetail(reportId: string): Promise<ReportDetailResponse> {
    try {
      return await apiClient.get<ReportDetailResponse>(`/reports/${reportId}`);
    } catch (error) {
      console.error(`Error fetching report detail for ${reportId}:`, error);
      // Return empty data in case of error
      return {
        data: {} as Report,
      };
    }
  },

  /**
   * Generate a property report
   */
  async generatePropertyReport(propertyId: string, options: { 
    format?: 'pdf' | 'csv' | 'xlsx' 
  } = {}): Promise<any> {
    try {
      return await apiClient.post<any>('/reports/property', {
        property_id: propertyId,
        ...options,
      });
    } catch (error) {
      console.error(`Error generating property report for ${propertyId}:`, error);
      throw error;
    }
  },

  /**
   * Generate a portfolio report
   */
  async generatePortfolioReport(portfolioId: string, options: { 
    format?: 'pdf' | 'csv' | 'xlsx' 
  } = {}): Promise<any> {
    try {
      return await apiClient.post<any>('/reports/portfolio', {
        portfolio_id: portfolioId,
        ...options,
      });
    } catch (error) {
      console.error(`Error generating portfolio report for ${portfolioId}:`, error);
      throw error;
    }
  },

  /**
   * Generate a market report
   */
  async generateMarketReport(city: string, state: string, options: { 
    format?: 'pdf' | 'csv' | 'xlsx' 
  } = {}): Promise<any> {
    try {
      return await apiClient.post<any>('/reports/market', {
        city,
        state,
        ...options,
      });
    } catch (error) {
      console.error(`Error generating market report for ${city}, ${state}:`, error);
      throw error;
    }
  },
};