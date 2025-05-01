import { z } from 'zod';

export const MockInterviewSchema = z.object({
  mockInterviewId: z.string().uuid(),
  interviewType: z.enum(['mock', 'self']),
  level: z.enum(['fresher', 'junior', 'mid', 'senior']),
  skill: z.string().optional(),
});

export const CodeInterviewSchema = z.object({
  codeInterviewId: z.string().uuid(),
  language: z.string(),
  experience: z.number().min(0),
});

const quesansSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const MockFeedbackSchema = z.object({
  feedBackArray: z.array(quesansSchema),
  intId: z.string().uuid(),
});
