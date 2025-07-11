import { z } from 'zod';

export const questionSchema = z.object({
  question: z.string().min(10, 'Question should be at least 10 characters long'),
  type: z.enum(['Technical', 'HR', 'Coding']),
  skill: z.string()
});
