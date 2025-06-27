import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import { getUserById } from './user.dal';
import { userIdSchema } from './user.validators';

export const getUserDetailsById = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const parsed = userIdSchema.safeParse(req.params);

    if (!parsed.success) {
      const error = parsed.error.flatten().fieldErrors;

      return apiResponseHandler(res, 400, 'Validation Failed', error);
    }

    const { userId } = parsed.data;

    const userInstance = await getUserById(userId);
    if (!userInstance) {
      return apiResponseHandler(res, 404, `No User with id:${userId} found`);
    }

    return apiResponseHandler(res, 200, 'User Details Fetched Successfully', userInstance);
  }
);
