var amqp = require('amqplib/callback_api');

const {RABBIT_URI} = process.env

var rabbitConn = null
var publishChannel = null
var offlinePubQueue = [];

export const startPublisher = () => {
    amqp.connect(RABBIT_URI, (err, connection) => {
        if (err) {
          return setTimeout(startPublisher, 5000);
        }
        connection.on("error", (err) => {
          if (err.message !== "Connection closing") {
            console.error("[AMQP] connection error", err.message);
          }
        });
        connection.on("close", () => {
          console.error("[AMQP] reconnecting");
          return setTimeout(startPublisher, 5000);
        });
    
        console.log("[AMQP] connected");
        rabbitConn = connection;
    
        connectionSuccessful();
      });
}

const connectionSuccessful = () => {
    rabbitConn.createConfirmChannel((err, channel) => {
      if (closeOnErr(err)) return;
      channel.on("error", (err) => {
        console.error("[AMQP] channel error", err.message);
      });
      channel.on("close", () => {
        console.log("[AMQP] channel closed");
      });
  
      publishChannel = channel;
    //   while (true) {
    //     var data = offlinePubQueue.shift();
    //     if (!data) break;
    //     const [exchange, key, content] = data
    //     publish(exchange, key, content);
    //   }
    });
}

const publish = (exchange, routingKey, content) => {
    try {
        publishChannel.assertExchange(exchange, 'direct', {
            durable: false
        });

        publishChannel.publish(exchange, routingKey, Buffer.from(content), { persistent: true },
            (err, ok) => {
            if (err) {
                console.error("[AMQP] publish error", err);
                offlinePubQueue.push([exchange, routingKey, content]);
                publishChannel.connection.close();
            }
            console.log("[x] sent %s", content)
        });
        
    } catch (e) {
        console.error("[AMQP] publish error", e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
}

const closeOnErr = (err) => {
    if (!err) return false;
    console.error("[AMQP] error", err);
    rabbitConn.close();
    return true;
}

export const publishOrderCreated = (newOrder) => {
    const exchange = "orderCreated"
    const key = "newOrder"

    const payload = {
        orderID: newOrder._id,
        customerID: newOrder.customerID,
        amount: newOrder.totalAmount
    }

    let message = JSON.stringify(payload)
    publish(exchange, key, message)
}