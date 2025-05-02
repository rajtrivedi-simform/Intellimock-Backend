import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getIdFromToken } from '../../utils/jwt/jwt.utils';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import { getUserById } from './user.dal';

export const getUserDetailsById = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = await getIdFromToken(req.cookies.auth);

    if (!userId) {
      return apiResponseHandler(res, 404, 'Unauthorized User');
    }

    const userInstance = await getUserById(userId.userId);

    if (!userInstance) {
      return apiResponseHandler(res, 400, 'No User Found');
    }

    return apiResponseHandler(res, 200, 'User Fetched Successfully', userInstance);
  }
);

export const userProfile = expressAsyncHandler(async (req: Request, res: Response) => {
  const userId = await getIdFromToken(req.cookies.auth)?.userId;

  if (!userId) {
    return apiResponseHandler(res, 404, 'Unauthorized User');
  }

  //Cloud URL, Skills, Experience
  
});
