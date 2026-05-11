/*
  Warnings:

  - Added the required column `expiredAt` to the `StatusExpired` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Peserta" ALTER COLUMN "nik" SET DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');

-- AlterTable
ALTER TABLE "StatusExpired" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL;
