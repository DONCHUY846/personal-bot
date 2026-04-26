import { PostgresUserRepository } from '@/infrastructure/repositories/postgres-user.repository';
import { LoginService } from '@/services/auth/login.service';
import { RegisterUserService } from '@/services/auth/register-user.service';

/**
 * Dependency Injection Container
 * Instantiates and exports all singleton services and repositories.
 */
const userRepository = new PostgresUserRepository();
const loginService = new LoginService(userRepository);
const registerUserService = new RegisterUserService(userRepository);

export const dependencies = {
  loginService,
  registerUserService,
};
