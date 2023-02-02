import contasService from '../services/contas-service.js';

export default async function contasController(req, res) {
   const { file } = req;

   try {
    const payments = await contasService(file)
    res.send(payments)
   } catch (error) {
    return res.sendStatus(500)
   }
   
//    for await (let { aluguelSEM } of products) {
//       await prisma.Contas.create({
//          data: {
//             aluguelSEM,
//          },
//       });
//    }
}
