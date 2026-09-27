import { pipeline } from "@huggingface/transformers";

type EmbeddingModel = (
  text: string,
  options: { pooling: "mean"; normalize: true },
) => Promise<{ data: ArrayLike<number> }>;

let extractor: Awaited<ReturnType<typeof pipeline>> | null = null;

async function getExtractor() {
  if (!extractor) {
    console.log("Loading embedding model...");

    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    console.log("Embedding model loaded.");
  }

  return extractor;
}

export async function createEmbedding(
  text: string
): Promise<number[]> {
  const model = await getExtractor();

  const embeddingModel = model as unknown as EmbeddingModel;

  const output = await embeddingModel(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}
