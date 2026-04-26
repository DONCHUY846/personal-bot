import { eq } from 'drizzle-orm';
import { IUserEntity } from '@/core/entities/user.entity';
import {
  CreateUserInput,
  IUserRepository,
  UpdateUserByTelegramIdInput,
} from '@/core/interfaces/repositories/user.repository.interface';
import { db } from '@/infrastructure/database';
import { users } from '@/infrastructure/database/user.schema';

/**
 * PostgreSQL implementation of the User Repository
 * Provides data access operations for User entities using Drizzle ORM with PostgreSQL
 *
 * @implements {IUserRepository} Contract defining user repository operations
 * @see {@link IUserRepository} for interface definition
 */
export class PostgresUserRepository implements IUserRepository {
  /**
   * Finds a user by their Telegram ID
   *
   * @param telegramId - The unique Telegram user ID to search for
   * @returns User entity if found, null if no user exists with the given Telegram ID
   * @throws {Error} If database query fails
   */
  async findByTelegramId(telegramId: bigint): Promise<IUserEntity | null> {
    const rows = await db.select().from(users).where(eq(users.telegramId, telegramId)).limit(1);

    const row = rows[0];
    if (!row) {
      return null;
    }

    return this.mapRowToUserEntity(row);
  }

  /**
   * Creates a new user in the database
   *
   * @param user - User creation data including required Telegram ID and optional profile information
   * @returns The newly created user entity
   * @throws {Error} If user creation fails or database operation errors occur
   */
  async create(user: CreateUserInput): Promise<IUserEntity> {
    const rows = await db
      .insert(users)
      .values({
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
      })
      .returning();

    const row = rows[0];
    if (!row) {
      throw new Error('User creation failed - no rows returned');
    }

    return this.mapRowToUserEntity(row);
  }

  /**
   * Updates user information by Telegram ID
   *
   * @param telegramId - The Telegram user ID to update
   * @param patch - Partial user data containing fields to update
   * @returns The updated user entity
   * @throws {Error} If user is not found or database operation fails
   */
  async updateByTelegramId(
    telegramId: bigint,
    patch: UpdateUserByTelegramIdInput,
  ): Promise<IUserEntity> {
    const rows = await db
      .update(users)
      .set({
        username: patch.username,
        firstName: patch.firstName,
        lastName: patch.lastName,
        fullName: patch.fullName,
        email: patch.email,
      })
      .where(eq(users.telegramId, telegramId))
      .returning();

    const row = rows[0];
    if (!row) {
      throw new Error('User not found');
    }

    return this.mapRowToUserEntity(row);
  }
  /**
   * Maps database row to User entity format
   * Converts null database values to undefined for consistent entity interface
   * Ensures updatedAt falls back to createdAt if not explicitly set
   *
   * @param row - Raw database row from users table
   * @returns Properly formatted User entity
   */
  private mapRowToUserEntity(row: typeof users.$inferSelect): IUserEntity {
    const { id, telegramId, username, firstName, lastName, fullName, email, createdAt, updatedAt } =
      row;
    return {
      id,
      telegramId,
      username: username ?? undefined,
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      fullName: fullName ?? undefined,
      email: email ?? undefined,
      createdAt,
      updatedAt: updatedAt ?? createdAt,
    };
  }
}
