import { useMutation } from '@tanstack/vue-query';
import { useSignInService } from 'src/services/AuthService';
import type {
  ISignInRequest,
  ISignInResponse,
} from 'src/services/AuthService/types';

export const useSignIn = () => {
  const { signIn } = useSignInService();

  return useMutation({
    mutationFn: (data: ISignInRequest): Promise<ISignInResponse> =>
      signIn(data),
    onError: (error: Error) => {
      console.error(error);
    },
    onSuccess: (data: ISignInRequest) => {
      console.log(data);
    },
  });
};
