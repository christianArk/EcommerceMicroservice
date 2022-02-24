import { ItemController } from "../controllers/itemController";
import { Router } from "express";
import { ItemService } from "../services/itemService";
import { validateRequestBody } from "../utils/functions"
import { createItemValidator } from "../validators/itemValidators";


const router = Router();

const itemCtrl = new ItemController(ItemService);


router.route('/')
        .get(itemCtrl.getAllItems)
        .post(validateRequestBody(createItemValidator), itemCtrl.createItem)
        .put(itemCtrl.updateItem)

router.route('/:itemid')
        .get(itemCtrl.getItem)
        .delete(itemCtrl.deleteItem)


export default router;
