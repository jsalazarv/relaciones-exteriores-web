import { useAxios } from '../api';
import type { IEmployeeListResponse } from './types';

const { client } = useAxios();

export const useEmployeesService = () => {
  return {
    async fetchAll(): Promise<IEmployeeListResponse> {
      const response = await client.get<IEmployeeListResponse>('/users');
      return response.data;
    },
  };
};
