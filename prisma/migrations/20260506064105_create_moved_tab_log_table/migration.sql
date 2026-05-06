-- CreateTable
CREATE TABLE "MovedTabLog" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "eventsType" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovedTabLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovedTabLog" ADD CONSTRAINT "MovedTabLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
