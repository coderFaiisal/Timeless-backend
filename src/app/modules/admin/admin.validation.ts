import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.string().optional(),
    image: z.string().optional(),
  }),
});

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    image: z.string().optional(),
  }),
});

const signInAdinZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const changeAdminPasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema,
  signInAdinZodSchema,
  changeAdminPasswordZodSchema,
  refreshTokenZodSchema,
};
