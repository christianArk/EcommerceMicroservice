import { Router } from "express";
import transactionHistoryRoutes from "./transactionHistoryRoutes"

const appRouter = Router();

appRouter.use('/transactionHistory', transactionHistoryRoutes)


export default appRouter;