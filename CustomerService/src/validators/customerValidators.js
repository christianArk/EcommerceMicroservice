import { CustomerService } from "../services/customerService";
import { body } from "express-validator"

const customerService = new CustomerService()

export const createCustomerValidator = [
    body('firstName', 'Firstname is required').notEmpty(),
    body('lastName', 'Lastname is required').notEmpty(),
    body('email', 'Email is required').notEmpty(),
    body('phoneNumber', 'Phone number is required').notEmpty(),
    body('email').isEmail().withMessage('must be an email address')
            .custom(async val => {
                    let customer = await customerService.getCustomerByEmail(val)
                    if(customer != null)
                            return Promise.reject('Email already exists')
                    return Promise.resolve()
            }),
]