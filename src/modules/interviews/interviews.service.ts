import { Request, Response } from 'express';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import expressAsyncHandler from 'express-async-handler';
import { mockInterviewSchema } from './interviews.validators';
import { createInterview, getInterviewsByUserId } from './interviews.dal';
import { getIdFromToken } from '../../utils/jwt/jwt.utils';

export const generateInterview = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const parsed = mockInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return apiResponseHandler(res, 400, 'Validation Failed', parsed.error.flatten().fieldErrors);
    }

    const { interviewId, interviewType, level, skill } = parsed.data;

    console.log(req.cookies.auth);
    const userId = (await getIdFromToken(req.cookies.auth))?.userId;
    console.log('userId', userId);
    if (!userId) {
      return apiResponseHandler(res, 401, 'Unauthorized');
    }

    const interviewInstance = await createInterview({
      interviewId,
      interviewType,
      level,
      userId: userId,
      skill,
    });

    if (!interviewInstance) {
      return apiResponseHandler(res, 500, 'Internal Server Error');
    }

    return apiResponseHandler(res, 201, 'Mock Interview Created Successfully', interviewInstance);
  }
);

export const getInterviews = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (await getIdFromToken(req.cookies.auth))?.userId;
    if (!userId) {
      return apiResponseHandler(res, 401, 'Unauthorized');
    }

    const interviewsInstance = await getInterviewsByUserId(userId);

    if (!interviewsInstance) {
      return apiResponseHandler(res, 404, 'Interviews not found');
    }

    return apiResponseHandler(res, 200, 'Interviews fetched successfully', interviewsInstance);
  }
);
