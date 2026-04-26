import { MyContext } from '@/bot/types/context';

export const startCommand = async (ctx: MyContext): Promise<void> => {
  const telegramId = ctx.from?.id;

  if (!telegramId) {
    await ctx.reply('Error: No se pudo identificar tu usuario de Telegram.');
    return;
  }

  try {
    const user = await ctx.services.loginService.execute(BigInt(telegramId));

    if (user?.fullName && user.email) {
      await ctx.reply(
        `¡Hola ${user.fullName}! Bienvenido a tu asistente personal.\n` +
          `Tu ID de registro es: ${user.telegramId}\n\n` +
          `Usa /help para ver qué puedo hacer por ti.`,
      );
      return;
    }

    await ctx.reply('¡Bienvenido! Para continuar necesito completar tus datos.');
    await ctx.scene.enter('registration');
  } catch (error) {
    console.error('Error in startCommand:', error);
    await ctx.reply('Ocurrió un error al intentar iniciar sesión. Por favor intenta de nuevo.');
  }
};
