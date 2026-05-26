-- AlterTable
ALTER TABLE "Peserta" ALTER COLUMN "nik" SET DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');

-- CreateTable
CREATE TABLE "MsdtScoring" (
    "id" SERIAL NOT NULL,
    "pesertaId" INTEGER NOT NULL,
    "statusSent" INTEGER NOT NULL,
    "hasilTest" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mainExplanation1" TEXT NOT NULL,
    "mainExplanation2" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MsdtScoring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MsdtScoring" ADD CONSTRAINT "MsdtScoring_pesertaId_fkey" FOREIGN KEY ("pesertaId") REFERENCES "Peserta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
