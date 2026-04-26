import { Scenes } from 'telegraf';
import { MyContext } from '@/bot/types/context';
import { normalizeConfirmation, getTextMessage } from '@/bot/scenes/registation/registration.utils';
import { emailSchema, isValidFullName } from '@/bot/scenes/registation/registration.validations';

/**
 * Wizard de registro de usuarios que implementa el Patrón State para manejar
 * conversaciones complejas de múltiples pasos.
 *
 * Este wizard tiene 3 estados:
 * 1. Inicialización y propuesta de nombre desde Telegram
 * 2. Confirmación/validación del nombre completo
 * 3. Validación de email y finalización del registro
 *
 * Utiliza el sistema de Scenes de Telegraf para mantener el estado entre
 * diferentes interacciones del usuario.
 */
export const registrationWizard = new Scenes.WizardScene<MyContext>(
  'registration',
  async (ctx) => {
    const firstName = ctx.from?.first_name?.trim();
    const lastName = ctx.from?.last_name?.trim();
    const fullNameCandidate = [firstName, lastName].filter(Boolean).join(' ').trim();

    ctx.scene.session.registration = {
      fullNameCandidate: fullNameCandidate.length > 0 ? fullNameCandidate : undefined,
    };

    if (ctx.scene.session.registration.fullNameCandidate) {
      await ctx.reply(
        `Detecté tu nombre como: ${ctx.scene.session.registration.fullNameCandidate}.\n` +
          `Responde "sí" para confirmar o escribe tu nombre completo.`,
      );
    } else {
      await ctx.reply('¿Cuál es tu nombre completo?');
    }

    return ctx.wizard.next();
  },
  async (ctx) => {
    const text = getTextMessage(ctx);
    if (!text) {
      await ctx.reply('Por favor envía tu nombre como texto.');
      return;
    }

    const confirmation = normalizeConfirmation(text);
    const candidate = ctx.scene.session.registration?.fullNameCandidate;

    const fullName = confirmation === 'si' && candidate ? candidate : text.trim();
    if (!isValidFullName(fullName)) {
      await ctx.reply('Tu nombre completo debe tener entre 3 y 255 caracteres. Intenta de nuevo.');
      return;
    }

    if (!ctx.scene.session.registration) {
      ctx.scene.session.registration = {};
    }
    ctx.scene.session.registration.fullName = fullName;

    await ctx.reply('Perfecto. Ahora, ¿cuál es tu email?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const text = getTextMessage(ctx);
    if (!text) {
      await ctx.reply('Por favor envía tu email como texto.');
      return;
    }

    const email = text.trim().toLowerCase();
    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) {
      await ctx.reply('Ese email no parece válido. Intenta de nuevo.');
      return;
    }

    const telegramId = ctx.from?.id;
    const fullName = ctx.scene.session.registration?.fullName;
    if (!telegramId || !fullName) {
      await ctx.reply('Error: no pude completar tu registro. Intenta de nuevo con /start.');
      ctx.scene.session.registration = undefined;
      return ctx.scene.leave();
    }

    try {
      const user = await ctx.services.registerUserService.execute({
        telegramId: BigInt(telegramId),
        fullName,
        email: parsedEmail.data,
        username: ctx.from?.username,
        firstName: ctx.from?.first_name,
        lastName: ctx.from?.last_name,
      });

      ctx.scene.session.registration = undefined;

      await ctx.reply(
        `¡Hola ${user.fullName || 'usuario'}! Bienvenido a tu asistente personal.\n` +
          `Tu ID de registro es: ${user.telegramId}\n\n` +
          `Usa /help para ver qué puedo hacer por ti.`,
      );
    } catch {
      await ctx.reply('Error: no pude completar tu registro. Intenta de nuevo con /start.');
    } finally {
      ctx.scene.session.registration = undefined;
    }
    return ctx.scene.leave();
  },
);
