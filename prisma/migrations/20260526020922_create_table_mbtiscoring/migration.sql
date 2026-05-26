-- AlterTable
ALTER TABLE "Peserta" ALTER COLUMN "nik" SET DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');

-- CreateTable
CREATE TABLE "MbtiScoring" (
    "id" SERIAL NOT NULL,
    "pesertaId" INTEGER NOT NULL,
    "statusSent" INTEGER NOT NULL,
    "karakterTalent" TEXT NOT NULL,
    "uraianKarakterTalent" TEXT NOT NULL,

    CONSTRAINT "MbtiScoring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MbtiScoring" ADD CONSTRAINT "MbtiScoring_pesertaId_fkey" FOREIGN KEY ("pesertaId") REFERENCES "Peserta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
