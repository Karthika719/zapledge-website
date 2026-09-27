import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { retrieveKnowledge } from './retrieval.service.js';
import type { EmbeddedChunk } from './search.service.js';
import { createEmbedding } from './embedding.service.js';

const chunk = (id: string, embedding: number[], content = id): EmbeddedChunk => ({
  id,
  documentId: 'test-document',
  fileName: 'test.md',
  content,
  chunkIndex: 0,
  embedding,
});

describe('retrieveKnowledge', () => {
  it('returns the closest relevant chunks in descending order', async () => {
    const queryEmbedding = await createEmbedding('services');
    const strong = queryEmbedding;
    const weak = queryEmbedding.map((value) => value * 0.8);

    const results = await retrieveKnowledge(
      'services',
      [chunk('strong', strong), chunk('weak', weak)],
      2,
    );

    assert.equal(results.found, true);
    assert.deepEqual(results.results.map((result) => result.chunk.id), ['strong', 'weak']);
  });

  it('returns found false when no result reaches the relevance threshold', async () => {
    const queryEmbedding = await createEmbedding('services');
    const unrelated = queryEmbedding.map((value) => -value);
    const results = await retrieveKnowledge('services', [chunk('unrelated', unrelated)]);

    assert.equal(results.found, false);
    assert.deepEqual(results.results, []);
  });

  it('respects the result limit', async () => {
    const queryEmbedding = await createEmbedding('services');
    const results = await retrieveKnowledge(
      'services',
      [
        chunk('one', queryEmbedding),
        chunk('two', queryEmbedding.map((value) => value * 0.99)),
        chunk('three', queryEmbedding.map((value) => value * 0.98)),
      ],
      2,
    );

    assert.equal(results.results.length, 2);
  });
});
