import api from './api';

const deploymentService = {
  getDeployments: async (projectId) => {
    const response = await api.get(`/deploy/${projectId}/history`);
    return response.data.data;
  },

  getLogs: async (projectId) => {
    const response = await api.get(`/logs/${projectId}`);
    return response.data.data;
  },

  getStatus: async (projectId) => {
    const response = await api.get(`/status/${projectId}`);
    return response.data.data;
  },

  retryDeployment: async (projectId) => {
    const response = await api.post(`/deploy/${projectId}/retry`);
    return response.data.data;
  },

  rollbackDeployment: async (projectId) => {
    const response = await api.post(`/deploy/${projectId}/rollback`);
    return response.data.data;
  },
};

export default deploymentService;
