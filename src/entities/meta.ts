interface ILink {
  url: string;
  label: string;
  active: boolean;
}

export interface IMeta {
  current_page: number;
  from: number;
  links: ILink[];
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
