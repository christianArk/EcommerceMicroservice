import { OrderService } from "../services/orderService";

var amqp = require('amqplib/callback_api');

const rabbitURL = 'amqp://guest:guest@localhost:5672'

// listen for payment status
export const listenForPaymentStatus = () => {
    amqp.connect(rabbitURL, (err, connection) => {
        if (err) {
            throw err
        }
    
        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1
            }
    
            let exchange = "paymentTransaction"
    
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
    
                    console.log('received!')
                    
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