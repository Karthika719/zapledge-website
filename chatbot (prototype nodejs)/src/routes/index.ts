import { Router } from 'express';
import { chatRouter } from '../modules/chat/chat.routes.js';
import { healthRouter } from '../modules/health/health.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/chat', chatRouter);
