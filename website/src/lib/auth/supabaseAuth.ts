import { supabase } from '../supabase';

/**
 * Supabase Authentication Service
 */
export const supabaseAuth = {
  /**
   * Sign up a new user
   */
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      console.error('Error signing up:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Sign in a user
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Error signing in:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Sign out the current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
    
    return true;
  },

  /**
   * Get the current user session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Get the current user
   */
  async getUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Reset password
   */
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Update user password
   */
  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    
    if (error) {
      console.error('Error updating password:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Update user email
   */
  async updateEmail(email: string) {
    const { data, error } = await supabase.auth.updateUser({
      email,
    });
    
    if (error) {
      console.error('Error updating email:', error);
      throw error;
    }
    
    return data;
  },

  /**
   * Set up auth state change listener
   */
  onAuthStateChange(callback: (event: any, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};