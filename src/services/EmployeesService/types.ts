import { f } from '@tanstack/vue-query/build/legacy/useQuery-8rmWO98w';
import { IEmployee } from 'src/entities/employee';
import { ILinks } from 'src/entities/links';
import { IMeta } from 'src/entities/meta';

export interface IEmployeeListResponse {
  data: IEmployee[];
  links: ILinks;
  meta: IMeta;
}

export interface IEmployeeReportResponse {
  data: File;
}
