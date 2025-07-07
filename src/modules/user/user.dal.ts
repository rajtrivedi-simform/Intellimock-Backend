import prisma from '../../configs/db.config';

export const getUserById = async (userId: string) => {
  try {
    const userInstance = await prisma.userData.findUnique({
      where: {
        userId: userId,
      },
      select: {
        userId: true,
        userEmail: true,
        userFullName: true,
        resumeData: true,
      },
    });

    if (!userInstance) {
      return null;
    }

    const mockInterviewData = await prisma.mockInterview.findMany({
      where: {
        userId: userInstance.userId,
      },
      select: {
        mockIntId: true,
        level: true,
        interviewType: true,
        Timestamp: true,
      },
    });

    const codeInterviewData = await prisma.codeInterview.findMany({
      where: {
        userId: userInstance.userId,
      },
      select: {
        codeIntId: true,
        level: true,
        language: true,
        Timestamp: true,
      },
    });

    return {
      user: userInstance,
      mockInterviewData: mockInterviewData || 'No Mock Interviews Found',
      codeInterviewData: codeInterviewData || 'No Code Interviews Found',
    };
  } catch (e) {
    console.error('Error fetching user:', e);
    if (e instanceof Error) {
      throw new Error('Server Error');
    }
  }
};

export const fetchTokens = async (url: string) => {
  try {
    const fetchUrl = `${process.env.PARSER_API_URL}${url}`;
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      throw new Error('Failed to fetch tokens');
    }

    const data = await res.json();

    return data.skills;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Token Service Offline!');
    }
  }
};
