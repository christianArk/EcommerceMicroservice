import { TransactionHistoryController } from "../controllers/transactionHistoryController";
import { Router } from "express";
import { TransactionHistoryService } from "../services/transactionHistoryService";


const router = Router();

const transactionHistoryCtrl = new TransactionHistoryController(TransactionHistoryService);


router.route('/')
/**
 * @swagger
 * /api/transactionHistory:
 *  get:
 *    tags:
 *      - Transactions
 *    description: Get a list of transaction histories
 *    responses:
 *      '200':
 *        description: A successful response
 */
        .get(transactionHistoryCtrl.getAllTransactionHistorys)
        .post(transactionHistoryCtrl.createTransactionHistory)
        .put(transactionHistoryCtrl.updateTransactionHistory)

router.route('/:transactionHistoryid')
        .get(transactionHistoryCtrl.getTransactionHistory)
        .delete(transactionHistoryCtrl.deleteTransactionHistory)


export default router;
