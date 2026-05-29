-- AlterTable
ALTER TABLE "Peserta" ALTER COLUMN "nik" SET DEFAULT LPAD(FLOOR(RANDOM() * 10000000000000000)::TEXT, 16, '0');

-- CreateTable
CREATE TABLE "KraepelinScoring" (
    "id" SERIAL NOT NULL,
    "pesertaId" INTEGER NOT NULL,
    "statusSent" INTEGER NOT NULL,
    "skorKecepatan" INTEGER NOT NULL,
    "skorKetelitian" INTEGER NOT NULL,
    "skorKeajegan" INTEGER NOT NULL,
    "skorKetahanan" INTEGER NOT NULL,
    "kecepatanVariabel" TEXT NOT NULL,
    "ketelitianVariabel" TEXT NOT NULL,
    "keajeganVariabel" TEXT NOT NULL,
    "ketahananVariabel" TEXT NOT NULL,

    CONSTRAINT "KraepelinScoring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KraepelinScoring" ADD CONSTRAINT "KraepelinScoring_pesertaId_fkey" FOREIGN KEY ("pesertaId") REFERENCES "Peserta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
