import { body } from "express-validator"

export const createItemValidator = [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty().isNumeric()
]