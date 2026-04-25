import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';

export class MemoryUserRepository implements IUserRepository {
  private users: IUserEntity[] = [];

  async findByTelegramId(id: bigint): Promise<IUserEntity | null> {
    return this.users.find((user) => user.telegramId === BigInt(id)) || null;
  }

  async create(user: Pick<IUserEntity, 'telegramId' | 'fullName' | 'email'>): Promise<IUserEntity> {
    this.users.push({
      id: crypto.randomUUID(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.users[this.users.length - 1];
  }
}
