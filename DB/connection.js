// import mongodb 
const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connected successfully')
})
.catch((error)=>{
    console.log("Mongodb Connection Error")
})