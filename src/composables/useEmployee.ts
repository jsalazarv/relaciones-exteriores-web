import { useMutation, useQuery } from '@tanstack/vue-query';
import { useEmployeesService } from 'src/services/EmployeesService';
import type { IEmployee } from 'src/entities/employee';
import type {
  IEmployeeListResponse,
  IDeleteEmployeeResponse,
  IEditEmployeeResponse,
} from 'src/services/EmployeesService/types';

export const useEmployee = () => {
  const { fetchAll } = useEmployeesService();

  return useQuery<IEmployeeListResponse>({
    queryKey: ['employees'],
    queryFn: fetchAll,
  });
};

export const useEmployeeEdit = () => {
  const { editEmployee } = useEmployeesService();

  return useMutation({
    mutationFn: (
      employeeData: Partial<IEmployee>
    ): Promise<IEditEmployeeResponse> => editEmployee(employeeData),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      console.log('Employee edited');
    },
  });
};

export const useEmployeeDelete = () => {
  const { deleteEmployee } = useEmployeesService();

  return useMutation({
    mutationFn: (employeeId: number): Promise<IDeleteEmployeeResponse> =>
      deleteEmployee(employeeId),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      console.log('Employee deleted');
    },
  });
};

export const useEmployeeReport = () => {
  const { fetchReport } = useEmployeesService();

  return useQuery({
    queryKey: ['employee-report'],
    queryFn: fetchReport,
  });
};
