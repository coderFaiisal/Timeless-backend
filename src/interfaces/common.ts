import { IUser } from '../app/modules/user/user.interface';
import { IGenericErrorMessage } from './error';

export type IUserSignUpResponse = {
  createdUser: IUser;
  accessToken: string;
  refreshToken?: string;
};

export type ISignIn = {
  email: string;
  password: string;
};

export type ISignInResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
