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
        console.log("error while Connecting")
    }else{
        console.log("Mysql Connected")
    }
})

router.route('/createtable').post((req,res)=>{
    let query = 'CREATE TABLE Users(username varchar(255) NOT NULL, emailid varchar(255) NOT NULL, password varchar(255) NOT NULL, PRIMARY KEY(username))';
    db.query(query,(err,result)=>{
        if(err) {
            console.log(err)
        }else{
            res.send("User table created")
        }
    })
})

router.route('/register').post((req,res)=>{
    var body = req.body
    var data = {status : 0}
    var query = 'INSERT INTO users SET ?'
    db.query(query,body, function (err, result) {
        if (err) res.send(data);
        else{
            data.status=1
            res.send(data)
        }
      });     
})

router.route('/login').post((req,res)=>{
    var body = req.body
    var data = {status : 0}
    var query = `select * from users where username="${body.username}"`
    db.query(query, function (err, result) {
        if (err) res.send(data);
        else{
            if(result.length==0){
                res.send(data);
            }else{
                if(result[0].password===body.password){
                    data.status=1
                    res.send(data)
                }else{
                    res.send(data);
                }
            }
        }
      });     
})



module.exports = router