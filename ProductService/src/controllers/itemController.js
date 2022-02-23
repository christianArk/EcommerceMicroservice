import { Response } from "../utils/response"

export class ItemController 
{
    constructor(itemService){
        this.itemService = new itemService
    }
    
    createItem = async (req, res) => {
        try {
            await this.itemService.createItem(req.body).then(data => {
                res.json(new Response("Item created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateItem = async (req, res) => {
        try {
            await this.itemService.updateItem(req.body).then(data => {
                res.json(new Response("Item updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllItems = async (req, res) => {
        try {
            await this.itemService.getAllItems().then(data => {
                res.json(new Response("All Items", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getItem = async (req, res) => {
        try {
            await this.itemService.getItem(req.params.itemid).then(data => {
                res.json(new Response("Item found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteItem = async (req, res) => {
        try {
            await this.itemService.deleteItem(req.params.itemid).then(data => {
                res.json(new Response("Item deleted"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}