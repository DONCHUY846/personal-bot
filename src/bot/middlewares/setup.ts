import { MiddlewareFn } from 'telegraf';
import { MyContext } from '@/bot/types/context';

export const setupMiddleware: MiddlewareFn<MyContext> = (ctx, next) => {
  ctx.botStartedAt = Date.now();
  return next();
};
