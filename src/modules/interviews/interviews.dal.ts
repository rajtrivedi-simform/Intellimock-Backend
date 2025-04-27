import prisma from '../../configs/db.config';
// import { getUserById } from '../user/user.dal';
// import { mockInterviewObj } from '../../constants/types/mockInterview';
// import { apiResponseHandler } from '../../utils/apiResponse.handler';

// export const createInterview = async ({
//   interviewId,
//   interviewType,
//   level,
//   userId,
//   skill = 'English',
// }: mockInterviewObj) => {
//   try {
//     const userInstance = await getUserById(userId);

//     if (!userInstance) {
//       throw new Error('User not found');
//     }

//     const interviewInstance = await prisma.interviewData.create({
//       data: {
//         interviewId,
//         userId,
//         type: interviewType,
//         skill: skill,
//         level,
//       },
//     });

//     return interviewInstance;
//   } catch (error) {
//     console.error('Error creating mock interview:', error);
//     if (error instanceof Error) {
//       throw new Error('Server Error');
//     }
//   }
// };
 
// export const createMockInterview = async ({
//   mockInterviewId,
//   userId,
//   interviewType,
//   skill,
//   level,
//   question
// }:{
//   mockInterviewId:string,
//   userId: string,
//   interviewType: "HR Interview" | "mock",
//   skill: string,
//   level: string,
//   question: object
// }) => {
//   try{
//     const interviewInstance = await prisma.mockInterview.create({
//       data: {
//       mockIntId: mockInterviewId,
//       userId: userId,

//       }
//     })
//   } catch(error){
//     if(error instanceof Error){
//       throw new Error('Error creating mock interview.');
//     }
//   }
// }

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

export const generateMockInterviewQuestions = async(topic:string, experience: string) => {
  const url = "https://intellimock-ai.onrender.com/api/v1/ai/generate-question/";
  const payload = {
    "topic": topic,
    "experience": experience
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json();

  if(!res.ok){
    throw new Error("Error Generating Questions");
  }

  return data;
}