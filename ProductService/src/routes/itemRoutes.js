import { ItemController } from "../controllers/itemController";
import { Router } from "express";
import { ItemService } from "../services/itemService";


const router = Router();

const itemCtrl = new ItemController(ItemService);


router.route('/')
        .get(itemCtrl.getAllItems)
        .post(itemCtrl.createItem)
        .put(itemCtrl.updateItem)

router.route('/:itemid')
        .get(itemCtrl.getItem)
        .delete(itemCtrl.deleteItem)


export default router;
