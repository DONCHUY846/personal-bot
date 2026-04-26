import { MyContext } from '@/bot/types/context';

/**
 * Normaliza una cadena de confirmación para comparación insensible.
 * Convierte a minúsculas, elimina acentos y caracteres especiales.
 * Esto permite que "sí", "si", "SI" sean tratados como equivalentes.
 *
 * @param value - Texto a normalizar
 * @returns Texto normalizado para comparación
 *
 * @example
 * normalizeConfirmation("Sí") // returns "si"
 * normalizeConfirmation("  YES  ") // returns "yes"
 */
export const normalizeConfirmation = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Extrae el texto de un mensaje de Telegram, validando que sea un mensaje de texto válido.
 * Esta función ayuda a manejar consistentemente los diferentes tipos de mensajes que
 * pueden llegar al bot y asegura que solo procesemos mensajes de texto.
 *
 * @param ctx - Contexto de Telegraf
 * @returns El texto del mensaje o null si no es un mensaje de texto válido
 *
 * @example
 * getTextMessage(ctx) // returns "hola" o null
 */
export const getTextMessage = (ctx: MyContext): string | null => {
  const message = ctx.message;
  if (!message) {
    return null;
  }

  if ('text' in message && typeof message.text === 'string') {
    return message.text;
  }

  return null;
};
