import { loadKnowledgeDocuments } from "../../modules/knowledge/knowledge.loader.js";
import { chunkDocuments } from "../../modules/knowledge/chunk.service.js";
import {
  embedChunks,
  searchKnowledge,
} from "../../modules/knowledge/search.service.js";

async function main() {
  const documents = loadKnowledgeDocuments();

  const chunks = chunkDocuments(documents);

  console.log(`Loaded ${documents.length} documents`);
  console.log(`Created ${chunks.length} chunks`);

  console.log("\nCreating embeddings...\n");

  const embeddedChunks = await embedChunks(chunks);

  const question = "Who is the president of the United States?";

  console.log(`Question: ${question}\n`);

  const results = await searchKnowledge(
    question,
    embeddedChunks,
    3
  );

  results.forEach((result, index) => {
    console.log(`========== RESULT ${index + 1} ==========`);
    console.log(`Source: ${result.chunk.fileName}`);
    console.log(`Score: ${result.score.toFixed(4)}`);
    console.log("--------------------------------");
    console.log(result.chunk.content);
    console.log();
  });
}

main().catch(console.error);