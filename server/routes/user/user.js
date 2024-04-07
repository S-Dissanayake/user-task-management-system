const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const JWT_KEY = process.env.JWT_KEY ;

// API for user creation
router.post('/signup', (req, res) => {
    const sql = "INSERT INTO user (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    req.db.query(sql, [values], (err, data) => {
        if(err){
            return res.json({error: true, err: err});
        }
        else{
            const id= data.insertId;
            const token = jwt.sign({id}, JWT_KEY, {expiresIn: '12h'})
            return res.json({signup: true, msg: "User Created", token, id});
        }
    })
})

// API for user login 
router.post("/login", (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ? AND password=?";
    req.db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0) {
            const id= data[0].userId
            const user = {userId: data[0].userId, name: data[0].name}
            const token = jwt.sign({id}, JWT_KEY, {expiresIn: '12h'})
            return res.json({login: true, token, user});
        }else {
            return res.status(404).json({
                status: "Error",
                message: "E-mail or Password is Incorrect. Try again.",
            })         
        }
    })
})

module.exports = router;