import { TransactionHistoryController } from "../controllers/transactionHistoryController";
import { Router } from "express";
import { TransactionHistoryService } from "../services/transactionHistoryService";


const router = Router();

const transactionHistoryCtrl = new TransactionHistoryController(TransactionHistoryService);


router.route('/')
        .get(transactionHistoryCtrl.getAllTransactionHistorys)
        .post(transactionHistoryCtrl.createTransactionHistory)
        .put(transactionHistoryCtrl.updateTransactionHistory)

router.route('/:transactionHistoryid')
        .get(transactionHistoryCtrl.getTransactionHistory)
        .delete(transactionHistoryCtrl.deleteTransactionHistory)


export default router;
