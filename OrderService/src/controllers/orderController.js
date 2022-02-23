import { Response } from "../utils/response"

export class OrderController 
{
    constructor(orderService){
        this.orderService = new orderService
    }
    
    createOrder = async (req, res) => {
        try {
            await this.orderService.createOrder(req.body).then(data => {
                res.json(new Response("Order created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateOrder = async (req, res) => {
        try {
            await this.orderService.updateOrder(req.body).then(data => {
                res.json(new Response("Order updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllOrders = async (req, res) => {
        try {
            await this.orderService.getAllOrders().then(data => {
                res.json(new Response("All Orders", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getOrder = async (req, res) => {
        try {
            await this.orderService.getOrder(req.params.orderid).then(data => {
                res.json(new Response("Order found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteOrder = async (req, res) => {
        try {
            await this.orderService.deleteOrder(req.params.orderid).then(data => {
                res.json(new Response("Order deleted"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}