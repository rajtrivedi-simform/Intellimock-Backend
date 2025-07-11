import { Request, Response } from 'express';
import { getAllQuestions, getQuestionByID, questionSearch } from './questions.dal';
import { QuestionObj } from '../../constants/types/questionObj';
import expressAsyncHandler from 'express-async-handler';
import { apiResponseHandler } from '../../utils/apiResponse.handler';

export const fetchQuestions = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const questionsArray: Array<QuestionObj> = await getAllQuestions();

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

    if (!searchResults.length) {
      return apiResponseHandler(res, 400, `No Questions Found for term:${searchQuery}`);
    }

    return apiResponseHandler(res, 200, 'Questions Fetched Successfully', searchResults);
  }
);

export const postQuestion = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {}
);
