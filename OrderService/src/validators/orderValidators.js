import { body } from "express-validator"

export const createOrderValidator = [
    body('customerID').notEmpty(),
    body('orderItems', 'orderItems should be an array').isArray(),
    body('orderItems.*.productID', 'productID is required').notEmpty(),
    body('orderItems.*.price', 'price is required').notEmpty(),
    body('orderItems.*.price', 'price must be numeric').isNumeric(),
    body('orderItems.*.quantity', 'quanity is required').notEmpty(),
    body('orderItems.*.quantity', 'quanity must be numeric').isNumeric(),
]