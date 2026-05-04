import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const { data } = response.data; // Backend uses apiSuccess which puts data inside .data
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    const { data } = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  me: async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getGithubAuthUrl: () => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:3000';
    return `${backendUrl}/api/auth/github/auth`;
  },
};

export default authService;
