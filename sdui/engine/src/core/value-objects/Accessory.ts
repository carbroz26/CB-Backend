import { z } from 'zod';
import { edgeInsetsSchema } from './Layout.js';

export const accessorySchema = z.object({
  type: z.string().trim().min(1),
  properties: z.record(z.string(), z.unknown()),
}).strict().superRefine((accessory, context) => {
  if (accessory.properties.padding !== undefined) {
    context.addIssue({
      code: 'custom',
      path: ['properties', 'padding'],
      message: 'accessory padding is no longer supported; use spacing',
    });
  }

  const spacing = accessory.properties.spacing;
  if (spacing === undefined) return;

  const result = edgeInsetsSchema.safeParse(spacing);
  if (!result.success) {
    context.addIssue({
      code: 'custom',
      path: ['properties', 'spacing'],
      message: 'accessory spacing must contain non-negative start, top, end, and bottom values',
    });
  }
});

export const accessoriesSchema = z.array(accessorySchema);

export type Accessory = z.infer<typeof accessorySchema>;
