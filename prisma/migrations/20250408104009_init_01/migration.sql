-- CreateTable
CREATE TABLE "userData" (
    "userId" TEXT NOT NULL,
    "userFullName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,

    CONSTRAINT "userData_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "resumeData" (
    "resumeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeCloudUrl" TEXT NOT NULL,
    "skills" TEXT[],
    "experience" INTEGER NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resumeData_pkey" PRIMARY KEY ("resumeId")
);

-- CreateTable
CREATE TABLE "interviewData" (
    "interviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interviewData_pkey" PRIMARY KEY ("interviewId")
);

-- CreateTable
CREATE TABLE "codeInterview" (
    "codeIntId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "time" BIGINT NOT NULL,
    "question" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "feedBack" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "codeInterview_pkey" PRIMARY KEY ("codeIntId")
);

-- CreateTable
CREATE TABLE "mockInterview" (
    "mockIntId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "feedback" JSONB[],
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mockInterview_pkey" PRIMARY KEY ("mockIntId")
);

-- CreateTable
CREATE TABLE "practiceQuestions" (
    "questionId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "practiceQuestions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "comments" (
    "commentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userFullName" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userData_userEmail_key" ON "userData"("userEmail");

-- AddForeignKey
ALTER TABLE "resumeData" ADD CONSTRAINT "resumeData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviewData" ADD CONSTRAINT "interviewData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "codeInterview" ADD CONSTRAINT "codeInterview_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "interviewData"("interviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mockInterview" ADD CONSTRAINT "mockInterview_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "interviewData"("interviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "practiceQuestions"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
