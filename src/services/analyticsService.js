import { analyticsAPI, resultAPI } from './api';

export const analyticsService = {
  // Get user analytics
  getAnalytics: async () => {
    try {
      const response = await analyticsAPI.getMyAnalytics();
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },

  // Get recent test attempts
  getRecentTests: async (limit = 5) => {
    try {
      const response = await resultAPI.getMyResults({ 
        limit,
        sort: '-completedAt'
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent tests:', error);
      throw error;
    }
  },

  // Get performance by subject
  getSubjectPerformance: async () => {
    try {
      const response = await analyticsAPI.getSubjectPerformance();
      return response.data;
    } catch (error) {
      console.error('Error fetching subject performance:', error);
      throw error;
    }
  },

  // Get weekly progress
  getWeeklyProgress: async (weeks = 4) => {
    try {
      const response = await analyticsAPI.getWeeklyProgress({ weeks });
      return response.data;
    } catch (error) {
      console.error('Error fetching weekly progress:', error);
      throw error;
    }
  },

  // Get topic mastery
  getTopicMastery: async () => {
    try {
      const response = await analyticsAPI.getTopicMastery();
      return response.data;
    } catch (error) {
      console.error('Error fetching topic mastery:', error);
      throw error;
    }
  }
};