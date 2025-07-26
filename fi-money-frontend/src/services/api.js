import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Connection endpoints
  connect: async (serverUrl) => {
    const response = await api.post('/connect', { server_url: serverUrl });
    return response.data;
  },

  disconnect: async () => {
    const response = await api.post('/disconnect');
    return response.data;
  },

  getStatus: async () => {
    const response = await api.get('/status');
    return response.data;
  },

  // Tools endpoints
  listTools: async () => {
    const response = await api.get('/tools');
    return response.data;
  },

  callTool: async (toolName, arguments1) => {
    const response = await api.post('/tools/call', {
      tool_name: toolName,
      arguments1: arguments1,
    });
    return response.data;
  },

  // Resources endpoints
  listResources: async () => {
    const response = await api.get('/resources');
    return response.data;
  },

  readResource: async (resourceUri) => {
    const response = await api.post('/resources/read', {
      resource_uri: resourceUri,
    });
    return response.data;
  },

  // Query endpoint
  processQuery: async (query) => {
    const response = await api.post('/query', { query });
    return response.data;
  },
};

export default apiService;