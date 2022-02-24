import { publishTransaction } from './publisher'
import { TransactionHistoryService } from "../services/transactionHistoryService";
import { PaymentService } from "../services/paymentService";

var amqp = require('amqplib/callback_api');

const {RABBIT_URI} = process.env

// Listen for new order
export const listenForOrder = () => {
    amqp.connect(RABBIT_URI, (err, connection) => {
        if (err) {
            throw err
        }
    
        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1
            }
    
            let exchange = "orderCreated"
            let key = "newOrder"

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });

            channel.assertQueue('', {
                exclusive: true
            }, (err, q) => {
                if (err){
                    throw err
                }

                console.log("waiting for new order from %s", exchange)
                channel.bindQueue(q.queue, exchange, key)

                channel.consume(q.queue, async (message) => {
                    let msg = JSON.parse(message.content.toString())
                    
                    // call payment service
                    let paymentService = new PaymentService()
                    let status = await paymentService.makePayment()

                    let transaction = {
                        status,
                        ...msg
                    }
        
                    // publish for transaction history
                    publishTransaction(transaction)
        
                }, {
                    noAck: true
                })

            })
        })
        
    })
}


// Listen for transaction
export const listenForTransaction = () => {
    amqp.connect(RABBIT_URI, (err, connection) => {
        if (err) {
            throw err
        }
    
        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1
            }
    
            const exchange = "paymentTransaction"

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
                    
                    // call transaction service to save transaction history
                    let transService = new TransactionHistoryService()
                    transService.createTransactionHistory(msg)
        
                }, {
                    noAck: true
                })

            })
    
        })
        
    })
}