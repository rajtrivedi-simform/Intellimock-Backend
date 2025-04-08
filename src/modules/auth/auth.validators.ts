import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export const userRegisterSchema = z
  .object({
    userFullName: z.string().min(2, 'Full Name is required'),
    userEmail: z.string().email('Invalid E-Mail Address'),
    userPassword: z.string().min(8, 'Password must be at least 8 characters').regex(passwordRegex, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    confirmPassword: z.string().min(8, 'Confirm Password is required'),
  })
  .refine((data) => data.userPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const userLoginSchema = z.object({
  userEmail: z.string().email('Invalid E-Mail Address'),
  userPassword: z.string().min(8, 'Password must be at least 8 characters').regex(passwordRegex, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  }),
});
