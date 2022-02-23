import { Router } from "express";
import customerRoutes from "./customerRoutes"

const appRouter = Router();

appRouter.use('/customer', customerRoutes) 

export default appRouter;