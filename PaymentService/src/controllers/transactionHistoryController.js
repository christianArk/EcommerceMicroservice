import { Response } from "../utils/response"

export class TransactionHistoryController 
{
    constructor(transactionHistoryService){
        this.transactionHistoryService = new transactionHistoryService
    }
    
    createTransactionHistory = async (req, res) => {
        try {
            await this.transactionHistoryService.createTransactionHistory(req.body).then(data => {
                res.json(new Response("Transaction History created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateTransactionHistory = async (req, res) => {
        try {
            await this.transactionHistoryService.updateTransactionHistory(req.body).then(data => {
                res.json(new Response("Transaction History updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllTransactionHistorys = async (req, res) => {
        try {
            await this.transactionHistoryService.getAllTransactionHistorys().then(data => {
                res.json(new Response("All Transaction Historys", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getTransactionHistory = async (req, res) => {
        try {
            await this.transactionHistoryService.getTransactionHistory(req.params.transactionHistoryid).then(data => {
                res.json(new Response("Transaction History found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteTransactionHistory = async (req, res) => {
        try {
            await this.transactionHistoryService.deleteTransactionHistory(req.params.transactionHistoryid).then(data => {
                res.json(new Response("Transaction History deleted"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}