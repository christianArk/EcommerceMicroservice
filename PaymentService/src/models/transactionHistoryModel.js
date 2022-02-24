import mongoose from "mongoose"

const { Schema } = mongoose

export class TransactionHistoryModel extends Schema {

    constructor()
    {
        super()
        const transactionHistorySchema = {
            orderID: {
                type: String,
                required: true
            },
            customerID: {
                type: String,
                required: true
            },
            amount: {
                type: String,
                required: true
            },
            status: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
            }
        }

        this.add(transactionHistorySchema)

    }
}