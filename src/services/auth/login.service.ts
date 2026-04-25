import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';

export class LoginService {
  constructor(private userRepository: IUserRepository) {}

  async execute(telegramId: bigint) {
    const user = await this.userRepository.findByTelegramId(telegramId);
    if (!user) {
      const newUser: Pick<IUserEntity, 'telegramId' | 'fullName' | 'email'> = {
        telegramId,
        fullName: 'New User',
        email: 'new@example.com',
      };
      await this.userRepository.create(newUser);
      return newUser;
    }
    return user;
  }
}
