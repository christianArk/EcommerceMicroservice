import "dotenv/config"
import { OrderModel } from "../models/orderModel"
import mongoose from "mongoose"
import { publishOrderCreated } from "../messaging/publisher";

const orderModel = mongoose.model('Order', new OrderModel);
var amqp = require('amqplib/callback_api')

export class OrderService {
    constructor(){
    }
    
    createOrder = async (data) => {
        try {
            data.orderNumber = await this.generateOrderNumber()
            let totalAmount = 0
            data.orderItems.forEach(x => {
                totalAmount += x.price * x.quantity
            })
            data.totalAmount = totalAmount

            let order = orderModel(data);
            let newOrder = await order.save();

            // send new order to exchange
            publishOrderCreated(newOrder)
            
            return newOrder
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    updateOrder = async (data) => {
        try {
            let updateStatus = {
                orderStatus: data.status
            }
            let order = await orderModel.findByIdAndUpdate(data.orderID, {$set: updateStatus}, {new: true});
            return order;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    getAllOrders = async () => {
        try {
            return await orderModel.find({})
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    getOrder = async (orderId) => {
        try {
            let order = await orderModel.findById(orderId);
            if(order)
            {
                return order
            }
            throw "Order not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteOrder = async (orderId) => {
        try {
            return await orderModel.findByIdAndDelete(orderId);
        } catch (error) {
            throw error;
        }
    }

    getOrderByOrderNumber = async (orderNumber) => {
        try {
            let order = await orderModel.findOne({orderNumber: orderNumber});
            if(order)
            {
                return true
            }
            return false
        } catch (error) {
            throw error;
        }
    }

    generateOrderNumber = async () => {
        try {
            let orderNumber = null
            do {
                orderNumber = `OR-${Date.now() + Math.floor(Math.random()*20)}`
            } while (await this.getOrderByOrderNumber(orderNumber))
            return orderNumber
        } catch (error) {
            throw error;
        }
    }
    
}