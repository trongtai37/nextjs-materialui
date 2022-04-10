import { logIn, logOut } from '@/services/index';
import { useMutation, useQueryClient } from 'react-query';

export const useAuthentication = () => {
  const queryClient = useQueryClient();

  const logInMutation = useMutation(logIn, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      queryClient.setQueryData(['user_authentication'], data.data.user);
    },
  });

  const logOutMutation = useMutation(logOut, {
    onSuccess: () => {
      queryClient.setQueryData(['user_authentication'], null);
    },
  });

  return {
    isLoggingIn: logInMutation.isLoading,
    isLoggingOut: logOutMutation.isLoading,
    logIn: logInMutation.mutateAsync,
    logOut: logOutMutation.mutateAsync,
    user: queryClient.getQueryData(['user_authentication']),
  };
};
