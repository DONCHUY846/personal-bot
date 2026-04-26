import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';

export class LoginService {
  constructor(private userRepository: IUserRepository) {}

  async execute(telegramId: bigint): Promise<IUserEntity | null> {
    return this.userRepository.findByTelegramId(telegramId);
  }
}
