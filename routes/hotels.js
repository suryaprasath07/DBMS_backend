const router = require('express').Router()
const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'product'
})

db.connect((err)=>{
    if(err){
        console.log("error while Connecting")
    }else{
        console.log("Mysql Connected")
    }
})

router.route('/createdb').post((req,res)=>{
    let query = 'CREATE DATABASE Product';
    db.query(query,(err,result)=>{
        if(err) {
            console.log(err)
        }else{
            res.send("database created")
        }
    })
})


router.route('/insertallrows').post((req,res)=>{
    fs.createReadStream('FINAL_cleartrip_com-travel_sample.csv')
    .pipe(csv())
    .on('data', (row) => {
        var sql = "INSERT INTO product_db SET ?";
        db.query(sql,row, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
  })
  .on('end', () => {
    res.json("created successfully");
  });
});

router.route('/').get((req,res)=>{
    let sql = "select * from product_db"
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

router.route('/:id').get((req,res)=>{
    let sql = `select * from product_db where uniq_id = '${req.params.id}' `
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

module.exports = router