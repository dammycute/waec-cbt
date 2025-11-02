// src/services/testService.js
import api from './api';

const testService = {
  // Get all available tests
  getTests: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.subject) params.append('subject', filters.subject);
      if (filters.type) params.append('type', filters.type);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/tests?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch tests' };
    }
  },

  // Generate a dynamic test
  generateTest: async (testConfig) => {
    try {
      const response = await api.post('/tests/generate', {
        subjectId: testConfig.subjectId,
        type: testConfig.type, // 'quick', 'subject', 'mock'
        questionCount: testConfig.questionCount,
        difficulty: testConfig.difficulty || 'mixed'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to generate test' };
    }
  },

  // Get a specific test by ID
  getTest: async (testId) => {
    try {
      const response = await api.get(`/tests/${testId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch test' };
    }
  },

  // Start a test (for pre-created tests)
  startTest: async (testId) => {
    try {
      const response = await api.post(`/tests/${testId}/start`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to start test' };
    }
  },

  // Submit test answers
  submitTest: async (testId, submission) => {
    try {
      const response = await api.post(`/tests/${testId}/submit`, {
        answers: submission.answers,
        startTime: submission.startTime,
        endTime: submission.endTime,
        testData: submission.testData // For dynamic tests
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit test' };
    }
  },

  // Get subjects for test selection
  getSubjects: async () => {
    try {
      const response = await api.get('/subjects');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch subjects' };
    }
  },

  // Get topics for a subject
  getSubjectTopics: async (subjectId) => {
    try {
      const response = await api.get(`/subjects/${subjectId}/topics`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch topics' };
    }
  }
};

export default testService;