import { loadKnowledgeDocuments } from "./knowledge.loader.js";
import { chunkDocuments } from "./chunk.service.js";
import {
  embedChunks,
  type EmbeddedChunk,
} from "./search.service.js";
import { indexKnowledgeChunks } from './chroma.service.js';

let embeddedChunks: EmbeddedChunk[] | null = null;

export async function getKnowledgeIndex(): Promise<EmbeddedChunk[]> {
  if (embeddedChunks) {
    return embeddedChunks;
  }

  console.log("Initializing knowledge index...");

  const documents = loadKnowledgeDocuments();

  const chunks = chunkDocuments(documents);

  await indexKnowledgeChunks(chunks);

  embeddedChunks = await embedChunks(chunks);

  console.log(
    `Knowledge index ready: ${embeddedChunks.length} chunks`
  );

  return embeddedChunks;
}
