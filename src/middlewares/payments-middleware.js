export async function validateQuery(req, res, next) {
    console.log(req.query)

   const { propriedade, vencimento, tipo } = req.query;
   if (isNaN(propriedade) && propriedade != undefined) {
      return res.status(400).send("Value field invalid");
   }
   if (tipo != "A_Receber" && tipo != "A_Pagar" && tipo != undefined) {
      return res.status(400).send("Value field invalid");
   }
   if (
      typeof vencimento !== "string" &&
      vencimento?.length != 10 &&
      vencimento != undefined
   ) {
      return res.status(400).send("Value field invalid");
   }
   next();
}
