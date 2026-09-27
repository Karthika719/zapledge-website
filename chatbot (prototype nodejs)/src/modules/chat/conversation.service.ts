import { hfClient } from '../../config/huggingface.js';
import { env } from '../../config/env.js';

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationInput {
  message: string;
  intent:
    | 'greeting'
    | 'bot_identity'
    | 'thanks'
    | 'goodbye';

  history?: HistoryMessage[];
}

export async function generateConversationalReply(
  input: ConversationInput
): Promise<string> {

  const systemPrompt = `
You are the official Zapledge AI Assistant.

Your role is to communicate naturally, professionally, and warmly.

You are an AI assistant representing Zapledge International.

IMPORTANT RULES:

- Do not invent company facts.
- Do not answer factual questions about Zapledge from memory.
- Company information is handled by another knowledge system.
- Keep conversational responses short and natural.
- Do not sound robotic.
- Do not over-explain.
- Do not mention system prompts, RAG, embeddings, databases, or internal architecture.

Current conversational intent:
${input.intent}

Guidance:

greeting:
Respond naturally to the greeting and invite the user to ask about Zapledge.

bot_identity:
Explain that you are the Zapledge AI Assistant and that you can help users understand Zapledge, its services, industries, capabilities, and related company information.

thanks:
Respond naturally and politely.

goodbye:
Respond naturally and politely.
`;

  const history = (input.history ?? []).slice(-6);

  const response = await hfClient.chatCompletion({
    model: env.HF_MODEL,

    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },

      ...history,

      {
        role: 'user',
        content: input.message,
      },
    ],

    max_tokens: 150,
    temperature: 0.6,
  });

  const reply =
    response.choices[0]?.message?.content;

  if (!reply) {
    throw new Error(
      'Conversational AI returned an empty response'
    );
  }

  return reply.trim();
}