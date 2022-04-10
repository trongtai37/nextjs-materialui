import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
