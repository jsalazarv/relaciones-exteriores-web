import { useMutation } from '@tanstack/vue-query';
import { useSignInService } from 'src/services/AuthService';
import type {
  ISignInRequest,
  ISignInResponse,
} from 'src/services/AuthService/types';
import Cookies from 'js-cookie';

export const useSignIn = () => {
  const { signIn } = useSignInService();

  const login = useMutation({
    mutationFn: (data: ISignInRequest): Promise<ISignInResponse> =>
      signIn(data),
    onSuccess: (data: ISignInResponse) => {
      Cookies.set('token', data.token);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  return { login };
};
