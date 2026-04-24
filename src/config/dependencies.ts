import { MemoryUserRepository } from '@/infrastructure/repositories/memory-user.repository';
import { LoginService } from '@/services/auth/login.service';

/**
 * Dependency Injection Container
 * Instantiates and exports all singleton services and repositories.
 */
const userRepository = new MemoryUserRepository();
const loginService = new LoginService(userRepository);

export const dependencies = {
  loginService,
};
