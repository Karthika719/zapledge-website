import { loadKnowledgeDocuments } from "../../modules/knowledge/knowledge.loader.js";
import { chunkDocuments } from "../../modules/knowledge/chunk.service.js";
import { embedChunks } from "../../modules/knowledge/search.service.js";
import { retrieveKnowledge } from "../../modules/knowledge/retrieval.service.js";

async function main() {
  const documents = loadKnowledgeDocuments();

  const chunks = chunkDocuments(documents);

  console.log(`Loaded ${documents.length} documents`);
  console.log(`Created ${chunks.length} chunks`);

  const embeddedChunks = await embedChunks(chunks);

  const question =
    "Who is the president of the United States?";

  console.log(`\nQuestion: ${question}\n`);

  const retrieval = await retrieveKnowledge(
    question,
    embeddedChunks,
    3
  );

  if (!retrieval.found) {
    console.log("❌ No relevant knowledge found.");
    console.log(
      "Fallback: I don't have enough information about that."
    );

    return;
  }

  console.log("✅ Relevant knowledge found.\n");

  retrieval.results.forEach((result) => {
    console.log(
      `${result.chunk.fileName} → ${result.score.toFixed(4)}`
    );

    console.log(result.chunk.content);
    console.log();
  });
}

main().catch(console.error);