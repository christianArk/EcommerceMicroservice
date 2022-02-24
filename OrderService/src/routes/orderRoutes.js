import { OrderController } from "../controllers/orderController";
import { Router } from "express";
import { OrderService } from "../services/orderService";
import { validateRequestBody } from "../utils/functions"
import { createOrderValidator } from "../validators/orderValidators";


const router = Router();

const orderCtrl = new OrderController(OrderService);


router.route('/')
        .get(orderCtrl.getAllOrders)
        .post(validateRequestBody(createOrderValidator), orderCtrl.createOrder)
        .put(orderCtrl.updateOrder)

router.route('/:orderid')
        .get(orderCtrl.getOrder)
        .delete(orderCtrl.deleteOrder)


export default router;
