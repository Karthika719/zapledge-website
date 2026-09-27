import { hfClient } from '../../config/huggingface.js';
import { env } from '../../config/env.js';

import {
  chatIntentSchema,
  type ChatIntentResult,
} from './intent.schema.js';

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClassifyIntentInput {
  message: string;
  history?: HistoryMessage[];
}

const INTENT_SYSTEM_PROMPT = `
You are an intent router for the official Zapledge International AI Assistant.

Your job is NOT to answer the user.

Your only job is to classify the user's intent and, when needed,
rewrite the message into a standalone company knowledge search query.

Available intents:

1. greeting
Use when the user is greeting the assistant.
Examples:
- hi
- hello
- good morning
- hey there

2. bot_identity
Use when the user is asking about the AI assistant itself.
Examples:
- who are you?
- what are you?
- are you an AI?
- what can you do?
- tell me about yourself

3. company_information
Use when the user wants a broad introduction or overview of Zapledge.
Examples:
- tell me about Zapledge
- tell me about your company
- what is Zapledge?
- introduce your company

4. company_question
Use for specific questions about Zapledge, including:
- services
- industries
- location
- team
- capabilities
- markets
- company history
- AI solutions
- anything factual about Zapledge

Examples:
- what services do you provide?
- where are you based?
- do you work with manufacturing companies?
- when was Zapledge founded?

IMPORTANT:
If "you", "your", "company", "it", or similar words clearly refer
to Zapledge based on the current conversation, classify it as a
company intent.

5. thanks
Examples:
- thanks
- thank you
- appreciate it

6. goodbye
Examples:
- bye
- goodbye
- see you

7. out_of_scope
Use when the user asks about something unrelated to Zapledge
or the AI assistant.
Examples:
- who is the US president?
- what is today's weather?
- write Python code
- tell me a joke

RETRIEVAL QUERY RULES:

For company_information and company_question:
- Create a standalone retrieval query.
- Resolve pronouns using conversation history.
- Explicitly mention "Zapledge International".
- Preserve the user's actual meaning.
- Do not answer the question.

Examples:

User:
"What services do you provide?"

Output:
{
  "intent": "company_question",
  "retrievalQuery": "What services does Zapledge International provide?"
}

User:
"Tell me about your company"

Output:
{
  "intent": "company_information",
  "retrievalQuery": "Provide an overview of Zapledge International."
}

Conversation:
User: "Tell me about Zapledge."
Assistant: "..."
User: "When was it founded?"

Output:
{
  "intent": "company_question",
  "retrievalQuery": "When was Zapledge International founded?"
}

For greeting, bot_identity, thanks, goodbye and out_of_scope:
retrievalQuery must be null.

Return ONLY valid JSON.

Required format:

{
  "intent": "intent_name",
  "retrievalQuery": "string or null"
}
`;

export async function classifyIntent(
  input: ClassifyIntentInput
): Promise<ChatIntentResult> {

  const history = (input.history ?? [])
    .slice(-6)
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));

  const response = await hfClient.chatCompletion({
    model: env.HF_MODEL,

    messages: [
      {
        role: 'system',
        content: INTENT_SYSTEM_PROMPT,
      },

      ...history,

      {
        role: 'user',
        content: input.message,
      },
    ],

    max_tokens: 200,
    temperature: 0,
  });

  const content =
    response.choices[0]?.message?.content;

  if (!content) {
    throw new Error(
      'Intent classifier returned an empty response'
    );
  }

  const json = extractJson(content);

  const parsed = JSON.parse(json);

  return chatIntentSchema.parse(parsed);
}


/**
 * Some models may wrap JSON in markdown.
 *
 * Example:
 *
 * ```json
 * { ... }
 * ```
 *
 * This extracts only the JSON object.
 */
function extractJson(content: string): string {

  const start =
    content.indexOf('{');

  const end =
    content.lastIndexOf('}');

  if (
    start === -1 ||
    end === -1 ||
    end < start
  ) {
    throw new Error(
      `Invalid intent classifier response: ${content}`
    );
  }

  return content.slice(
    start,
    end + 1
  );
}