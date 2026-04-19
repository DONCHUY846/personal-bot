import { MyContext } from '@/bot/types/context';

export const startCommand = async (ctx: MyContext): Promise<void> => {
  await ctx.reply(`Bot started at ${ctx.botStartedAt}`);
};
