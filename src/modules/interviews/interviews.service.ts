import { Request, Response } from 'express';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import expressAsyncHandler from 'express-async-handler';
// import { MockInterviewSchema } from './interviews.validators';
import { getInterviewsByUserId } from './interviews.dal';
import { getIdFromToken } from '../../utils/jwt/jwt.utils';

// export const generateInterview = expressAsyncHandler(
//   async (req: Request, res: Response): Promise<void> => {
//     const parsed = interviewSchema.safeParse(req.body);

//     if (!parsed.success) {
//       return apiResponseHandler(res, 400, 'Validation Failed', parsed.error.flatten().fieldErrors);
//     }

//     const { interviewId, interviewType, level, skill } = parsed.data;

//     const userId = (await getIdFromToken(req.cookies.auth))?.userId;

//     if (!userId) {
//       return apiResponseHandler(res, 401, 'Unauthorized');
//     }

//     const interviewInstance = await createInterview({
//       interviewId,
//       interviewType,
//       level,
//       userId: userId,
//       skill,
//     });

//     if (!interviewInstance) {
//       return apiResponseHandler(res, 500, 'Internal Server Error');
//     }

//     return apiResponseHandler(res, 201, 'Mock Interview Created Successfully', interviewInstance);
//   }
// );

// export const generateMockInterview = expressAsyncHandler(
//   async(req: Request, res: Response): Promise<void> => {
//     const parsed = MockInterviewSchema.safeParse(req.body);

//     if(!parsed.success){
//       return apiResponseHandler(res, 400, "Validation Failed", parsed.error.flatten().fieldErrors)
//     }

//     const { mockInterviewId, interviewType, skill, level } = parsed.data;
//     const question:object = {};
//     if(skill === undefined){
//     question = await generateMockInterviewQuestions("HR Interview", level)
//     } else {
//       question = await generateMockInterviewQuestions(skill, level)
//     }

//     if(!question){
//       return apiResponseHandler(res, 500, "Internal Server Error")
//     }

//     const userId = (await getIdFromToken(req.cookies.auth))?.userId;

//     const interviewInstance = await createMockInterview({
//       mockInterviewId,
//       userId,
//       interviewType,
//       skill,
//       level,
//       question
//     })
//   }
// )

export const getInterviews = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (await getIdFromToken(req.cookies.auth))?.userId;
    console.log(userId);
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

export const getQuestions = expressAsyncHandler(
  async(req: Request, res: Response): Promise<void>=> {
  return apiResponseHandler(res, 200, "Questions fetched successfully")
})