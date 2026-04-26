import 'dotenv/config';
import { createBotInstance } from '@/bot';
import { closeDatabase } from '@/infrastructure/database';

const startApp = async () => {
  try {
    const bot = createBotInstance();

    await bot.launch();
    console.log('Bot started successfully');

    const shutdown = async (signal: 'SIGINT' | 'SIGTERM') => {
      console.log(`Stopping bot... (${signal})`);
      bot.stop(signal);
      try {
        await closeDatabase();
      } catch (error) {
        console.error('Error closing database:', error);
      }
    };
    process.once('SIGINT', () => shutdown('SIGINT'));
    process.once('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('Error starting bot:', error);
    process.exit(1);
  }
};

startApp();
