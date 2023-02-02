export async function validateQuery(req, res, next) {
   const { filter, value } = req.query;
   const regex =
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
   if ((filter && value === undefined) || value === "") {
      res.status(404).send("Value field not found");
   }
   if (filter === undefined) {
      next();
   }
   if (filter != "tipo" && filter != "vencimento" && filter != "propriedade") {
      res.status(404).send("Filter field invalid");
   }
   if (filter === "vencimento" && !regex.test(value)) {
      res.status(400).send("Value field invalid");
   } else if (filter === "tipo" && value != "A_Receber" && value != "A_Pagar") {
      res.status(400).send("Value field invalid");
   } else if (filter === "propriedade" && isNaN(value)) {
      res.status(400).send("Value field invalid");
   }
   next();
}
