ALTER TABLE "Token" RENAME COLUMN "tests" TO "tests_old";
ALTER TABLE "Token" ADD COLUMN "tests" "Tests"[] NOT NULL DEFAULT '{}';
ALTER TABLE "Token" DROP COLUMN "tests_old";