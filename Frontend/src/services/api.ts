import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://cortexcart.onrender.com/api/v1/';

// Runtime check: helps diagnose wrong/relative requests in dev
try {
  // eslint-disable-next-line no-console
  console.debug('Resolved API_URL:', API_URL);
} catch (e) {
  // ignore in environments where console is not available
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      try {
        localStorage.removeItem('auth-storage');
      } catch (e) {
        // ignore storage access errors
      }
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
