import { IUserEntity } from '@/core/entities/user.entity';

export interface IUserRepository {
  findByTelegramId: (_id: bigint) => Promise<IUserEntity | null>;
  create: (_user: Pick<IUserEntity, 'telegramId' | 'fullName' | 'email'>) => Promise<IUserEntity>;
}
