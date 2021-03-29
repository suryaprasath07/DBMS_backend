const express = require('express');
const mysql = require('mysql');
require('dotenv').config()


const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

const filterRouter = require('./routes/filters')
app.use('/filters',filterRouter)


const hotelRouter = require('./routes/hotels')
app.use('/hotels',hotelRouter)


app.listen(port,()=>{
    console.log(`Serever started on port ${port}`);
})