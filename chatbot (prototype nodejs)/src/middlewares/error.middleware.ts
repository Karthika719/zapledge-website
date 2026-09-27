import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next;

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: error.flatten().fieldErrors,
      },
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        ...(error.details !== undefined ? { details: error.details } : {}),
      },
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      ...(env.NODE_ENV === 'development' && error instanceof Error
        ? { details: error.message }
        : {}),
    },
  });
};
