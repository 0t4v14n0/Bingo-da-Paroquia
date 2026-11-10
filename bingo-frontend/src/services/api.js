import axios from 'axios';

const api = axios.create({
  // Coloque o link do seu ngrok do backend aqui (sem a barra no final)
  baseURL: 'https://nondualistically-ostensive-luella.ngrok-free.dev', 
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': 'true' // 🔥 Pula a tela de aviso do ngrok
  }
});

api.interceptors.request.use(
  (config) => {
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
      localStorage.removeItem('bingo_token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;