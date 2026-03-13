-- CreateTable
CREATE TABLE "JawabanDisc" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "most" INTEGER NOT NULL,
    "least" INTEGER NOT NULL,

    CONSTRAINT "JawabanDisc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JawabanDisc" ADD CONSTRAINT "JawabanDisc_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
