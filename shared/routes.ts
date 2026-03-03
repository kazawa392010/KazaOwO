import { z } from 'zod';
import { insertSensorDataSchema, insertDeviceStatusSchema, sensorData, deviceStatus } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  sensorData: {
    list: {
      method: 'GET' as const,
      path: '/api/sensor-data' as const,
      responses: {
        200: z.array(z.custom<typeof sensorData.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/sensor-data' as const,
      input: insertSensorDataSchema,
      responses: {
        201: z.custom<typeof sensorData.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  deviceStatus: {
    get: {
      method: 'GET' as const,
      path: '/api/device-status' as const,
      responses: {
        200: z.custom<typeof deviceStatus.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/device-status' as const,
      input: insertDeviceStatusSchema.partial(),
      responses: {
        200: z.custom<typeof deviceStatus.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
