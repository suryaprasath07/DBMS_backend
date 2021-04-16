const router = require('express').Router()
const { response, query } = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    port : '3306',
    database: 'product'
})

db.connect((err)=>{
    if(err){
       // console.log("error while Connecting")
    }else{
        console.log("Mysql Connected")
    }
})

router.route('/createtable').post((req,res)=>{
    let query = 'CREATE TABLE Favourite(username varchar(255) NOT NULL,uniq_id varchar(32) NOT NULL)';
    db.query(query,(err,result)=>{
        if(err) {
            console.log(err)
        }else{
            res.send("Favourite table created")
        }
    })
})

router.route('/get').post((req,res)=>{
    console.log(req.body)
    let query = `select * from product_db where uniq_id in (select uniq_id from Favourite where username='${req.body.username}')`
    db.query(query,(err,result)=>{
        if(err) {
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

router.route('/post').post((req,res)=>{
    var data = {status : 0}
    let query = `INSERT INTO favourite(username, uniq_id) VALUES ('${req.body.username}','${req.body.uniq_id}')`
    db.query(query,(err,result)=>{
        if(err) {
            res.send(data)
        }else{
            data.status=1
            res.send(data)
        }
    })
})

router.route('/delete').post((req,res)=>{
    var data = {status : 0}
    let query = `DELETE FROM favourite WHERE username='${req.body.username}' and uniq_id='${req.body.uniq_id}'`
    console.log(query)
    db.query(query,(err,result)=>{
        if(err) {
            res.send(data)
        }else{
            data.status=1
            res.send(data)
        }
    })
})

module.exports = router