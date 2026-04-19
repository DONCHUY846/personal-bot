import 'dotenv/config';
import { createBotInstance } from '@/bot';

const startApp = async () => {
  try {
    const bot = createBotInstance();

    await bot.launch();
    console.log('Bot started successfully');

    process.once('SIGINT', () => {
      console.log('Stopping bot... (SIGINT)');
      bot.stop('SIGINT');
    });
    process.once('SIGTERM', () => {
      console.log('Stopping bot... (SIGTERM)');
      bot.stop('SIGTERM');
    });
  } catch (error) {
    console.error('Error starting bot:', error);
    process.exit(1);
  }
};

startApp();
