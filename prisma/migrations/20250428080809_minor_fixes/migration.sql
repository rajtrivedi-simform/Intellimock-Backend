/*
  Warnings:

  - Changed the type of `level` on the `codeInterview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `interviewType` on the `mockInterview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `mockInterview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "codeInterview" DROP COLUMN "level",
ADD COLUMN     "level" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "mockInterview" DROP COLUMN "interviewType",
ADD COLUMN     "interviewType" TEXT NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" TEXT NOT NULL;

-- DropEnum
DROP TYPE "InterviewLevel";

-- DropEnum
DROP TYPE "InterviewType";
