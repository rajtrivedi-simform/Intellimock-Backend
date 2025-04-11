import { Request, Response } from 'express';
import { getAllQuestions, getQuestionByID } from './questions.dal';
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
