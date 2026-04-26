import { z } from 'zod';
import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';

/**
 * Input data required for user registration
 * Combines required Telegram identification with optional profile information
 */
export interface RegisterUserInput {
  /** Unique Telegram user identifier */
  telegramId: bigint;
  /** User's full name (required for registration) */
  fullName: string;
  /** User's email address (must be valid format) */
  email: string;
  /** Optional Telegram username (without @) */
  username?: string;
  /** Optional first name */
  firstName?: string;
  /** Optional last name */
  lastName?: string;
}

/** Zod schema for email validation */
const emailSchema = z.email();

/**
 * Service responsible for user registration and profile updates
 * Handles both new user registration and existing user profile updates
 * Implements business logic for user data validation and persistence
 */
export class RegisterUserService {
  /**
   * Creates a new RegisterUserService instance
   * @param userRepository - User repository implementation for data persistence
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes user registration or profile update
   *
   * Business Logic:
   * - Validates input data (email format, required fields)
   * - Checks if user already exists by Telegram ID
   * - Creates new user if not exists
   * - Updates existing user profile if already registered
   *
   * @param input - User registration data
   * @returns The registered or updated user entity
   * @throws {Error} If validation fails (invalid email, missing fullName)
   * @throws {Error} If database operations fail
   */
  async execute(input: RegisterUserInput): Promise<IUserEntity> {
    const fullName = input.fullName.trim();
    const email = input.email.trim().toLowerCase();

    if (fullName.length === 0) {
      throw new Error('fullName is required');
    }

    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) {
      throw new Error('email is invalid');
    }

    const existing = await this.userRepository.findByTelegramId(input.telegramId);
    if (!existing) {
      return this.userRepository.create({
        telegramId: input.telegramId,
        fullName,
        email: parsedEmail.data,
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
      });
    }

    return this.userRepository.updateByTelegramId(input.telegramId, {
      fullName,
      email: parsedEmail.data,
      username: input.username ?? existing.username,
      firstName: input.firstName ?? existing.firstName,
      lastName: input.lastName ?? existing.lastName,
    });
  }
}
