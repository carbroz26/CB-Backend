import { describe, expect, it } from 'vitest';
import { accessorySchema } from '../../../src/core/value-objects/Accessory.js';

describe('accessory spacing contract', () => {
  it('preserves four-sided spacing', () => {
    const accessory = accessorySchema.parse({
      type: 'divider',
      properties: { spacing: { start: 1, top: 2, end: 3, bottom: 4 } },
    });

    expect(accessory.properties.spacing).toEqual({
      start: 1,
      top: 2,
      end: 3,
      bottom: 4,
    });
  });

  it('allows omitted spacing', () => {
    expect(accessorySchema.parse({ type: 'icon', properties: {} })).toEqual({
      type: 'icon',
      properties: {},
    });
  });

  it('rejects obsolete accessory padding', () => {
    expect(() => accessorySchema.parse({
      type: 'divider',
      properties: { padding: { start: 0, top: 0, end: 8, bottom: 0 } },
    })).toThrow(/use spacing/);
  });

  it('rejects negative spacing values', () => {
    expect(() => accessorySchema.parse({
      type: 'divider',
      properties: { spacing: { start: -1 } },
    })).toThrow();
  });
});
