import { z } from 'zod';

export const MockInterviewSchema = z.object({
  mockInterviewId: z.string().uuid(),
  interviewType: z.enum(['mock', 'self']),
  level: z.enum(['junior', 'mid', 'senior']),
  skill: z.string().optional(),
});

export const CodeInterviewSchema = z.object({
  codeInterviewId: z.string().uuid(),
  language: z.string(),
  experience: z.enum(['junior', 'mid', 'senior']),
});

const quesansSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const MockFeedbackSchema = z.object({
  feedBackArray: quesansSchema.array(),
  intId: z.string().uuid(),
});
