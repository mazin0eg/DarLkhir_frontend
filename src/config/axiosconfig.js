import axios from "axios";

const BASE_URLS = {
  auth: 'http://localhost:3001/api/v1/auth',
  darna: 'http://localhost:3000/api',
  tirelire: 'http://localhost:3002'
};

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const authApi = createAxiosInstance(BASE_URLS.auth);
export const darnaApi = createAxiosInstance(BASE_URLS.darna);
export const tirelireApi = createAxiosInstance(BASE_URLS.tirelire);
