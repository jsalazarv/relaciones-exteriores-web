import { useAxios } from '../api';
import type { ISignInRequest, ISignInResponse } from './types';

const { client } = useAxios();

export const useSignInService = () => {
  return {
    async signIn(data: ISignInRequest): Promise<ISignInResponse> {
      const response = await client.post<ISignInResponse>('/login', data);
      return response.data;
    },
  };
};
