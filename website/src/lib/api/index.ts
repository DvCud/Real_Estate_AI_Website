/**
 * API Service for the Real Estate AI Investment Platform
 * This file exports the main API client and related utilities
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Property, PropertyDetail } from '../mockData';

// API Base URLs for different environments
const API_URLS = {
  production: 'https://api.realestate-ai-platform.com/v1',
  staging: 'https://staging-api.realestate-ai-platform.com/v1',
  development: 'https://dev-api.realestate-ai-platform.com/v1',
  // Use mock API for local development if no environment variable is set
  local: 'http://localhost:3001/api',
};

// Get the appropriate API URL based on environment
const getApiBaseUrl = (): string => {
  const env = process.env.NEXT_PUBLIC_API_ENV || 'local';
  return API_URLS[env as keyof typeof API_URLS];
};

/**
 * API Client for making requests to the Real Estate AI API
 */
export class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: getApiBaseUrl(),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle specific error cases (e.g., 401 unauthorized)
        if (error.response && error.response.status === 401) {
          // Clear token and redirect to login
          this.clearToken();
          // In a real app, you might want to redirect to login page
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Get the axios instance for testing or mocking
   */
  getAxiosInstance(): AxiosInstance {
    return this.client;
  }

  /**
   * Set the authentication token for API requests
   */
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear the authentication token
   */
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  /**
   * Initialize the API client with a stored token if available
   */
  init(): void {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        this.token = storedToken;
      }
    }
  }

  /**
   * Make a GET request to the API
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  /**
   * Make a POST request to the API
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  /**
   * Make a PUT request to the API
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  /**
   * Make a DELETE request to the API
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

// Create and export a singleton instance of the API client
export const apiClient = new ApiClient();

// Initialize the client when imported
apiClient.init();