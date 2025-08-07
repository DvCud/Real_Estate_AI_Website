/**
 * Initialize Mock Server
 * This file initializes the mock server during development
 */

import { apiClient } from './index';
import createMockServer from './mockServer';

// Only initialize the mock server in development and when not in a test environment
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  console.log('Initializing mock API server...');
  createMockServer(apiClient.getAxiosInstance());
}