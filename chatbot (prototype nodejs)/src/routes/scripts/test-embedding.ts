import { createEmbedding } from "../../modules/knowledge/embedding.service.js";

async function main() {
  const text =
    "Zapledge is a Kochi-based AI consulting company.";

  const embedding = await createEmbedding(text);

  console.log("Text:");
  console.log(text);

  console.log("\nEmbedding dimensions:");
  console.log(embedding.length);

  console.log("\nFirst 10 values:");
  console.log(embedding.slice(0, 10));
}

main().catch(console.error);