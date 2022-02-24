import mongoose from "mongoose"

const { Schema } = mongoose

export class CustomerModel extends Schema {

    constructor()
    {
        super()
        const customerSchema = {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phoneNumber: {
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

        this.add(customerSchema)

    }
}