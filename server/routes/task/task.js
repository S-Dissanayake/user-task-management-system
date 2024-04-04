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

    // API for GET All Tasks
    router.get("/getAllTask", (req, res) => {
        const sql = "SELECT * FROM task";
        req.db.query(sql, (err, data) => {
            if (err) {
                return res.json({data: err, type: "Error"});
            }else{
                return res.json(data);
        }})
    })

    // API for add task
    router.post("/addNewTask",verifyToken,(req, res) => {
        jwt.verify(req.token,'aquaExpert',(err,authData)=> {
            if(err){
                res.sendStatus(403);
            }else {
                const sql = "INSERT INTO aquaexperts_db.product (name, category, price, oldPrice, description, imageUrl, createdDate, latestUpdatedDate, favorite, sale, outOfStock) VALUES (?)";
                const values = [
                    req.body.name,
                    req.body.category,
                    req.body.price,
                    req.body.oldPrice,
                    req.body.description,
                    req.body.imageUrl,
                    req.body.createdDate,
                    req.body.latestUpdatedDate,
                    req.body.favorite,
                    req.body.sale,
                    req.body.outOfStock
                ]
                db.query(sql, [values], (err, data) => {
                    if(err){
                        return res.json({error: true, err: err});            
                    }
                    else{
                        return res.json(data);
                    }
                })
            }
        })    
    })

    // API for DELETE a task from DB
    router.delete("/deleteTask/:id",verifyToken,(req, res) => {
        jwt.verify(req.token,'aquaExpert',(err,authData)=> {
            if(err){
                res.sendStatus(403);
            }else {
                const sql = "DELETE FROM aquaexperts_db.product WHERE id = ?";
                const productId = req.params.id;

                db.query(sql,[productId], (err, data) => {
                    if (err) {
                        return res.json(err);
                    }else{
                        return res.json(data);
                }})
            }
        })  
    })

    // API for UPDATE a task
    router.put("/updateTask/:id",verifyToken, (req, res) => {
        jwt.verify(req.token,'aquaExpert',(err,authData)=> {
            if(err){
                res.sendStatus(403);
            }else {
                const productId = req.params.id;
                const sql = "UPDATE aquaexperts_db.product SET `name`= ?, `category` = ?, `price` = ?, `oldPrice` = ?, `description` = ?, `imageUrl` = ?, `createdDate` = ?, `latestUpdatedDate` = ?, `favorite` = ?, `sale` = ?, `outOfStock` = ? WHERE (`id` = ?);";
                const values = [
                    req.body.name,
                    req.body.category,
                    req.body.price,
                    req.body.oldPrice,
                    req.body.description,
                    req.body.imageUrl,
                    req.body.createdDate,
                    req.body.latestUpdatedDate,
                    req.body.favorite,
                    req.body.sale,
                    req.body.outOfStock
                ]
                db.query(sql, [...values, productId], (err, data) => {
                if (err) return res.send(err);
                return res.json(data);
                });
            }
        })
    });

module.exports = router;