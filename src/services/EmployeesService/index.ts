import { useAxios } from '../api';
import type { IEmployeeListResponse, IEmployeeReportResponse } from './types';

const { client } = useAxios();

export const useEmployeesService = () => {
  return {
    async fetchAll(): Promise<IEmployeeListResponse> {
      const response = await client.get<IEmployeeListResponse>('/users');
      return response.data;
    },

    async fetchReport() {
      const response = await client.get<IEmployeeReportResponse>(
        '/users/export'
      );
      return response.data;
    },
  };
};
