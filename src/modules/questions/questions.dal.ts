import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { v4 as uuid } from 'uuid';
import prisma from '../../configs/db.config';
import { QuestionObj } from '../../constants/types/questionObj';

export const getAllQuestions = async (): Promise<QuestionObj[] | null> => {
  try {
    const questions = await prisma.practiceQuestions.findMany();

    return questions;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
  }

  return null;
};

export const getQuestionByID = async (id: string): Promise<QuestionObj | null> => {
  try {
    const question: QuestionObj | null = await prisma.practiceQuestions.findUnique({
      where: {
        questionId: id,
      },
    });

    return question;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
  }
  return null;
};

export const questionSearch = async (term: string): Promise<QuestionObj[] | null> => {
  try {
    const questions = await prisma.practiceQuestions.findMany({
      where: {
        question: {
          contains: term,
          mode: 'insensitive',
        },
      },
    });

    return questions;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
  }
  return null;
};

export const addQuestion = async (
  data: QuestionObj,
  userId: string
): Promise<QuestionObj | null> => {
  try {
    const questionInstance = prisma.practiceQuestions.create({
      data: {
        ...data,
        questionId: uuid()+data.type,
        userId: userId
      },
    });

    return questionInstance;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
  }
  return null;
};

export const getQuestionsForUser = async(userId: string) => {
  try {
    const questions = await prisma.practiceQuestions.findMany({
      where: {
        userId: userId
      }
    });

    if(!questions){
      throw new Error('No Questions found for this user');
    }

    return questions;
  } catch (error) {
    if(error instanceof PrismaClientKnownRequestError){
      throw new Error(error.message)
    }
  }
}
