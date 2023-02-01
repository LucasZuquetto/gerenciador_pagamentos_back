import contasService from '../services/contas-service';

export default async function contasController(req, res) {
   const { file } = req;

   try {
    const bookings = await contasService(file)
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
   return res.json(bookings);
}
