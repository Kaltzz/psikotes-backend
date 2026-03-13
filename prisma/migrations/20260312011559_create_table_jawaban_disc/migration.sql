-- CreateTable
CREATE TABLE "JawabanDisc" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "mostGroupId" INTEGER NOT NULL,
    "mostQuestionIndex" INTEGER NOT NULL,
    "leastGroupId" INTEGER NOT NULL,
    "leastQuestionIndex" INTEGER NOT NULL,

    CONSTRAINT "JawabanDisc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JawabanDisc" ADD CONSTRAINT "JawabanDisc_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
