import { z } from 'zod';

export const questionSchema = z.object({
  question: z.string().min(10, 'Question should be at least 10 characters long'),
  type: z.enum(['Technical', 'HR', 'Coding']),
  skill: z.string(),
  level: z.enum(['Beginner (0-2 years)', 'Intermediate (2-5 years)', 'Advanced (5+ years)']),
});
