# Hugging Face Website Chatbot Backend — TypeScript

A TypeScript backend for a website chatbot. The browser talks to this API, and this API talks to Hugging Face. The Hugging Face access token never needs to be exposed in frontend JavaScript.

## Architecture

```text
Website / Frontend
       |
       | POST /api/chat
       v
TypeScript + Express API
       |
       | Hugging Face InferenceClient
       v
Hugging Face Inference Provider
       |
       v
LLM response
```

## Folder structure

```text
hf-chatbot-backend/
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   └── huggingface.ts
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   └── notFound.middleware.ts
│   ├── modules/
│   │   ├── chat/
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.routes.ts
│   │   │   ├── chat.schema.ts
│   │   │   └── chat.service.ts
│   │   ├── health/
│   │   └── knowledge/
│   │       ├── chroma.service.ts
│   │       ├── embedding.service.ts
│   │       └── knowledge-index.service.ts
│   │       └── health.routes.ts
│   ├── routes/
│   │   └── index.ts
│   ├── utils/
│   │   ├── ApiError.ts
│   │   └── asyncHandler.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Why it is separated this way

- **routes** decide which URL maps to which controller.
- **controller** handles HTTP request/response concerns.
- **schema** validates input.
- **service** contains the AI/business logic.
- **config** owns environment variables and third-party clients.
- **middlewares** handle cross-cutting HTTP concerns such as errors.

This separation becomes useful later when you add RAG, databases, authentication, lead capture, or multiple AI providers.

## Requirements

- Node.js 20 or newer
- npm
- Hugging Face account
- Fine-grained Hugging Face token using the **Inference** preset
- Chroma server for company-knowledge questions

The backend can run without Chroma for basic health checks and conversational routes, but company-related RAG questions require a reachable Chroma server.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create the environment file

Copy `.env.example` to `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Then update:

```env
HF_TOKEN=hf_your_real_token_here
```

Never commit `.env` to Git.

### 3. Start Chroma

Use one of the following options.

Local CLI:

```bash
npx chroma run --path ./chroma-data --port 8100
```

Docker:

```bash
docker run --rm \
  --name zapledge-chroma \
  -v "$PWD/chroma-data:/data" \
  -p 8100:8000 \
  chromadb/chroma
```

Verify Chroma is reachable:

```bash
curl http://localhost:8100/api/v2/heartbeat
```

Keep Chroma running in its own terminal. The `chroma-data/` directory contains generated database and vector-index files and is intentionally ignored by Git.

### 4. Start development server

```bash
npm run dev
```

API:

```text
http://localhost:3000
```

## Test the API

### Health check

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "..."
  }
}
```

### Chat request

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is artificial intelligence?"}'
```

Expected shape:

```json
{
  "success": true,
  "data": {
    "reply": "..."
  }
}
```

### Chat with conversation history

```json
{
  "message": "Can you explain that more simply?",
  "history": [
    {
      "role": "user",
      "content": "What is RAG?"
    },
    {
      "role": "assistant",
      "content": "RAG stands for Retrieval-Augmented Generation..."
    }
  ]
}
```

The backend intentionally limits history to 10 messages so an experimental client cannot keep sending an ever-growing context and unnecessarily consume inference credits.

## Chat API documentation

### `POST /api/chat`

Generates a response from the chatbot. Company-related questions are answered using the local knowledge base and semantic retrieval. The Hugging Face token remains on the server.

Request headers:

```http
Content-Type: application/json
```

Request body:

| Field | Type | Required | Constraints |
|---|---|---:|---|
| `message` | string | Yes | 1–2,000 characters after trimming |
| `history` | array | No | Defaults to `[]`; each item contains `role` (`user` or `assistant`) and `content` (1–4,000 characters) |

Successful response (`200`):

```json
{
  "success": true,
  "data": {
    "reply": "Our team provides ..."
  }
}
```

Validation error (`400`):

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": {
      "message": ["Too small: expected string to have >=1 characters"]
    }
  }
}
```

Provider or server error (`502` or `500`):

```json
{
  "success": false,
  "error": {
    "message": "Unable to generate an AI response right now"
  }
}
```

Example using `curl`:

```bash
curl -i http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "What services does Zapledge provide?",
    "history": []
  }'
```

The API also applies the configured rate limit to `/api` requests. Clients should handle `429 Too Many Requests` and retry after a delay.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check whether backend is running |
| POST | `/api/chat` | Generate an AI response |

Interactive Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

The machine-readable OpenAPI document is available at:

```text
http://localhost:3000/openapi.json
```

## Frontend request example

```ts
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Hello!',
    history: [],
  }),
});

const result = await response.json();
console.log(result.data.reply);
```

## Important security rules

1. Never put `HF_TOKEN` in HTML, React, browser JavaScript, or a public repository.
2. Never commit `.env`.
3. Frontend calls **our backend**, not Hugging Face directly.
4. Validate all incoming data.
5. Keep a rate limit because inference requests cost credits/money.
6. Do not return raw provider errors or secrets to the browser.

## Chroma setup

The chatbot stores and searches knowledge embeddings in Chroma. The current development configuration uses port `8100`:

```bash
npx chroma run --path ./chroma-data --port 8100
```

The backend connects to `http://localhost:8100` by default in `.env.example`. For a hosted or authenticated deployment, set these variables in `.env`:

```env
CHROMA_URL=https://your-chroma-host
CHROMA_COLLECTION=zapledge-knowledge
CHROMA_API_KEY=your-api-key
```

Knowledge chunks are upserted into the configured collection when the first company-related chat request initializes the knowledge index. The collection is safe to initialize repeatedly because chunk IDs are stable.

### Knowledge source files

The source content is maintained in:

```text
src/data/company.md
src/data/services.md
src/data/industries.md
src/data/faq.md
```

When these files change, the next knowledge-index initialization upserts the stable chunk IDs into Chroma. For a clean local re-index, stop the backend, remove the local `chroma-data/` directory, restart Chroma, and send a company-related question again.

### Troubleshooting Chroma

If the backend reports `ChromaConnectionError`, check:

```bash
curl http://localhost:8100/api/v2/heartbeat
```

If this fails, start Chroma again and confirm that `.env` contains the same port:

```env
CHROMA_URL=http://localhost:8100
```

Restart the backend after changing `.env`.

To stop a foreground Chroma process, press `Ctrl+C`. To stop the Docker container:

```bash
docker stop zapledge-chroma
```

## Useful commands

```bash
npm run dev
npm run typecheck
npm run build
npm start
npm run lint
npm run format
npm test
npm run test:watch
```

## Production notes

Before public deployment, use a hosted or separately managed Chroma instance with persistent storage and backups. Do not commit `.env`, Chroma database files, API keys, or generated model caches. Configure production CORS, HTTPS, monitoring, provider timeout/retry handling, and an appropriate distributed rate-limit store.

## Suggested learning roadmap on top of this project

1. Basic chat API
2. Conversation history
3. Streaming responses
4. Prompt design / system prompts
5. Store conversations in a database
6. Embeddings
7. Vector database
8. RAG using company documents
9. Lead capture
10. Tool calling
11. AI agents
12. Authentication, observability, testing, and production deployment

## Model configuration

The model is configured through `.env`:

```env
HF_MODEL=Qwen/Qwen3-8B:cheapest
```

Do not hard-code the model inside application logic. Keep it configurable so developers can compare models and providers safely.

If a selected model is unavailable through your Hugging Face Inference Providers configuration, choose another chat-compatible model from Hugging Face and update only `HF_MODEL`.
