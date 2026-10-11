import { z } from 'zod';
import { edgeInsetsSchema } from './Layout.js';

export const accessorySchema = z.object({
  type: z.string().trim().min(1),
  properties: z.record(z.string(), z.unknown()),
}).strict().superRefine((accessory, context) => {
  const padding = accessory.properties.padding;
  if (padding === undefined) return;

  const result = edgeInsetsSchema.safeParse(padding);
  if (!result.success) {
    context.addIssue({
      code: 'custom',
      path: ['properties', 'padding'],
      message: 'accessory padding must contain non-negative start, top, end, and bottom values',
    });
  }
});

export const accessoriesSchema = z.array(accessorySchema);

export type Accessory = z.infer<typeof accessorySchema>;
