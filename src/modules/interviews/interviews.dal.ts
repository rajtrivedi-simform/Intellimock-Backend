import prisma from '../../configs/db.config';
import { getUserById } from '../user/user.dal';
import { mockInterviewObj } from '../../constants/types/mockInterview';

export const createInterview = async ({
  interviewId,
  interviewType,
  level,
  userId,
  skill = 'English',
}: mockInterviewObj) => {
  try {
    const userInstance = await getUserById(userId);

    if (!userInstance) {
      throw new Error('User not found');
    }

    const interviewInstance = await prisma.interviewData.create({
      data: {
        interviewId,
        userId,
        type: interviewType,
        skill: skill,
        level,
      },
    });

    return interviewInstance;
  } catch (error) {
    console.error('Error creating mock interview:', error);
    if (error instanceof Error) {
      throw new Error('Server Error');
    }
  }
};

export const getInterviewsByUserId = async (userId: string) => {
  try {
    const interviews = await prisma.interviewData.findMany({
      where: {
        userId: userId,
      },
    });

    if (!interviews) {
      throw new Error('Interviews not found');
    }
    return interviews;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Server Error');
    }
  }
};
