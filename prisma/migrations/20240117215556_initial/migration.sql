-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rupture" (
    "id" SERIAL NOT NULL,
    "moldingDate" TIMESTAMP(3) NOT NULL,
    "Invoice" VARCHAR(10) NOT NULL,
    "qtd_cp" INTEGER NOT NULL,
    "fck" INTEGER NOT NULL,
    "slump" INTEGER NOT NULL,
    "piece" VARCHAR(200) NOT NULL,
    "tf14h1" DECIMAL(5,2),
    "tf14h2" DECIMAL(5,2),
    "tf7d1" DECIMAL(5,2),
    "tf7d2" DECIMAL(5,2),
    "tf28d1" DECIMAL(5,2),
    "tf28d2" DECIMAL(5,2),
    "tf63d" DECIMAL(5,2),
    "mpa14h1" DECIMAL(5,2),
    "mpa14h2" DECIMAL(5,2),
    "mpa7d1" DECIMAL(5,2),
    "mpa7d2" DECIMAL(5,2),
    "mpa28d1" DECIMAL(5,2),
    "mpa28d2" DECIMAL(5,2),
    "mpa63d" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Rupture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rupture" ADD CONSTRAINT "Rupture_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
