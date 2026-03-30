-- CreateTable
CREATE TABLE "MsdtQuestion" (
    "id" SERIAL NOT NULL,
    "questionIndex" INTEGER NOT NULL,

    CONSTRAINT "MsdtQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MsdtOption" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "sentences" TEXT NOT NULL,
    "optionType" INTEGER NOT NULL,

    CONSTRAINT "MsdtOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MsdtOption" ADD CONSTRAINT "MsdtOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MsdtQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
