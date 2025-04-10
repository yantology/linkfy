import { z } from 'zod';

// Schema for MessageResponse
export const MessageResponseSchema = z.object({
  message: z.string(),
});

// Generic schema factory for DataResponse
export const createDataResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  data: dataSchema,
  message: z.string(),
});

// Type inferences from the schemas
export type MessageResponse = z.infer<typeof MessageResponseSchema>;
export type DataResponse<T> = {
  data: T;
  message: string;
};
