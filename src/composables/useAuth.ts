import { useMutation } from '@tanstack/vue-query';
import Cookies from 'js-cookie';

import { useAuthStore } from 'src/stores/authStore';
import { useAuthService } from 'src/services/AuthService';
import type {
  ISignInRequest,
  ISignInResponse,
} from 'src/services/AuthService/types';

export const useAuth = () => {
  const { signIn, verifyToken } = useAuthService();
  const authStore = useAuthStore();

  const login = useMutation({
    mutationFn: (data: ISignInRequest): Promise<ISignInResponse> =>
      signIn(data),
    onSuccess: (data: ISignInResponse) => {
      Cookies.set('token', data.token);
      authStore.setSessionState(true);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const verifyAuthentication = async (): Promise<boolean> => {
    const response: boolean = await verifyToken()
      .then((res) => {
        if (res?.message === 'Token is valid.') {
          authStore.setSessionState(true);
          return true;
        }
        Cookies.remove('token');
        authStore.setSessionState(false);
        return false;
      })
      .catch(() => {
        Cookies.remove('token');
        authStore.setSessionState(false);
        return false;
      });
    return response;
  };

  return { login, verifyAuthentication };
};
