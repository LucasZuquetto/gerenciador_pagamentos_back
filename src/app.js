import express from "express";

const app = express();

app.get("/status", (req,res) => res.send("OK!"))

export default app