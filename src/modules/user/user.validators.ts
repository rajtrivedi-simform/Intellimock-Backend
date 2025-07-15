import { z } from 'zod';

export const userProfileSchema = z.object({
  cloudURL: z.string(),
  skills: z.array(z.string()),
  experience: z.number(),
});