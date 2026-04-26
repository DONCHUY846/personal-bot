import { IUserEntity } from '@/core/entities/user.entity';

export interface CreateUserInput {
  telegramId: bigint;
  fullName: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserByTelegramIdInput {
  fullName?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserRepository {
  findByTelegramId: (_id: bigint) => Promise<IUserEntity | null>;
  create: (_user: CreateUserInput) => Promise<IUserEntity>;
  updateByTelegramId: (
    _telegramId: bigint,
    _patch: UpdateUserByTelegramIdInput,
  ) => Promise<IUserEntity>;
}
