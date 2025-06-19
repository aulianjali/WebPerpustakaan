import axios from 'axios';
import { API_URL } from './constant';


export const apiClient = axios.create({
  baseURL: API_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - auto attach token ke setiap request
apiClient.interceptors.request.use(
  (config) => {
    // Cek apakah di browser (bukan server-side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle error responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect ke login
    if (error.response?.status === 401) {
      // Clear token kalau unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      // Optional: redirect ke login page
      // window.location.href = '/login';
    }
    
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;