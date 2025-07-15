-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "parentCommentId" TEXT;

-- CreateTable
CREATE TABLE "skills" (
    "skillId" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "normalisedName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skillId")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_skillName_key" ON "skills"("skillName");

-- CreateIndex
CREATE UNIQUE INDEX "skills_normalisedName_key" ON "skills"("normalisedName");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "comments"("commentId") ON DELETE SET NULL ON UPDATE CASCADE;
