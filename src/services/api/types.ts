export interface Service<T> {
  fetchAll: () => Promise<T>;
  fetchOne: (id: number | string) => Promise<T>;
  //fetchData: () => Promise<T>;
  //createOne: <D= Record<string, unknown>>(data: D )=> Promise<T>
}
