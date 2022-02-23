import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import mongoose from "mongoose";
import 'dotenv/config'

import { listenForOrder, listenForTransaction } from "./messaging/receiver";

const {PORT, DB_URI} = process.env
const app = express();

// db connection
try {
    mongoose.Promise =  global.Promise
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('PaymentService db connected')
}).catch(err => console.log(err.message))
} catch (error) {
    console.log('payment service db error ===>', error)
}

// listen for new orders
listenForOrder();
// listen for transactions
listenForTransaction();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api", routes)

app.get('/', (req, res) => { res.send("Payment Service")});

app.listen(PORT, () => { console.log(`Payment service is running on port ${PORT}`)});

process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
})

process.on('unhandledRejection', (error, promise) => {
    console.log('----- Unhandled Rejection -----')
    console.log(error)
})