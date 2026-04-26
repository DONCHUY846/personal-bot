import { z } from 'zod';
import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IUserEntity } from '@/core/entities/user.entity';

export interface RegisterUserInput {
  telegramId: bigint;
  fullName: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

const emailSchema = z.string().email();

export class RegisterUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: RegisterUserInput): Promise<IUserEntity> {
    const fullName = input.fullName.trim();
    const email = input.email.trim().toLowerCase();

    if (fullName.length === 0) {
      throw new Error('fullName is required');
    }

    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) {
      throw new Error('email is invalid');
    }

    const existing = await this.userRepository.findByTelegramId(input.telegramId);
    if (!existing) {
      return this.userRepository.create({
        telegramId: input.telegramId,
        fullName,
        email: parsedEmail.data,
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
      });
    }

    return this.userRepository.updateByTelegramId(input.telegramId, {
      fullName,
      email: parsedEmail.data,
      username: input.username ?? existing.username,
      firstName: input.firstName ?? existing.firstName,
      lastName: input.lastName ?? existing.lastName,
    });
  }
}
