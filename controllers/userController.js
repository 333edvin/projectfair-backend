const users = require('../Models/userSchema.js')
const jwt = require('jsonwebtoken')


//REGISTER===================================
exports.register= async(req,res)=>{
    
    const {username,email,password} = req.body
    try {
        const existinguser = await users.findOne({email})
        if(existinguser){
            res.status(401).json("User already registered")
        }else{
            const newUser = await users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()
            res.status(200).json("User Registered Successfully")
        }
    } catch (error) {
        console.log(error)
    }
   

}

//LOGIN=============================================
exports.login = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await users.findOne({email,password})
        if(user){
            const token = jwt.sign({userId:user._id},"superkey2024")
            res.status(200).json({user,token})
            
        }else{
            res.status(401).json("Invaid Login")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("error in login")
        
    }
}