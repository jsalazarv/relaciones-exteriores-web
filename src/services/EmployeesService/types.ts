import { IEmployee } from 'src/entities/employee';
import { ILinks } from 'src/entities/links';
import { IMeta } from 'src/entities/meta';

export interface IEmployeeListResponse {
  data: IEmployee[];
  links: ILinks;
  meta: IMeta;
}

export interface IEditEmployeeResponse {
  data: IEmployee;
}

export interface IDeleteEmployeeResponse {
  message: string;
}
export interface IEmployeeReportResponse {
  data: File;
}
