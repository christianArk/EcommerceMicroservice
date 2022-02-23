var amqp = require('amqplib/callback_api');

const {RABBIT_URI} = process.env

export const publishTransaction = (data) => {
    amqp.connect(RABBIT_URI, (err, connection) => {
        if (err) {
            throw err
        }

        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1
            }

            let exchange = "paymentTransaction"

            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });


            data = JSON.stringify(data)
            channel.publish(exchange, '', Buffer.from(data))
            console.log("[x] sent %s", data)
        })

        setTimeout(() => {
            connection.close();
        }, 500)
    })
}
