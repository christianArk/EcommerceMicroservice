import { CustomerController } from "../controllers/customerController";
import { Router } from "express";
import { CustomerService } from "../services/customerService";
import { validateRequestBody } from "../utils/functions"
import { createCustomerValidator } from "../validators/customerValidators";


const router = Router();

const customerCtrl = new CustomerController(CustomerService);


/**
 * @swagger
 * definitions:
 *   Customer:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       phoneNumber:
 *         type: string
 *   CreateCustomerDto:
 *     properties:
 *       firstName:
 *         type: string
 *         required: true
 *       lastName:
 *         type: string
 *         required: true
 *       email:
 *         type: string
 *         required: true
 *       phoneNumber:
 *         type: string
 *         required: true
 */

router.route('/')
/**
 * @swagger
 * /api/customer:
 *  get:
 *    tags:
 *      - Customer
 *    description: Get a list of customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
        .get(customerCtrl.getAllCustomers)
/**
 * @swagger
 * /api/customer:
 *  post:
 *    tags:
 *      - Customer
 *    description: Create a customer
 *    produces:
 *      - "application/json"
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: "#/definitions/CreateCustomerDto"
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Unprocessible entity
 */
        .post(validateRequestBody(createCustomerValidator), customerCtrl.createCustomer)
        .put(customerCtrl.updateCustomer)

router.route('/:customerid')
        .get(customerCtrl.getCustomer)
        .delete(customerCtrl.deleteCustomer)


export default router;
