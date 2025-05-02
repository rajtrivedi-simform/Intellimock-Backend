import { z } from 'zod';

export const userProfileSchema = z.object({
  resumeCloudURL: z.string(),
  skills: z.array(z.string()),
  experience: z.number(),
});
