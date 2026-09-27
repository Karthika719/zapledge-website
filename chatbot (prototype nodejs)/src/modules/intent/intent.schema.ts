import { z } from 'zod';

export const chatIntentSchema = z.object({
  intent: z.enum([
    'greeting',
    'bot_identity',
    'company_information',
    'company_question',
    'thanks',
    'goodbye',
    'out_of_scope',
  ]),

  retrievalQuery: z.string().nullable(),
});

export type ChatIntentResult = z.infer<
  typeof chatIntentSchema
>;