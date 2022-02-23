import mongoose from "mongoose"

const { Schema } = mongoose

export class PaymentModel extends Schema {

    constructor()
    {
        super()
        const paymentSchema = {
            amount: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
            }
        }

        this.add(paymentSchema)

    }
}