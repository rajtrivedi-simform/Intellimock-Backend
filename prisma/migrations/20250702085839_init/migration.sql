/*
  Warnings:

  - You are about to drop the column `interviewId` on the `codeInterview` table. All the data in the column will be lost.
  - You are about to drop the column `interviewId` on the `mockInterview` table. All the data in the column will be lost.
  - You are about to drop the `interviewData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `level` to the `codeInterview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `codeInterview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewType` to the `mockInterview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `mockInterview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `mockInterview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "codeInterview" DROP CONSTRAINT "codeInterview_interviewId_fkey";

-- DropForeignKey
ALTER TABLE "interviewData" DROP CONSTRAINT "interviewData_userId_fkey";

-- DropForeignKey
ALTER TABLE "mockInterview" DROP CONSTRAINT "mockInterview_interviewId_fkey";

-- AlterTable
ALTER TABLE "codeInterview" DROP COLUMN "interviewId",
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "mockInterview" DROP COLUMN "interviewId",
ADD COLUMN     "interviewType" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "feedback" SET DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "resumeData" ALTER COLUMN "skills" SET DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "interviewData";

-- CreateIndex
CREATE INDEX "userData_userEmail_idx" ON "userData"("userEmail");

-- AddForeignKey
ALTER TABLE "codeInterview" ADD CONSTRAINT "codeInterview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mockInterview" ADD CONSTRAINT "mockInterview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
