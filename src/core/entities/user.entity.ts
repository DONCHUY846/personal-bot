export interface IUserEntity {
  id: string;
  email?: string;
  fullName?: string;
  telegramId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
