import { z } from 'zod';

/**
 * Esquema de validación para direcciones de email.
 * Utiliza Zod para validar el formato del email con estándares RFC.
 *
 * @example
 * emailSchema.safeParse("test@example.com") // success
 * emailSchema.safeParse("invalid-email") // error
 */
export const emailSchema = z.string().email();

/**
 * Valida que un nombre completo cumpla con los requisitos de longitud.
 * Los nombres deben tener entre 3 y 255 caracteres para ser válidos.
 *
 * @param fullName - Nombre completo a validar
 * @returns true si el nombre es válido, false en caso contrario
 *
 * @example
 * isValidFullName("Juan Pérez") // true
 * isValidFullName("A") // false
 */
export const isValidFullName = (fullName: string): boolean => {
  return fullName.length >= 3 && fullName.length <= 255;
};
