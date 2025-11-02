import { authAPI } from './api';

export const authService = {
  getCurrentUser: async () => {
    try {
      const response = await authAPI.getMe();
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  updatePassword: async (currentPassword, newPassword) => {
    try {
      const response = await authAPI.updatePassword({
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token'); // Changed from 'authToken'
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token'); // Changed from 'authToken'
  },

  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};