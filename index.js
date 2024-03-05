//Loads .env file contents into process.env by default
require('dotenv').config()


const express = require('express')//import express
const cors = require('cors')//import cors
const router =require('./Router/route')//import route
const db = require('./DB/connection')//mongodb 
const jwtMiddleware = require('./Middlewares/jwtMiddleware')//middlewares

//create a backend appliation using express
const pfServer = express()


//use
pfServer.use(cors())
pfServer.use(express.json())//json()-to parse json data(act as an middleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

//port
const PORT = process.env.PORT || 4000

//listen server
pfServer.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})

//http - get resolving to http//localhost:4000
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project fair backend started</h1>`)
    
})