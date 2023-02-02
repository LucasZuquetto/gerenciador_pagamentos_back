import { Router } from "express";
import multerConfig from "../config/multer.js";
import paymentsController from '../controllers/payments-controller.js';

const paymentsRouter = Router()

paymentsRouter.post('/', multerConfig.single("file"), paymentsController)

export default paymentsRouter