import api from './api';

const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data.data.projects;
  },

  getProject: async (projectId) => {
    const response = await api.get(`/deploy/${projectId}`);
    return response.data.data;
  },

  createProject: async (projectData) => {
    const response = await api.post('/deploy', projectData);
    return response.data.data;
  },

  deleteProject: async (projectId) => {
    const response = await api.delete(`/deploy/${projectId}`);
    return response.data;
  },
};

export default projectService;
