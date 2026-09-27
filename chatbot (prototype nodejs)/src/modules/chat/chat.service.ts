import { hfClient } from '../../config/huggingface.js';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/ApiError.js';

import type { ChatRequest } from './chat.schema.js';

import { classifyIntent } from '../intent/intent.service.js';

import {
  generateConversationalReply,
} from './conversation.service.js';

import {
  getKnowledgeIndex,
} from '../knowledge/knowledge-index.service.js';

import { searchKnowledgeInChroma } from '../knowledge/chroma.service.js';

import {
  buildRagSystemPrompt,
} from '../../prompts/chatbot.prompt.js';


const OUT_OF_SCOPE_MESSAGE =
  "I can help with questions about Zapledge International, our services, industries, capabilities, and solutions. Could I help you with something related to Zapledge?";

const MIN_CHROMA_SIMILARITY = 0.4;


export async function generateChatReply(
  input: ChatRequest
): Promise<string> {

  try {

    /*
     * STEP 1
     * Understand what the user means.
     */
    const intentResult =
      await classifyIntent({
        message: input.message,
        history: input.history,
      });


    console.log('\nIntent:');
    console.log(intentResult);


    /*
     * STEP 2
     * Handle normal conversation using the LLM.
     */
    if (
      intentResult.intent === 'greeting' ||
      intentResult.intent === 'bot_identity' ||
      intentResult.intent === 'thanks' ||
      intentResult.intent === 'goodbye'
    ) {

      return await generateConversationalReply({
        message: input.message,
        intent: intentResult.intent,
        history: input.history,
      });

    }


    /*
     * STEP 3
     * Reject questions outside Zapledge scope.
     */
    if (
      intentResult.intent === 'out_of_scope'
    ) {

      return OUT_OF_SCOPE_MESSAGE;

    }


    /*
     * STEP 4
     * Company questions must have a retrieval query.
     */
    if (
      !intentResult.retrievalQuery
    ) {

      return OUT_OF_SCOPE_MESSAGE;

    }


    /*
     * STEP 5
     * Load company knowledge.
     */
    await getKnowledgeIndex();


    /*
     * STEP 6
     * Search using the standalone query produced
     * by the intent LLM.
     */
    // The index initialization upserts chunks into Chroma. Query Chroma for
    // persistent, shared retrieval instead of searching only local memory.
    const retrievalResults = await searchKnowledgeInChroma(
      intentResult.retrievalQuery,
      5,
    );
    const retrieval = {
      found: retrievalResults.some((result) => result.score >= MIN_CHROMA_SIMILARITY),
      results: retrievalResults.filter((result) => result.score >= MIN_CHROMA_SIMILARITY),
    };


    /*
     * STEP 7
     * No company information found.
     */
    if (!retrieval.found) {

      return "I don't have enough information about that in my current Zapledge knowledge base. Please contact the Zapledge team for more details.";

    }


    console.log('\nRetrieval query:');
    console.log(
      intentResult.retrievalQuery
    );


    console.log('\nRetrieved knowledge:');

    retrieval.results.forEach(
      (result) => {

        console.log(
          `${result.chunk.fileName} → ${result.score.toFixed(4)}`
        );

      }
    );


    /*
     * STEP 8
     * Build context from retrieved knowledge.
     */
    const context =
      retrieval.results
        .map(
          (result) =>
            result.chunk.content
        )
        .join('\n\n---\n\n');


    /*
     * STEP 9
     * Give the company data to the LLM.
     */
    const systemPrompt =
      buildRagSystemPrompt(context);


    /*
     * STEP 10
     * Generate final grounded answer.
     */
    const response =
      await hfClient.chatCompletion({

        model: env.HF_MODEL,

        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },

          ...(input.history ?? []),

          {
            role: 'user',
            content: input.message,
          },
        ],

        max_tokens:
          env.HF_MAX_TOKENS,

        temperature:
          env.HF_TEMPERATURE,
      });


    const reply =
      response
        .choices[0]
        ?.message
        ?.content;


    if (!reply) {

      throw new ApiError(
        502,
        'The AI provider returned an empty response'
      );

    }


    return reply.trim();

  } catch (error) {

    if (error instanceof ApiError) {
      throw error;
    }


    console.error(
      'Chat generation error:',
      error
    );


    throw new ApiError(
      502,
      'Unable to generate an AI response right now'
    );

  }
}
