/*
Warnings:

- Added the required column `userDataUserId` to the `practiceQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "practiceQuestions" ADD COLUMN "userId" TEXT;

-- AddForeignKey
ALTER TABLE "practiceQuestions"
ADD CONSTRAINT "practiceQuestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userData" ("userId") ON DELETE SET NULL ON UPDATE CASCADE;