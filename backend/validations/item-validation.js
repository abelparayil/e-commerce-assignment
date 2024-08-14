import { z } from 'zod';

export const itemSchema = z.object({
  title: z.string().min(3),
  price: z.number().positive(),
  image: z.string().url(),
});
