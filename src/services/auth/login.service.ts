import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';
import crypto from 'crypto';

export class LoginService {
  constructor(private userRepository: IUserRepository) {}

  async execute(telegramId: number) {
    const user = await this.userRepository.findByTelegramId(telegramId);
    if (!user) {
      const newUser: IUserEntity = {
        id: crypto.randomUUID(),
        telegramId,
        name: 'New User',
        email: 'new@example.com',
        createdAt: new Date(),
      };
      await this.userRepository.create(newUser);
      return newUser;
    }
    return user;
  }
}
