/*
  Warnings:

  - You are about to drop the `Thread` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ThreadType" AS ENUM ('PIC', 'document');

-- DropTable
DROP TABLE "Thread";

-- CreateTable
CREATE TABLE "PicDesignerThread" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ThreadType" NOT NULL DEFAULT 'PIC',
    "queries" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PicDesignerThread_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PicDesignerThread_userId_idx" ON "PicDesignerThread"("userId");

-- CreateIndex
CREATE INDEX "PicDesignerThread_createdAt_idx" ON "PicDesignerThread"("createdAt");
