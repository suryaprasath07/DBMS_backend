const router = require('express').Router()
const { response } = require('express');
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
    }//else{
    //   console.log("Mysql Connected")
    //}
})

router.route('/').get((req,res)=>{
    var body = req.body
    var facilities = body.facilities
    var stars = body.stars
    var rooms = body.rooms
    var city = body.city
    var budget = body.budget


    query = `select * from product_db`

    var string=""

    for (let [key, value] of Object.entries(rooms)) {
            if(value == true){
                string+=`room_type = '${key}' and `
            }
      }
    for (let [key, value] of Object.entries(stars)) {
        if(value == true){
            string+=`hotel_star_rating = '${key}' and `
        }
    }
    if(city){
        string+=`city = '${city}' and `
    }
    if(budget.length>0){
        if(budget.length==1){
            string+=`Cost >= '${budget[0]}'`
        }else{
            string+=`Cost >= '${budget[0]}' and Cost <= '${budget[1]}'`
        }
    }

    if(string.length>0){
        string = "where " + string;   
    }
    if(string.endsWith("and ")){
        string = string.substring(0,string.length-4);
    }

    db.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result)
        })
  
})


module.exports = router


// {
//     "facilities" : { "wifi" : false, "AC" : false, "pool" : false , "laundry" : false, "parking" : false},
//     "rooms" : { "standard" : false, "Deluxe Room" : true, "executive" : false, "luxury" : false} ,
//     "stars" : { "1 Star hotel" : true, "2 Star hotel" : false, "3 Star hotel" : false, "4 Star hotel" : false, "5 Star hotel" : false},
//     "city" : "kochi",
//     "budget" : []
// }