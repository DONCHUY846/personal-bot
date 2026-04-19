import { MiddlewareFn } from 'telegraf';
import { MyContext } from '@/bot/types/context';

const botStartedAt = Date.now();
export const setupMiddleware: MiddlewareFn<MyContext> = (ctx, next) => {
  ctx.botStartedAt = botStartedAt;
  return next();
};
