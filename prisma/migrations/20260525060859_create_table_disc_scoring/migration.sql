-- AlterTable
ALTER TABLE "Peserta" ALTER COLUMN "nik" SET DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');

-- CreateTable
CREATE TABLE "DiscScoring" (
    "id" SERIAL NOT NULL,
    "pesertaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusSent" INTEGER NOT NULL,
    "maskType" TEXT NOT NULL DEFAULT 'NULL',
    "maskCharacteristics" TEXT NOT NULL DEFAULT 'NULL',
    "coreType" TEXT NOT NULL DEFAULT 'NULL',
    "coreCharacteristics" TEXT NOT NULL DEFAULT 'NULL',
    "mirrorType" TEXT NOT NULL DEFAULT 'NULL',
    "mirrorCharacteristics" TEXT NOT NULL DEFAULT 'NULL',
    "personalityDescription" TEXT NOT NULL DEFAULT 'NULL',
    "jobMatch" TEXT NOT NULL DEFAULT 'NULL',

    CONSTRAINT "DiscScoring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiscScoring" ADD CONSTRAINT "DiscScoring_pesertaId_fkey" FOREIGN KEY ("pesertaId") REFERENCES "Peserta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
