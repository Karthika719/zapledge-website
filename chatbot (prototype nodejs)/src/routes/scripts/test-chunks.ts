import { loadKnowledgeDocuments } from "../../modules/knowledge/knowledge.loader.js";
import { chunkDocuments } from "../../modules/knowledge/chunk.service.js";

const documents = loadKnowledgeDocuments();

const chunks = chunkDocuments(documents);

console.log(`Documents loaded: ${documents.length}`);
console.log(`Chunks created: ${chunks.length}\n`);

chunks.forEach((chunk) => {
  console.log("========================================");
  console.log(`Chunk ID: ${chunk.id}`);
  console.log(`Source: ${chunk.fileName}`);
  console.log(`Chunk index: ${chunk.chunkIndex}`);
  console.log(`Characters: ${chunk.content.length}`);
  console.log("----------------------------------------");
  console.log(chunk.content);
  console.log();
});