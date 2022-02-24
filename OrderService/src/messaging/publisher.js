var amqp = require('amqplib/callback_api');

const {RABBIT_URI} = process.env

export const publishOrderCreated = (newOrder) => {
    amqp.connect(RABBIT_URI, (err, connection) => {
        if (err) {
            throw err
        }

        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1
            }

            const exchange = "orderCreated"
            const key = "newOrder"

            const payload = {
                orderID: newOrder._id,
                customerID: newOrder.customerID,
                amount: newOrder.totalAmount
            }

            let message = JSON.stringify(payload)

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });

            channel.publish(exchange, key, Buffer.from(message))
            console.log("[x] sent %s", message)

        })

        setTimeout(() => {
            connection.close();
        }, 500)
    })
}