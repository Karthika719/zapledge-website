import { z } from 'zod';

export const chatHistoryItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(4000),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(2000),

  history: z
    .array(chatHistoryItemSchema)
    .optional()
    .default([]),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
