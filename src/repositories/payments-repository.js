import { prisma } from "../config/prisma.js";

export default async function paymentRepository(payments) {
      for await (let { tipo, valor, propriedade, vencimento } of payments) {
         await prisma.contas.create({
            data: {
               tipo,
               valor,
               propriedade,
               vencimento,
            },
         });
      }
}
