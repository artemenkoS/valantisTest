import axios, { AxiosInstance } from 'axios';
import { md5 } from 'js-md5';

const PASSWORD = 'Valantis';
const API_URL = 'https://api.valantis.store:41000/';

export interface ApiResponse {
  result: any;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const TIMESTAMP = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const AUTH_STRING = md5(PASSWORD + '_' + TIMESTAMP);

  config.headers['X-Auth'] = AUTH_STRING;

  return config;
});
