import prisma from '../../configs/db.config';

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
        interviewType: interviewType
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
  level: string,
  question: string
) => {
  try {
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
  const url = 'https://intellimock-ai.onrender.com/api/v1/ai/generate-question/';
  const payload = {
    topic: topic,
    experience: experience,
  };

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
};

export const generateCodeInterviewQuestions = async (language: string, level: string) => {
  const url = 'https://intellimock-ai.onrender.com/api/v1/ai/generate-code-question/';

  const payload = {
    language: language,
    level: level,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Error Generating Question');
  }

  return data;
};
