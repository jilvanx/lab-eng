/*
  Warnings:

  - You are about to drop the column `Invoice` on the `Rupture` table. All the data in the column will be lost.
  - Added the required column `invoice` to the `Rupture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rupture" DROP COLUMN "Invoice",
ADD COLUMN     "invoice" VARCHAR(10) NOT NULL;
