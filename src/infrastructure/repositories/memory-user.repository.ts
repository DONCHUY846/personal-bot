import {
  CreateUserInput,
  IUserRepository,
  UpdateUserByTelegramIdInput,
} from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';

export class MemoryUserRepository implements IUserRepository {
  private users: IUserEntity[] = [];

  async findByTelegramId(id: bigint): Promise<IUserEntity | null> {
    return this.users.find((user) => user.telegramId === BigInt(id)) || null;
  }

  async create(user: CreateUserInput): Promise<IUserEntity> {
    this.users.push({
      id: crypto.randomUUID(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.users[this.users.length - 1];
  }

  async updateByTelegramId(
    telegramId: bigint,
    patch: UpdateUserByTelegramIdInput,
  ): Promise<IUserEntity> {
    const index = this.users.findIndex((user) => user.telegramId === BigInt(telegramId));
    if (index === -1) {
      throw new Error('User not found');
    }

    const current = this.users[index];
    const next: IUserEntity = {
      ...current,
      ...patch,
      telegramId: current.telegramId,
      id: current.id,
      createdAt: current.createdAt,
      updatedAt: new Date(),
    };

    this.users[index] = next;
    return next;
  }
}
