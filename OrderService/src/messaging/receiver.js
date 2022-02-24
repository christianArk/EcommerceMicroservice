import { OrderService } from "../services/orderService";

var amqp = require('amqplib/callback_api');

const {RABBIT_URI} = process.env

// listen for payment status
export const listenForPaymentStatus = () => {
    amqp.connect(RABBIT_URI, (err, connection) => {
        if (err) {
            console.log("retrying connection...")
            return setTimeout(listenForPaymentStatus, 5000)
        }
    
        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1
            }
    
            let exchange = "paymentTransaction"

            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });
    
            channel.assertQueue('', {
                exclusive: true
            }, (err, q) => {
                if (err){
                    throw err
                }

                console.log("waiting for payment status in %s", exchange)
                channel.bindQueue(q.queue, exchange, '')
                channel.consume(q.queue, (message) => {
                    let msg = JSON.parse(message.content.toString())
    
                    console.log('Received payment status!')
                    
                    // call transaction service to save transaction history
                    let orderService = new OrderService()
                    orderService.updateOrder(msg)
        
                }, {
                    noAck: true
                })

            })
    
        })
        
    })
}