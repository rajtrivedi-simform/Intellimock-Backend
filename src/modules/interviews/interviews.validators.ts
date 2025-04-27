import { z } from 'zod';

// export const interviewSchema = z.object({
//   interviewId: z.string().uuid(),
//   interviewType: z.string(),
//   level: z.string(),
//   skill: z.string().optional(),
// });

export const MockInterviewSchema = z.object({
  mockInterviewId: z.string().uuid(),
  interviewType: z.enum(['Technical', 'Behavioral']),
  level: z.enum(['junior', 'mid', 'senior']),
  skill: z.string().optional(),
})

export const CodeInterviewSchema = z.object({
  codeInterviewId: z.string().uuid(),
  language: z.string(),
  experience: z.enum(['junior', 'mid', 'senior']),
})