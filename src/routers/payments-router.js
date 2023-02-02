import { Router } from "express";
import multerConfig from "../config/multer.js";
import { createPaymentsController, getPaymentsController } from "../controllers/payments-controller.js";

const paymentsRouter = Router();

paymentsRouter
   .post("/", multerConfig.single("file"), createPaymentsController)
   .get("/", getPaymentsController);

export default paymentsRouter;
