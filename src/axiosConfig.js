import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

const setAxiosInterceptors = () => {
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export default setAxiosInterceptors;