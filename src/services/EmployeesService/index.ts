import { useAxios } from '../api';
import type { IEmployee } from 'src/entities/employee';
import type {
  IEmployeeListResponse,
  IEmployeeReportResponse,
  IEditEmployeeResponse,
  IDeleteEmployeeResponse,
} from './types';

const { client } = useAxios();

export const useEmployeesService = () => {
  return {
    async fetchAll(): Promise<IEmployeeListResponse> {
      const response = await client.get<IEmployeeListResponse>('/users');
      return response.data;
    },

    async editEmployee(
      employeeData: Partial<IEmployee>
    ): Promise<IEditEmployeeResponse> {
      const response = await client.put<IEditEmployeeResponse>(
        `/users/${employeeData.id}`,
        employeeData
      );
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
