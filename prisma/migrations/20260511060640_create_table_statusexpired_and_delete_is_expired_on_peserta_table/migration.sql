/*
  Warnings:

  - You are about to drop the column `isExpired` on the `Peserta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Peserta" DROP COLUMN "isExpired",
ALTER COLUMN "nik" SET DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');

-- CreateTable
CREATE TABLE "StatusExpired" (
    "id" SERIAL NOT NULL,
    "pesertaId" INTEGER NOT NULL,
    "isExpired" BOOLEAN NOT NULL,

    CONSTRAINT "StatusExpired_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatusExpired" ADD CONSTRAINT "StatusExpired_pesertaId_fkey" FOREIGN KEY ("pesertaId") REFERENCES "Peserta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
