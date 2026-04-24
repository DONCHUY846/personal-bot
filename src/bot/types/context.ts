import { Context } from 'telegraf';
import { LoginService } from '@/services/auth/login.service';

export interface MyContext extends Context {
  botStartedAt: string;
  services: {
    loginService: LoginService;
  };
}
