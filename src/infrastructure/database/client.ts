import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@/config/env';
/**
 * PostgreSQL connection pool instance
 * Manages a pool of database connections for efficient query execution
 * @see https://node-postgres.com/apis/pool
 */
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

/**
 * Drizzle ORM database instance
 * Provides type-safe database operations using the PostgreSQL connection pool
 * @see https://orm.drizzle.team/docs/overview
 */
export const db = drizzle(pool);

/**
 * Singleton promise tracking database closure to prevent multiple close operations
 */
let closing: Promise<void> | undefined;

/**
 * Gracefully closes the database connection pool
 * Ensures proper cleanup of database connections and prevents connection leaks
 * @returns Promise that resolves when the database connection pool is closed
 * @throws {Error} If database closure fails (errors are logged but not re-thrown)
 */
export const closeDatabase = async (): Promise<void> => {
  if (!closing) {
    closing = pool.end().catch((error) => {
      console.error('Error closing database:', error);
    });
  }

  return closing;
};
