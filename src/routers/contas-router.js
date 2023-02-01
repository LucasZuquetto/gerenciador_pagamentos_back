import { Router } from "express";
import multerConfig from "../config/multer.js";
import contasController from '../controllers/contas-controller.js';

const contasRouter = Router()

contasRouter.post('/', multerConfig.single("file"), contasController)

export default contasRouter