-- CreateTable
CREATE TABLE "JawabanMbti" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "JawabanMbti_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JawabanMbti" ADD CONSTRAINT "JawabanMbti_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
