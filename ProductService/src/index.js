import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import mongoose from "mongoose";
import 'dotenv/config'

const {PORT, DB_URI} = process.env
const app = express();

// db connection
mongoose.Promise =  global.Promise
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('ProductService db connected')
}).catch(err => console.log(err.message))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api", routes)

app.get('/', (req, res) => { res.send("Product Service")});

app.listen(PORT, () => { console.log(`Product service is running on port ${PORT}`)});

process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
})

process.on('unhandledRejection', (error, promise) => {
    console.log('----- Unhandled Rejection -----')
    console.log(error)
})