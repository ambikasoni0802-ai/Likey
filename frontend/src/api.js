import axios from 'axios';

// Yahan apna Render backend ka link daala hua hai
const API_BASE = 'https://likey-2.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE
});

// Har request ke saath token bhejo agar login hai
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

