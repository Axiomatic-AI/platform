/*
  Warnings:

  - Added the required column `type` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ThreadType" AS ENUM ('PIC', 'document');

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "type" "ThreadType" NOT NULL;
