import "dotenv/config"
import { TransactionHistoryModel } from "../models/transactionHistoryModel"
import mongoose from "mongoose"

const transactionHistoryModel = mongoose.model('TransactionHistory', new TransactionHistoryModel);
export class TransactionHistoryService {
    constructor(){
    }
    
    createTransactionHistory = async (data) => {
        try {
            let transactionHistory = transactionHistoryModel(data);
            return transactionHistory.save();
        } catch (error) {
            throw error;
        }
    }

    updateTransactionHistory = async (data) => {
        try {
            let transactionHistory = await transactionHistoryModel.findByIdAndUpdate(data._id, {$set: data}, {new: true});
            return transactionHistory;
        } catch (error) {
            throw error;
        }
    }

    getAllTransactionHistorys = async () => {
        try {
            return await transactionHistoryModel.find({});
        } catch (error) {
            throw error;
        }
    }

    getTransactionHistory = async (transactionHistoryId) => {
        try {
            let transactionHistory = await transactionHistoryModel.findById(transactionHistoryId);
            if(transactionHistory)
            {
                return transactionHistory
            }
            throw "TransactionHistory not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteTransactionHistory = async (transactionHistoryId) => {
        try {
            return await transactionHistoryModel.findByIdAndDelete(transactionHistoryId);
        } catch (error) {
            throw error;
        }
    }
    
}