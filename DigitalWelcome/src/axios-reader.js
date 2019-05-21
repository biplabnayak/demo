import axios from 'axios';

const instance = axios.create({
  baseURL: "http://52.32.34.54:8080/message"
});

instance.interceptors.response.use((response) => {
    if (response.data.metrics.length) {
      throw new axios.Cancel('Operation canceled by the user.');
    } else {
      return response;
    }
  }, (error) => {
    return Promise.reject(error);
});

export default instance;