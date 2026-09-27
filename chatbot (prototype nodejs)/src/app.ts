import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { apiRouter } from './routes/index.js';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { openapiDocument } from './docs/openapi.js';

export const app = express();

app.use(
  express.static(
    path.join(process.cwd(), 'public')
  )
);

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  }),
);
app.use(express.json({ limit: '20kb' }));

app.get('/openapi.json', (_req, res) => {
  res.json(openapiDocument);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use(
  '/api',
  rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    limit: env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
      success: false,
      error: { message: 'Too many requests. Please try again later.' },
    },
  }),
);

app.use('/api', apiRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
