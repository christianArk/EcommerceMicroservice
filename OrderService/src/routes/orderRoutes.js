import { OrderController } from "../controllers/orderController";
import { Router } from "express";
import { OrderService } from "../services/orderService";


const router = Router();

const orderCtrl = new OrderController(OrderService);


router.route('/')
        .get(orderCtrl.getAllOrders)
        .post(orderCtrl.createOrder)
        .put(orderCtrl.updateOrder)

router.route('/:orderid')
        .get(orderCtrl.getOrder)
        .delete(orderCtrl.deleteOrder)


export default router;
