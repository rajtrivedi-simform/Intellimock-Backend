import prisma from '../../configs/db.config';

export const getUserById = async (userId: string) => {
  try {
    const userInstance = await prisma.userData.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!userInstance) {
      return null;
    }
    return userInstance;
  } catch (e) {
    console.error('Error fetching user:', e);
    if (e instanceof Error) {
      throw new Error('Server Error');
    }
  }
};
