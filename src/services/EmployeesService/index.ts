import { useAxios } from '../api';
import type {
  IEmployeeListResponse,
  IEmployeeReportResponse,
  IDeleteEmployeeResponse,
} from './types';

const { client } = useAxios();

export const useEmployeesService = () => {
  return {
    async fetchAll(): Promise<IEmployeeListResponse> {
      const response = await client.get<IEmployeeListResponse>('/users');
      return response.data;
    },

    async deleteEmployee(id: number): Promise<IDeleteEmployeeResponse> {
      const response = await client.delete<IDeleteEmployeeResponse>(
        `/users/${id}`
      );
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
