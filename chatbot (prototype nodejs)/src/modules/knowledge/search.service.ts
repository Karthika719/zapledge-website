import type { KnowledgeChunk } from "./chunk.service.js";
import { createEmbedding } from "./embedding.service.js";
import { cosineSimilarity } from "./similarity.service.js";

export interface EmbeddedChunk extends KnowledgeChunk {
  embedding: number[];
}

export interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
}

export async function embedChunks(
  chunks: KnowledgeChunk[]
): Promise<EmbeddedChunk[]> {
  const embeddedChunks: EmbeddedChunk[] = [];

  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk.content);

    embeddedChunks.push({
      ...chunk,
      embedding,
    });
  }

  return embeddedChunks;
}

export async function searchKnowledge(
  query: string,
  embeddedChunks: EmbeddedChunk[],
  limit = 3
): Promise<SearchResult[]> {
  const queryEmbedding = await createEmbedding(query);

  const results = embeddedChunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(
      queryEmbedding,
      chunk.embedding
    ),
  }));

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}