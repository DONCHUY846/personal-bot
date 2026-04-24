import { IUserEntity } from '@/core/entities/user.entity';

export interface IUserRepository {
  findByTelegramId: (_id: number) => Promise<IUserEntity | null>;
  create: (_user: IUserEntity) => Promise<IUserEntity>;
}
