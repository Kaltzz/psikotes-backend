-- CreateTable
CREATE TABLE "DiscQuestion" (
    "id" SERIAL NOT NULL,
    "questionIndex" INTEGER NOT NULL,

    CONSTRAINT "DiscQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscOption" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "sentences" TEXT NOT NULL,
    "optionIndex" INTEGER NOT NULL,

    CONSTRAINT "DiscOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiscOption" ADD CONSTRAINT "DiscOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "DiscQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
