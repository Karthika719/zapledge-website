import { app } from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT);

server.on('listening', () => {
  console.log(`API running at http://localhost:${env.PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
  console.log(`Hugging Face model: ${env.HF_MODEL}`);
});

server.on('error', (err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});

function shutdown(signal: string) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  server.close((error) => {
    if (error) {
      console.error('Error while closing server:', error);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
