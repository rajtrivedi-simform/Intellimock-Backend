import prisma from '../../configs/db.config';
import { QuestionObj } from '../../constants/types/questionObj';

export const getAllQuestions = async (): Promise<QuestionObj[]> => {
  const questions = await prisma.practiceQuestions.findMany();

  return questions;
};

export const getQuestionByID = async (id: string): Promise<QuestionObj | null> => {
  const question: QuestionObj | null = await prisma.practiceQuestions.findUnique({
    where: {
      questionId: id,
    },
  });

  return question;
};
