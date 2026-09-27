import type { RequestHandler } from 'express';
import { chatRequestSchema } from './chat.schema.js';
import { generateChatReply } from './chat.service.js';

export const createChatCompletion: RequestHandler = async (req, res, next) => {
  try {
    const input = chatRequestSchema.parse(req.body);
    const reply = await generateChatReply(input);

    res.status(200).json({
      success: true,
      data: {
        reply,
      },
    });
  } catch (error) {
    next(error);
  }
};
