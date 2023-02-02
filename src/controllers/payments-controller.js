import paymentRepository from "../repositories/payments-repository.js";
import paymentsService from "../services/payments-service.js";

export default async function paymentsController(req, res) {
   const { file } = req;
   try {
      const payments = await paymentsService(file);
      // await paymentRepository(payments);
      res.send(payments);
   } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
   }
}
