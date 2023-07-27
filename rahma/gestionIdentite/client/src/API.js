import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002'; // Update the backend URL if needed

export const API = {
  getAllAssets: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/assets`);
      return { isSuccess: true, data: response.data };
    } catch (error) {
      console.error('Error fetching assets from the backend:', error);
      return { isSuccess: false, data: [], error: error.message };
    }
  },
};
