import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import merge from 'lodash.merge';
import Cookies from 'js-cookie';

export const useAxios = (options?: AxiosRequestConfig) => {
  const defaultOptions = {
    baseURL: 'http://localhost/api', // TODO: Change to env variable
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const client = axios.create(merge(defaultOptions, options));

  client.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    return config;
  });

  return { client };
};
