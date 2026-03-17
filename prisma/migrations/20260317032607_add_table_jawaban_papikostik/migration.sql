-- CreateTable
CREATE TABLE "JawabanPapikostik" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "JawabanPapikostik_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JawabanPapikostik" ADD CONSTRAINT "JawabanPapikostik_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
