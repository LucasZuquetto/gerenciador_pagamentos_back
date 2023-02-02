/*
  Warnings:

  - You are about to drop the `Contas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Contas";

-- CreateTable
CREATE TABLE "contas" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoDaConta" NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "propriedade" INTEGER NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);
