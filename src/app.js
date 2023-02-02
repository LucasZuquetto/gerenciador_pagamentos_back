import express from "express";
import paymentsRouter from './routers/payments-router.js';

const app = express();

app.get("/status", (req,res) => res.send("OK!")).use("/contas", paymentsRouter)

export default app