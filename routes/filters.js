const router = require('express').Router()
const { response, query } = require('express');
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

router.route('/').post((req,res)=>{

    var Final = { wifi : "Wi-Fi", ac : "Air Conditioning", pool : "pool" , laundary : "Laundary" , parking : "Parking"
    , standard  : "Standard" , deluxe : "Deluxe Room", executive : "Executive" , luxury : "luxury",
    one : "1 Star hotel",two : "2 Star hotel", three :  "3 Star hotel", four :  "4 Star hotel", five : "5 Star hotel"
    }
    var body = req.body
    var facilities = body.facilities
    var stars = body.stars
    var rooms = body.rooms
    var city = body.city
    var budget = body.budget
    var star_flag = 0
    var room_flag = 0


    var query = `select * from product_db`

    var string=""

    for (let [key, value] of Object.entries(facilities)) {
        if(value == true){
            string+="hotel_facilities LIKE '%" + String(Final[`${key}`]) + "%' and "
        }
    }

    for (let [key, value] of Object.entries(rooms)) {
            if(value == true){
                if(room_flag==0){
                    room_flag=1
                    string+="("
                }
                string+="room_type LIKE '%" + String(Final[`${key}`]) + "%' or "
            }
      }
    
    if(string.endsWith("or ")){
        string = string.substring(0,string.length-3);
        string+=") and "
    }
    for (let [key, value] of Object.entries(stars)) {
        if(value == true){
            if(star_flag==0){
                star_flag=1
                string+="("
            }
            string+="hotel_star_rating = '" + String(Final[`${key}`]) +"' or " 
        }
    }

    if(string.endsWith("or ")){
        string = string.substring(0,string.length-3);
        string+=") and "
    }

    if(city){
        string+=`city = '${city}' and `
    }
    if(budget.length>0){
        if(budget.length==1){
            string+=`Cost >= ${budget[0]}`
        }else{
            string+=`Cost >= ${budget[0]} and Cost <= ${budget[1]}`
        }
    }

    if(string.length>0){
        string = " where " + string;   
    }
    if(string.endsWith("and ")){
        string = string.substring(0,string.length-4);
    }

    query = query + string;

    db.query(query,(err,result)=>{
            if(err) throw err;
            //console.log(query)
            //console.log(result)
            console.log(query)
            res.send(result)
        })
  
})

router.route('/sortby').get((req,res)=>{
    var Final = { "wifi" : "Wi-Fi", "ac" : "Air Conditioning", "pool" : "pool" , "laundary" : "Laundary" , "parking" : "Parking"
    , "standard"  : "Standard" , "deluxe" : "Deluxe Room", "executive" : "Executive" , "luxury" : "luxury",
    "one" : "1 Star hotel","two" : "2 Star hotel", "three" :  "3 Star hotel", "four" :  "4 Star hotel", "five" : "5 Star hotel"
    }
    var body = req.body
    var facilities = body.facilities
    var stars = body.stars
    var rooms = body.rooms
    var city = body.city
    var budget = body.budget
    var star_flag = 0
    var room_flag = 0


    query = `select * from product_db`

    var string=""

    for (let [key, value] of Object.entries(facilities)) {
        if(value == true){
            string+="hotel_facilities LIKE '%" + String(Final[`${key}`]) + "%' and "
        }
    }

    for (let [key, value] of Object.entries(rooms)) {
            if(value == true){
                if(room_flag==0){
                    room_flag=1
                    string+="("
                }
                string+="room_type LIKE '%" + String(Final[`${key}`]) + "%' or "
            }
      }
    
    if(string.endsWith("or ")){
        string = string.substring(0,string.length-3);
        string+=") and "
    }
    for (let [key, value] of Object.entries(stars)) {
        if(value == true){
            if(star_flag==0){
                star_flag=1
                string+="("
            }
            string+="hotel_star_rating = '" + String(Final[`${key}`]) +"' or " 
        }
    }

    if(string.endsWith("or ")){
        string = string.substring(0,string.length-3);
        string+=") and "
    }

    if(city){
        string+=`city = '${city}' and `
    }
    if(budget.length>0){
        if(budget.length==1){
            string+=`Cost >= ${budget[0]}`
        }else{
            string+=`Cost >= ${budget[0]} and Cost <= ${budget[1]}`
        }
    }

    if(string.length>0){
        string = " where " + string;   
    }
    if(string.endsWith("and ")){
        string = string.substring(0,string.length-4);
    }

    query = query + string;
    query+='ORDER by Cost'

    db.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result)
        })

})

module.exports = router


// {
//     "facilities" : { "Wi-Fi" : true, "Air Conditioning" : false, "pool" : false , "Laundry" : false, "Parking" : false},
//     "rooms" : { "Standard" : true, "Deluxe Room" : true, "Executive" : false, "luxury" : false} ,
//     "stars" : { "1 Star hotel" : false, "2 Star hotel" : true, "3 Star hotel" : true, "4 Star hotel" : false, "5 Star hotel" : false},
//     "city" : "Jaipur",
//     "budget" : [1000,2500]
// }

