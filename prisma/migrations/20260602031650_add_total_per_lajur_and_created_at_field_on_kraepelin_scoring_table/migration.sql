/*
  Warnings:

  - Added the required column `totalPerLajur` to the `KraepelinScoring` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KraepelinScoring" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalPerLajur" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Peserta" ALTER COLUMN "nik" SET DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');
