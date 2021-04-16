const express = require('express');
const mysql = require('mysql');
require('dotenv').config()
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

const filterRouter = require('./routes/filters')
app.use('/filters',filterRouter)


const hotelRouter = require('./routes/hotels')
app.use('/hotels',hotelRouter)

const userRouter = require('./routes/users')
app.use('/user',userRouter)

const favouriteRouter = require('./routes/favourite')
app.use('/favourite',favouriteRouter)



app.listen(port,()=>{
    console.log(`Serever started on port ${port}`);
})
