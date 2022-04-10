import { axiosInstance } from './axiosInstance';

export const logIn = async (payload: {
  email: string;
  password: string;
  recaptchaResponse: string;
}) => {
  return await axiosInstance.post('/auth/signin', payload);
};

export const logOut = async () => {
  return await axiosInstance.post('/logout');
};
