import { MiddlewareFn } from 'telegraf';
import { MyContext } from '@/bot/types/context';
import { formatDate } from '@/core/utils/date';

const botStartedAt = Date.now();
/**
 * Middleware to configure basic metadata in each message's context.
 *
 * Injects information about the bot's state, such as start date,
 * to be used by subsequent commands or logs.
 *
 * @param {MyContext} ctx - The Telegraf context for the current message.
 * @param {() => Promise<void>} next - Function to pass control to the next middleware.
 * @returns {Promise<void>} Promise that resolves when the middleware flow completes.
 */
export const setupMiddleware: MiddlewareFn<MyContext> = (ctx, next) => {
  ctx.botStartedAt = formatDate(botStartedAt);
  return next();
};
