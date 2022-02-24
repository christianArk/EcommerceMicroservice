import { ItemController } from "../controllers/itemController";
import { Router } from "express";
import { ItemService } from "../services/itemService";
import { validateRequestBody } from "../utils/functions"
import { createItemValidator } from "../validators/itemValidators";


const router = Router();

const itemCtrl = new ItemController(ItemService);

/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: number
 *   CreateProductDto:
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       description:
 *         type: string
 *         required: true
 *       price:
 *         type: number
 *         required: true
 */

router.route('/')
/**
 * @swagger
 * /api/item:
 *  get:
 *    tags:
 *      - Products
 *    description: Get a list of producs
 *    responses:
 *      '200':
 *        description: A successful response
 */
        .get(itemCtrl.getAllItems)
/**
 * @swagger
 * /api/item:
 *  post:
 *    tags:
 *      - Products
 *    description: Create a product
 *    produces:
 *      - "application/json"
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: "#/definitions/CreateProductDto"
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Unprocessible entity
 */
        .post(validateRequestBody(createItemValidator), itemCtrl.createItem)
        .put(itemCtrl.updateItem)

router.route('/:itemid')
        .get(itemCtrl.getItem)
        .delete(itemCtrl.deleteItem)


export default router;
