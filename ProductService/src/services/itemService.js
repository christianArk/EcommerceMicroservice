import "dotenv/config"
import { ItemModel } from "../models/itemModel"
import mongoose from "mongoose"

const itemModel = mongoose.model('Item', new ItemModel);
export class ItemService {
    constructor(){
    }
    
    createItem = async (data) => {
        try {
            let item = itemModel(data);
            return item.save();
        } catch (error) {
            throw error;
        }
    }

    updateItem = async (data) => {
        try {
            let item = await itemModel.findByIdAndUpdate(data._id, {$set: data}, {new: true});
            return item;
        } catch (error) {
            throw error;
        }
    }

    getAllItems = async () => {
        try {
            return await itemModel.find({});
        } catch (error) {
            throw error;
        }
    }

    getItem = async (itemId) => {
        try {
            let item = await itemModel.findById(itemId);
            if(item)
            {
                return item
            }
            throw "Item not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteItem = async (itemId) => {
        try {
            return await itemModel.findByIdAndDelete(itemId);
        } catch (error) {
            throw error;
        }
    }
    
}