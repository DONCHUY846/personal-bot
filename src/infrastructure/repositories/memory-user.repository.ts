import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';

export class MemoryUserRepository implements IUserRepository {
  private users: IUserEntity[] = [];

  async findByTelegramId(id: number): Promise<IUserEntity | null> {
    return this.users.find((user) => user.telegramId === id) || null;
  }

  async create(user: IUserEntity): Promise<IUserEntity> {
    this.users.push(user);
    return user;
  }
}
