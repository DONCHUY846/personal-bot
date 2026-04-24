import { MyContext } from '@/bot/types/context';

export const startCommand = async (ctx: MyContext): Promise<void> => {
  const telegramId = ctx.from?.id;

  if (!telegramId) {
    await ctx.reply('Error: No se pudo identificar tu usuario de Telegram.');
    return;
  }

  try {
    const user = await ctx.services.loginService.execute(telegramId);

    await ctx.reply(
      `¡Hola ${user.name || 'usuario'}! Bienvenido a tu asistente personal.\n` +
        `Tu ID de registro es: ${user.id}\n\n` +
        `Usa /help para ver qué puedo hacer por ti.`,
    );
  } catch (error) {
    console.error('Error in startCommand:', error);
    await ctx.reply('Ocurrió un error al intentar iniciar sesión. Por favor intenta de nuevo.');
  }
};
