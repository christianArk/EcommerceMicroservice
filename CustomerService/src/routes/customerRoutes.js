import { CustomerController } from "../controllers/customerController";
import { Router } from "express";
import { CustomerService } from "../services/customerService";
import { validateRequestBody } from "../utils/functions"
import { createCustomerValidator } from "../validators/customerValidators";


const router = Router();

const customerCtrl = new CustomerController(CustomerService);


router.route('/')
        .get(customerCtrl.getAllCustomers)
        .post(validateRequestBody(createCustomerValidator), customerCtrl.createCustomer)
        .put(customerCtrl.updateCustomer)

router.route('/:customerid')
        .get(customerCtrl.getCustomer)
        .delete(customerCtrl.deleteCustomer)


export default router;
