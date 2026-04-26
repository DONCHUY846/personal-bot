import { eq } from 'drizzle-orm';
import { IUserEntity } from '@/core/entities/user.entity';
import {
  CreateUserInput,
  IUserRepository,
  UpdateUserByTelegramIdInput,
} from '@/core/interfaces/repositories/user.repository.interface';
import { db } from '@/infrastructure/database';
import { users } from '@/infrastructure/database/user.schema';

export class PostgresUserRepository implements IUserRepository {
  async findByTelegramId(telegramId: bigint): Promise<IUserEntity | null> {
    const rows = await db.select().from(users).where(eq(users.telegramId, telegramId)).limit(1);

    const row = rows[0];
    if (!row) {
      return null;
    }

    return {
      id: row.id,
      telegramId: row.telegramId,
      username: row.username ?? undefined,
      firstName: row.firstName ?? undefined,
      lastName: row.lastName ?? undefined,
      fullName: row.fullName ?? undefined,
      email: row.email ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt ?? row.createdAt,
    };
  }

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
    return {
      id: row.id,
      telegramId: row.telegramId,
      username: row.username ?? undefined,
      firstName: row.firstName ?? undefined,
      lastName: row.lastName ?? undefined,
      fullName: row.fullName ?? undefined,
      email: row.email ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt ?? row.createdAt,
    };
  }

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

    return {
      id: row.id,
      telegramId: row.telegramId,
      username: row.username ?? undefined,
      firstName: row.firstName ?? undefined,
      lastName: row.lastName ?? undefined,
      fullName: row.fullName ?? undefined,
      email: row.email ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt ?? row.createdAt,
    };
  }
}
