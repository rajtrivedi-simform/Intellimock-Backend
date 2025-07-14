import { v4 as uuid } from 'uuid';
import prisma from '../../configs/db.config';
import { userProfileSchema } from '../../constants/types/userProfileSchema';
import { connectRedis, redisClient } from '../../configs/redis.config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

    const interviewsData = await Promise.all([
      prisma.mockInterview.findMany({
        where: {
          userId: userInstance.userId,
        },
        select: {
          mockIntId: true,
          level: true,
          interviewType: true,
          Timestamp: true,
        },
      }),
      prisma.codeInterview.findMany({
        where: {
          userId: userInstance.userId,
        },
        select: {
          codeIntId: true,
          level: true,
          language: true,
          Timestamp: true,
        },
      }),
      prisma.resumeData.findFirst({
        where: {
          userId: userId,
        },
      }),
    ])
      .then((res) => res)
      .catch((err) => err);

    return {
      user: userInstance,
      mockInterviewData: interviewsData[0] || 'No Mock Interviews Found',
      codeInterviewData: interviewsData[1] || 'No Code Interviews Found',
      resume: interviewsData[2],
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

export const postUserProfile = async (userId: string, data?: userProfileSchema) => {
  try {
    const profile = await getUserProfile(userId);

    if (!profile) {
      console.log('Reach');
      if (data) {
        const { cloudURL, skills, experience } = data;
        if (!cloudURL || !skills || !experience) {
          throw new Error('Invalid data provided');
        }
        const profileInstance = await prisma.resumeData.create({
          data: {
            resumeId: uuid(),
            resumeCloudUrl: cloudURL,
            skills: skills,
            experience: experience,
            userId: userId,
          },
        });

        return profileInstance;
      }
      throw new Error('No Profile Found');
    }

    return profile;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.error('Unique constraint failed on the field:', error.meta?.target);
      }
      throw new Error(error.message || 'Error saving profile');
    }
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const profileInstance = await prisma.resumeData.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profileInstance) {
      throw new Error('No Profile Found');
    }

    return profileInstance;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
  }
};

export const getSkills = async (query: string) => {
  try {
    await connectRedis();
    const cachedResults = await redisClient.get('skills' + query);

    if (cachedResults === null) {
      console.log('Cache Miss!');
      const skills =
        query.length != 0
          ? await prisma.skills.findMany({
              where: {
                normalisedName: {
                  startsWith: query,
                },
              },
            })
          : await prisma.skills.findMany();

      if (!skills) {
        return 'No Skills Found';
      }

      await redisClient.set('skills' + query, JSON.stringify(skills), {
        EX: 3600,
        NX: true,
      });

      return skills;
    }

    return JSON.parse(cachedResults);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error fetching skills');
    }
  }
};

export const getUsersSkills = async (userId: string) => {
  try {
    const userSkills = await prisma.resumeData.findUnique({
      where: {
        userId: userId,
      },
      select: {
        skills: true,
      },
    });

    if (!userSkills) {
      throw new Error('No Skills Found for this User');
    }

    return userSkills;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new Error('Error fetching user skills');
    }
    throw new Error(`Error: ${error ? error : 'Unknown error'}`);
  }
};

export const fetchProfile = async (userId: string) => {
  try {
    const profileInstance = await prisma.resumeData.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profileInstance) {
      throw new Error('No User Found');
    }

    return profileInstance;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }
  }
};
