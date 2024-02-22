import { useQuery } from '@tanstack/vue-query';
import { useEmployeesService } from 'src/services/EmployeesService';
import type { IEmployeeListResponse } from 'src/services/EmployeesService/types';

export const useEmployee = () => {
  const { fetchAll } = useEmployeesService();

  return useQuery<IEmployeeListResponse>({
    queryKey: ['employees'],
    queryFn: fetchAll,
  });
};

export const useEmployeeReport = () => {
  const { fetchReport } = useEmployeesService();

  return useQuery({
    queryKey: ['employee-report'],
    queryFn: fetchReport,
  });
};
