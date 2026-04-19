import { Context } from 'telegraf';

export interface MyContext extends Context {
  botStartedAt: number;
}
