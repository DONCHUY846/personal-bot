import { MiddlewareFn } from 'telegraf';
import { MyContext } from '@/bot/types/context';
import { formatDate } from '@/core/utils/date';

const botStartedAt = Date.now();
export const setupMiddleware: MiddlewareFn<MyContext> = (ctx, next) => {
  ctx.botStartedAt = formatDate(botStartedAt);
  return next();
};
