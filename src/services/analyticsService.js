// src/services/analyticsService.js - UPDATED VERSION
import { analyticsAPI, resultAPI } from './api';
import api from './api';

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
      const response = await analyticsAPI.getRecentTests({ limit });
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
  },

  // NEW: Get focus areas with practice recommendations
  getFocusAreas: async () => {
    try {
      const response = await api.get('/analytics/focus-areas');
      return response.data;
    } catch (error) {
      console.error('Error fetching focus areas:', error);
      throw error;
    }
  },

  // NEW: Generate topic-specific practice test
  generateTopicPractice: async (subjectId, topic, questionCount = 10, difficulty = 'mixed') => {
    try {
      const response = await api.post('/tests/generate-topic-practice', {
        subjectId,
        topic,
        questionCount,
        difficulty
      });
      return response.data;
    } catch (error) {
      console.error('Error generating topic practice:', error);
      throw error;
    }
  },

  // NEW: Get subject topics with performance
  getSubjectTopics: async (subjectId) => {
    try {
      const response = await api.get(`/tests/topics/${subjectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subject topics:', error);
      throw error;
    }
  }
};