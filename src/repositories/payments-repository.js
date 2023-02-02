import { prisma } from "../config/prisma.js";

export async function createPaymentsRepository(payments) {
   for await (let {
      tipo,
      valor,
      propriedade,
      vencimento,
      mesVencimento,
   } of payments) {
      await prisma.contas.create({
         data: {
            tipo,
            valor,
            propriedade,
            vencimento,
            mesVencimento,
         },
      });
   }
}

export async function getPaymentsRepository(filter = "", value = "") {
   if (filter === "" && value === "") {
      return await prisma.contas.findMany();
   }
   if (filter === "vencimento") {
      const month = value.slice(-7);
      return await prisma.contas.findMany({
         where: {
            mesVencimento: month,
         },
      });
   }
   if (filter === "tipo") {
      return await prisma.contas.findMany({
         where: {
            tipo: value,
         },
      });
   }
   if (filter === "propriedade") {
      return await prisma.contas.findMany({
         where: {
            propriedade: Number(value),
         },
      });
   }
}
