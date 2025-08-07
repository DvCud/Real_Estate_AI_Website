/**
 * Authentication Service
 * Handles API requests related to user authentication
 */

import { apiClient } from './index';

// User types
export interface User {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
}

// Auth response types
interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
  };
}

interface RegisterResponse {
  data: {
    user: User;
    access_token: string;
  };
}

interface UserResponse {
  data: {
    user: User;
  };
}

/**
 * Authentication Service for handling auth-related API requests
 */
export const authService = {
  /**
   * Log in a user with email and password
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      
      // Store the token for future requests
      if (response.data.access_token) {
        apiClient.setToken(response.data.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   */
  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
      
      // Store the token for future requests
      if (response.data.access_token) {
        apiClient.setToken(response.data.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
      apiClient.clearToken();
    } catch (error) {
      console.error('Logout error:', error);
      // Clear token even if the API call fails
      apiClient.clearToken();
    }
  },

  /**
   * Get the current user's profile
   */
  async getCurrentUser(): Promise<UserResponse> {
    try {
      return await apiClient.get<UserResponse>('/auth/user');
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  /**
   * Request a password reset
   */
  async requestPasswordReset(email: string): Promise<any> {
    try {
      return await apiClient.post('/auth/password/reset', { email });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string, password_confirmation: string): Promise<any> {
    try {
      return await apiClient.post('/auth/password/reset/confirm', {
        token,
        password,
        password_confirmation,
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    // In a browser environment, check for token
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') !== null;
    }
    return false;
  },
};