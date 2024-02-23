import { useAxios } from '../api';
import type {
  ISignInRequest,
  ISignInResponse,
  IVerifyTokenResponse,
} from './types';

const { client } = useAxios();

export const useAuthService = () => {
  return {
    async signIn(data: ISignInRequest): Promise<ISignInResponse> {
      const response = await client.post<ISignInResponse>('/login', data);
      return response.data;
    },

    async verifyToken(): Promise<IVerifyTokenResponse> {
      const response = await client.get<IVerifyTokenResponse>('/verify-token');
      return response.data;
    },
  };
};
