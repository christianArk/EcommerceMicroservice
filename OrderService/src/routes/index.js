import { Router } from "express";
import orderRoutes from "./orderRoutes"

const appRouter = Router();

appRouter.use('/order', orderRoutes)


export default appRouter;