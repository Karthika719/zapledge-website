import { ChromaClient, type Collection } from 'chromadb';
import { env } from '../../config/env.js';
import { createEmbedding } from './embedding.service.js';
import type { KnowledgeChunk } from './chunk.service.js';
import type { SearchResult } from './search.service.js';

let collectionPromise: Promise<Collection> | null = null;

function createChromaClient(): ChromaClient {
  const url = new URL(env.CHROMA_URL);

  return new ChromaClient({
    host: url.hostname,
    port: Number(url.port || (url.protocol === 'https:' ? 443 : 80)),
    ssl: url.protocol === 'https:',
    ...(env.CHROMA_API_KEY ? { headers: { Authorization: `Bearer ${env.CHROMA_API_KEY}` } } : {}),
  });
}

export function getKnowledgeCollection(): Promise<Collection> {
  if (!collectionPromise) {
    collectionPromise = createChromaClient().getOrCreateCollection({
      name: env.CHROMA_COLLECTION,
      metadata: { description: 'Zapledge chatbot knowledge base' },
      embeddingFunction: null,
    });
  }

  return collectionPromise;
}

export async function indexKnowledgeChunks(
  chunks: KnowledgeChunk[],
): Promise<void> {
  const collection = await getKnowledgeCollection();
  const embedded = await Promise.all(
    chunks.map(async (chunk) => ({ chunk, embedding: await createEmbedding(chunk.content) })),
  );

  await collection.upsert({
    ids: embedded.map(({ chunk }) => chunk.id),
    embeddings: embedded.map(({ embedding }) => embedding),
    documents: embedded.map(({ chunk }) => chunk.content),
    metadatas: embedded.map(({ chunk }) => ({
      documentId: chunk.documentId,
      fileName: chunk.fileName,
      chunkIndex: chunk.chunkIndex,
    })),
  });
}

export async function searchKnowledgeInChroma(
  query: string,
  limit: number,
): Promise<SearchResult[]> {
  const collection = await getKnowledgeCollection();
  const queryEmbedding = await createEmbedding(query);
  const result = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: limit,
    include: ['documents', 'metadatas', 'distances'],
  });

  const documents = (result.documents[0] ?? []) as (string | null)[];
  const metadatas = result.metadatas[0] ?? [];
  const distances = result.distances?.[0] ?? [];

  return documents.flatMap((content, index) => {
    const metadata = metadatas[index];
    if (!content || !metadata) return [];

    const chunk: KnowledgeChunk = {
      id: result.ids[0]?.[index] ?? `chroma-result-${index}`,
      documentId: String(metadata.documentId),
      fileName: String(metadata.fileName),
      content,
      chunkIndex: Number(metadata.chunkIndex),
    };

    // This collection uses Chroma's default L2 distance. Convert it to a
    // bounded similarity score so the rest of the retrieval flow can apply a
    // stable relevance threshold: smaller distance means higher similarity.
    const distance = distances[index] ?? Number.POSITIVE_INFINITY;
    const score = Number.isFinite(distance) ? 1 / (1 + distance) : 0;

    return [{ chunk, score }];
  });
}
