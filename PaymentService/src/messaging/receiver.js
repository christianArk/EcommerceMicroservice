import { publishTransaction } from './publisher'
import { TransactionHistoryService } from "../services/transactionHistoryService";
import { PaymentService } from "../services/paymentService";

var amqp = require('amqplib/callback_api');

const rabbitURL = 'amqp://guest:guest@localhost:5672'

// Listen for new order
export const listenForOrder = () => {
    amqp.connect(rabbitURL, (err, connection) => {
        if (err) {
            throw err
        }
    
        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1
            }
    
            let queue = "order"
    
            channel.assertQueue(queue, {
                durable: false
            })
    
            console.log("waiting for messages in %s", queue)
            
            channel.consume(queue, async (message) => {
                let msg = JSON.parse(message.content.toString())
                console.log("[x] Received %s", msg)

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
}


// Listen for transaction
export const listenForTransaction = () => {
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