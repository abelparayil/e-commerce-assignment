import { z } from 'zod';

export const cartSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().positive().optional(),
});
