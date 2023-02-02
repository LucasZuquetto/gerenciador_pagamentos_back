import { Router } from "express";
import multerConfig from "../config/multer.js";
import { createPaymentsController, getPaymentsController } from "../controllers/payments-controller.js";
import { validateQuery } from "../middlewares/payments-middleware.js";

const paymentsRouter = Router();

paymentsRouter
   .post("/", multerConfig.single("file"), createPaymentsController)
   .get("/", validateQuery ,getPaymentsController);

export default paymentsRouter;
