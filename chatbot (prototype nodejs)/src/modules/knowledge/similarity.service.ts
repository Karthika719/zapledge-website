export function cosineSimilarity(
  vectorA: number[],
  vectorB: number[]
): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Vectors must have the same dimensions");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    const valueA = vectorA[i] ?? 0;
    const valueB = vectorB[i] ?? 0;

    dotProduct += valueA * valueB;
    magnitudeA += valueA * valueA;
    magnitudeB += valueB * valueB;
  }

  const denominator =
    Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}
