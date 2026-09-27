import type { EmbeddedChunk } from "./search.service.js";
import {
  searchKnowledge,
  type SearchResult,
} from "./search.service.js";

const MIN_SIMILARITY = 0.4;

export interface RetrievalResult {
  found: boolean;
  results: SearchResult[];
}

export async function retrieveKnowledge(
  query: string,
  embeddedChunks: EmbeddedChunk[],
  limit = 3
): Promise<RetrievalResult> {
  const results = await searchKnowledge(
    query,
    embeddedChunks,
    limit
  );

  const relevantResults = results.filter(
    (result) => result.score >= MIN_SIMILARITY
  );

  return {
    found: relevantResults.length > 0,
    results: relevantResults,
  };
}