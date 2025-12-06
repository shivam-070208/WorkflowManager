/*
  Warnings:

  - Added the required column `position` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "NodeType" ADD VALUE 'Webhook';

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "position" JSONB NOT NULL;
