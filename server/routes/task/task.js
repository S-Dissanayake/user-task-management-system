const express = require("express");
const router = express.Router();
require("dotenv").config();


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

    // API for GET All Products
    router.get("/getAllTask", (req, res) => {
        const sql = "SELECT * FROM task";
        req.db.query(sql, (err, data) => {
            if (err) {
                return res.json({data: err, type: "Error"});
            }else{
                return res.json(data);
        }})
    })

module.exports = router;