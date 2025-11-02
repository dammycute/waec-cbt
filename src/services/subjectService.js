// src/services/subjectService.js
import { subjectAPI } from './api';

const subjectService = {
  // Get all subjects
  getAllSubjects: async () => {
    try {
      const response = await subjectAPI.getAllSubjects();
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch subjects' };
    }
  },

  // Get single subject by ID
  getSubject: async (id) => {
    try {
      const response = await subjectAPI.getSubject(id);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch subject' };
    }
  },

  // Create new subject
  createSubject: async (subjectData) => {
    try {
      const response = await subjectAPI.createSubject(subjectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create subject' };
    }
  },

  // Update existing subject
  updateSubject: async (id, subjectData) => {
    try {
      const response = await subjectAPI.updateSubject(id, subjectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update subject' };
    }
  },

  // Delete subject
  deleteSubject: async (id) => {
    try {
      const response = await subjectAPI.deleteSubject(id);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete subject' };
    }
  }
};

export default subjectService;