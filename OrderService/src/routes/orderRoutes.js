import { OrderController } from "../controllers/orderController";
import { Router } from "express";
import { OrderService } from "../services/orderService";
import { validateRequestBody } from "../utils/functions"
import { createOrderValidator } from "../validators/orderValidators";

/**
 * @swagger
 * definitions:
 *   OrderItem:
 *     properties:
 *       productID:
 *         type: string
 *       price:
 *         type: number
 *       quantity:
 *         type: number
 *   CreateOrderDto:
 *     properties:
 *       customerID:
 *         type: string
 *         required: true
 *       orderItems:
 *         type: array
 *         items:
 *           $ref: "#/definitions/OrderItem"
 */

const router = Router();

const orderCtrl = new OrderController(OrderService);


router.route('/')
/**
 * @swagger
 * /api/order:
 *  get:
 *    tags:
 *      - Order
 *    description: Get a list of orders
 *    responses:
 *      '200':
 *        description: A successful response
 */
        .get(orderCtrl.getAllOrders)
/**
 * @swagger
 * /api/order:
 *  post:
 *    tags:
 *      - Order
 *    description: Create an order
 *    produces:
 *      - "application/json"
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: "#/definitions/CreateOrderDto"
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Unprocessible entity
 */
        .post(validateRequestBody(createOrderValidator), orderCtrl.createOrder)
        .put(orderCtrl.updateOrder)

router.route('/:orderid')
        .get(orderCtrl.getOrder)
        .delete(orderCtrl.deleteOrder)


export default router;
