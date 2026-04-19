import { MyContext } from '@/bot/types/context';

export const helpCommand = async (ctx: MyContext): Promise<void> => {
  await ctx.reply('Send /start to start the bot');
};
