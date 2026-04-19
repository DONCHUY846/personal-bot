import { Telegraf } from 'telegraf';
import { MyContext } from '@/bot/types/context';
import { setupMiddleware } from '@/bot/middlewares/setup';
import { startCommand } from '@/bot/commands/start';
import { helpCommand } from '@/bot/commands/help';
import { env } from '@/infrastructure/config/env';

let botInstance: Telegraf<MyContext> | undefined;

/**
 * Creates and configures a single instance of the Telegram bot.
 *
 * This method implements a Singleton pattern to ensure only one Telegraf instance
 * is active during the application's lifecycle. It configures global middlewares
 * and registers basic commands.
 *
 * @returns {Telegraf<MyContext>} The configured Telegram bot instance.
 *
 * @example
 * ```typescript
 * const bot = createBotInstance();
 * await bot.launch();
 * ```
 */
export const createBotInstance = (): Telegraf<MyContext> => {
  if (botInstance) {
    return botInstance;
  }

  const bot = new Telegraf<MyContext>(env.BOT_TOKEN);

  // Middlewares
  bot.use(setupMiddleware);

  // Commands
  bot.start(startCommand);
  bot.help(helpCommand);

  botInstance = bot;
  return bot;
};
