import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { app } from './app.js';

describe('HTTP API', () => {
  it('returns a healthy status', async () => {
    const response = await request(app).get('/api/health');

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.status, 'ok');
    assert.match(response.body.data.timestamp, /^\d{4}-\d{2}-\d{2}T/);
  });

  it('serves the OpenAPI document', async () => {
    const response = await request(app).get('/openapi.json');

    assert.equal(response.status, 200);
    assert.equal(response.body.openapi, '3.0.3');
    assert.ok(response.body.paths['/api/chat'].post);
    assert.ok(response.body.paths['/api/health'].get);
  });

  it('serves Swagger UI', async () => {
    const response = await request(app).get('/api-docs/');

    assert.equal(response.status, 200);
    assert.match(response.text, /swagger-ui/i);
  });

  it('rejects an invalid chat request before calling the AI provider', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: '' });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(response.body.error.message, 'Validation failed');
  });

  it('rejects an invalid history item', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({
        message: 'Hello',
        history: [{ role: 'system', content: 'Not allowed' }],
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
  });

  it('returns the standard not-found response for unknown routes', async () => {
    const response = await request(app).get('/api/does-not-exist');

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
  });
});
