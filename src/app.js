import express from "express";
import paymentsRouter from "./routers/payments-router.js";
import cors from "cors";

const app = express();

app.use(cors())
   .get("/status", (req, res) => res.send("OK!"))
   .use("/contas", paymentsRouter);

export default app;
