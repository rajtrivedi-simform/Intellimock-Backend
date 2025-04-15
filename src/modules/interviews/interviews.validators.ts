import { z } from 'zod';

export const mockInterviewSchema = z.object({
  interviewId: z.string().uuid(),
  interviewType: z.string(),
  level: z.string(),
  skill: z.string().optional(),
});
