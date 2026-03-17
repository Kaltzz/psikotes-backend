-- CreateTable
CREATE TABLE "PapikostickQuestion" (
    "id" SERIAL NOT NULL,
    "questionIndex" INTEGER NOT NULL,

    CONSTRAINT "PapikostickQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PapikostickOption" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "sentences" TEXT NOT NULL,
    "optionType" TEXT NOT NULL,

    CONSTRAINT "PapikostickOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PapikostickOption" ADD CONSTRAINT "PapikostickOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "PapikostickQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
