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
        `🚀 *¡Bienvenido a VaneBot!* \n\n` +
          `Actualmente me encuentro en **fase de desarrollo**, pero mi objetivo es ser tu central de organización personalizada. \n\n` +
          `*¿Qué podrás hacer conmigo?* \n\n` +
          `📂 *Gestión de Recursos:* Organiza información por categorías:\n` +
          `  • *Apuntes:* Notas rápidas que no quieres olvidar.\n` +
          `  • *Temas Pendientes:* Contenido para estudiar después.\n` +
          `  • *TODOs:* Tu lista de tareas clásica.\n` +
          `  • *Vocabulario:* (Especial) Guarda nuevas palabras y mejora tus idiomas.\n\n` +
          `⏰ *Gestor de Recordatorios:* \n` +
          `  Configura avisos, asígnarles hora y gestiónalos (activar/desactivar) de forma sencilla.\n\n` +
          `Usa /help para explorar lo que está disponible actualmente.`,
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
