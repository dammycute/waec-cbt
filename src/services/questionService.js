// src/services/questionService.js
import { questionAPI } from './api';

const questionService = {
  // Get all questions with filters
  getAllQuestions: async (filters = {}) => {
    try {
      const params = {};
      
      if (filters.subject) params.subject = filters.subject;
      if (filters.topic) params.topic = filters.topic;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      
      const response = await questionAPI.getAllQuestions(params);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch questions' };
    }
  },

  // Get single question by ID
  getQuestion: async (id) => {
    try {
      const response = await questionAPI.getQuestion(id);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch question' };
    }
  },

  // Create new question
  createQuestion: async (questionData) => {
    try {
      const response = await questionAPI.createQuestion(questionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create question' };
    }
  },

  // Update existing question
  updateQuestion: async (id, questionData) => {
    try {
      const response = await questionAPI.updateQuestion(id, questionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update question' };
    }
  },

  // Delete question
  deleteQuestion: async (id) => {
    try {
      const response = await questionAPI.deleteQuestion(id);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete question' };
    }
  },

  // Bulk upload questions
  bulkUploadQuestions: async (questions) => {
    try {
      const response = await questionAPI.bulkUploadQuestions(questions);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload questions' };
    }
  },

  // Upload questions from file
  uploadQuestionsFile: async (fileData, format = 'json') => {
    try {
      const response = await questionAPI.uploadQuestionsFile(fileData, format);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload file' };
    }
  },

  // Get questions for a specific subject
  getQuestionsBySubject: async (subjectId, filters = {}) => {
    try {
      const params = { subject: subjectId };
      
      if (filters.topic) params.topic = filters.topic;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      
      const response = await questionAPI.getAllQuestions(params);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch questions' };
    }
  },

  // Get questions by topic
  getQuestionsByTopic: async (subjectId, topic, filters = {}) => {
    try {
      const params = { 
        subject: subjectId,
        topic: topic 
      };
      
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      
      const response = await questionAPI.getAllQuestions(params);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch questions' };
    }
  }
};

export default questionService;