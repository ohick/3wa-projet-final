import axios from 'axios';

const axiosWrapper = async (axiosConfig) => {
  const baseUrl = 'http://localhost:5000';
  const response = await axios({
    url: baseUrl + axiosConfig.url,
    method: axiosConfig.method,
    data: axiosConfig.data,
    headers: axiosConfig.headers,
    params: axiosConfig.params,
    validateStatus(status) {
      return status < 500;
    },
    withCredentials: true,
  });

  return response;
};

export default axiosWrapper;
