import { CustomerController } from "../controllers/customerController";
import { Router } from "express";
import { CustomerService } from "../services/customerService";


const router = Router();

const customerCtrl = new CustomerController(CustomerService);


router.route('/')
        .get(customerCtrl.getAllCustomers)
        .post(customerCtrl.createCustomer)
        .put(customerCtrl.updateCustomer)

router.route('/:customerid')
        .get(customerCtrl.getCustomer)
        .delete(customerCtrl.deleteCustomer)


export default router;
