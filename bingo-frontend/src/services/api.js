import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nondualistically-ostensive-luella.ngrok-free.dev/',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    // 🔥 CORREÇÃO: Lendo exatamente a mesma chave que o App.jsx salva
    const token = localStorage.getItem('bingo_token');
    
    if (token && !config.url.includes('/login')) {
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
    if (error.response && error.response.status === 401) {
      // 🔥 CORREÇÃO: Removendo a mesma chave se o token expirar
      localStorage.removeItem('bingo_token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;