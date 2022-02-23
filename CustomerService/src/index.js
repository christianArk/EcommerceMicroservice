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
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api", routes)

app.get('/', (req, res) => { res.send("<ChetaJS/>, start building something we'd remember!")});

app.listen(PORT, () => { console.log(`Your app is running on port ${PORT}`)});