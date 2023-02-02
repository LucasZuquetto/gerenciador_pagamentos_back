-- CreateEnum
CREATE TYPE "TipoDaConta" AS ENUM ('A_Pagar', 'A_Receber');

-- CreateTable
CREATE TABLE "Contas" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoDaConta" NOT NULL,
    "valor" FLOAT NOT NULL,
    "propriedade" INTEGER NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contas_pkey" PRIMARY KEY ("id")
);
