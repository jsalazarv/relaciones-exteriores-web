import { useMutation } from '@tanstack/vue-query';
import Cookies from 'js-cookie';

import { useAuthService } from 'src/services/AuthService';
import type {
  ISignInRequest,
  ISignInResponse,
} from 'src/services/AuthService/types';

export const useAuth = () => {
  const { signIn, verifyToken } = useAuthService();

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

  const verifyAuthentication = async (): Promise<boolean> => {
    const response: boolean = await verifyToken()
      .then((res) => {
        if (res?.message === 'Token is valid.') {
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });

    return response;
  };

  return { login, verifyAuthentication };
};
