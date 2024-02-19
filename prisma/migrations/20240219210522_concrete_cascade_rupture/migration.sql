-- DropForeignKey
ALTER TABLE "Rupture" DROP CONSTRAINT "Rupture_concreteId_fkey";

-- AddForeignKey
ALTER TABLE "Rupture" ADD CONSTRAINT "Rupture_concreteId_fkey" FOREIGN KEY ("concreteId") REFERENCES "Concrete"("id") ON DELETE CASCADE ON UPDATE CASCADE;
