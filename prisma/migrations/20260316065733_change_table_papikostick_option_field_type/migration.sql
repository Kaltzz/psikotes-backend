/*
  Warnings:

  - Changed the type of `optionType` on the `PapikostickOption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PapikostickOption" DROP COLUMN "optionType",
ADD COLUMN     "optionType" INTEGER NOT NULL;
