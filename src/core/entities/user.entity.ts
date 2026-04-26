export interface IUserEntity {
  id: string;
  email?: string;
  fullName?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  telegramId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
