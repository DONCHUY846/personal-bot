import { MiddlewareFn } from 'telegraf';
import { MyContext } from '@/bot/types/context';
import { dependencies } from '@/config/dependencies';

const BOT_STARTED_AT = new Date().toISOString();

/**
 * Middleware to configure basic metadata in each message's context.
 *
 * Injects:
 * - `services`: The dependency injection container (repositories and services).
 * - `botStartedAt`: The ISO timestamp of when the bot process was initialized.
 *
 * @param {MyContext} ctx - The Telegraf context for the current message.
 * @param {() => Promise<void>} next - Function to pass control to the next middleware.
 * @returns {Promise<void>} Promise that resolves when the middleware flow completes.
 */
export const setupMiddleware: MiddlewareFn<MyContext> = (ctx, next) => {
  ctx.services = dependencies;
  ctx.botStartedAt = BOT_STARTED_AT;
  return next();
};
