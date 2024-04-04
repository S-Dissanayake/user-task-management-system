const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const HOST = process.env.HOST ;
const USER = process.env.USER ;
const PASSWORD = process.env.PASSWORD ;
const PORT = process.env.PORT ;
const DATABASE = process.env.DATABASE ;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: PORT,
    database: DATABASE
})

app.use((req, res, next) => {
    req.db = db;
    next();
});

const task = require("./routes/task/task");
const user = require("./routes/user/user");

app.use("/taskService/api", task);
app.use("/userService/api", user);

app.listen(8800, ()=>{
    console.log("Connected to backend - port: 8800")
})