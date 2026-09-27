import { Router } from 'express';
import { createChatCompletion } from './chat.controller.js';

export const chatRouter = Router();

chatRouter.post('/', createChatCompletion);
