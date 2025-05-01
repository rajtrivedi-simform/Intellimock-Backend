import { env } from 'process';
import prisma from '../../configs/db.config';
import { feedBack } from '../../constants/types/feedBack.type';

export const createMockInterview = async (
  mockInterviewId: string,
  userId: string,
  level: string,
  interviewType: string
) => {
  try {
    const mockIntInstance = await prisma.mockInterview.create({
      data: {
        mockIntId: mockInterviewId,
        userId: userId,
        level: level,
        interviewType: interviewType,
      },
    });

    if (!mockIntInstance) {
      throw new Error('Error Registering Interview');
    }

    return mockIntInstance;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error creating mock interview.');
    }
  }
};

export const createCodeInterview = async (
  codeIntId: string,
  userId: string,
  language: string,
  level: number | string,
  question: string
) => {
  level = String(level);
  try {
    console.log(codeIntId, userId, language, level, question);

    const codeIntInstance = await prisma.codeInterview.create({
      data: {
        codeIntId: codeIntId,
        userId: userId,
        language: language,
        level: level,
        time: 0,
        question: question,
        code: '',
        output: '',
        feedBack: '',
      },
    });

    if (!codeIntInstance) {
      throw new Error('Error Registering Interview');
    }

    return codeIntInstance;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error creating code interview.');
    }
  }
};

export const getInterviewsByUserId = async (userId: string) => {
  try {
    const mockinterviews = await prisma.mockInterview.findMany({
      where: {
        userId: userId,
      },
    });

    const codeinterviews = await prisma.codeInterview.findMany({
      where: {
        userId: userId,
      },
    });

    if (!mockinterviews && !codeinterviews) {
      throw new Error('Interviews not found');
    }

    const interviews = [...mockinterviews, ...codeinterviews];

    return interviews;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Server Error');
    }
  }
};

export const generateMockInterviewQuestions = async (topic: string, experience: string) => {
  const url: string = `${env.AI_API_URL}generate-question/`;
  const payload = {
    topic: topic,
    experience: experience,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error('Error Generating Questions');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to Send Request');
    }
  }
};

export const generateCodeInterviewQuestions = async (language: string, level: number) => {
  const url: string = `${env.AI_API_URL}generate-code-question/`;

  const payload = {
    topic: language,
    experience: String(level),
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error('Error response:', errorData);
      throw new Error(`Error Generating Question: ${res.status} - ${errorData}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in generateCodeInterviewQuestions:', error.message);
      throw new Error(`Failed to Send Request: ${error.message}`);
    } else {
      console.error('Unknown error in generating question:', error);
      throw new Error('Failed to Send Request: Unknown Error');
    }
  }
};

export const generateMockIntFeedback = async (data: Array<feedBack>, intId: string) => {
  const url: string = `${env.AI_API_URL}generate-feedback/`;

  const payload: Array<feedBack> = data;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error('Error Generating Feedback');
    }

    const interviewInstance = await prisma.mockInterview.update({
      where: {
        mockIntId: intId,
      },
      data: {
        feedback: data,
      },
    });

    if (!interviewInstance) {
      throw new Error('Server Error');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to Send Request');
    }
  }
};
