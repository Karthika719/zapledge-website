import { createEmbedding } from "../../modules/knowledge/embedding.service.js";
import { cosineSimilarity } from "../../modules/knowledge/similarity.service.js";

async function main() {
  const question = "Where is Zapledge located?";

  const texts = [
    "Zapledge is a Kochi-based AI consulting company.",
    "Zapledge provides AI engineering and automation services.",
    "The weather is sunny today.",
  ];

  const questionEmbedding = await createEmbedding(question);

  console.log(`Question: ${question}\n`);

  for (const text of texts) {
    const textEmbedding = await createEmbedding(text);

    const score = cosineSimilarity(
      questionEmbedding,
      textEmbedding
    );

    console.log(`Text: ${text}`);
    console.log(`Similarity: ${score.toFixed(4)}\n`);
  }
}

main().catch(console.error);