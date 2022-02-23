import mongoose from "mongoose"

const { Schema } = mongoose

export class ItemModel extends Schema {

    constructor()
    {
        super()
        const itemSchema = {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            price: {
                type: Number,
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

        this.add(itemSchema)

    }
}