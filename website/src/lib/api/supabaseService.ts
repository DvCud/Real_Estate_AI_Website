import { supabase } from '../supabase';

/**
 * Service for handling Supabase database operations
 */
export const supabaseService = {
  /**
   * Fetch properties from Supabase
   */
  async getProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*');
    
    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Fetch a single property by ID
   */
  async getPropertyById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching property with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },

  /**
   * Save a property analysis
   */
  async saveAnalysis(analysisData: any) {
    const { data, error } = await supabase
      .from('analyses')
      .insert(analysisData)
      .select();
    
    if (error) {
      console.error('Error saving analysis:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Fetch analyses for a user
   */
  async getUserAnalyses(userId: string) {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error(`Error fetching analyses for user ${userId}:`, error);
      throw error;
    }
    
    return data;
  },

  /**
   * Fetch reports for a user
   */
  async getUserReports(userId: string) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error(`Error fetching reports for user ${userId}:`, error);
      throw error;
    }
    
    return data;
  },

  /**
   * Generate a new report
   */
  async generateReport(reportData: any) {
    const { data, error } = await supabase
      .from('reports')
      .insert(reportData)
      .select();
    
    if (error) {
      console.error('Error generating report:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Schedule a report
   */
  async scheduleReport(scheduleData: any) {
    const { data, error } = await supabase
      .from('scheduled_reports')
      .insert(scheduleData)
      .select();
    
    if (error) {
      console.error('Error scheduling report:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Add a property to user portfolio
   */
  async addToPortfolio(portfolioData: any) {
    const { data, error } = await supabase
      .from('portfolio')
      .insert(portfolioData)
      .select();
    
    if (error) {
      console.error('Error adding to portfolio:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Fetch user portfolio
   */
  async getUserPortfolio(userId: string) {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*, properties(*)')
      .eq('user_id', userId);
    
    if (error) {
      console.error(`Error fetching portfolio for user ${userId}:`, error);
      throw error;
    }
    
    return data;
  },

  /**
   * Fetch market intelligence data
   */
  async getMarketData(region: string) {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('region', region);
    
    if (error) {
      console.error(`Error fetching market data for region ${region}:`, error);
      throw error;
    }
    
    return data;
  }
};