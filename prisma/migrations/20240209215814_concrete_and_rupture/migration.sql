/*
  Warnings:

  - You are about to drop the column `fck` on the `Rupture` table. All the data in the column will be lost.
  - You are about to drop the column `invoice` on the `Rupture` table. All the data in the column will be lost.
  - You are about to drop the column `moldingDate` on the `Rupture` table. All the data in the column will be lost.
  - You are about to drop the column `piece` on the `Rupture` table. All the data in the column will be lost.
  - You are about to drop the column `qtd_cp` on the `Rupture` table. All the data in the column will be lost.
  - You are about to drop the column `slump` on the `Rupture` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Rupture` table. All the data in the column will be lost.
  - Added the required column `concreteId` to the `Rupture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rupture" DROP CONSTRAINT "Rupture_workId_fkey";

-- AlterTable
ALTER TABLE "Rupture" DROP COLUMN "fck",
DROP COLUMN "invoice",
DROP COLUMN "moldingDate",
DROP COLUMN "piece",
DROP COLUMN "qtd_cp",
DROP COLUMN "slump",
DROP COLUMN "workId",
ADD COLUMN     "concreteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Concrete" (
    "id" SERIAL NOT NULL,
    "moldingDate" DATE NOT NULL,
    "invoice" VARCHAR(10) NOT NULL,
    "qtd_cp" INTEGER NOT NULL,
    "fck" INTEGER NOT NULL,
    "slump" INTEGER NOT NULL,
    "piece" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Concrete_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Concrete" ADD CONSTRAINT "Concrete_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rupture" ADD CONSTRAINT "Rupture_concreteId_fkey" FOREIGN KEY ("concreteId") REFERENCES "Concrete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
