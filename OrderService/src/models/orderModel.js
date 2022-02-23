import mongoose from "mongoose"

const { Schema } = mongoose

export class OrderModel extends Schema {

    constructor()
    {
        super()
        const orderSchema = {
            orderNumber: {
                type: String,
                required: true
            },
            customerID: {
                type: String,
                required: true
            },
            orderItems: [
                {
                    productID: String,
                    price: Number,
                    quantity: Number
                }
            ],
            orderStatus: {
                type: String,
                default: "PENDING"
            },
            totalAmount: {
                type: Number,
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
            }
        }

        this.set('toJSON', { getters: true })
        this.set('toObject', { getters: true})

        this.add(orderSchema)

    }

    getTotalPrice = (val) =>
    {
        console.log(v)
        return 5000
    }
}