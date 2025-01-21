import { z } from 'zod';

export const listSchema = z.object({
    name: z.string(),
    items: z.array(z.object({}))
});
  