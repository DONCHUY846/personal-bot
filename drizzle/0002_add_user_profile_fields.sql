ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "full_name" varchar(255);
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email" varchar(255);

