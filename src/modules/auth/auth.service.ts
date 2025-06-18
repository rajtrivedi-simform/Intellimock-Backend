import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { userCreation, getUserByEmail } from './auth.dal';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt/jwt.utils';
import { userLoginSchema, userRegisterSchema } from './auth.validators';

export const userLogin = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const parsed = userLoginSchema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error.flatten().fieldErrors;
    return apiResponseHandler(res, 400, 'Validation Failed', error);
  }

  const { userEmail, userPassword } = parsed.data;

  if (!userEmail || !userPassword) {
    return apiResponseHandler(res, 401, 'Email & Password are required to Login');
  }

  const userInstance = await getUserByEmail(userEmail);

  if (!userInstance) {
    return apiResponseHandler(res, 401, `No User with ${userEmail} found!`);
  }

  const isValidPassword: boolean = await argon2.verify(userInstance.userPassword, userPassword);

  if (!isValidPassword) {
    return apiResponseHandler(res, 401, 'Invalid Credentials');
  }

  const authToken = generateAccessToken({ userId: userInstance.userId });
  const refreshToken = generateRefreshToken({ userId: userInstance.userId });

  res.cookie('auth', authToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refresh', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return apiResponseHandler(res, 200, 'Login Successful!');
});

export const userRegister = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = userRegisterSchema.safeParse(req.body);

      if (!parsed.success) {
        const error = parsed.error.flatten().fieldErrors;
        return apiResponseHandler(res, 400, 'Validation Failed', error);
      }
      const { userEmail, userPassword, confirmPassword, userFullName } = parsed.data;

      if (!userEmail || !userPassword || !confirmPassword || !userFullName) {
        return apiResponseHandler(
          res,
          400,
          'E-Mail, Password and FullName are required for Registeration'
        );
      }

      const userInstance = await getUserByEmail(userEmail);

      if (userInstance) {
        return apiResponseHandler(res, 400, 'Email already exists!');
      }

      const newUser = userCreation(userEmail, userPassword, userFullName);

      if (!newUser) {
        return apiResponseHandler(res, 400, 'Error Creating User!');
      }

      return apiResponseHandler(res, 201, 'Successfully Created New User!');
    } catch (error) {
      console.error(error);
      return apiResponseHandler(res, 500, 'Internal Server Error!');
    }
  }
);

export const authStatus = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.cookies.auth) {
      if (req.cookies.refresh) {
        const decoded = jwt.decode(req.cookies.refresh) as { userId: string };

        const newAccessToken = generateAccessToken({ userId: decoded.userId });

        res.cookie('auth', newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 15 * 60 * 1000,
        });

        return apiResponseHandler(res, 200, 'User Logged In with new Access Token');
      }

      return apiResponseHandler(res, 401, 'User Not Logged In');
    }

    return apiResponseHandler(res, 200, 'User Logged In');
  }
);

export const logout = expressAsyncHandler(async (req: Request, res: Response) => {
  res.cookie('auth', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000,
  });
  res.cookie('refresh', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000,
  });

  return apiResponseHandler(res, 200, 'Logout Successful');
});
