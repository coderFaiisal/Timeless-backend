import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    code: z.string({
      required_error: 'Code is required',
    }),
    storeId: z.string({
      required_error: 'Store id is required',
    }),
    billboardId: z.string({
      required_error: 'Billboard id is required',
    }),
  }),
});

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    code: z.string().optional(),
    billboardId: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
