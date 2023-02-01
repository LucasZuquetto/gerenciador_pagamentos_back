import express from "express";
import contasRouter from './routers/contas-router.js';

const app = express();

app.get("/status", (req,res) => res.send("OK!")).use("/contas", contasRouter)

export default app