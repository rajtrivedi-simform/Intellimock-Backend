import { z } from 'zod';

const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export const userIdSchema = z.object({
  userId: z
    .string()
    .uuid()
    .length(36, 'User ID must be 36 characters long')
    .regex(userIdRegex, 'Invalid User ID format'),
});
