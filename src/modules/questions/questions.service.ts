import { Request, Response } from 'express';
import { addQuestion, getAllQuestions, getQuestionByID, questionSearch, getQuestionsForUser } from './questions.dal';
import { QuestionObj } from '../../constants/types/questionObj';
import expressAsyncHandler from 'express-async-handler';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import { questionSchema } from './questions.validators';
import { getIdFromToken } from 'utils/jwt/jwt.utils';

export const fetchQuestions = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const questionsArray: Array<QuestionObj> | null = await getAllQuestions();

    if (!questionsArray) {
      return apiResponseHandler(res, 404, 'No Queestions Found');
    }

    return apiResponseHandler(res, 200, 'Questions fetched successfully', questionsArray);
  }
);

export const fetchQuestion = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      return apiResponseHandler(res, 400, 'Not a valid ID');
    }

    const questionInstance: QuestionObj | null = await getQuestionByID(id);

    if (!questionInstance) {
      return apiResponseHandler(res, 404, `No question found with ID:${id}`);
    }

    return apiResponseHandler(res, 200, 'Question fetched successfully', questionInstance);
  }
);

export const searchQuestion = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const searchQuery = req.query.term as string;

    if (!searchQuery) {
      return apiResponseHandler(res, 400, 'Enter a valid Search Query');
    }
    const searchResults = await questionSearch(searchQuery);

    if (!searchResults) {
      return apiResponseHandler(res, 400, `No Questions Found for term:${searchQuery}`);
    }

    return apiResponseHandler(res, 200, 'Questions Fetched Successfully', searchResults);
  }
);

export const postQuestion = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const parsed = questionSchema.safeParse(req.body);

    if (parsed.error) {
      const error = parsed.error.flatten().fieldErrors;

      return apiResponseHandler(res, 400, 'Error Adding a Question', error);
    }

    const { data } = parsed;

    const userID = await getIdFromToken(req.cookies.auth)?.userId;

    if (!userID) {
      return apiResponseHandler(res, 401, 'UnAuthorised User');
    }

    const quesInstance = addQuestion(data, userID);

    if (quesInstance == null) {
      return apiResponseHandler(res, 400, 'Failed to add Question');
    }

    return apiResponseHandler(res, 201, 'Question Added Successfully');
  }
);

export const getQuestionsByUser = expressAsyncHandler(
  async(req: Request, res: Response): Promise<void> => {
    const userId = await getIdFromToken(req.cookies.auth)?.userId;

    if(!userId){
      return apiResponseHandler(res, 401, 'UnAuthorised User');
    }

    const myquestions: QuestionObj[] | undefined = await getQuestionsForUser(userId);

    if(!myquestions){
      return apiResponseHandler(res, 404, "No Questions found for this User");
    }

    return apiResponseHandler(res, 200, "Questions Fetched Successfully", myquestions)
  }
)