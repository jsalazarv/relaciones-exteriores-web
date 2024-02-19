import { IEmployee } from 'src/entities/employee';
import { ILinks } from 'src/entities/links';
import { IMeta } from 'src/entities/meta';

export interface IEmployeeListResponse {
  data: IEmployee[];
  links: ILinks;
  meta: IMeta;
}
