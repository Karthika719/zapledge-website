export const openapiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Zapledge Chatbot API',
    version: '1.0.0',
    description: 'API for the Zapledge International website chatbot.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local development' }],
  tags: [{ name: 'Health' }, { name: 'Chat' }],
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API health',
        responses: {
          '200': {
            description: 'Backend is running',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/HealthResponse' } } },
          },
        },
      },
    },
    '/api/chat': {
      post: {
        tags: ['Chat'],
        summary: 'Generate a chatbot response',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ChatRequest' } } },
        },
        responses: {
          '200': {
            description: 'Generated response',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ChatResponse' } } },
          },
          '400': { description: 'Request validation failed' },
          '429': { description: 'Rate limit exceeded' },
          '500': { description: 'Internal server error' },
          '502': { description: 'AI provider error' },
        },
      },
    },
  },
  components: {
    schemas: {
      ChatHistoryItem: {
        type: 'object',
        required: ['role', 'content'],
        properties: {
          role: { type: 'string', enum: ['user', 'assistant'] },
          content: { type: 'string', minLength: 1, maxLength: 4000 },
        },
      },
      ChatRequest: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string', minLength: 1, maxLength: 2000, example: 'What services does Zapledge provide?' },
          history: { type: 'array', items: { $ref: '#/components/schemas/ChatHistoryItem' }, default: [] },
        },
      },
      ChatResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { type: 'object', properties: { reply: { type: 'string' } } },
        },
      },
      HealthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: { status: { type: 'string', example: 'ok' }, timestamp: { type: 'string', format: 'date-time' } },
          },
        },
      },
    },
  },
} as const;
