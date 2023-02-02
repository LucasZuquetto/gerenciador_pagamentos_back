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

export async function getPaymentsRepository(filters) {
   const where = {};

   for (let i = 0; i < filters.length; i++) {
      const filter = filters[i][0];
      const value = filters[i][1];
      where[filter] = value;
   }
   if (filters.length === 0) {
      return await prisma.contas.findMany();
   }
   return await prisma.contas.findMany({
      where,
   });
}
