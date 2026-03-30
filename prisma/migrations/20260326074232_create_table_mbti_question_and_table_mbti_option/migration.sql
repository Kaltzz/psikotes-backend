-- CreateTable
CREATE TABLE "mbtiQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL,

    CONSTRAINT "mbtiQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mbtiOption" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "sentences" TEXT NOT NULL,
    "optionType" INTEGER NOT NULL,

    CONSTRAINT "mbtiOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mbtiOption" ADD CONSTRAINT "mbtiOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "mbtiQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
