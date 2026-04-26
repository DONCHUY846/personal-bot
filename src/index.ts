import 'dotenv/config';
import { createBotInstance } from '@/bot';
import { closeDatabase } from '@/infrastructure/database';

const startApp = async () => {
  try {
    const bot = createBotInstance();

    await bot.launch();
    console.log('Bot started successfully');

    process.once('SIGINT', () => {
      console.log('Stopping bot... (SIGINT)');
      bot.stop('SIGINT');
      void closeDatabase();
    });
    process.once('SIGTERM', () => {
      console.log('Stopping bot... (SIGTERM)');
      bot.stop('SIGTERM');
      void closeDatabase();
    });
  } catch (error) {
    console.error('Error starting bot:', error);
    process.exit(1);
  }
};

startApp();
