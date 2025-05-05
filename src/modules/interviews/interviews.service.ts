import { Request, Response } from 'express';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import expressAsyncHandler from 'express-async-handler';
import {
  CodeInterviewSchema,
  MockFeedbackSchema,
  MockInterviewSchema,
  terminateInterviewSchema,
} from './interviews.validators';
import {
  getInterviewsByUserId,
  generateMockInterviewQuestions,
  generateCodeInterviewQuestions,
  createMockInterview,
  createCodeInterview,
  generateMockIntFeedback,
  terminateInterview,
} from './interviews.dal';
import { getIdFromToken } from '../../utils/jwt/jwt.utils';
import { codingQuestionObj } from '../../constants/types/codeQuestionObj.type';

export const generateMockInterview = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const parsed = MockInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return apiResponseHandler(res, 400, 'Validation Failed', parsed.error.flatten().fieldErrors);
    }

    const { mockInterviewId, interviewType, skill, level } = parsed.data;
    let question: object = {};
    if (skill === '' && interviewType === 'self') {
      question = await generateMockInterviewQuestions('HR Interview', level);
    } else {
      question = await generateMockInterviewQuestions(skill!, level);
    }

    if (!question) {
      return apiResponseHandler(res, 500, 'Internal Server Error');
    }

    const userId = (await getIdFromToken(req.cookies.auth))?.userId;

    const interviewInstance = await createMockInterview(
      mockInterviewId,
      userId!,
      level,
      interviewType
    );

    if (!interviewInstance) {
      return apiResponseHandler(res, 400, 'Failed to start Interview');
    }

    return apiResponseHandler(res, 201, 'Interview Started Successfully', question);
  }
);

export const generateCodeInterview = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const parsed = CodeInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return apiResponseHandler(res, 400, 'validation failed', parsed.error.flatten().fieldErrors);
    }

    const { codeInterviewId, language, experience } = parsed.data;
    const question: codingQuestionObj = await generateCodeInterviewQuestions(language, experience);

    if (!question) {
      return apiResponseHandler(res, 500, 'Internal Server Error');
    }

    const userId = (await getIdFromToken(req.cookies.auth))?.userId;

    const interviewInstance = await createCodeInterview(
      codeInterviewId,
      userId!,
      language,
      experience,
      question.problem_statement
    );

    if (!interviewInstance) {
      return apiResponseHandler(res, 400, 'Failed to start interview!');
    }

    return apiResponseHandler(res, 201, 'Interview Started Successfully', question);
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

export const generateMockFeedback = expressAsyncHandler(async (req: Request, res: Response) => {
  const parsed = MockFeedbackSchema.safeParse(req.body);

  if (!parsed.success) {
    return apiResponseHandler(res, 400, 'Validation Failed!', parsed.error.flatten().fieldErrors);
  }

  const { feedBackArray, intId } = parsed.data;

  const feedBack = await generateMockIntFeedback(feedBackArray, intId);

  if (!feedBack) {
    return apiResponseHandler(res, 400, 'Failed to Generate Feedback');
  }

  return apiResponseHandler(res, 201, 'Feedback Generated Successfully!', feedBack);
});

export const terminateInterviewController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const parsed = terminateInterviewSchema.safeParse(req.body);

    if (!parsed.success) {
      return apiResponseHandler(res, 400, 'Validation Error', parsed.error.flatten().fieldErrors);
    }

    const { intId } = parsed.data;

    const terminatedInstance = await terminateInterview(intId);

    if (!terminatedInstance) {
      return apiResponseHandler(res, 400, 'Failed to terminate Interview');
    }

    return apiResponseHandler(res, 200, 'Interview Terminated');
  }
);
