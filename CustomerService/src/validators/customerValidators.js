import { CustomerService } from "../services/customerService";
import { body } from "express-validator"

const customerService = new CustomerService()

export const createCustomerValidator = [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').notEmpty(),
    body('phoneNumber').notEmpty(),
    body('email').isEmail().withMessage('must be an email address')
            .custom(async val => {
                    let customer = await customerService.getCustomerByEmail(val)
                    if(customer != null)
                            return Promise.reject('Email already exists')
                    return Promise.resolve()
            }),
]