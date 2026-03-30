-- CreateTable
CREATE TABLE "JawabanMsdt" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "JawabanMsdt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JawabanMsdt" ADD CONSTRAINT "JawabanMsdt_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
