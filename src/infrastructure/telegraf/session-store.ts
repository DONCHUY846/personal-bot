import { Postgres } from '@telegraf/session/pg';
import type { SessionStore } from 'telegraf';
import { pool } from '@/infrastructure/database';

export const createSessionStore = <Session>(): SessionStore<Session> => {
  return Postgres<Session>({ pool });
};
