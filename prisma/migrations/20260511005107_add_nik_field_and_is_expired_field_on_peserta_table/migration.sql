/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `Peserta` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Peserta" ADD COLUMN     "isExpired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nik" TEXT NOT NULL DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');

-- CreateIndex
CREATE UNIQUE INDEX "Peserta_nik_key" ON "Peserta"("nik");
