import { sql } from 'drizzle-orm';
import { pgTable, varchar, timestamp, bigint, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  telegramId: bigint('telegram_id', { mode: 'bigint' }).unique().notNull(),
  username: varchar('username', { length: 255 }),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});
