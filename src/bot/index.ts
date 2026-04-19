import { Telegraf } from 'telegraf';
import { MyContext } from '@/bot/types/context';
import { setupMiddleware } from '@/bot/middlewares/setup';
import { startCommand } from '@/bot/commands/start';
import { helpCommand } from '@/bot/commands/help';
import { env } from '@/infrastructure/config/env';

export const createBotInstance = (): Telegraf<MyContext> => {
  const bot = new Telegraf<MyContext>(env.BOT_TOKEN);

  // Middlewares
  bot.use(setupMiddleware);

  // Commands
  bot.start(startCommand);
  bot.help(helpCommand);

  return bot;
};
