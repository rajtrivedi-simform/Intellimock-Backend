import prisma from '../../configs/db.config';
import argon2 from 'argon2';
import { v4 as uuid } from 'uuid';

export const userCreation = async (
  userEmail: string,
  userPassword: string,
  userFullName: string
) => {
  const hashedPassword = await generateHashPassword(userPassword);

  try {
    const userInstance = await prisma.userData.create({
      data: {
        userId: uuid(),
        userEmail: userEmail,
        userPassword: hashedPassword,
        userFullName: userFullName,
      },
    });

    return userInstance;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error Creating User');
    }
  }
};

const generateHashPassword = async (password: string) => {
  return await argon2.hash(password, { type: argon2.argon2i });
};

export const getUserByEmail = async (userEmail: string) => {
  const user = prisma.userData.findUnique({
    where: {
      userEmail: userEmail,
    },
  });

  return user;
};
