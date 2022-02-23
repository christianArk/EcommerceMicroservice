import { Router } from "express";
import itemRoutes from "./itemRoutes"

const appRouter = Router();

appRouter.use('/item', itemRoutes)

export default appRouter;