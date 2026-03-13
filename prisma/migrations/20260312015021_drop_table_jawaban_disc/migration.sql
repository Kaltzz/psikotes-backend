/*
  Warnings:

  - You are about to drop the `JawabanDisc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JawabanDisc" DROP CONSTRAINT "JawabanDisc_sessionId_fkey";

-- DropTable
DROP TABLE "JawabanDisc";
