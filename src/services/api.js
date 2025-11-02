// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log(error.response.data.message || 'Unauthorized. Logging out.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.put(`/auth/reset-password/${token}`, data),
  getMe: () => api.get('/auth/me'),
  updatePassword: (data) => api.put('/auth/update-password', data)
};

// Test API
export const testAPI = {
  getTests: (params) => api.get('/tests', { params }),
  getTest: (id) => api.get(`/tests/${id}`),
  startTest: (id) => api.post(`/tests/${id}/start`),
  submitTest: (id, data) => api.post(`/tests/${id}/submit`, data)
};

// Results API
export const resultAPI = {
  getMyResults: (params) => api.get('/results/my-results', { params }),
  getResult: (id) => api.get(`/results/${id}`),
  getResultWithReview: (id) => api.get(`/results/${id}/review`)
};

// Analytics API
export const analyticsAPI = {
  getMyAnalytics: () => api.get('/analytics/me'),
  getSubjectPerformance: () => api.get('/analytics/subject-performance'),
  getTopicMastery: () => api.get('/analytics/topic-mastery'),
  getWeeklyProgress: (params) => api.get('/analytics/weekly-progress', { params })
};

// User API
export const userAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  updatePreferences: (data) => api.put('/users/preferences', data),
  deleteAccount: () => api.delete('/users/account')
};

// Subject API
export const subjectAPI = {
  getAllSubjects: () => api.get('/subjects'),
  getSubject: (id) => api.get(`/subjects/${id}`),
  createSubject: (data) => api.post('/subjects', data),
  updateSubject: (id, data) => api.put(`/subjects/${id}`, data),
  deleteSubject: (id) => api.delete(`/subjects/${id}`)
};

// Question API
export const questionAPI = {
  getAllQuestions: (params) => api.get('/questions', { params }),
  getQuestion: (id) => api.get(`/questions/${id}`),
  createQuestion: (data) => api.post('/questions', data),
  updateQuestion: (id, data) => api.put(`/questions/${id}`, data),
  deleteQuestion: (id) => api.delete(`/questions/${id}`),
  bulkUploadQuestions: (questions) => api.post('/questions/bulk', { questions }),
  uploadQuestionsFile: (fileData, format) => api.post('/questions/upload', { fileData, format })
};

export default api;