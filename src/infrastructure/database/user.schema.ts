import { sql } from 'drizzle-orm';
import { pgTable, varchar, timestamp, bigint, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  telegramId: bigint('telegram_id', { mode: 'bigint' }).unique().notNull(),
  fullName: varchar('full_name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});
