/*
  Warnings:

  - Made the column `taskId` on table `Subtasks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Subtasks" DROP CONSTRAINT "Subtasks_taskId_fkey";

-- AlterTable
ALTER TABLE "Subtasks" ALTER COLUMN "taskId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Subtasks" ADD CONSTRAINT "Subtasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
