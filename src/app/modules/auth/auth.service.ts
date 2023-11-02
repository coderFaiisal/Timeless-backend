import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import {
  IRefreshTokenResponse,
  ISignIn,
  ISignInResponse,
  ISignUpUserResponse,
} from '../../../interfaces/common';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const signUpUser = async (user: IUser): Promise<ISignUpUserResponse> => {
  //set user role
  user.role = 'user';

  const isExist = await User.findOne({
    email: user.email,
  }).lean();

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exist!');
  }

  const createdUser = await User.create(user);

  //create jwt token
  const { email, role } = createdUser;

  const accessToken = jwtHelper.createToken(
    {
      email,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    {
      email,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    createdUser,
    accessToken,
    refreshToken,
  };
};

const signInUser = async (payload: ISignIn): Promise<ISignInResponse> => {
  const { email: userEmail, password } = payload;

  //check user
  const isUserExist = await User.isUserExist(userEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  //check password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist?.password as string,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create jwt token

  const { email, role } = isUserExist;

  const accessToken = jwtHelper.createToken(
    {
      email,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    {
      email,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (
  payload: string,
): Promise<IRefreshTokenResponse> => {
  let verifiedUser = null;

  try {
    verifiedUser = jwtHelper.verifyToken(
      payload,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token!');
  }

  const { email, role } = verifiedUser;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  const accessToken = jwtHelper.createToken(
    {
      email,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  signUpUser,
  signInUser,
  refreshToken,
};
