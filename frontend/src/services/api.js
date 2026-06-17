import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://a-steam-data-anisha-chhajer.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response) {
      const message = error.response.data.message || error.response.data || 'An error occurred';
      toast.error(typeof message === 'string' ? message : 'An error occurred');
    } else {
      toast.error('Network error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default api;
