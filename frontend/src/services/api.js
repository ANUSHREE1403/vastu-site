import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vastu-shakti-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vastu-shakti-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.user;
  },
};

// Consultation Service
export const consultationService = {
  bookConsultation: async (consultationData) => {
    const response = await api.post('/consultations/book', consultationData);
    return response.data;
  },

  getMyConsultations: async () => {
    const response = await api.get('/consultations/my-consultations');
    return response.data;
  },

  getConsultation: async (id) => {
    const response = await api.get(`/consultations/${id}`);
    return response.data;
  },
};

// Blog Service
export const blogService = {
  getBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  getBlog: async (slug, language = 'en') => {
    const response = await api.get(`/blogs/${slug}`, {
      params: { language }
    });
    return response.data;
  },
};

// Chat Service
export const chatService = {
  sendMessage: async (message, sessionId, language = 'en') => {
    const response = await api.post('/chat/message', {
      message,
      sessionId,
      language
    });
    return response.data;
  },

  getChatHistory: async (sessionId) => {
    const response = await api.get(`/chat/history/${sessionId}`);
    return response.data;
  },
};

// Admin Service
export const adminService = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getConsultations: async (params = {}) => {
    const response = await api.get('/admin/consultations', { params });
    return response.data;
  },

  updateConsultationStatus: async (id, statusData) => {
    const response = await api.put(`/admin/consultations/${id}/status`, statusData);
    return response.data;
  },
};

// Contact Service
export const contactService = {
  submitInquiry: async (inquiryData) => {
    const response = await api.post('/contact/inquiry', inquiryData);
    return response.data;
  },

  submitFeedback: async (feedbackData) => {
    const response = await api.post('/contact/feedback', feedbackData);
    return response.data;
  },
};

export default api;

