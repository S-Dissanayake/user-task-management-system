const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
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

function verifyToken(req,res,next){
    const bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader!=='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next()
    }else {
        res.sendStatus(403);
    }
}

app.get("/", (req, res)=> {
    res.json("this is from backend  /")
})


app.listen(8800, ()=>{
    console.log("Connected to backend !")
})