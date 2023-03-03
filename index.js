const express = require('express')
const app = express();
require('./models/config')
const cron = require("node-cron");
const router = require('./routes/mainRoutes')
const bodyparser = require('body-parser')
const user = require('./routes/userRouters')
const company = require('./routes/companyRouters')

const dotenv = require('dotenv')
dotenv.config()

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router)
 
const server = app.listen(process.env.Port, function (req, res) {
    console.log(`Server is running on Port:${process.env.port}`);
})

module.exports = server

