/*
  Warnings:

  - You are about to drop the column `searchField` on the `Cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "searchField",
ADD COLUMN     "upvote" INTEGER;
