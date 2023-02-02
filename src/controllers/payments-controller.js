import { createPaymentsRepository } from "../repositories/payments-repository.js";
import { createPaymentsService, getPaymentsService } from "../services/payments-service.js";

export async function createPaymentsController(req, res) {
   const { file } = req;
   try {
      const payments = await createPaymentsService(file);
      await createPaymentsRepository(payments);
      res.send(payments);
   } catch (error) {
      console.log(error.message);
      return res.sendStatus(500);
   }
}

export async function getPaymentsController(req, res) {
   const {vencimento, tipo, propriedade} = req.query
   try {
      const payments = await getPaymentsService(vencimento, tipo, propriedade)
      res.send(payments)
   } catch (error) {
      if (error.message === "Value field not found"){
         console.log(error.message)
         return res.sendStatus(404)
      }
      if (error.message === "Filter field invalid"){
         console.log(error.message)
         return res.sendStatus(404)
      }
      if (error.message === "Value field invalid"){
         console.log(error.message)
         return res.sendStatus(400)
      }
      
      console.log(error.message)
      return res.sendStatus(500)
   }
}
